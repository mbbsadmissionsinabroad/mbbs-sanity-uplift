"use client";

import { useEffect } from "react";

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
  }
}

export default function DeferredTracking() {
  useEffect(() => {
    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    function loadTracking() {
      if (loaded) return;
      loaded = true;

      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_TRACKING_ID);

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

      window.removeEventListener("pointerdown", loadTracking);
      window.removeEventListener("keydown", loadTracking);
      window.removeEventListener("scroll", loadTracking);
    }

    timeoutId = setTimeout(loadTracking, 4000);

    if (window.requestIdleCallback) {
      idleId = window.requestIdleCallback(loadTracking, { timeout: 4000 });
    }

    window.addEventListener("pointerdown", loadTracking, { once: true });
    window.addEventListener("keydown", loadTracking, { once: true });
    window.addEventListener("scroll", loadTracking, { once: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId && window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener("pointerdown", loadTracking);
      window.removeEventListener("keydown", loadTracking);
      window.removeEventListener("scroll", loadTracking);
    };
  }, []);

  return null;
}
