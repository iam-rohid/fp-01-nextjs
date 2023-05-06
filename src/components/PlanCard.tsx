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
        "flex w-full min-w-[280px] max-w-[400px] flex-1 flex-col overflow-hidden rounded-2xl border p-6",
        plan.isPopular
          ? "border-primary-500 bg-primary-500 text-white shadow-2xl shadow-primary-500/30"
          : "border-slate-200 bg-white"
      )}
    >
      <div>
        <h3
          className={clsx(
            "truncate text-4xl font-semibold",
            plan.isPopular ? "text-white" : "text-slate-900"
          )}
        >
          {plan.name}
        </h3>
        {!!plan?.subtitle && (
          <p
            className={clsx(
              "mt-2 text-lg",
              plan.isPopular ? "text-white/70" : "text-slate-600"
            )}
          >
            {plan.subtitle}
          </p>
        )}
      </div>
      <div
        className={clsx(
          "my-8",
          plan.isPopular ? "text-white" : "text-slate-900"
        )}
      >
        {plan.contactSales ? (
          <p className="text-3xl font-semibold">Let&apos;s Talk</p>
        ) : (
          <>
            <p className="text-4xl font-semibold">
              $
              {isYearly
                ? Math.round(plan.price.yearly / 12)
                : plan?.price.monthly}
              <span
                className={clsx(
                  "text-xl font-medium",
                  plan.isPopular ? "text-white/50" : "text-slate-900/50"
                )}
              >
                /mo
              </span>
            </p>
            <p
              className={clsx(
                "mt-2 text-lg font-medium",
                plan.isPopular ? "text-white/70" : "text-slate-600"
              )}
            >
              {isYearly ? "Billed Annually" : "Billed Monthly"}
            </p>
          </>
        )}
      </div>
      <Link
        className={clsx(
          "flex h-14 items-center justify-center rounded-full px-8 text-center font-medium",
          isCurrentPlan
            ? clsx(
                "pointer-events-none",
                plan.isPopular
                  ? "bg-white/20 text-white/40"
                  : "bg-slate-100 text-slate-300"
              )
            : plan.isPopular
            ? "bg-white text-primary-500 hover:shadow-xl"
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
          <p
            className={clsx(
              "mb-4 font-medium",
              plan.isPopular ? "text-white" : "text-slate-900"
            )}
          >
            {plan.featuresTitle}
          </p>
        )}
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className={clsx(
                "flex",
                plan.isPopular ? "text-white" : "text-slate-600"
              )}
            >
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
