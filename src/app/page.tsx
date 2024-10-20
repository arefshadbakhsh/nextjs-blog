"use client";

import React from "react";
import { Button } from "@/component/material-tailwind";

export default function Home() {

  const onClickOpenDetails = () => {

    console.log("done");
  };
  return (
    <div className="flex justify-center items-center h-[100vh] text-red-800 text-7xl">
      <Button
        placeholder={"Test"}
        onClick={onClickOpenDetails}>
        Test Click
      </Button>
    </div>
  );
}
