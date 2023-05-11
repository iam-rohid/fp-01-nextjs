"use client";

import React, { useState } from "react";
import PlanCard from "./PlanCard";
import clsx from "clsx";
import { SubscriptionPlan } from "@/types/subscription-plan";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
    <Tabs value={isMonthly ? "monthly" : "yearly"}>
      <TabsList className="mx-auto mb-12 grid w-full max-w-xs grid-cols-2">
        <TabsTrigger onClick={() => setIsMonthly(true)} value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger onClick={() => setIsMonthly(false)} value="yearly">
          Yearly
        </TabsTrigger>
      </TabsList>

      <div className="flex gap-6 max-lg:flex-col max-lg:items-center">
        {plans.map((plan, i) => (
          <PlanCard key={i} plan={plan} isYearly={!isMonthly} href="/signin" />
        ))}
      </div>
    </Tabs>
  );
}
