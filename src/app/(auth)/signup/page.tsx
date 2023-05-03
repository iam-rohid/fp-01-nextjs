"use client";

import { APP_NAME } from "@/utils/constant";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "@/libs/supabase";
import ErrorBox from "@/components/ErrorBox";
import FormWrapper from "../FormWrapper";
import Link from "next/link";

const schema = yup
  .object({
    firstName: yup.string().required("First name is a required field"),
    lastName: yup.string().required("Last name is a required field"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your new password")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (fields) => {
    console.log(fields);
    const { data, error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        data: {
          first_name: fields.firstName,
          last_name: fields.lastName,
        },
        emailRedirectTo: `${window.location.origin}/complete-signup`,
      },
    });
    if (error) {
      console.log("Sign Up Failed", error);
      setError("root", {
        message: error.message,
      });
      return;
    }

    console.log("Sign Up Success", data);
  });

  if (isSubmitSuccessful) {
    return (
      <div className="px-4">
        <FormWrapper className="mx-auto my-16 max-w-xl">
          <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
            Thank you for signing up!
          </h3>
          <p className="text-center">
            We&apos;ve sent a confirmation email to the address you provided.
            Please check your inbox and click the link inside to complete the
            registration process. If you don&apos;t see the email, please check
            your spam folder. If you still can&apos;t find it, please contact us
            for assistance.
          </p>
        </FormWrapper>
      </div>
    );
  }

  return (
    <div className="px-4">
      <FormWrapper className="mx-auto my-16 max-w-xl">
        <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
          Sign Up to {APP_NAME}
        </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4 flex w-full gap-4 max-sm:flex-col">
            <TextField
              className="flex-1"
              label="First Name *"
              placeholder="John"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <TextField
              className="flex-1"
              label="Last Name *"
              placeholder="Doe"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <TextField
            className="mb-4 w-full"
            label="Email *"
            placeholder="john@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextField
            className="mb-4 w-full"
            label="Password *"
            placeholder="8-16 characters"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
          />
          <TextField
            className="w-full"
            label="Confirm Password *"
            placeholder="re-enter the password"
            type="password"
            autoComplete="current-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <ErrorBox error={errors.root?.message} />

          <Button className="my-8" fullWidth loading={isSubmitting}>
            Register
          </Button>
        </form>

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
