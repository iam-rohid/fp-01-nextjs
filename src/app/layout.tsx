"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";
import AuthProvider from "./AuthProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="min-h-screen">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
