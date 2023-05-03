"use client";

import clsx from "clsx";
import { useState } from "react";
import AppBar from "../AppBar";
import PlanCard from "./PlanCard";

const BASIC_FEATURES = [
  "2 users",
  "Brand Research",
  "Product Research",
  "Sales Estimator",
  "5k UPC Scans Monthly",
];
const PLUS_FEATURES = [
  "Unlock all Brand Features",
  "Categorical Research",
  "Keyword Rank Maker",
  "50k UPC Scans Monthly",
];
const PRO_FEATURES = [
  "Customer Buying Patters/Vertical Traffic",
  "Shared Keywords By Brands & Products",
  "Custom Reporting w/ Excel/CSV Exports",
  "Unlimited Custom Markets",
  "100k UPC Scans Monthly",
];
const ENTERPRISE_FEATURES = [
  "2 years of Historical Data on Brands & Products",
  "Digital Shelf Optimization",
  "Brand & Product Ad Tracking & Strategy",
  "Prouct Market Understanding by Keyword",
];

export default function Subscription() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title={"Subscription"} />
      <div className="mx-auto my-16 max-w-screen-2xl px-4">
        <p className="mb-8 text-center text-4xl font-semibold text-slate-900">
          Choose the plan that fits your needs.
        </p>
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-14 w-full max-w-[320px] rounded-full border border-slate-200 bg-white p-1">
            <div
              className={clsx(
                "absolute bottom-0 top-0 w-1/2 p-1 transition-[left]",
                isMonthly ? "left-0" : "left-1/2"
              )}
            >
              <div className="h-full w-full rounded-full bg-primary-500"></div>
            </div>
            <div className="absolute inset-0 flex">
              <button
                className={clsx(
                  "flex h-full flex-1 items-center justify-center font-medium transition-colors",
                  isMonthly
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                )}
                onClick={() => setIsMonthly(true)}
              >
                Monthly
              </button>
              <button
                className={clsx(
                  "flex h-full flex-1 items-center justify-center font-medium transition-colors",
                  !isMonthly
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                )}
                onClick={() => setIsMonthly(false)}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <PlanCard
            title="Basic"
            features={BASIC_FEATURES}
            price="19.99"
            isMonthly={isMonthly}
            isCurrentPlan
            buttonLabel="Upgrade to Basic"
          />
          <PlanCard
            title="Essentials"
            features={PLUS_FEATURES}
            price="99.99"
            isMonthly={isMonthly}
            featuresListTitle="Everything in Basic, plus"
            buttonLabel="Upgrade to Essentials"
          />
          <PlanCard
            featuresListTitle="Everything in Essentials, plus"
            title="Business"
            features={PRO_FEATURES}
            price="189.99"
            isPopular
            isMonthly={isMonthly}
            buttonLabel="Upgrade to Business"
          />
          <PlanCard
            title="Enterprise"
            featuresListTitle="Everything in Business, plus"
            features={ENTERPRISE_FEATURES}
            price="249.99"
            isMonthly={isMonthly}
            contactSales
            buttonLabel="Contact Sales"
          />
        </div>
      </div>
    </div>
  );
}
