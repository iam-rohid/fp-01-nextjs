"use client";

import CircularProgress from "@/components/CircularProgress";
import SellerDetails from "@/components/SellerDetails";
import supabaseClient from "@/libs/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const fetchSeller = async (sellerId: string) => {
  const { data, error } = await supabaseClient
    .from("sellers")
    .select("*")
    .eq("id", sellerId)
    .single();
  if (error) {
    throw error;
  }

  if (!data) {
    throw "Seller not found!";
  }

  return data;
};

export default function SellerTab({ sellerId }: { sellerId: string }) {
  const {
    data: seller,
    isLoading,
    isError,
    error,
  } = useQuery(["seller", sellerId], ({ queryKey }) =>
    fetchSeller(queryKey[1])
  );

  if (isLoading) {
    return (
      <div className="mx-auto my-16 w-fit">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p>Something went wrong!</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return <SellerDetails seller={seller} />;
}
