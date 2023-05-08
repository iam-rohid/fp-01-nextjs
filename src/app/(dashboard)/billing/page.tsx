import { APP_NAME } from "@/utils/constant";
import AppBar from "../AppBar";

export const metadata = {
  title: `Billing - ${APP_NAME}`,
};

export default function Billing() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title="Billing" />
    </div>
  );
}
