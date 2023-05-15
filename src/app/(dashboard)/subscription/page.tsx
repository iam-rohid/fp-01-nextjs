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
import Subscriptions from "./Subscriptions";

export const metadata = {
  title: `Subscription - ${APP_NAME}`,
};

export default function Subscription() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title="Subscription" />
      <div className="container space-y-6 py-6">
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
          <CardContent className="p-0">
            <Subscriptions />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
