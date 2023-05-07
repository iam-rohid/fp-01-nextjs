import PricingPlansGroup from "@/components/PricingPlansGroup";
import AppBar from "../AppBar";
import Button from "@/components/Button";

export const metadata = {
  title: "Subscription",
};

export default function Subscription() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title={"Subscription"} />
      <div className="mx-auto max-w-screen-xl space-y-8 p-6">
        <div className="rounded-xl bg-white p-6 ring-1 ring-slate-200">
          <p className="text-2xl font-semibold">
            Your current plan on monthly billing
          </p>
          <p className="mt-2 text-lg font-medium">Basic ($19)</p>
          <Button className="mt-4">Cancel Subscription</Button>
        </div>
        <PricingPlansGroup />
      </div>
    </div>
  );
}
