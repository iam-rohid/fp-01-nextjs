import { ReactNode } from "react";
import { format } from "date-fns";
import Link from "next/link";
import CircularProgress from "./CircularProgress";
import supabaseClient from "@/libs/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExternalLink } from "lucide-react";

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

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="container space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>{seller.name}</CardTitle>
            <CardDescription>
              <Link
                href={`https://amazon.com/sp?seller=${"A10111992WJRYRFBZH9IS"}`}
                className="underline underline-offset-4 hover:text-primary"
                target="_blank"
              >
                Visit the <strong>{seller.name}</strong> storefront
                <ExternalLink className="ml-2 inline h-4 w-4" />
              </Link>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <DetailsItem title="Seller Id" value={"A10111992WJRYRFBZH9IS"} />
            <DetailsItem
              title="Last Updated"
              value={format(
                new Date(seller.updated_at || seller.created_at || new Date()),
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

const DetailsItem = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};
