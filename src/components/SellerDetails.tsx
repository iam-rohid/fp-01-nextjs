"use client";

import supabaseClient from "@/libs/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "./CircularProgress";
import { ReactNode } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { MdOpenInNew } from "react-icons/md";
import Link from "next/link";

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

export default function SellerDetails({ sellerId }: { sellerId: string }) {
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
      <div className="flex h-full w-full items-center justify-center">
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

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-screen-xl p-4 md:p-8">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <Card className="col-span-12">
            <div className="p-4 md:p-8">
              <h1 className="mb-2 text-2xl font-bold">{seller.name}</h1>
              <Link
                href={`https://amazon.com/sp?seller=${"A10111992WJRYRFBZH9IS"}`}
                className="inline-flex items-center gap-1 text-primary-500 hover:underline"
                target="_blank"
              >
                Visit the <b className="font-medium">{seller.name}</b>{" "}
                storefront
                <span className="inline-block text-lg">
                  <MdOpenInNew />
                </span>
              </Link>
            </div>
          </Card>
          <Card className="col-span-12">
            <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-8 md:p-8 xl:grid-cols-3">
              <DetailsItem title="Seller Id" value={"A10111992WJRYRFBZH9IS"} />
              <DetailsItem
                title="Last Updated"
                value={format(
                  new Date(
                    seller.updated_at || seller.created_at || new Date()
                  ),
                  "MMM dd, yyy"
                )}
              />
              <DetailsItem
                title="Monthly Revenue"
                value={`$${(seller.estimate_sales || 0).toLocaleString()}`}
              />
              <DetailsItem title="Percent FBA" value={`99.86%`} />
              <DetailsItem title="Full Brand Coverage" value={`17`} />
              <DetailsItem
                title="Business Name"
                value={`9248-9202 Quebec Inc.`}
              />
              <DetailsItem
                title="Address"
                value={`235 Rue Ness, Saint-Laurent, Quebec, CA H4T 1S1`}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const DetailsItem = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div>
      <p className="mb-1 text-slate-500">{title}</p>
      <p className="font-medium text-slate-900">{value}</p>
    </div>
  );
};

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx("rounded-lg border border-slate-200 bg-white", className)}
    >
      {children}
    </div>
  );
};
