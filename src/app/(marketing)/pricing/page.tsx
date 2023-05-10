import PricingPlansGroup from "@/components/PricingPlansGroup";
import { APP_NAME } from "@/utils/constant";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${APP_NAME} Pricing | Choose the plan that fits your needs.`,
};

export default function PricingPage() {
  return (
    <main className="container relative pb-10">
      <section>
        <div className="py-10">
          <h1 className="mx-auto max-w-[750px] text-center text-3xl font-bold leading-tight tracking-tighter md:block md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Choose the plan that fits your needs.
          </h1>
        </div>
        <PricingPlansGroup />
      </section>
    </main>
  );
}
