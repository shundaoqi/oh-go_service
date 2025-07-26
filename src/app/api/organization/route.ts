import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET /api/organization
export async function GET() {
  try {
    // Fetch all organizations from the database
    const organizations = await prisma.organization.findMany({
      select: {
        organization_no: true,
        organization_name: true,
      },
    });
    return NextResponse.json(organizations);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
