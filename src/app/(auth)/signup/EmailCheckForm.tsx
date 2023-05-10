"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabaseClient from "@/libs/supabaseClient";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
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

export default function EmailCheckForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (fields) => {
    console.log(fields);
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id")
      .eq("email", fields.email)
      .maybeSingle();

    if (data?.id) {
      console.log(data);
      router.push(`/signin?email=${fields.email}`);
    } else {
      router.push(`/signup?email=${fields.email}`);
    }
  });

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
          autoFocus
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
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Continue
      </Button>
    </form>
  );
}
