"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabaseClient from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const schema = yup
  .object({
    first_name: yup.string().required("Name is a required field"),
    last_name: yup.string().required("Name is a required field"),
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

export default function SignUpForm({ email }: { email?: string }) {
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
  const router = useRouter();

  const onSubmit = handleSubmit(
    async ({ email, password, first_name, last_name }) => {
      const emailRedirectTo = `${window.origin}/welcome`;
      console.log({ emailRedirectTo });
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
          },
          emailRedirectTo,
        },
      });
      if (error) {
        console.log("Sign Up Failed", error);
        setError("root", {
          message: error.message,
        });
        return;
      }

      router.replace(`/verify-email?email=${email}`);
    }
  );

  return (
    <form onSubmit={onSubmit} className="my-16 grid gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Your email address"
          autoComplete="email"
          {...register("email")}
          disabled
        />
        {!!errors.email?.message && (
          <p className="text-sm text-destructive">{errors.email?.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="first_name">First name</Label>
          <Input
            type="text"
            id="first_name"
            placeholder="John"
            {...register("first_name")}
            autoFocus
          />
          {!!errors.first_name?.message && (
            <p className="text-sm text-destructive">
              {errors.first_name?.message}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="last_name">Last name</Label>
          <Input
            type="text"
            id="last_name"
            placeholder="Doe"
            {...register("last_name")}
          />
          {!!errors.last_name?.message && (
            <p className="text-sm text-destructive">
              {errors.last_name?.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="8-16 characters"
          autoComplete="password"
          {...register("password")}
        />
        {!!errors.password?.message && (
          <p className="text-sm text-destructive">{errors.password?.message}</p>
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
        Create Account
      </Button>
    </form>
  );
}
