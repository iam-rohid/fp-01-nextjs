"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AVAILABLITIY_GROUPS,
  MONTHLY_PLANS,
  YEALRLY_PLANS,
} from "@/utils/data/subscription";
import SubscriptionFeaturesTable from "@/components/subscription-features-table";

type AvailablitiyRow = {
  title: string;
  description: string;
  availablitiy: {
    basic: boolean | string;
    essentials: boolean | string;
    business: boolean | string;
  };
};

export default function Subscriptions() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [currentPlan, setCurrentPlan] = useState("basic_monthly");

  return (
    <Tabs value={isMonthly ? "monthly" : "yearly"}>
      <div className="p-6">
        <TabsList className="mx-auto grid w-full max-w-xs grid-cols-2">
          <TabsTrigger onClick={() => setIsMonthly(true)} value="monthly">
            Monthly
          </TabsTrigger>
          <TabsTrigger onClick={() => setIsMonthly(false)} value="yearly">
            Yearly
          </TabsTrigger>
        </TabsList>
      </div>
      <SubscriptionFeaturesTable
        plans={isMonthly ? MONTHLY_PLANS : YEALRLY_PLANS}
        currentPlanId={currentPlan}
        groups={AVAILABLITIY_GROUPS}
      />
    </Tabs>
  );
}
