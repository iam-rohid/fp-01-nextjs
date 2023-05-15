import { SubscriptionPlan } from "@/types/subscription-plan";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

export default function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  return (
    <Card
      className={clsx(
        "relative w-full min-w-[320px] flex-1 rounded-2xl md:max-w-[360px]",
        plan.isPopular ? "shadow-2xl" : ""
      )}
    >
      {plan.isPopular && (
        <div className="absolute right-8 top-0 flex h-10 items-center justify-center whitespace-nowrap rounded-b-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader className="px-8 pb-0 pt-8">
        <CardTitle>{plan.name}</CardTitle>
        {!!plan?.subtitle && <CardDescription>{plan.subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="p-8">
        <div>
          <p>
            <span className="text-3xl font-semibold text-card-foreground">
              $
              {plan.type === "yearly"
                ? Math.round(plan.price / 12)
                : plan?.price}
            </span>
            <span className="text-muted-foreground">/month</span>
          </p>
          <p className={clsx("mt-2 text-sm text-muted-foreground")}>
            {plan.type === "yearly" ? "Billed Annually" : "Billed Monthly"}
          </p>
        </div>
        <Button asChild className="mt-6 w-full">
          <Link href="/signup">Get started with {plan.name}</Link>
        </Button>
        {plan.entitlement === "business" && (
          <Button asChild variant="link" className="mt-2 w-full text-center">
            <Link href="/connect/enterprise">or contact sales</Link>
          </Button>
        )}
      </CardContent>
      <CardFooter className="px-8 pb-8">
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
