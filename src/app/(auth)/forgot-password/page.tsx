import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-6">
      <div className="felx flex-col space-y-2 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">
          Reset your password
        </h3>
        <p className="text-sm text-muted-foreground">
          Type in your email and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <ForgotPasswordForm />

      <p className="text-sm text-muted-foreground">
        Go back to{" "}
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign In Page
        </Link>
      </p>
    </div>
  );
}
