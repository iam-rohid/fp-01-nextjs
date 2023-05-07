"use client";

import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import supabase from "@/libs/supabase";
import ErrorBox from "@/components/ErrorBox";
import { MdCheck } from "react-icons/md";
import { APP_NAME } from "@/utils/constant";
import { useRouter } from "next/navigation";

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

  const onSubmit = handleSubmit(async (fields) => {
    console.log(fields);
    const { data, error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        data: {
          first_name: fields.first_name,
          last_name: fields.last_name,
        },
      },
    });
    if (error) {
      console.log("Sign Up Failed", error);
      setError("root", {
        message: error.message,
      });
      return;
    }

    router.replace(`/verify-email?email=${fields.email}`);
  });

  // if (isSubmitSuccessful) {
  //   return (
  //     <div className="flex gap-4 bg-emerald-50 p-4">
  //       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
  //         <MdCheck className="text-2xl text-white" />
  //       </div>
  //       <div className="flex-1">
  //         <h3 className="mb-2 text-lg font-semibold text-emerald-500">
  //           Check your email to confirm
  //         </h3>
  //         <p className="text-emerald-500">
  //           You&apos;ve successfully signed up. Please check your email to
  //           confirm your account before signing in to the {APP_NAME} dashboard
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
        <TextField
          className="col-span-1"
          label="First Name *"
          placeholder="John"
          {...register("first_name")}
          error={errors.first_name?.message}
          autoFocus
        />
        <TextField
          className="col-span-1"
          label="Last Name *"
          placeholder="Doe"
          {...register("last_name")}
          error={errors.last_name?.message}
        />
        <TextField
          className="col-span-2"
          label="Email *"
          placeholder="john@example.com"
          {...register("email")}
          autoComplete="username"
          error={errors.email?.message}
          disabled
        />
        <TextField
          className="col-span-2"
          label="Password *"
          placeholder="8-16 characters"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        <div className="col-span-2">
          <ErrorBox error={errors.root?.message} />
        </div>

        <Button className="col-span-2" fullWidth loading={isSubmitting}>
          Create Account
        </Button>
      </form>
    </div>
  );
}
