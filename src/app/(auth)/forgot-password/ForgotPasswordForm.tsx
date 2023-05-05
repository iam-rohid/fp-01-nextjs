"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "@/libs/supabase";
import { MdCheck } from "react-icons/md";
import { APP_NAME } from "@/utils/constant";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log("Forgot Password Form Value", values);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      values.email
    );

    if (error) {
      console.error("Failed to send reset password email", error);
    }
    console.log("Reset password email send success", data);
  });

  if (isSubmitSuccessful) {
    return (
      <div className="flex gap-4 bg-emerald-50 p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
          <MdCheck className="text-2xl text-white" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-emerald-500">
            Check your email to confirm
          </h3>
          <p className="text-emerald-500">
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in to the {APP_NAME} dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        className="mb-4 w-full"
        placeholder="Your email address"
        label="Email *"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button fullWidth className="my-8">
        Send Email
      </Button>
    </form>
  );
}
