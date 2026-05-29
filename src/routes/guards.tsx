import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { PageLoader } from "@/components/common/PageLoader";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/lib/routes";

export function ProtectedRoute({ children }: Readonly<{ children: ReactNode }>) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <PageLoader />;
  }

  if (!auth.configured) {
    return <>{children}</>;
  }

  if (!auth.user) {
    return <Navigate to={routes.login} replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export function AdminProtectedRoute({ children }: Readonly<{ children: ReactNode }>) {
  const auth = useAuth();

  if (auth.loading) {
    return <PageLoader />;
  }

  if (!auth.configured) {
    return <>{children}</>;
  }

  if (!auth.user) {
    return <Navigate to={routes.admin.login} replace />;
  }

  if (!auth.isAdmin) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return <>{children}</>;
}
