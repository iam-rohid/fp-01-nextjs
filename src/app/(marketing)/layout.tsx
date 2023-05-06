import { Fragment, PropsWithChildren } from "react";
import Header from "./Header";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
