"use client";

import React, { useState } from "react";
import PlanCard from "./PlanCard";
import clsx from "clsx";
import { SubscriptionPlan } from "@/types/subscription-plan";

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

const plans: SubscriptionPlan[] = [
  {
    name: "Starter",
    subtitle: "Recommended for New Sellers",
    features: BASIC_FEATURES,
    price: {
      monthly: 29,
      yearly: 300,
    },
  },
  // {
  //   name: "Essentials",
  //   subtitle: "Recommended for Resellers and Private Label",
  //   features: PLUS_FEATURES,
  //   price: {
  //     monthly: 97,
  //     yearly: 900,
  //   },
  //   featuresTitle: "Everything in Basic plus",
  // },
  {
    name: "Business",
    subtitle: "Recommended for Brands",
    features: PRO_FEATURES,
    price: {
      monthly: 187,
      yearly: 1_896,
    },
    isPopular: true,
    featuresTitle: "Everything in Essentials plus",
  },
  {
    name: "Enterprise",
    subtitle: "Recommended for Growing Brands, Experts & Agencies",
    features: ENTERPRISE_FEATURES,
    price: {
      monthly: 0,
      yearly: 0,
    },
    featuresTitle: "Everything in Business plus",
    contactSales: true,
  },
];

export default function PricingPlansGroup() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <div>
      <div className="mb-8 flex items-center justify-center">
        <div className="relative h-16 w-full max-w-[300px] rounded-full border border-slate-200 bg-slate-100 p-1">
          <div
            className={clsx(
              "absolute bottom-0 top-0 w-1/2 p-1 transition-[left]",
              isMonthly ? "left-0" : "left-1/2"
            )}
          >
            <div className="h-full w-full rounded-full bg-white ring-1 ring-slate-200"></div>
          </div>
          <div className="absolute inset-0 flex">
            <button
              className={clsx(
                "flex h-full flex-1 items-center justify-center font-medium transition-colors",
                isMonthly ? "text-slate-900" : "text-slate-600"
              )}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              className={clsx(
                "flex h-full flex-1 items-center justify-center font-medium transition-colors",
                !isMonthly ? "text-slate-900" : "text-slate-600"
              )}
              onClick={() => setIsMonthly(false)}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 max-lg:flex-col max-lg:items-center">
        {plans.map((plan, i) => (
          <PlanCard key={i} plan={plan} isYearly={!isMonthly} href="/signin" />
        ))}
      </div>
    </div>
  );
}
