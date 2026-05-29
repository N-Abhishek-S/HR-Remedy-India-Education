import { lazy, Suspense, type ReactNode } from "react";
import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "@/components/common/PageLoader";
import { AnalyticsProvider } from "@/context/AnalyticsProvider";
import { MarketingLayout } from "@/layouts/MarketingLayout";
import { routes } from "@/lib/routes";
import { AdminProtectedRoute, ProtectedRoute } from "@/routes/guards";

const HomePage = lazy(() => import("@/pages/HomePage"));
const CoursesPage = lazy(() => import("@/pages/CoursesPage"));
const CourseDetailsPage = lazy(() => import("@/pages/CourseDetailsPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PlacementsPage = lazy(() => import("@/pages/PlacementsPage"));
const SuccessStoriesPage = lazy(() => import("@/pages/SuccessStoriesPage"));
const MentorsPage = lazy(() => import("@/pages/MentorsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("@/pages/BlogDetailsPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const AdminResourcePage = lazy(() => import("@/pages/AdminResourcePage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

function MarketingRoute({ children }: Readonly<{ children: ReactNode }>) {
  return <MarketingLayout>{children}</MarketingLayout>;
}

function RootRoute() {
  return (
    <AnalyticsProvider>
      <Outlet />
    </AnalyticsProvider>
  );
}

export const router = createHashRouter([
  {
    element: <RootRoute />,
    children: [
      { path: routes.home, element: withSuspense(<MarketingRoute><HomePage /></MarketingRoute>) },
      { path: routes.courses, element: withSuspense(<MarketingRoute><CoursesPage /></MarketingRoute>) },
      { path: "/courses/:slug", element: withSuspense(<MarketingRoute><CourseDetailsPage /></MarketingRoute>) },
      { path: routes.about, element: withSuspense(<MarketingRoute><AboutPage /></MarketingRoute>) },
      { path: routes.placements, element: withSuspense(<MarketingRoute><PlacementsPage /></MarketingRoute>) },
      { path: routes.successStories, element: withSuspense(<MarketingRoute><SuccessStoriesPage /></MarketingRoute>) },
      { path: routes.mentors, element: withSuspense(<MarketingRoute><MentorsPage /></MarketingRoute>) },
      { path: routes.contact, element: withSuspense(<MarketingRoute><ContactPage /></MarketingRoute>) },
      { path: routes.resources, element: withSuspense(<MarketingRoute><BlogPage /></MarketingRoute>) },
      { path: routes.blog, element: withSuspense(<MarketingRoute><BlogPage /></MarketingRoute>) },
      { path: "/resources/:slug", element: withSuspense(<MarketingRoute><BlogDetailsPage /></MarketingRoute>) },
      { path: "/blog/:slug", element: withSuspense(<MarketingRoute><BlogDetailsPage /></MarketingRoute>) },
      { path: routes.login, element: withSuspense(<AuthPage mode="login" />) },
      { path: routes.signup, element: withSuspense(<AuthPage mode="signup" />) },
      {
        path: routes.dashboard,
        element: withSuspense(
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>,
        ),
      },
      { path: routes.admin.login, element: withSuspense(<AdminLoginPage />) },
      {
        path: "/admin",
        element: withSuspense(
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>,
        ),
        children: [
          { index: true, element: withSuspense(<AdminResourcePage title="Dashboard" />) },
          { path: "leads", element: withSuspense(<AdminResourcePage title="Leads" />) },
          { path: "courses", element: withSuspense(<AdminResourcePage title="Courses" />) },
          { path: "blogs", element: withSuspense(<AdminResourcePage title="Blog" />) },
          { path: "faculty", element: withSuspense(<AdminResourcePage title="Faculty" />) },
          { path: "testimonials", element: withSuspense(<AdminResourcePage title="Testimonials" />) },
          { path: "events", element: withSuspense(<AdminResourcePage title="Events" />) },
          { path: "seo", element: withSuspense(<AdminResourcePage title="SEO" />) },
          { path: "audit", element: withSuspense(<AdminResourcePage title="Audit" />) },
        ],
      },
      { path: "/placement-assistance", element: <Navigate to={routes.placements} replace /> },
      { path: "/faculty", element: <Navigate to={routes.mentors} replace /> },
      { path: "/testimonials", element: <Navigate to={routes.successStories} replace /> },
      { path: "/career-programs", element: <Navigate to={routes.courses} replace /> },
      { path: routes.faq, element: withSuspense(<MarketingRoute><HomePage /></MarketingRoute>) },
      { path: routes.privacyPolicy, element: withSuspense(<MarketingRoute><LegalPage title="Privacy Policy" /></MarketingRoute>) },
      { path: routes.terms, element: withSuspense(<MarketingRoute><LegalPage title="Terms and Conditions" /></MarketingRoute>) },
      { path: routes.refundPolicy, element: withSuspense(<MarketingRoute><LegalPage title="Refund Policy" /></MarketingRoute>) },
      { path: "*", element: withSuspense(<MarketingRoute><NotFoundPage /></MarketingRoute>) },
    ],
  },
]);
