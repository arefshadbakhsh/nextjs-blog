"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Typography } from "@/component/material-tailwind";
import FormFieldLabel from "@/component/general/form-field-label";
import FormFieldError from "@/component/general/form-field-error";
import Link from "next/link";
import ButtonNormal from "@/component/general/button-normal";
import { login } from "@/app/actions/auth";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

// Define Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define TypeScript types from Zod schema
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginForm>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      const result = await login(data);
      if (!result.user) {
        toast.error(result.message);
      } else if (result.user) {
        toast.success("Login Successful");
        router.push("/posts/list");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4 h-full">
      <Typography variant="h2">Agent Login</Typography>

      <Card className="p-4 w-1/3">
        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          {/*region Email*/}
          <FormFieldLabel>Email</FormFieldLabel>
          <Input
            crossOrigin={undefined}
            {...form.register("email")}
            type="email"
            size="lg"
            label="Email"
            name="email"
            error={!!form.formState.errors.email}
          />
          <div className="h-2">
            {form.formState.errors.email && <FormFieldError>{form.formState.errors.email.message}</FormFieldError>}
          </div>
          {/*endregion*/}

          {/*region Password */}
          <FormFieldLabel>Password</FormFieldLabel>
          <div className="relative">
            <Input
              crossOrigin={undefined}
              {...form.register("password")}
              type={showPassword ? "text" : "password"}
              size="lg"
              label="Password"
              name="password"
              error={!!form.formState.errors.password}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </div>
          </div>
          <div className="h-2">
            {form.formState.errors.password && (
              <FormFieldError>{form.formState.errors.password.message}</FormFieldError>
            )}
          </div>
          {/*endregion*/}

          <div className="flex justify-center">
            <ButtonNormal
              loading={loading}
              className="mt-5"
              disabled={!form.formState.isValid || loading}
              type={"submit"}>
              Login
            </ButtonNormal>
          </div>
        </form>
      </Card>

      <Link href="/register" className="w-1/3 text-blue-700">
        Register
      </Link>
    </div>
  );
}