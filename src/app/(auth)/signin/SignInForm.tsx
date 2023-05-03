"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorBox from "@/components/ErrorBox";
import supabase from "@/libs/supabase";
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

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
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
    router.replace("/");
  });

  return (
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
  );
}
