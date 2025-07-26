"use client";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CalenderPicker from "../CalenderPicker/CalenderPicker";
import EmployeesAutocomplete from "./EmployeesAutocomplete";
import { Employee, FloorOhgoBoxProps } from "../../../type/type";
import { getEmployeeNo } from "../../../util/function";

const registerOhgo = async (with_employee_no: number, floor_no: number) => {
  const employee_no = await getEmployeeNo();

  const res_ohgo = await fetch("/api/ohgo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employee_no: employee_no,
      with_employee_no: with_employee_no,
      vendingmachine_no: floor_no,
    }),
  });
  return res_ohgo.ok;
};

const FloorOhgoBox = ({ floor, floor_no }: FloorOhgoBoxProps) => {
  const [employeeNo, setEmployeeNo] = useState<number | null>(null);

  useEffect(() => {
    const fetchEmployeeNo = async () => {
      const employeeNo_tmp = await getEmployeeNo(); // 非同期の場合
      setEmployeeNo(employeeNo_tmp !== undefined ? employeeNo_tmp : null);
    };
    fetchEmployeeNo();
  }, [employeeNo]);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [withEmployee, setWithEmployee] = useState<Employee | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleWithEmployeeChange = (employee: Employee | null) => {
    setWithEmployee(employee);
  };

  const handleRegister = () => {
    if (withEmployee) {
      registerOhgo(withEmployee.employee_no, floor_no);
      setSnackBarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "white",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* 階数などの表示 */}
        <Typography variant="h6">{floor}</Typography>

        <CalenderPicker />
      </Stack>
      <Switch checked={checked} onChange={handleChange} />

      <EmployeesAutocomplete
        employeeNo={employeeNo}
        value={withEmployee}
        handleChange={handleWithEmployeeChange}
      />

      <Button variant="contained" onClick={handleRegister}>
        登録
      </Button>

      {/* 成功したときのSnackbar */}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          登録が完了しました！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FloorOhgoBox;
