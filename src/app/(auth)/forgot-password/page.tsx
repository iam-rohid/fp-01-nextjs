import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-6">
      <div>
        <h3 className="mb-2 text-3xl font-semibold text-slate-800">
          Reset Your Password
        </h3>
        <p className="text-slate-600">
          Type in your email and we&apos;ll send you a link to reset your
          password
        </p>
      </div>

      <ForgotPasswordForm />

      <p>
        Go back to{" "}
        <Link href="/signin" className="font-medium text-primary-500">
          Sign In Page
        </Link>
      </p>
    </div>
  );
}
