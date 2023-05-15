import { SubscriptionPlan } from "@/types/subscription-plan";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckIcon } from "lucide-react";

export default function PlanCard({
  plan,
  isYearly,
  isCurrentPlan,
  href,
}: {
  plan: SubscriptionPlan;
  isYearly?: boolean;
  isCurrentPlan?: boolean;
  href: string;
}) {
  return (
    <Card
      className={clsx("relative flex-1", plan.isPopular ? "shadow-2xl" : "")}
    >
      {plan.isPopular && (
        <div className="absolute right-4 top-0 flex h-10 items-center justify-center whitespace-nowrap rounded-b-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        {!!plan?.subtitle && <CardDescription>{plan.subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div>
          {plan.contactSales ? (
            <p className="text-2xl font-semibold text-card-foreground">
              Let&apos;s Talk
            </p>
          ) : (
            <>
              <p>
                <span className="text-2xl font-semibold text-card-foreground">
                  $
                  {plan.type === "yearly"
                    ? Math.round(plan.price / 12)
                    : plan?.price}
                </span>
                <span className="text-card-foreground/40">/mo</span>
              </p>
              <p className={clsx("mt-2 text-card-foreground/80")}>
                {isYearly ? "Billed Annually" : "Billed Monthly"}
              </p>
            </>
          )}
        </div>
        <Button asChild className="mt-6 w-full">
          <Link href={plan.contactSales ? "/connect/enterprise" : href}>
            {isCurrentPlan
              ? "Current Plan"
              : plan.contactSales
              ? "Contact Sales"
              : `Upgrade to ${plan.name}`}
          </Link>
        </Button>
      </CardContent>
      <CardFooter>
        <div>
          {!!plan.featuresTitle && (
            <p className={clsx("mb-4 font-medium text-card-foreground/80")}>
              {plan.featuresTitle}
            </p>
          )}
          <ul className="space-y-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex text-card-foreground/60">
                <CheckIcon className="mr-2 mt-1 h-5 w-5" />
                <span className="flex-1 leading-6">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
