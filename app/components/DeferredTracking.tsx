"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_TRACKING_ID = "G-YR4Q895Z3R";
const FACEBOOK_PIXEL_ID = "1187114626535068";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => number;
    };
    _fbq?: Window["fbq"];
    __gaReady?: boolean;
    __lastGaPagePath?: string;
  }
}

export default function DeferredTracking() {
  const pathname = usePathname();

  useEffect(() => {
    function loadGoogleAnalytics() {
      if (window.__gaReady) return;
      window.__gaReady = true;

      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`
      );

      if (!existingScript) {
        const gaScript = document.createElement("script");
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
        gaScript.async = true;
        document.head.appendChild(gaScript);
      }

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_TRACKING_ID, { send_page_view: false });
    }

    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (!window.gtag) return;

    const pagePath = pathname || window.location.pathname;

    if (window.__lastGaPagePath === pagePath) return;
    window.__lastGaPagePath = pagePath;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    function loadFacebookPixel() {
      if (loaded) return;
      loaded = true;

      if (!window.fbq) {
        const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
          if (fbq.callMethod) {
            fbq.callMethod(...args);
            return;
          }

          fbq.queue = fbq.queue || [];
          fbq.queue.push(args);
        };

        fbq.queue = [];
        fbq.loaded = true;
        fbq.version = "2.0";
        window.fbq = fbq;
        window._fbq = fbq;

        const pixelScript = document.createElement("script");
        pixelScript.async = true;
        pixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(pixelScript);

        window.fbq("init", FACEBOOK_PIXEL_ID);
        window.fbq("track", "PageView");
      }

      window.removeEventListener("pointerdown", loadFacebookPixel);
      window.removeEventListener("keydown", loadFacebookPixel);
      window.removeEventListener("scroll", loadFacebookPixel);
    }

    timeoutId = setTimeout(loadFacebookPixel, 4000);

    if (window.requestIdleCallback) {
      idleId = window.requestIdleCallback(loadFacebookPixel, { timeout: 4000 });
    }

    window.addEventListener("pointerdown", loadFacebookPixel, { once: true });
    window.addEventListener("keydown", loadFacebookPixel, { once: true });
    window.addEventListener("scroll", loadFacebookPixel, { once: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener("pointerdown", loadFacebookPixel);
      window.removeEventListener("keydown", loadFacebookPixel);
      window.removeEventListener("scroll", loadFacebookPixel);
    };
  }, []);

  return null;
}
