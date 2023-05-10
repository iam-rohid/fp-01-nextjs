import { Button } from "@/components/ui/button";
import serverSupabase from "@/libs/serverSupabase";
import { APP_NAME } from "@/utils/constant";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: APP_NAME,
};

export default async function HomePage() {
  const {
    data: { user },
  } = await serverSupabase().auth.getUser();

  if (user) {
    redirect("/home");
  }

  return (
    <main className="container relative pb-10">
      <section>
        <div className="grid gap-4 pt-16">
          <h1 className="max-w-[750px] text-3xl font-bold leading-tight tracking-tighter md:block md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
            perspiciatis reprehenderit architecto vero velit laborum aperiam
            officia cum ea distinctio.
          </p>
          <div className="pb-16 pt-8">
            <Button asChild size="lg">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
