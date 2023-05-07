import { APP_NAME } from "@/utils/constant";
import React from "react";
import VerifyEmailForm from "./VerifyEmailForm";

export default function VerifyEmail({
  searchParams: { email },
}: {
  searchParams: { email?: string };
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-6">
      <div>
        <h3 className="mb-2 text-3xl font-semibold text-slate-800">
          Verify your email
        </h3>
        <p className="text-slate-600">
          You&apos;ve successfully signed up. Please check your email to confirm
          your account before signing in to the {APP_NAME} dashboard
        </p>
      </div>

      <VerifyEmailForm email={email} />
    </div>
  );
}
