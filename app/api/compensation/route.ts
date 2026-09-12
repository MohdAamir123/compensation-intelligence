import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const querySchema = z.object({
  search: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  location: z.string().optional(),
  level: z.string().optional(),
  sort: z
    .enum(["total-desc", "total-asc", "base-desc", "base-asc"])
    .default("total-desc"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

const ingestionSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company name is required"),

  role: z
    .string()
    .trim()
    .min(2, "Role is required"),

  level: z
    .string()
    .trim()
    .min(1, "Level is required"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required"),

  baseSalary: z
    .number()
    .int()
    .nonnegative("Base salary cannot be negative"),

  bonus: z
    .number()
    .int()
    .nonnegative("Bonus cannot be negative")
    .default(0),

  stock: z
    .number()
    .int()
    .nonnegative("Stock cannot be negative")
    .default(0),

  experience: z
    .number()
    .int()
    .nonnegative()
    .optional(),

  source: z
    .string()
    .trim()
    .optional(),
});

function normalizeCompanyName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createFingerprint(
  company: string,
  role: string,
  level: string,
  location: string,
  baseSalary: number,
  bonus: number,
  stock: number
) {
  return [
    company.trim().toLowerCase(),
    role.trim().toLowerCase(),
    level.trim().toLowerCase(),
    location.trim().toLowerCase(),
    baseSalary,
    bonus,
    stock,
  ].join("|");
}

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const parsed = querySchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      search,
      company,
      role,
      location,
      level,
      sort,
      page,
      limit,
    } = parsed.data;

    const where: any = {};

    if (company) {
      where.company = {
        name: {
          equals: company,
          mode: "insensitive",
        },
      };
    }

    if (role) {
      where.role = {
        contains: role,
        mode: "insensitive",
      };
    }

    if (location) {
      where.location = {
        equals: location,
        mode: "insensitive",
      };
    }

    if (level) {
      where.level = {
        equals: level,
        mode: "insensitive",
      };
    }

    if (search) {
      where.OR = [
        {
          role: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          level: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          location: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          company: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    let orderBy: any = {
      totalComp: "desc",
    };

    switch (sort) {
      case "total-asc":
        orderBy = { totalComp: "asc" };
        break;

      case "base-desc":
        orderBy = { baseSalary: "desc" };
        break;

      case "base-asc":
        orderBy = { baseSalary: "asc" };
        break;

      default:
        orderBy = { totalComp: "desc" };
    }

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      prisma.compensation.findMany({
        where,
        include: {
          company: true,
        },
        orderBy,
        skip,
        take: limit,
      }),

      prisma.compensation.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Compensation GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch compensation data",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = ingestionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid compensation data",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      company,
      role,
      level,
      location,
      baseSalary,
      bonus = 0,
      stock = 0,
      experience,
      source,
    } = parsed.data;

    const normalizedCompany = normalizeCompanyName(company);
    const slug = createSlug(normalizedCompany);

    const totalComp = baseSalary + bonus + stock;

    const fingerprint = createFingerprint(
      normalizedCompany,
      role,
      level,
      location,
      baseSalary,
      bonus,
      stock
    );

    const existing = await prisma.compensation.findUnique({
      where: {
        fingerprint,
      },
      include: {
        company: true,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate compensation record",
          existingRecord: existing,
        },
        { status: 409 }
      );
    }

    const dbCompany = await prisma.company.upsert({
      where: {
        slug,
      },
      update: {
        name: normalizedCompany,
      },
      create: {
        name: normalizedCompany,
        slug,
        description: `${normalizedCompany} compensation data`,
      },
    });

    const record = await prisma.compensation.create({
      data: {
        companyId: dbCompany.id,
        role: role.trim(),
        level: level.trim(),
        location: location.trim(),
        baseSalary,
        bonus,
        stock,
        totalComp,
        experience,
        source: source?.trim() || "API ingestion",
        fingerprint,
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Compensation record created successfully",
        data: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Compensation POST error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create compensation record",
      },
      { status: 500 }
    );
  }
}