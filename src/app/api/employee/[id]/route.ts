import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET /api/user/[id]
// 社員番号から組織番号と組織名を取得するAPI
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const employeeNo = Number(id);
    if (isNaN(employeeNo)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const affiliation = await prisma.affiliation.findFirst({
      where: { employee_no: employeeNo },
      select: { organization_no: true },
    });

    if (!affiliation) {
      return NextResponse.json(
        { error: "Affiliation not found" },
        { status: 404 }
      );
    }
    const organization = await prisma.organization.findFirst({
      where: { organization_no: affiliation.organization_no },
      select: { organization_name: true },
    });

    return NextResponse.json(
      {
        organization_no: affiliation.organization_no,
        organization_name: organization?.organization_name,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
