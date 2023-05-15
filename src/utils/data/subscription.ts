import { SubscriptionPlan } from "@/types/subscription-plan";

export const BASIC_FEATURES = [
  "2 users",
  "Brand Research",
  "Product Research",
  "Sales Estimator",
  "5k UPC Scans Monthly",
];

export const PLUS_FEATURES = [
  "Unlock all Brand Features",
  "Categorical Research",
  "Keyword Rank Maker",
  "50k UPC Scans Monthly",
];

export const PRO_FEATURES = [
  "Customer Buying Patters/Vertical Traffic",
  "Shared Keywords By Brands & Products",
  "Custom Reporting w/ Excel/CSV Exports",
  "Unlimited Custom Markets",
  "100k UPC Scans Monthly",
];

export const ENTERPRISE_FEATURES = [
  "2 years of Historical Data on Brands & Products",
  "Digital Shelf Optimization",
  "Brand & Product Ad Tracking & Strategy",
  "Prouct Market Understanding by Keyword",
];

export const MONTHLY_PLANS: SubscriptionPlan[] = [
  {
    id: "basic_monthly",
    name: "Basic",
    subtitle: "Recommended for New Sellers",
    features: BASIC_FEATURES,
    price: 29,
    type: "monthly",
  },
  {
    id: "essentials_monthly",
    name: "Essentials",
    subtitle: "Recommended for Resellers and Private Label",
    features: PLUS_FEATURES,
    price: 97,
    type: "monthly",
    featuresTitle: "Everything in Basic plus",
  },
  {
    id: "business_monthly",
    name: "Business",
    subtitle: "Recommended for Brands",
    features: PRO_FEATURES,
    price: 187,
    type: "monthly",
    isPopular: true,
    featuresTitle: "Everything in Essentials plus",
  },
  {
    id: "enterprise_monthly",
    name: "Enterprise",
    subtitle: "Recommended for Growing Brands, Experts & Agencies",
    features: ENTERPRISE_FEATURES,
    price: 0,
    type: "monthly",
    featuresTitle: "Everything in Business plus",
    contactSales: true,
  },
];
export const YEALRLY_PLANS: SubscriptionPlan[] = [
  {
    id: "basic_yearly",
    name: "Basic",
    subtitle: "Recommended for New Sellers",
    features: BASIC_FEATURES,
    price: 300,
    type: "yearly",
  },
  {
    id: "essentials_yearly",
    name: "Essentials",
    subtitle: "Recommended for Resellers and Private Label",
    features: PLUS_FEATURES,
    price: 900,
    type: "yearly",
    featuresTitle: "Everything in Basic plus",
  },
  {
    id: "business_yearly",
    name: "Business",
    subtitle: "Recommended for Brands",
    features: PRO_FEATURES,
    price: 1_896,
    type: "yearly",
    isPopular: true,
    featuresTitle: "Everything in Essentials plus",
  },
  {
    id: "enterprise_yearly",
    name: "Enterprise",
    subtitle: "Recommended for Growing Brands, Experts & Agencies",
    features: ENTERPRISE_FEATURES,
    price: 0,
    type: "yearly",
    featuresTitle: "Everything in Business plus",
    contactSales: true,
  },
];
