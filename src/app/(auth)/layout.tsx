import React, { Fragment, PropsWithChildren } from "react";
import Header from "./Header";
import { redirect } from "next/navigation";
import serverSupabase from "@/libs/serverSupabase";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { data } = await serverSupabase().auth.getUser();

  if (!!data.user) {
    redirect("/home");
  }

  return (
    <Fragment>
      <Header />
      <main className="my-16">{children}</main>
    </Fragment>
  );
}
