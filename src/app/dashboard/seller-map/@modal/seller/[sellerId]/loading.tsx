import CircularProgress from "@/components/CircularProgress";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircularProgress />
    </div>
  );
}
