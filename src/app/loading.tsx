import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2Icon className="h-6 w-6 animate-spin" />
    </div>
  );
}
