import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { trackPageView } from "@/services/analytics";

export function AnalyticsProvider({ children }: Readonly<{ children: ReactNode }>) {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`, document.title);
  }, [location.pathname, location.search]);

  return children;
}
