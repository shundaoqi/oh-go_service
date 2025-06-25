"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import supabase from "../../../../lib/supabase";

const SendEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/auth/login", // 本番URLに合わせて変更
      });
      if (error) throw error;
      setSent(true);
    } catch {
      alert("メール送信に失敗しました。");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          パスワード再設定メール送信
        </Typography>
        {sent ? (
          <Typography color="primary" textAlign="center">
            パスワード再設定用のメールを送信しました。
          </Typography>
        ) : (
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="contained" fullWidth>
                送信
              </Button>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => router.push("/auth/login")}
              >
                ログイン画面に戻る
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default SendEmail;