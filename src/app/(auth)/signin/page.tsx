"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "@/libs/supabase";
import ErrorBox from "@/components/ErrorBox";
import FormWrapper from "../FormWrapper";
import Link from "next/link";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit(async (fields) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    });

    if (error) {
      console.error("Sign In Error", error);
      setError("root", {
        message: error.message,
      });
      return;
    }

    console.log("Sign In Success", data);
  });

  return (
    <div className="px-4">
      <FormWrapper className="mx-auto my-16 max-w-md">
        <h3 className="mb-8 text-center text-2xl font-medium text-slate-600">
          Sign in to your account
        </h3>
        <form onSubmit={onSubmit}>
          <TextField
            className="mb-4 w-full"
            placeholder="Your email address"
            label="Email *"
            error={errors.email?.message}
            autoComplete="username"
            {...register("email")}
          />
          <TextField
            className="w-full"
            placeholder="Your password"
            label="Password *"
            type="password"
            error={errors.password?.message}
            autoComplete="new-password"
            {...register("password")}
          />

          <ErrorBox error={errors.root?.message} />

          <Button loading={isSubmitting} fullWidth className="my-8">
            Sign In
          </Button>
        </form>

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
