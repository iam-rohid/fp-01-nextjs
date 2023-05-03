import AppBar from "../AppBar";
import PlansGrid from "./PlansGrid";

export const metadata = {
  title: "Subscription",
};

export default function Subscription() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <AppBar title={"Subscription"} />
      <div className="mx-auto my-16 max-w-screen-2xl px-4">
        <PlansGrid />
      </div>
    </div>
  );
}
