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
      <div className="felx flex-col space-y-2 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">Welcome back</h3>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      <SignInForm email={email} />

      <div>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
