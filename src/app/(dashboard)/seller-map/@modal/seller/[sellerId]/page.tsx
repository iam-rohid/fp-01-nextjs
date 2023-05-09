import serverSupabase from "@/libs/serverSupabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { MdOpenInNew } from "react-icons/md";
import Header from "./Header";
import clsx from "clsx";
import { format } from "date-fns";

const fetchSeller = async (sellerId: string) => {
  return serverSupabase()
    .from("sellers")
    .select("*")
    .eq("id", sellerId)
    .single();
};

export async function generateMetadata({
  params: { sellerId },
}: {
  params: {
    sellerId: string;
  };
}) {
  const { data, error } = await fetchSeller(sellerId);

  if (!data || error) {
    return {
      title: "Error",
    };
  }

  return {
    title: data?.name,
  };
}
export default async function Seller({
  params: { sellerId },
}: {
  params: {
    sellerId: string;
  };
}) {
  const { data: seller, error } = await fetchSeller(sellerId);

  if (error) {
    throw error;
  }

  if (!seller) {
    notFound();
  }

  return (
    <aside className="absolute bottom-0 right-0 top-0 z-10 flex w-[512px] max-w-[100vw] flex-col overflow-hidden overflow-y-auto border-l border-slate-200 bg-white">
      <Header title={seller.name || "Unknown Seller"} />

      <div className="grid grid-cols-12 gap-4 p-4">
        <Card className="col-span-12">
          <div className="p-4">
            <h1 className="mb-2 text-2xl font-bold">{seller.name}</h1>
            <div className="inline-flex flex-wrap gap-4">
              <Link
                href={`/sellers/${sellerId}`}
                className="inline-flex items-center gap-1 text-primary-500 hover:underline"
              >
                View Detials
              </Link>
              <Link
                href={`https://amazon.com/sp?seller=${"A10111992WJRYRFBZH9IS"}`}
                className="inline-flex items-center gap-1 text-primary-500 hover:underline"
                target="_blank"
              >
                Visit storefront
                <span className="inline-block text-lg">
                  <MdOpenInNew />
                </span>
              </Link>
            </div>
          </div>
        </Card>
        <Card className="col-span-12">
          <div className="grid gap-4 p-4">
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
          </div>
        </Card>
      </div>
    </aside>
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
