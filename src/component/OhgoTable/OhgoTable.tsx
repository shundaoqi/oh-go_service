"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { getEmployeeNo } from "../../../util/function";

type Props = {
  vendingMachineList: [
    { vendingmachine_no: number; vendingmachine_name: string }
  ];
};

const OhgoTable = ({ vendingMachineList }: Props) => {
  const [tableData, setData] = React.useState([]);

  useEffect(() => {
    const fetchOhgo = async () => {
      // ログインしているユーザーのauth.user.idを取得
      const employee_no = await getEmployeeNo();

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      const res = await fetch(
        `/api/ohgo?employee_no=${employee_no}&date=${formattedDate}`,
        {
          method: "GET",
          next: { revalidate: 60 }, // 60秒ごとに再検証
        }
      );

      const response = await res.json();
      setData(response.data || []);
    };

    fetchOhgo();
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: 900, margin: "40px auto" }}
    >
      <Table size="small" style={{ border: "1px solid #ccc" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              誰と
            </TableCell>
            <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              所属部署
            </TableCell>
            {vendingMachineList.map((vendingMachine) => (
              <TableCell
                key={vendingMachine.vendingmachine_no}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              >
                {vendingMachine.vendingmachine_name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row["with_employee_name"]}</TableCell>
              <TableCell>{row["organization_no"]}</TableCell>
              <TableCell align="center">
                {row["1"] ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "#43a047",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#e3f2fd" />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#43a047"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </span>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell align="center">
                {row["2"] ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "#43a047",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#e3f2fd" />
                      <path
                        d="M7 13l3 3 7-7"
                        stroke="#43a047"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </span>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OhgoTable;
