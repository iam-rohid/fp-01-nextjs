"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabaseClient from "@/libs/supabaseClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
    },
  });
  const { toast } = useToast();

  const onSubmit = handleSubmit(async ({ email }) => {
    const { error } = await supabaseClient.auth.signInWithOtp({
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
    toast({
      title: "Verification email sent",
      description: "Please check your email to verify email.",
    });
  });

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
          disabled
        />
        {!!errors.email?.message && (
          <p className="text-sm text-destructive">{errors.email?.message}</p>
        )}
      </div>

      {!!errors.root?.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        Resend email
      </Button>
    </form>
  );
}
