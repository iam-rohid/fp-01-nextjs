export type SubscriptionPlan = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  type: "monthly" | "yearly";
  entitlement: "basic" | "essentials" | "business";
  features: string[];
  featuresTitle?: string;
  isPopular?: boolean;
};
