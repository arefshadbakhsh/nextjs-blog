import React from "react";
import { Typography } from "@/component/material-tailwind";

interface Props {
  children: React.ReactNode;
}

export default function FormFieldError({ children }: Props) {
  return (
    <Typography className="text-xs" color="red">
      {children}
    </Typography>
  );
}
