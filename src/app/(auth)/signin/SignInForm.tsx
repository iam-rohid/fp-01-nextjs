"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorBox from "@/components/ErrorBox";
import supabaseClient from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";

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

export default function SignInForm({ email }: { email?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
    },
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign In Error", error);
      setError("root", {
        message: error.message,
      });
      if (error.message === "Email not confirmed") {
        router.push(`/verify-email?email=${email}`);
      }
      return;
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className="mb-4 w-full"
        placeholder="Your email address"
        label="Email *"
        error={errors.email?.message}
        autoComplete="email"
        {...register("email")}
        autoFocus
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
  );
}
