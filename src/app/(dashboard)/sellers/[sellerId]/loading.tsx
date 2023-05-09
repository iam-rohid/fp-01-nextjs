import React from "react";
import Header from "./Header";
import CircularProgress from "@/components/CircularProgress";

export default function Loading() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <Header title="Loading..." />
      <div className="mx-auto my-16 w-fit">
        <CircularProgress />
      </div>
    </div>
  );
}
