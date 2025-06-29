import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { employee_no, with_employee_no, vendingmachine_no } =
      await req.json();

    if (!employee_no || !with_employee_no || !vendingmachine_no) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const ohgo = await prisma.ohgo.create({
      data: {
        did_ohgo: true,
        employee_no,
        with_employee_no,
        vendingmachine_no,
      },
    });

    return NextResponse.json(ohgo, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
