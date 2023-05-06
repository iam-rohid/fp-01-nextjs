import SignInSignUpButtonGroup from "@/components/SignInSignUpButtonGroup";
import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import { MdExpandMore, MdMenu } from "react-icons/md";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white ring-1 ring-slate-200">
      <div className="mx-auto max-w-screen-2xl px-6">
        <div className="flex h-20 items-center gap-8">
          <Link href="/" className="text-2xl font-semibold text-slate-900">
            {APP_NAME}
          </Link>

          <nav className="flex items-center justify-center gap-4 max-lg:hidden">
            <button className="flex items-center text-slate-600 hover:text-slate-900">
              Features
              <MdExpandMore className="text-xl" />
            </button>
            <button className="flex items-center text-slate-600 hover:text-slate-900">
              Resources
              <MdExpandMore className="text-xl" />
            </button>
            <Link
              className="text-slate-600 hover:text-slate-900"
              href="/seller-map"
            >
              Seller Map
            </Link>
            <Link
              className="text-slate-600 hover:text-slate-900"
              href="/pricing"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4">
            <SignInSignUpButtonGroup />

            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500/10 text-2xl text-primary-500 hover:bg-primary-500/20 lg:hidden">
              <MdMenu />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
