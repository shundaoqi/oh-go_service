import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const main = async () => {
  try {
    await prisma.$connect();
  } catch {
    return Error("fail to connect DB");
  }
};

export async function POST(req: NextRequest) {
  try {
    const { email, lastName, firstName, organization } = await req.json();

    // auth.usersからemailでユーザーを検索し、idを取得
    const authUser = await prisma.$queryRaw<
      { id: string }[]
    >`SELECT id FROM auth.users WHERE email = ${email} LIMIT 1`;

    if (!authUser || authUser.length === 0) {
      return NextResponse.json(
        { error: "auth.usersに該当ユーザーがありません" },
        { status: 404 }
      );
    }
    const authUserId = authUser[0].id;

    // employeeテーブルにインサート
    const employee = await prisma.employee.create({
      data: {
        last_name: lastName,
        first_name: firstName,
        email: email,
        auth_user_id: authUserId,
      },
    });

    // affiliationテーブルにインサート
    await prisma.affiliation.create({
      data: {
        employee_no: employee.employee_no,
        organization_no: organization,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        employee_no: true,
        first_name: true,
        last_name: true,
        email: true,
        auth_user_id: true,
      },
    });
    return NextResponse.json(employees, { status: 200 });
  } catch (error: unknown) {
    let message = "Internal Server Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
