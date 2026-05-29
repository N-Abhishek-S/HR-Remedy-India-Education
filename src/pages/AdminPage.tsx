import { Link, Outlet } from "react-router-dom";
import { BookOpen, FileText, Gauge, MessageSquare, Search, ShieldCheck, Star, Users } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { routes } from "@/lib/routes";

const links = [
  { label: "Dashboard", to: routes.admin.dashboard, icon: Gauge },
  { label: "Leads", to: routes.admin.leads, icon: MessageSquare },
  { label: "Courses", to: routes.admin.courses, icon: BookOpen },
  { label: "Blog", to: routes.admin.blogs, icon: FileText },
  { label: "Faculty", to: routes.admin.faculty, icon: Users },
  { label: "Testimonials", to: routes.admin.testimonials, icon: Star },
  { label: "SEO", to: routes.admin.seo, icon: Search },
  { label: "Audit", to: routes.admin.audit, icon: ShieldCheck },
];

export default function AdminPage() {
  return (
    <main className="min-h-svh bg-[#F8FAFC] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-6">
        <Logo />
        <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#64748B]">Admin workspace</p>
        <nav className="mt-8 grid gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.to} to={link.to} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-[#64748B] hover:bg-[#EEF4FF] hover:text-[#007BFF]">
                <Icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section>
        <header className="border-b border-slate-200 bg-white px-6 py-5">
          <p className="text-sm font-bold text-[#64748B]">Operations, content, leads, and audit readiness</p>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
