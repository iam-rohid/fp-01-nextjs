"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/libs/queryClient";
import "./globals.css";
import Head from "next/head";
import { APP_NAME } from "@/utils/constant";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <body suppressHydrationWarning={true} className="min-h-screen">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
