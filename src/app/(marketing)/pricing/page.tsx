import PricingPlansGroup from "@/components/PricingPlansGroup";
import { APP_NAME } from "@/utils/constant";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${APP_NAME} Pricing | Choose the plan that fits your needs.`,
};

export default function PricingPage() {
  return (
    <main className="mx-auto my-16 max-w-screen-2xl space-y-16 px-6">
      <section id="plans">
        <h1 className="my-16 text-center text-5xl font-medium text-slate-800">
          Choose the plan that fits your needs.
        </h1>
        <PricingPlansGroup />
      </section>
    </main>
  );
}
