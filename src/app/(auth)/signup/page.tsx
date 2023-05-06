import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up",
};

export default function SignUp() {
  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-4">
      <div>
        <h3 className="mb-2 text-3xl font-semibold text-slate-800">
          Get started
        </h3>
        <p className="text-slate-600">Create a new account</p>
      </div>

      <SignUpForm />

      <p>
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}
