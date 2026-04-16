"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import GoogleAnalytics from "./GoogleAnalytics";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isStudioRoute = pathname === "/studio" || pathname.startsWith("/studio/");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <GoogleAnalytics GA_TRACKING_ID="G-YR4Q895Z3R" />
      <main id="main-content" className="pt-[108px] lg:pt-[108px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
