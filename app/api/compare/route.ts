
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const ids = request.nextUrl.searchParams
      .get("ids")
      ?.split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (!ids || ids.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Provide at least 2 compensation record IDs",
        },
        { status: 400 }
      );
    }

    if (ids.length > 3) {
      return NextResponse.json(
        {
          success: false,
          error: "You can compare a maximum of 3 records",
        },
        { status: 400 }
      );
    }

    const records = await prisma.compensation.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        company: true,
      },
    });

    if (records.length !== ids.length) {
      return NextResponse.json(
        {
          success: false,
          error: "One or more compensation records were not found",
        },
        { status: 404 }
      );
    }

    const ranked = [...records].sort(
      (a, b) => b.totalComp - a.totalComp
    );

    return NextResponse.json({
      success: true,
      data: {
        records: ranked,

        summary: {
          highestCompensation: ranked[0].totalComp,

          lowestCompensation:
            ranked[ranked.length - 1].totalComp,

          averageCompensation: Math.round(
            ranked.reduce(
              (sum, record) => sum + record.totalComp,
              0
            ) / ranked.length
          ),
        },
      },
    });
  } catch (error) {
    console.error("Compare API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to compare compensation",
      },
      { status: 500 }
    );
  }
}