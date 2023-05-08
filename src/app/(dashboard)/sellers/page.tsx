import { APP_NAME } from "@/utils/constant";
import AppBar from "../AppBar";

export const metadata = {
  title: `Sellers - ${APP_NAME}`,
};

export default function Sellers() {
  return (
    <>
      <AppBar title="Sellers" />
    </>
  );
}
