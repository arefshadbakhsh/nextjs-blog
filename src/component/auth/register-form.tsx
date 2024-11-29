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
import { registerUser } from "@/app/actions/auth";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { RegisterRequestDto } from "@/lib/models/register.model";
import { useRouter } from "next/navigation";

// Define Zod schema for form validation
const registerSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    username: z.string().min(6, "Username must be at least 6 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

// Define TypeScript types from Zod schema
type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterForm>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    const _body: RegisterRequestDto = {
      email: data.email,
      username: data.username,
      password: data.password,
    };
    try {
      const result = await registerUser(_body);
      if (!result) {
        toast.error(result);
      } else if (result) {
        toast.success("Register Successful");
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
          {/*region Email */}
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
            {form.formState.errors.email && (
              <FormFieldError>{form.formState.errors.email.message}</FormFieldError>
            )}
          </div>
          {/*endregion*/}

          {/*region Username */}
          <FormFieldLabel>Username</FormFieldLabel>
          <Input
            crossOrigin={undefined}
            {...form.register("username")}
            size="lg"
            label="Username"
            name="username"
            error={!!form.formState.errors.username}
          />
          <div className="h-2">
            {form.formState.errors.username && (
              <FormFieldError>{form.formState.errors.username.message}</FormFieldError>
            )}
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

          {/*region Confirm Password */}
          <FormFieldLabel>Confirm Password</FormFieldLabel>
          <div className="relative">
            <Input
              crossOrigin={undefined}
              {...form.register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              size="lg"
              label="Confirm Password"
              name="confirmPassword"
              error={!!form.formState.errors.confirmPassword}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-600" />
              )}
            </div>
          </div>
          <div className="h-2">
            {form.formState.errors.confirmPassword && (
              <FormFieldError>{form.formState.errors.confirmPassword.message}</FormFieldError>
            )}
          </div>
          {/*endregion*/}

          {/*region Submit Button */}
          <div className="flex justify-center">
            <ButtonNormal
              loading={loading}
              className="mt-5"
              disabled={!form.formState.isValid || loading}
              type={"submit"}
            >
              Register
            </ButtonNormal>
          </div>
          {/*endregion    */}
        </form>
      </Card>

      <Link href="/login" className="w-1/3 text-blue-700">
        Login
      </Link>
    </div>
  );
}
