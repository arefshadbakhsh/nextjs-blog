import React from "react";
import LoginForm from "@/component/auth/login-form";

export const dynamic = "force-dynamic";


export default async function Page() {

  return (
    <div className="h-[100vh]">
      <LoginForm />
    </div>
  );
}
