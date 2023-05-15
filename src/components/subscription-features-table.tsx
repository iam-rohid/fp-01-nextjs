"use client";

import { CheckIcon, InfoIcon } from "lucide-react";
import React, { Fragment } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { SubscriptionPlan } from "@/types/subscription-plan";
import clsx from "clsx";
import { Button } from "./ui/button";
import { AvailablitiyRow } from "@/types/availablitiy-row";
import { useAuth } from "@/app/AuthProvider";
import Link from "next/link";

export default function SubscriptionFeaturesTable({
  plans,
  groups,
  currentPlanId,
  fromPricingPage,
}: {
  plans: SubscriptionPlan[];
  currentPlanId?: string;
  fromPricingPage?: boolean;
  groups: {
    title: string;
    rows: AvailablitiyRow[];
  }[];
}) {
  const { user } = useAuth();
  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[repeat(4,minmax(200px,1fr));] p-6">
        <HeaderRow />
        <div />
        {plans.map((plan, i) => (
          <div
            key={i}
            className={clsx("flex flex-col gap-4 px-6", {
              "bg-muted": plan.isPopular,
            })}
          >
            <p className="text-xl font-semibold leading-none text-accent-foreground">
              {plan.name}
            </p>

            {fromPricingPage ? (
              <Button className="w-full" asChild>
                <Link href={user ? "/home" : "/signup"}>
                  {user ? "Open App" : "Sign Up"}
                </Link>
              </Button>
            ) : (
              <>
                <div>
                  <p>
                    <span className="text-2xl font-semibold leading-none text-accent-foreground">
                      $
                      {plan.type === "yearly"
                        ? Math.round(plan.price / 12)
                        : plan?.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </p>

                  <p className={clsx("mt-2 text-sm text-muted-foreground")}>
                    {plan.type === "yearly"
                      ? "Billed Annually"
                      : "Billed Monthly"}
                  </p>
                </div>
                <Button
                  disabled={plan.id === currentPlanId}
                  variant={plan.id === currentPlanId ? "outline" : "default"}
                  className="w-full"
                >
                  {plan.id === currentPlanId ? "Current Plan" : "Upgrade"}
                </Button>
              </>
            )}
          </div>
        ))}
        {groups.map((group, i) => (
          <Fragment key={i}>
            <GapRow />
            <TitleRow title={group.title} />
            {group.rows.map((data, i) => (
              <AvailablitiyRow data={data} key={i} />
            ))}
          </Fragment>
        ))}
        <FooterRow />
      </div>
    </div>
  );
}

const GapRow = () => (
  <Fragment>
    <div />
    <div />
    <div className="h-10 bg-muted" />
    <div />
  </Fragment>
);
const HeaderRow = () => (
  <Fragment>
    <div />
    <div />
    <div className="h-10 rounded-t-xl bg-muted" />
    <div />
  </Fragment>
);
const FooterRow = () => (
  <Fragment>
    <div />
    <div />
    <div className="h-10 rounded-b-xl bg-muted" />
    <div />
  </Fragment>
);

const TitleRow = ({ title }: { title: string }) => (
  <Fragment>
    <div className="py-2">
      <p className="font-medium">{title}</p>
    </div>
    <div />
    <div className="bg-muted"></div>
    <div />
  </Fragment>
);

const AvailablitiyRow = ({ data }: { data: AvailablitiyRow }) => (
  <Fragment>
    <div className="flex h-10 items-center border-b">
      <p className="flex-1 truncate text-sm text-muted-foreground">
        {data.title}
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent className="w-64">
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </TooltipContent>
      </Tooltip>
    </div>
    <div className="px-6">
      <div className="flex h-10 items-center border-b">
        {typeof data.availablitiy.basic === "boolean" ? (
          data.availablitiy.basic ? (
            <CheckIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <></>
          )
        ) : (
          <p className="text-sm text-muted-foreground">
            {data.availablitiy.basic}
          </p>
        )}
      </div>
    </div>
    <div className="bg-muted px-6">
      <div className="flex h-10 items-center border-b">
        {typeof data.availablitiy.essentials === "boolean" ? (
          data.availablitiy.essentials ? (
            <CheckIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <></>
          )
        ) : (
          <p className="text-sm text-muted-foreground">
            {data.availablitiy.essentials}
          </p>
        )}
      </div>
    </div>
    <div className="px-6">
      <div className="flex h-10 items-center border-b">
        {typeof data.availablitiy.business === "boolean" ? (
          data.availablitiy.business ? (
            <CheckIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <></>
          )
        ) : (
          <p className="text-sm text-muted-foreground">
            {data.availablitiy.business}
          </p>
        )}
      </div>
    </div>
  </Fragment>
);
