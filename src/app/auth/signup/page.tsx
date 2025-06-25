import SignUpForm from "@/component/SignUpForm/SignUpForm";
import React from "react";

const SignUp = async () => {
  // organizationを全権取得
  const res = await fetch("http://localhost:3000/api/organization");
  if (!res.ok) throw new Error("Failed to fetch organizations");
  const organizationsList = await res.json();

  return <SignUpForm organizationsList={organizationsList} />;
};

export default SignUp;

