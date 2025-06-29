"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Sidebar from "@/component/Sidebar/Sidebar";

// 仮データ例
const data = [
  { who: "山田", department: "営業", vending10: "○", vending11: "" },
  { who: "佐藤", department: "開発", vending10: "", vending11: "○" },
  { who: "田中", department: "総務", vending10: "○", vending11: "○" },
];

export default function search() {
  return (
    <Sidebar>
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
              <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
                10階自販機
              </TableCell>
              <TableCell sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
                11階自販機
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.who}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell align="center">{row.vending10}</TableCell>
                <TableCell align="center">{row.vending11}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Sidebar>
  );
}
