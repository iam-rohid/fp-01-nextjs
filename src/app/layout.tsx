"use client";

import { PropsWithChildren } from "react";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
