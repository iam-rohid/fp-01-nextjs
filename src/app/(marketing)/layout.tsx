import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
