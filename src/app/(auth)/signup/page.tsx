import Link from "next/link";
import SignUpForm from "./SignUpForm";
import EmailCheckForm from "./EmailCheckForm";

export const metadata = {
  title: "Sign Up",
};

export default function SignUp({
  searchParams: { email },
}: {
  searchParams: { email?: string };
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-6">
      <div className="felx flex-col space-y-2 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">
          {email ? "What is your name?" : "Get started"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {email
            ? "Enter the details below to complete your account"
            : "Enter your email below to create your account"}
        </p>
      </div>

      {email ? <SignUpForm email={email} /> : <EmailCheckForm />}

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
