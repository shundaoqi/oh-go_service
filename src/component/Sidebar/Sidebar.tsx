"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import supabase from "../../../lib/supabase";
import { Employee } from "../../../type/type";

// メインコンポーネント（クライアントコンポーネント化）
const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ユーザー_auth_idを取得
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user?.id) {
          console.error("ユーザーidが取得できませんでした。");
          setLoading(false);
          return;
        }

        // employeesテーブルのレコードを全件取得
        const res_emp = await fetch("/api/user/");
        const employees: Employee[] = await res_emp.json();

        if (!employees || !Array.isArray(employees)) {
          console.error("社員情報が取得できませんでした。");
          setLoading(false);
          return;
        }

        // auth.users.idを元に、employeesテーブルから社員番号と名前を取得
        const emp = employees.find((e) => e.auth_user_id === user.id);
        if (!emp) {
          console.error("ユーザー情報が取得できませんでした。");
          setLoading(false);
          return;
        }

        const userId = emp.employee_no;
        const userFullName = `${emp.last_name} ${emp.first_name}`;

        // 所属組織名を取得
        const res_org = await fetch(`/api/user/${userId}`);
        const orgData = await res_org.json();
        const organization_name = orgData.organization_name;

        setUserName(userFullName);
        setOrganizationName(organization_name);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{ sx: { width: drawerWidth, boxSizing: "border-box" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* タイトル追加 */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              oh-go
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/main/search">
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="検索" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/main/myPage">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="マイページ" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ p: 2 }}>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {userName ?? "ユーザー名"}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {organizationName ?? "所属部署"}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px` }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
