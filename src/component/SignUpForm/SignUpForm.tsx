"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import supabase from "../../../lib/supabase";
import { Organization } from "../../../type/type";

type Props = {
  organizationsList: Organization[];
};

const SignUpForm = ({ organizationsList }: Props) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConf) {
      alert("パスワードが一致しません");
      return;
    }

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      alert("確認メールを送信しました。受信ボックスをご確認ください。");
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("サインアップ中にエラーが発生しました。");
    }
    // ここでAPIを呼び出して、employeeとaffiliationを作成する
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastName,
          firstName,
          email,
          organization,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      console.log("User created successfully:", data);
      alert("アカウントが作成されました。");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("ユーザーの作成中にエラーが発生しました。");
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
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          アカウント作成
        </Typography>

        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="性"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="名"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Stack>

            <TextField
              select
              label="所属組織"
              fullWidth
              value={organization}
              onChange={(e) => setOrganization(e.target.value as string)}
            >
              {organizationsList.map((org) => (
                <MenuItem key={org.organization_no} value={org.organization_no}>
                  {org.organization_name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="メールアドレス"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="パスワード"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="パスワード（確認）"
              variant="outlined"
              type="password"
              fullWidth
              value={passwordConf}
              onChange={(e) => setPasswordConf(e.target.value)}
            />

            <Button type="submit" variant="contained" fullWidth>
              アカウント作成
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
