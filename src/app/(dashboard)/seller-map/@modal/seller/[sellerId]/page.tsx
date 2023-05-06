import { Database } from "@/types/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { MdOpenInNew } from "react-icons/md";

const fetchSeller = async (sellerId: string) => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  return supabase.from("sellers").select("*").eq("id", sellerId).single();
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
  const { data, error } = await fetchSeller(sellerId);

  if (error) {
    throw error;
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <header className="p-4">
        <h1 className="mb-1 text-2xl font-medium text-slate-900">
          {data.name}
        </h1>
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
      </header>

      <section className="p-4">
        <h3 className="mb-4 text-lg font-medium">Details</h3>
        <div className="space-y-4 rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-sm text-slate-600">Name</p>
            <p className="font-medium text-slate-700">{data.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Seller Id</p>
            <p className="font-medium text-slate-700">A10111992WJRYRFBZH9IS</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Address</p>
            <p className="font-medium text-slate-700">
              235 Rue Ness, Saint-Laurent, Quebec, CA H4T 1S1
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Monthly Revenue</p>
            <p className="font-medium text-slate-700">
              ${(data.estimate_sales || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Percent FBA</p>
            <p className="font-medium text-slate-700">99.86%</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Full Brand Coverage</p>
            <p className="font-medium text-slate-700">17</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const DetailsItem = ({ title, value }: { title: string; value: ReactNode }) => {
  return (
    <div className="grid grid-cols-3 px-4 py-2">
      <p className="text-slate-500">{title}</p>
      <p className="col-span-2 text-slate-900">{value}</p>
    </div>
  );
};
