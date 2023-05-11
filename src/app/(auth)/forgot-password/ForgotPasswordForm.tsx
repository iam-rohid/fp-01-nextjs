"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabaseClient from "@/libs/supabaseClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    formState: { errors, isSubmitSuccessful, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log("Forgot Password Form Value", values);
    const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${window.origin}/welcome`,
      }
    );

    if (error) {
      console.error("Failed to send reset password email", error);
    }
    console.log("Reset password email send success", data);
  });

  if (isSubmitSuccessful) {
    return (
      <Alert variant="default">
        <CheckCircleIcon className="h-4 w-4" />
        <AlertTitle>Check your email to confirm</AlertTitle>
        <AlertDescription>
          An email has been sent with instructions to reset your password
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} className="my-16 grid gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="name@example.com"
          autoComplete="email"
          {...register("email")}
          autoFocus
        />
        {!!errors.email?.message && (
          <p className="text-sm text-destructive">{errors.email?.message}</p>
        )}
      </div>

      {!!errors.root?.message && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        Send email
      </Button>
    </form>
  );
}
