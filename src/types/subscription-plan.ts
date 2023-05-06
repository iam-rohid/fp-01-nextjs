export type SubscriptionPlan = {
  name: string;
  subtitle?: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  contactSales?: boolean;
  featuresTitle?: string;
  isPopular?: boolean;
};
