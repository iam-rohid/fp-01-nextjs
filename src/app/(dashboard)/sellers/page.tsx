import { APP_NAME } from "@/utils/constant";
import AppBar from "../AppBar";
import serverSupabase from "@/libs/serverSupabase";
import SellerTable from "./SellerTable";

export const metadata = {
  title: `Sellers - ${APP_NAME}`,
};

export default async function Sellers() {
  const { data } = await serverSupabase()
    .from("sellers")
    .select("*")
    .throwOnError();

  return <SellerTable sellers={data || []} />;
}
