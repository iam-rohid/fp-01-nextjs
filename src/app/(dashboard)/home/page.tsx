import { APP_NAME } from "@/utils/constant";
import AppBar from "../AppBar";

export const metadata = {
  title: `Home - ${APP_NAME}`,
};

export default function Home() {
  return (
    <>
      <AppBar title="Home" />
    </>
  );
}
