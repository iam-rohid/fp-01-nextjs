"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabaseClient from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

      <div className="grid w-full grid-cols-2 items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="justify-self-end">
          <p className="text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot password?
            </Link>
          </p>
        </div>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          autoComplete="password"
          {...register("password")}
          className="col-span-2"
        />
        {!!errors.password?.message && (
          <p className="text-sm text-destructive">{errors.password?.message}</p>
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
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
}
