import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await context.params;

    const company = await prisma.company.findUnique({
      where: {
        slug,
      },
      include: {
        records: true,
      },
    });

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: "Company not found",
        },
        { status: 404 }
      );
    }

    const records = company.records;

    const totalRecords = records.length;

    const averageTotal =
      totalRecords > 0
        ? Math.round(
            records.reduce(
              (sum, record) => sum + record.totalComp,
              0
            ) / totalRecords
          )
        : 0;

    const averageBase =
      totalRecords > 0
        ? Math.round(
            records.reduce(
              (sum, record) => sum + record.baseSalary,
              0
            ) / totalRecords
          )
        : 0;

    const highestTotal =
      totalRecords > 0
        ? Math.max(
            ...records.map((record) => record.totalComp)
          )
        : 0;

    const locations = Array.from(
      new Set(records.map((record) => record.location))
    );

    const levels = Array.from(
      new Set(records.map((record) => record.level))
    );

    return NextResponse.json({
      success: true,
      data: {
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,
          description: company.description,
          website: company.website,
        },

        statistics: {
          totalRecords,
          averageTotal,
          averageBase,
          highestTotal,
        },

        locations,
        levels,

        records,
      },
    });
  } catch (error) {
    console.error("Company detail error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch company",
      },
      { status: 500 }
    );
  }
}