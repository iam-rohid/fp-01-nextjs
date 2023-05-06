import CircularProgress from "@/components/CircularProgress";
import { Database } from "@/types/database";
import { APP_NAME } from "@/utils/constant";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdArrowForward } from "react-icons/md";

export const metadata: Metadata = {
  title: APP_NAME,
};

export default async function HomePage() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <section className="bg-gradient-to-b from-primary-500/5 to-white">
        <div className="mx-auto flex h-full max-w-screen-2xl items-center px-6 py-24">
          <div className="flex-1">
            <h1 className="text-7xl font-bold text-slate-900">
              Find product opportunities no one else can on Amazon
            </h1>
            <p className="mt-8 text-xl text-slate-600">
              Our software collects millions of data points no other tool can
              provide you, helping you make decisions that increase revenue,
              improve ad efficiency, and find new opportunities.
            </p>
            <Link
              href="/signup"
              className="mt-16 flex w-fit items-center rounded-full bg-primary-500 px-16 py-6 text-xl text-white transition-shadow hover:shadow-xl hover:shadow-primary-700/20"
            >
              Get Started
              <MdArrowForward className="-m-1 ml-2 text-2xl" />
            </Link>
          </div>
          <div className="flex-1"></div>
        </div>
      </section>
    </main>
  );
}
