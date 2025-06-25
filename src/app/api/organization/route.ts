import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        organization_no: true,
        organization_name: true,
        created_at: true,
      },
      orderBy: {
        organization_name: 'asc',
      },
    });

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
