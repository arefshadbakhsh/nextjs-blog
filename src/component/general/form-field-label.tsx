
import React from "react";
import { Typography } from "@/component/material-tailwind";

interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function FormFieldLabel({ className, children }: Props) {
  return (
    <Typography variant="h6" className={`mt-4 mb-2 font-bold ${className}`}>
      {children}
    </Typography>
  );
}
