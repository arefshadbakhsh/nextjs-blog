import React from "react";
import RegisterForm from "@/component/auth/register-form";

export const dynamic = "force-dynamic";


export default async function Page() {

    return (
        <div className="h-[100vh]">
            <RegisterForm/>
        </div>
    );
}
