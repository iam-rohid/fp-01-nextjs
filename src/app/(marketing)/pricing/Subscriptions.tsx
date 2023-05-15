"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MONTHLY_PLANS, YEALRLY_PLANS } from "@/utils/data/subscription";
import PlanCard from "./PlanCard";

export default function Subscriptions() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <Tabs value={isMonthly ? "monthly" : "yearly"}>
      <TabsList className="mx-auto mb-16 grid w-full max-w-xs grid-cols-2">
        <TabsTrigger onClick={() => setIsMonthly(true)} value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger onClick={() => setIsMonthly(false)} value="yearly">
          Yearly
        </TabsTrigger>
      </TabsList>

      <div className="flex flex-wrap justify-center gap-6">
        {(isMonthly ? MONTHLY_PLANS : YEALRLY_PLANS).map((plan, i) => (
          <PlanCard key={i} plan={plan} />
        ))}
      </div>
    </Tabs>
  );
}
