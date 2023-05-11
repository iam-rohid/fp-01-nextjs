import PricingPlansGroup from "@/components/PricingPlansGroup";
import AppBar from "../AppBar";
import { APP_NAME } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: `Subscription - ${APP_NAME}`,
};

export default function Subscription() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title="Subscription" />
      <div className="container space-y-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your current plan on monthly billing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Basic ($19)</p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <PricingPlansGroup />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
