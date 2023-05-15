"use client";

import { Fragment, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MONTHLY_PLANS, YEALRLY_PLANS } from "@/utils/data/subscription";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { CheckIcon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AvailablitiyRow = {
  title: string;
  description: string;
  availablitiy: {
    basic: boolean | string;
    essentials: boolean | string;
    business: boolean | string;
    enterprise: boolean | string;
  };
};

const BRAND_AND_PRODUCT_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Products Database",
    description:
      "Officia voluptate cillum adipisicing officia eiusmod fugiat nisi. Et eu sint ut pariatur laborum labore non laborum consequat amet nisi aliqua quis deserunt.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Sellers Search",
    description:
      "Labore laborum nulla nisi tempor aute culpa laborum fugiat duis officia tempor mollit. Fugiat enim sint Lorem pariatur cillum duis aliquip Lorem adipisicing aliqua aute adipisicing consectetur occaecat.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Brands Search",
    description:
      "Excepteur sint adipisicing aliqua voluptate Lorem cillum ipsum fugiat laboris tempor nostrud laborum consectetur. Dolor commodo enim culpa Lorem labore duis do cillum consectetur eiusmod.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Seller/Brand Coverage",
    description:
      "Do occaecat labore aute reprehenderit ullamco magna voluptate duis adipisicing irure do do fugiat eu. Consectetur irure elit ipsum do.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
];
const MARKET_AND_COMPETITOR_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Subcategories Explorer",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Traffic Graph",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Scope",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: false,
      enterprise: true,
    },
  },
];
const KEYWORD_RESEARCH: AvailablitiyRow[] = [
  {
    title: "Rank Maker",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: false,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Keyword Detective",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Relevancy Quadrant",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: false,
      enterprise: true,
    },
  },
  {
    title: "Ad Spy",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: false,
      enterprise: true,
    },
  },
];
const TOOLS_AND_DATA_EXPORTS: AvailablitiyRow[] = [
  {
    title: "UPC Scanner",
    description:
      "Do veniam officia ut nulla nisi minim voluptate amet eu fugiat. Enim exercitation minim et amet est.",
    availablitiy: {
      basic: (5000).toLocaleString(),
      essentials: (50000).toLocaleString(),
      business: (100000).toLocaleString(),
      enterprise: (200000).toLocaleString(),
    },
  },
  {
    title: "Sales Estimator",
    description:
      "Labore duis enim cillum enim excepteur esse do esse eu anim magna sit et. Irure officia Lorem consectetur irure in velit ea nisi.",
    availablitiy: {
      basic: true,
      essentials: true,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Excel Exports",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: true,
      enterprise: true,
    },
  },
  {
    title: "Seller Export",
    description:
      "Labore exercitation consequat do in deserunt occaecat sint Lorem cillum adipisicing. Laborum velit fugiat do ex in.",
    availablitiy: {
      basic: false,
      essentials: false,
      business: false,
      enterprise: true,
    },
  },
];

export default function Subscriptions() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [currentPlan, setCurrentPlan] = useState("basic_monthly");

  return (
    <Tabs value={isMonthly ? "monthly" : "yearly"}>
      <TabsList className="mx-auto my-6 grid w-full max-w-xs grid-cols-2">
        <TabsTrigger onClick={() => setIsMonthly(true)} value="monthly">
          Monthly
        </TabsTrigger>
        <TabsTrigger onClick={() => setIsMonthly(false)} value="yearly">
          Yearly
        </TabsTrigger>
      </TabsList>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[repeat(5,minmax(200px,1fr));] p-6">
          <HeaderRow />
          <div />
          {(isMonthly ? MONTHLY_PLANS : YEALRLY_PLANS).map((plan, i) => (
            <div
              key={i}
              className={clsx("flex flex-col gap-4 px-6", {
                "bg-muted": plan.isPopular,
              })}
            >
              <p className="text-xl font-semibold leading-none text-accent-foreground">
                {plan.name}
              </p>
              <div>
                {plan.contactSales ? (
                  <p>Let&apos;s Talk</p>
                ) : (
                  <p>
                    <span className="text-2xl font-semibold leading-none text-accent-foreground">
                      $
                      {plan.type === "yearly"
                        ? Math.round(plan.price / 12)
                        : plan?.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </p>
                )}
              </div>
              <Button
                disabled={plan.id === currentPlan}
                variant={plan.id === currentPlan ? "outline" : "default"}
                className="w-full"
              >
                {plan.contactSales
                  ? "Contact Sales"
                  : plan.id === currentPlan
                  ? "Current Plan"
                  : "Upgrade"}
              </Button>
            </div>
          ))}
          <GapRow />
          <TitleRow title="Brand and Product Research" />
          {BRAND_AND_PRODUCT_RESEARCH.map((data, i) => (
            <AvailablitiyRow data={data} key={i} />
          ))}
          <GapRow />
          <TitleRow title="Market and Competitor Research" />
          {MARKET_AND_COMPETITOR_RESEARCH.map((data, i) => (
            <AvailablitiyRow data={data} key={i} />
          ))}
          <GapRow />
          <TitleRow title="Keyword Research" />
          {KEYWORD_RESEARCH.map((data, i) => (
            <AvailablitiyRow data={data} key={i} />
          ))}
          <GapRow />
          <TitleRow title="Tools and Data Exports" />
          {TOOLS_AND_DATA_EXPORTS.map((data, i) => (
            <AvailablitiyRow data={data} key={i} />
          ))}
          <FooterRow />
        </div>
      </div>
    </Tabs>
  );
}

const GapRow = () => (
  <Fragment>
    <div />
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
    <div />
    <div className="h-6 rounded-t-xl bg-muted" />
    <div />
  </Fragment>
);
const FooterRow = () => (
  <Fragment>
    <div />
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
    <div className="px-6">
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
    <div className="bg-muted px-6">
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
    <div className="px-6">
      <div className="flex h-10 items-center border-b">
        {typeof data.availablitiy.enterprise === "boolean" ? (
          data.availablitiy.enterprise ? (
            <CheckIcon className="h-5 w-5 text-muted-foreground" />
          ) : (
            <></>
          )
        ) : (
          <p className="text-sm text-muted-foreground">
            {data.availablitiy.enterprise}
          </p>
        )}
      </div>
    </div>
  </Fragment>
);
