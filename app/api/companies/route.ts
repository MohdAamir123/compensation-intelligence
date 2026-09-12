import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        records: true,
      },
    });

    const data = companies.map((company) => {
      const records = company.records;

      const averageComp =
        records.length > 0
          ? Math.round(
              records.reduce(
                (sum, record) => sum + record.totalComp,
                0
              ) / records.length
            )
          : 0;

      return {
        id: company.id,
        name: company.name,
        slug: company.slug,
        description: company.description,
        website: company.website,
        recordCount: records.length,
        averageComp,
      };
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Companies GET error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch companies",
      },
      { status: 500 }
    );
  }
}