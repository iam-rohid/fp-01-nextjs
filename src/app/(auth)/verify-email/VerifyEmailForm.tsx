"use client";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "@/libs/supabase";
import ErrorBox from "@/components/ErrorBox";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function VerifyEmailForm({ email }: { email?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
    },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.origin}/welcome`,
      },
    });

    if (error) {
      setError("root", {
        message: error.message,
      });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className="mb-4 w-full"
        label="Email *"
        placeholder="john@example.com"
        disabled
        {...register("email")}
        error={errors.email?.message}
      />

      <ErrorBox error={errors.root?.message} />

      <Button
        className="my-8"
        fullWidth
        loading={isSubmitting}
        disabled={isSubmitSuccessful}
      >
        {isSubmitSuccessful
          ? "Verification email sent"
          : "Resend verification email"}
      </Button>
    </form>
  );
}
