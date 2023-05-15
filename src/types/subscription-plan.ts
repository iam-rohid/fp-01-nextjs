export type SubscriptionPlan = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  type: "monthly" | "yearly";
  features: string[];
  contactSales?: boolean;
  featuresTitle?: string;
  isPopular?: boolean;
};
