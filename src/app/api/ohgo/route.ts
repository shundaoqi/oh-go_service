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

export async function GET(req: NextRequest) {
  try {
    return await handleVisualization(req);
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function handleVisualization(req: NextRequest) {
  try {
    const employeeNoParam = req.nextUrl.searchParams.get("employee_no");
    const dateParam = req.nextUrl.searchParams.get("date");

    if (!employeeNoParam || !dateParam) {
      return NextResponse.json(
        { error: "employee_no and date are required" },
        { status: 400 }
      );
    }

    const employee_no = parseInt(employeeNoParam);
    if (isNaN(employee_no)) {
      return NextResponse.json(
        { error: "employee_no must be a valid number" },
        { status: 400 }
      );
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
      return NextResponse.json(
        { error: "date must be in YYYY-MM-DD format" },
        { status: 400 }
      );
    }

    const startDate = new Date(`${dateParam}T00:00:00.000Z`);
    const endDate = new Date(`${dateParam}T23:59:59.999Z`);

    const ohgoRecords = await prisma.ohgo.findMany({
      where: {
        employee_no: employee_no,
        did_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        employee_ohgo_with_employee_noToemployee: {
          include: {
            affiliation: {
              include: {
                organization: true,
              },
            },
          },
        },
        vendingmachine: true,
      },
    });

    const allVendingMachines = await prisma.vendingmachine.findMany({
      orderBy: {
        vendingmachine_no: "asc",
      },
    });

    const groupedData = new Map();

    ohgoRecords.forEach((record) => {
      if (!record.did_ohgo) return;

      const key = record.with_employee_no?.toString() || "null";

      if (!groupedData.has(key)) {
        let withEmployeeName = null;
        let organizationDisplay = null;

        if (
          record.with_employee_no &&
          record.employee_ohgo_with_employee_noToemployee
        ) {
          const withEmployee = record.employee_ohgo_with_employee_noToemployee;
          withEmployeeName = `${withEmployee.last_name}${withEmployee.first_name}`;

          if (withEmployee.affiliation && withEmployee.affiliation.length > 0) {
            const firstAffiliation = withEmployee.affiliation[0];
            if (firstAffiliation.organization) {
              organizationDisplay =
                firstAffiliation.organization.organization_name;
            }
          }
        }

        const vendingMachineColumns: Record<string, boolean> = {};
        allVendingMachines.forEach((vm) => {
          vendingMachineColumns[vm.vendingmachine_no] = false;
        });

        groupedData.set(key, {
          with_employee_name: withEmployeeName,
          organization_no: organizationDisplay,
          ...vendingMachineColumns,
        });
      }

      const data = groupedData.get(key);
      data[record.vendingmachine.vendingmachine_no] = true;
    });

    const result = Array.from(groupedData.values());

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
