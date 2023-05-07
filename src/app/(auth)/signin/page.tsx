import Link from "next/link";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In",
};

export default function SignIn({
  searchParams: { email },
}: {
  searchParams: { email?: string };
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-6">
      <div>
        <h3 className="mb-2 text-3xl font-semibold text-slate-800">
          Welcome back
        </h3>
        <p className="text-slate-600">Sign in to your account</p>
      </div>

      <SignInForm email={email} />

      <div>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary-500">
            Sign Up
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="mt-1 inline-block font-medium text-primary-500"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
