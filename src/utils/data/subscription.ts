import { AvailablitiyRow } from "@/types/availablitiy-row";
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
    features: BASIC_FEATURES,
    price: 29,
    type: "monthly",
    entitlement: "basic",
  },
  {
    id: "essentials_monthly",
    name: "Essentials",
    features: PLUS_FEATURES,
    price: 97,
    type: "monthly",
    isPopular: true,
    featuresTitle: "Everything in Basic, plus…",
    entitlement: "essentials",
  },
  {
    id: "business_monthly",
    name: "Business",
    features: PRO_FEATURES,
    price: 187,
    type: "monthly",
    featuresTitle: "Everything in Essentials, plus…",
    entitlement: "business",
  },
];
export const YEALRLY_PLANS: SubscriptionPlan[] = [
  {
    id: "basic_yearly",
    name: "Basic",
    features: BASIC_FEATURES,
    price: 300,
    type: "yearly",
    entitlement: "basic",
  },
  {
    id: "essentials_yearly",
    name: "Essentials",
    features: PLUS_FEATURES,
    price: 900,
    type: "yearly",
    isPopular: true,
    featuresTitle: "Everything in Basic, plus…",
    entitlement: "essentials",
  },
  {
    id: "business_yearly",
    name: "Business",
    features: PRO_FEATURES,
    price: 1_896,
    type: "yearly",
    featuresTitle: "Everything in Essentials, plus…",
    entitlement: "business",
  },
];

const BRAND_AND_PRODUCT_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Products Database",
    description:
      "Officia voluptate cillum adipisicing officia eiusmod fugiat nisi. Et eu sint ut pariatur laborum labore non laborum consequat amet nisi aliqua quis deserunt.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Sellers Search",
    description:
      "Labore laborum nulla nisi tempor aute culpa laborum fugiat duis officia tempor mollit. Fugiat enim sint Lorem pariatur cillum duis aliquip Lorem adipisicing aliqua aute adipisicing consectetur occaecat.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Brands Search",
    description:
      "Excepteur sint adipisicing aliqua voluptate Lorem cillum ipsum fugiat laboris tempor nostrud laborum consectetur. Dolor commodo enim culpa Lorem labore duis do cillum consectetur eiusmod.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Seller/Brand Coverage",
    description:
      "Do occaecat labore aute reprehenderit ullamco magna voluptate duis adipisicing irure do do fugiat eu. Consectetur irure elit ipsum do.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
    },
  },
];
const MARKET_AND_COMPETITOR_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Subcategories Explorer",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Traffic Graph",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
  {
    title: "Scope",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
];
const KEYWORD_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Rank Maker",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Keyword Detective",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
  {
    title: "Relevancy Quadrant",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
  {
    title: "Ad Spy",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
];
const TOOLS_AND_DATA_EXPORTS: AvailablitiyRow[] = [
  {
    title: "UPC Scanner",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: (5000).toLocaleString(),
      essentials: (50000).toLocaleString(),
      business: (100000).toLocaleString(),
    },
  },
  {
    title: "Sales Estimator",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
    },
  },
  {
    title: "Excel Exports",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
  {
    title: "Seller Export",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
    },
  },
];

export const AVAILABLITIY_GROUPS = [
  {
    title: "Brand and Product Research",
    rows: BRAND_AND_PRODUCT_RESEARCH,
  },
  {
    title: "Market and Competitor Research",
    rows: MARKET_AND_COMPETITOR_RESEARCH,
  },
  {
    title: "Keyword Research",
    rows: KEYWORD_RESEARCH,
  },
  {
    title: "Tools and Data Exports",
    rows: TOOLS_AND_DATA_EXPORTS,
  },
];
