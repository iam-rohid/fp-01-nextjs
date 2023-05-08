import { APP_NAME } from "@/utils/constant";
import AppBar from "../AppBar";

export const metadata = {
  title: `Account - ${APP_NAME}`,
};

export default function Account() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title="Account" />
    </div>
  );
}
