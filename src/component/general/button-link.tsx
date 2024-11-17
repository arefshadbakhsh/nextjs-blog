import React from "react";
import Link from "next/link";
import { Button } from "@/component/material-tailwind";
import type { color } from "@material-tailwind/react/types/components/button";

interface Props {
  href: string;
  className?: string;
  color?: color;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function ButtonLink({ href, className, color, fullWidth, children }: Props) {
  return (
    <Link href={href} className={className}>
      <Button className={"normal-case"} color={color} fullWidth={fullWidth}>
        {children}
      </Button>
    </Link>
  );
}
