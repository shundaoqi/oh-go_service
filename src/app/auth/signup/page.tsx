import SignUpForm from "@/component/SignUpForm/SignUpForm";
import React from "react";

export const dynamic = 'force-dynamic';

const SignUp = async () => {
  // organizationを全権取得
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/api/organization`);
  if (!res.ok) throw new Error("Failed to fetch organizations");
  const organizationsList = await res.json();

  return <SignUpForm organizationsList={organizationsList} />;
};

export default SignUp;

