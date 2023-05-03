"use client";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import FormWrapper from "../FormWrapper";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="px-4">
      <FormWrapper className="mx-auto my-16 max-w-md">
        <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
          Forgot Password
        </h3>
        <form>
          <TextField
            className="mb-4 w-full"
            placeholder="Your email address"
            id="email"
            type="email"
            label="Email *"
            required
          />

          <Button fullWidth className="my-8">
            Send Email
          </Button>
        </form>

        <p>
          Go back to{" "}
          <Link href="/signin" className="font-medium text-primary-500">
            Sign In Page
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}
