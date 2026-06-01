"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import DeferredTracking from "./DeferredTracking";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const isStudioRoute = pathname === "/studio" || pathname.startsWith("/studio/");
  const isWebinarLandingRoute = pathname === "/neet-mbbs-abroad-webinar";

  if (isStudioRoute) {
    return <>{children}</>;
  }

  if (isWebinarLandingRoute) {
    return (
      <>
        <DeferredTracking />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <DeferredTracking />
      <main id="main-content" className="pt-[108px] lg:pt-[108px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
