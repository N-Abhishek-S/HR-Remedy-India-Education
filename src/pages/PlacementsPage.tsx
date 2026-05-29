import { ArrowRight, BriefcaseBusiness, Building2, LockKeyhole, TrendingUp, Users } from "lucide-react";

import { CTAButton } from "@/components/common/CTAButton";
import { CTABanner } from "@/components/site/CTABanner";
import {
  placementSteps,
  placementTrend,
  recruiterLogos,
  recruiters,
  roleDistribution,
  salaryPackages,
  successStories,
} from "@/data/platform";
import { usePageMeta } from "@/hooks/usePageMeta";
import { routes } from "@/lib/routes";

export default function PlacementsPage() {
  usePageMeta("Placements");

  return (
    <main className="page-shell">
      <section className="relative overflow-hidden bg-[#061B5C] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(25,217,255,0.24),transparent_26rem)]" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">Your Success is <span className="block text-[#19D9FF]">Our Commitment</span></h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/78">
              We don&apos;t just teach, we make you industry-ready. 1000+ careers transformed and counting.
            </p>
            <CTAButton to={routes.freeCounselling} className="mt-8 bg-[#19D9FF] text-[#061B5C] hover:bg-white">
              Book Free Counselling
            </CTAButton>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10,000+", label: "Students Placed in Top Companies", icon: Users },
              { value: "800+", label: "Hiring Partners Across India", icon: Building2 },
              { value: "95%", label: "Placement Rate For Our Students", icon: TrendingUp },
              { value: "8.5 LPA", label: "Average Package Offered", icon: LockKeyhole },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-[20px] border border-white/15 bg-white/8 p-6 text-center backdrop-blur">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#19D9FF]/15 text-[#19D9FF]">
                    <Icon className="size-7" />
                  </span>
                  <p className="mt-5 text-3xl font-black">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.label}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="-mt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1280px] rounded-[20px] border border-[#E5EAF5] bg-white p-7 shadow-[0_22px_80px_rgba(10,42,136,0.14)]">
          <p className="text-center text-sm font-black text-[#061B5C]">Top Hiring Partners</p>
          <div className="mt-6 grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-8">
            {recruiters.slice(0, 8).map((partner) => (
              <div key={partner} className="grid min-h-12 place-items-center">
                <img src={recruiterLogos[partner as keyof typeof recruiterLogos]} alt={partner} className="h-9 max-w-[8.5rem] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#1147FF]">Our Placement Process</p>
          <h2 className="mt-4 text-center text-3xl font-black text-[#061B5C]">From Learning to Earning</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            {placementSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="relative text-center">
                  <span className="mx-auto grid size-20 place-items-center rounded-full border border-[#E5EAF5] bg-[#F8FAFF]">
                    <span className="grid size-14 place-items-center rounded-full bg-[#1147FF] text-white">
                      <Icon className="size-6" />
                    </span>
                  </span>
                  {index < placementSteps.length - 1 ? <ArrowRight className="absolute left-[calc(50%+3.25rem)] top-8 hidden size-5 text-[#94A3B8] md:block" /> : null}
                  <p className="mt-4 text-lg font-black text-[#061B5C]">{index + 1}</p>
                  <h3 className="mt-2 font-black text-[#061B5C]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64748B]">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#1147FF]">Placement Statistics</p>
          <h2 className="mt-4 text-center text-3xl font-black text-[#061B5C]">Our Placement Track Record</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-[20px] border border-[#E5EAF5] bg-white p-7 shadow-[0_18px_55px_rgba(10,42,136,0.08)]">
              <h3 className="font-black text-[#061B5C]">Yearly Placement Trend</h3>
              <div className="mt-8 flex h-48 items-end gap-5">
                {placementTrend.map((item) => (
                  <div key={item.year} className="flex flex-1 flex-col items-center gap-3">
                    <span className="text-xs font-black text-[#061B5C]">{item.value}</span>
                    <div className="w-full rounded-t-md bg-gradient-to-t from-[#1147FF] to-[#19D9FF]" style={{ height: `${Math.max(18, item.value / 100)}%` }} />
                    <span className="text-xs font-semibold text-[#64748B]">{item.year}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-[20px] border border-[#E5EAF5] bg-white p-7 shadow-[0_18px_55px_rgba(10,42,136,0.08)]">
              <h3 className="font-black text-[#061B5C]">Roles Offered</h3>
              <div className="mt-8 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
                <div className="aspect-square rounded-full" style={{ background: `conic-gradient(${roleDistribution.map((item, index) => `${item.color} ${index === 0 ? 0 : roleDistribution.slice(0, index).reduce((sum, role) => sum + role.value, 0)}% ${roleDistribution.slice(0, index + 1).reduce((sum, role) => sum + role.value, 0)}%`).join(", ")})` }}>
                  <div className="m-auto mt-[25%] grid size-20 place-items-center rounded-full bg-white text-sm font-black text-[#061B5C]">Roles</div>
                </div>
                <div className="space-y-3">
                  {roleDistribution.map((item) => (
                    <p key={item.role} className="flex items-center gap-3 text-xs font-semibold text-[#64748B]">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <strong className="text-[#061B5C]">{item.value}%</strong>
                      {item.role}
                    </p>
                  ))}
                </div>
              </div>
            </article>
            <article className="rounded-[20px] border border-[#E5EAF5] bg-white p-7 shadow-[0_18px_55px_rgba(10,42,136,0.08)]">
              <h3 className="font-black text-[#061B5C]">Salary Packages</h3>
              <div className="mt-8 space-y-5">
                {salaryPackages.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm font-black text-[#061B5C]">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[#E5EAF5]">
                      <div className="h-full rounded-full bg-[#1147FF]" style={{ width: `${item.value * 2.6}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#1147FF]">Student Transformations</p>
            <h2 className="mt-4 text-center text-3xl font-black text-[#061B5C]">Our Students. Their Success Stories.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {successStories.slice(0, 2).map((story) => (
                <article key={story.name} className="grid gap-5 rounded-[20px] border border-[#E5EAF5] bg-white p-5 shadow-[0_18px_55px_rgba(10,42,136,0.08)] sm:grid-cols-[8rem_1fr]">
                  <img src={story.avatar} alt="" className="h-40 w-full rounded-[16px] object-cover sm:h-full" />
                  <div>
                    <h3 className="text-xl font-black text-[#061B5C]">{story.name}</h3>
                    <p className="text-sm font-semibold text-[#1147FF]">{story.role}</p>
                    <div className="mt-5 grid grid-cols-2 gap-4 text-xs font-semibold text-[#64748B]">
                      <span>Before<strong className="block text-[#061B5C]">{story.before}</strong></span>
                      <span>After<strong className="block text-[#061B5C]">{story.after}</strong></span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-black text-[#22C55E]">{story.package}</span>
                      <img src={story.companyLogo} alt={story.company} className="h-9 max-w-28 object-contain" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="brand-gradient h-max rounded-[20px] p-7 text-white shadow-[0_24px_75px_rgba(10,42,136,0.2)]">
            <BriefcaseBusiness className="size-9 text-[#19D9FF]" />
            <h2 className="mt-5 text-3xl font-black leading-tight">Ready to get placed in your dream company?</h2>
            <p className="mt-4 text-sm leading-7 text-white/74">Join thousands of successful students placed through HR Remedy India Education.</p>
            <CTAButton to={routes.freeCounselling} className="mt-7 bg-[#19D9FF] text-[#061B5C] hover:bg-white">
              Book Free Counselling
            </CTAButton>
          </div>
        </div>
      </section>

      <CTABanner title="Ready to get placed in your dream company?" description="Join thousands of learners who became industry-ready with guided placement support." />
    </main>
  );
}
