import Link from "next/link";
import SignUpForm from "./SignUpForm";
import EmailCheckForm from "./EmailCheckForm";
import { MdArrowBackIosNew } from "react-icons/md";

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
      <div>
        {email && (
          <Link
            href="/signup"
            className="mb-2 inline-flex items-center font-medium text-primary-500 hover:underline"
          >
            <MdArrowBackIosNew className="-ml-1 mr-1 text-lg" />
            Back
          </Link>
        )}
        <h3 className="mb-2 text-3xl font-semibold text-slate-800">
          {email ? "What is your name?" : "Get started"}
        </h3>
        <p className="text-slate-600">Create a new account</p>
      </div>

      {email ? <SignUpForm email={email} /> : <EmailCheckForm />}

      <p>
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-primary-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}
