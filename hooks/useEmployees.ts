"use client";
import { useEffect, useState } from "react";

type Employee = {
  employee_no: string;
  first_name: string;
  last_name: string;
  email: string;
};

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("/api/employee");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  const data = await response.json();
  return data as Employee[];
};

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return { employees, loading, error };
};
