import Link from "next/link";
import FormWrapper from "../FormWrapper";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <div className="px-4">
      <FormWrapper className="mx-auto my-16 max-w-md">
        <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
          Sign in to your account
        </h3>

        <SignInForm />

        <p>
          Don&aps;t have an account?{" "}
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
      </FormWrapper>
    </div>
  );
}
