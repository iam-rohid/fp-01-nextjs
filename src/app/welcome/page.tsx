"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { useEffect } from "react";

export default function Welcome() {
  const { isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/signin");
    }
  }, [isLoading, router, user]);

  return <p>Verifying...</p>;
}
