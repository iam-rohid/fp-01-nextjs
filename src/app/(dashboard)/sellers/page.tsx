import { APP_NAME } from "@/utils/constant";
import serverSupabase from "@/libs/serverSupabase";
import SellersTabs from "./SellersTabs";

export const metadata = {
  title: `Sellers - ${APP_NAME}`,
};

export default async function Sellers({
  searchParams: { tabId, tabLabel },
}: {
  searchParams: { tabId?: string; tabLabel?: string };
}) {
  // const { data } = await serverSupabase()
  //   .from("sellers")
  //   .select("*")
  //   .throwOnError();

  return <SellersTabs sellers={[]} tabId={tabId} tabLabel={tabLabel} />;
}
