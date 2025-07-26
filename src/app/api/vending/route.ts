import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";


export async function GET() {
  try {
    const vendingMachines = await prisma.vendingmachine.findMany({
      select: {
        vendingmachine_no: true,
        vendingmachine_name: true,
      },
    });
    return NextResponse.json(vendingMachines, { status: 200 });
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
