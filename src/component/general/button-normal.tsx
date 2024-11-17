import React from "react";
import { Button } from "@/component/material-tailwind";
import type { color } from "@material-tailwind/react/types/components/button";

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  color?: color;
  children: React.ReactNode;
  fullWidth?: boolean;
  type: "submit"
}

export default function ButtonNormal({ loading, disabled, color, fullWidth, type,className, children }: ButtonProps) {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      type={type}
      className={`normal-case ${className}`}
      color={color} fullWidth={fullWidth}>
      {children}

    </Button>
  );
}
