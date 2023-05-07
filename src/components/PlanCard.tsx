import { SubscriptionPlan } from "@/types/subscription-plan";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { MdCheck } from "react-icons/md";

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
    <div
      className={clsx(
        "relative mt-8 flex w-full min-w-[280px] max-w-[400px] flex-1 flex-col rounded-2xl bg-white p-8 ring-1",
        plan.isPopular ? "shadow-2xl ring-slate-400" : "ring-slate-200"
      )}
    >
      {plan.isPopular && (
        <div className="absolute -top-6 left-1/2 flex h-12 -translate-x-1/2 items-center rounded-full bg-slate-800 px-6 font-medium text-white shadow-xl">
          <p>Most Popular</p>
        </div>
      )}
      <div>
        <h3 className={clsx("truncate text-3xl font-semibold text-slate-900")}>
          {plan.name}
        </h3>
        {!!plan?.subtitle && (
          <p className={clsx("mt-2 text-lg text-slate-600")}>{plan.subtitle}</p>
        )}
      </div>
      <div className={clsx("my-8 text-slate-900")}>
        {plan.contactSales ? (
          <p className="text-3xl font-semibold">Let&apos;s Talk</p>
        ) : (
          <>
            <p className="text-4xl font-semibold">
              $
              {isYearly
                ? Math.round(plan.price.yearly / 12)
                : plan?.price.monthly}
              <span className={clsx("text-xl font-medium text-slate-900/50")}>
                /mo
              </span>
            </p>
            <p className={clsx("mt-2 text-lg font-medium text-slate-600")}>
              {isYearly ? "Billed Annually" : "Billed Monthly"}
            </p>
          </>
        )}
      </div>
      <Link
        className={clsx(
          "flex h-14 items-center justify-center rounded-full px-8 text-center font-medium transition-shadow",
          isCurrentPlan
            ? "pointer-events-none bg-slate-100 text-slate-300"
            : "bg-primary-500 text-white hover:shadow-xl hover:shadow-primary-500/20"
        )}
        href={plan.contactSales ? "/connect/enterprise" : href}
      >
        {isCurrentPlan
          ? "Current Plan"
          : plan.contactSales
          ? "Contact Sales"
          : `Upgrade to ${plan.name}`}
      </Link>
      <div className="my-8">
        {!!plan.featuresTitle && (
          <p className={clsx("mb-6 font-medium text-slate-900")}>
            {plan.featuresTitle}
          </p>
        )}
        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className={clsx("flex text-slate-600")}>
              <span className="mr-2 text-2xl">
                <MdCheck />
              </span>
              <span className="flex-1 leading-6">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
