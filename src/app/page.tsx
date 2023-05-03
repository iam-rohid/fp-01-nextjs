import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <Link href="/signin">Sign In</Link>
      <Link href="/app/seller-map">Seller Map</Link>
    </div>
  );
}
