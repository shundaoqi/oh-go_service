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
import { useState } from "react";
import CalenderPicker from "../CalenderPicker/CalenderPicker";
import EmployeesAutocomplete from "./EmployeesAutocomplete";

interface FloorOhgoBoxProps {
  floor: string;
}
const FloorOhgoBox = ({ floor }: FloorOhgoBoxProps) => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleRegister = () => {
    // ここでOh-GoのデータをPostするよ
    setSnackBarOpen(true);
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

      <EmployeesAutocomplete />

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
