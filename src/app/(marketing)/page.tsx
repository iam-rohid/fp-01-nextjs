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
    redirect("/home");
  }

  return (
    <main>
      <section>
        <div className="mx-auto flex h-full max-w-screen-xl flex-col items-center px-6 py-24 text-center">
          <h1 className="max-w-5xl text-7xl font-bold text-slate-900">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </h1>
          <p className="mt-8 max-w-3xl text-2xl text-slate-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
            perspiciatis reprehenderit architecto vero velit laborum aperiam
            officia cum ea distinctio.
          </p>
          <Link
            href="/signup"
            className="mt-14 flex h-16 w-fit items-center rounded-full bg-primary-500 px-12 text-xl text-white transition-shadow hover:shadow-xl hover:shadow-primary-700/20"
          >
            Get Started
            <MdArrowForward className="-m-1 ml-2 text-2xl" />
          </Link>
        </div>
      </section>
    </main>
  );
}
