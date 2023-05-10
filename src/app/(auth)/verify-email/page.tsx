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
      <div className="felx flex-col space-y-2 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">
          Verify your email
        </h3>
        <p className="text-sm text-muted-foreground">
          You&apos;ve successfully signed up. Please check your email to confirm
          your account before signing in to the {APP_NAME} dashboard
        </p>
      </div>

      <VerifyEmailForm email={email} />
    </div>
  );
}
