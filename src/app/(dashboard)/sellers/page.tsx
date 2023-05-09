import { APP_NAME } from "@/utils/constant";
import SellersTabs from "./SellersTabs";

export const metadata = {
  title: `Sellers - ${APP_NAME}`,
};

export default async function Sellers({
  searchParams: { tabId, tabLabel },
}: {
  searchParams: { tabId?: string; tabLabel?: string };
}) {
  return <SellersTabs tabId={tabId} tabLabel={tabLabel} />;
}
