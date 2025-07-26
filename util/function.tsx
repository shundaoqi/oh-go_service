import supabase from "../lib/supabase";

export const getEmployeeNo: () => Promise<number | undefined> = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  const res_user = await fetch(
    `/api/employee?auth_user_id=${encodeURIComponent(user.id)}`,
    {
      method: "GET",
    }
  );

  const employees = await res_user.json();
  const employee_no = Number(
    Array.isArray(employees) && employees.length > 0
      ? employees[0].employee_no
      : undefined
  );

  return employee_no;
};
