import { APP_NAME } from "@/utils/constant";
import { Metadata } from "next";
import Subscriptions from "./Subscriptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircleIcon } from "lucide-react";
import SubscriptionFeaturesTable from "@/components/subscription-features-table";
import { AVAILABLITIY_GROUPS, MONTHLY_PLANS } from "@/utils/data/subscription";

export const metadata: Metadata = {
  title: `${APP_NAME} Pricing | Choose the plan that fits your needs.`,
};

export default function PricingPage() {
  return (
    <main className="container relative pb-10">
      <section>
        <div className="py-16">
          <h1 className="mx-auto max-w-[750px] text-center text-4xl font-bold leading-tight tracking-tighter lg:text-5xl">
            Choose the plan that fits your needs.
          </h1>
        </div>
        <Subscriptions />
      </section>

      <Card className="mx-auto my-16 max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>{APP_NAME} Enterprise</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6 max-md:flex-col">
          <p className="flex-1 text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            soluta id debitis? Ut laborum, nobis nemo architecto cumque quis
            illum?
          </p>
          <Button asChild>
            <Link href="/connect/enterprise">
              <MessageCircleIcon className="-ml-1 mr-2 h-5 w-5" />
              Contact Sales
            </Link>
          </Button>
        </CardContent>
      </Card>

      <SubscriptionFeaturesTable
        plans={MONTHLY_PLANS}
        groups={AVAILABLITIY_GROUPS}
        fromPricingPage
      />
    </main>
  );
}
