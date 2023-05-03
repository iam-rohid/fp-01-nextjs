import { APP_NAME } from "@/utils/constant";
import FormWrapper from "../FormWrapper";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <div className="px-4">
      <FormWrapper className="mx-auto my-16 max-w-xl">
        <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
          Sign Up to {APP_NAME}
        </h3>

        <SignUpForm />

        <p>
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary-500">
            Sign In
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}
