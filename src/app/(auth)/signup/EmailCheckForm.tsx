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

export default function EmailCheckForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (fields) => {
    console.log(fields);
    const { data, error } = await supabase
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
    <form onSubmit={onSubmit}>
      <TextField
        className="mb-4 w-full"
        label="Email *"
        placeholder="john@example.com"
        {...register("email")}
        error={errors.email?.message}
        autoFocus
      />

      <ErrorBox error={errors.root?.message} />

      <Button className="my-8" fullWidth loading={isSubmitting}>
        Continue
      </Button>
    </form>
  );
}
