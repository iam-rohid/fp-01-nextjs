"use client";
import { PropsWithChildren } from "react";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";
import AuthProvider from "./AuthProvider";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="min-h-screen">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
