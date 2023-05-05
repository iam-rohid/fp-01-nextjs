import Button from "@/components/Button";
import clsx from "clsx";
import React from "react";
import { MdCheck } from "react-icons/md";

export default function PlanCard({
  price,
  isPopular,
  title,
  subtitle,
  onClick,
  isCurrentPlan,
  features,
  featuresListTitle,
  buttonLabel,
  contactSales,
}: {
  price: string;
  isMonthly?: boolean;
  isPopular?: boolean;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  isCurrentPlan?: boolean;
  features: string[];
  featuresListTitle?: string;
  buttonLabel?: string;
  contactSales?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl border p-6",
        isPopular
          ? "border-primary-500 bg-primary-500 text-white"
          : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1 overflow-hidden">
          <h3
            className={clsx(
              "truncate text-2xl font-semibold",
              isPopular ? "text-white" : "text-slate-600"
            )}
          >
            {title}
          </h3>
          {!!subtitle && <p className="text-slate-600">{subtitle}</p>}
        </div>
        {isPopular && (
          <div className="whitespace-nowrap rounded-lg border border-white px-3.5 py-2 text-sm font-medium uppercase">
            Most Popular
          </div>
        )}
      </div>
      <p
        className={clsx(
          "my-8 text-4xl font-semibold",
          isPopular ? "text-white" : "text-slate-900"
        )}
      >
        {contactSales ? (
          "Let's Talk"
        ) : (
          <>
            ${price}
            <span
              className={clsx(
                "text-2xl font-medium",
                isPopular ? "text-white/50" : "text-slate-900/50"
              )}
            >
              /mo
            </span>
          </>
        )}
      </p>
      <Button
        fullWidth
        className={clsx(isPopular ? "bg-white hover:bg-white" : "")}
        disabled={isCurrentPlan}
        variant={isPopular || isCurrentPlan ? "secondary" : "primary"}
        onClick={onClick}
      >
        {isCurrentPlan ? "Current Plan" : buttonLabel || "Upgrade Now"}
      </Button>
      <div className="my-8">
        {!!featuresListTitle && (
          <p
            className={clsx(
              "mb-4 font-medium",
              isPopular ? "text-white" : "text-slate-900"
            )}
          >
            {featuresListTitle}
          </p>
        )}
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex">
              <span className="mr-4 text-2xl">
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
