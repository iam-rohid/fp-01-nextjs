import { PropsWithChildren } from "react";
import Header from "./Header";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
