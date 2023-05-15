import { APP_NAME } from "@/utils/constant";
import { Metadata } from "next";
import Subscriptions from "./Subscriptions";

export const metadata: Metadata = {
  title: `${APP_NAME} Pricing | Choose the plan that fits your needs.`,
};

export default function PricingPage() {
  return (
    <main className="container relative pb-10">
      <section>
        <div className="py-10">
          <h1 className="mx-auto max-w-[750px] text-center text-4xl font-bold leading-tight tracking-tighter lg:text-5xl">
            Choose the plan that fits your needs.
          </h1>
        </div>
        <Subscriptions />
      </section>
    </main>
  );
}
