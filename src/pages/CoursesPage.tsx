import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Search, SlidersHorizontal } from "lucide-react";

import { GsapReveal } from "@/animations/GsapReveal";
import { CourseCard } from "@/components/cards/CourseCard";
import { CTAButton } from "@/components/common/CTAButton";
import { careerTracks, courseAdvantages, courseCategories, courses, trustBadges } from "@/data/platform";
import { usePageMeta } from "@/hooks/usePageMeta";
import { routes } from "@/lib/routes";

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const durations = ["All Durations", "3 Months", "4 Months", "6 Months"];
const modes = ["Online", "Offline", "Hybrid"];

export default function CoursesPage() {
  usePageMeta("Courses");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        const categoryMatch = category === "All Categories" || course.category === category || course.track === category;
        const levelMatch = level === "All Levels" || course.level === level;
        const queryMatch = `${course.title} ${course.summary} ${course.skills.join(" ")} ${course.track}`
          .toLowerCase()
          .includes(query.toLowerCase());
        return categoryMatch && levelMatch && queryMatch;
      }),
    [category, level, query],
  );

  return (
    <main className="page-shell">
      <section className="relative bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(25,217,255,0.18),transparent_24rem)]" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <GsapReveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1147FF]">Our Courses</p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#061B5C] sm:text-6xl">
              Industry-Relevant Courses <span className="block text-[#1147FF]">For Your Dream Career</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#64748B]">
              Explore industry-aligned courses designed to help you gain in-demand skills and build a successful career.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["50+", "Career Courses"],
                ["10,000+", "Students Trained"],
                ["500+", "Hiring Partners"],
                ["95%", "Placement Rate"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-[#F1F5FF] text-[#1147FF]">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <span>
                    <span className="block text-lg font-black text-[#061B5C]">{value}</span>
                    <span className="text-xs font-semibold text-[#64748B]">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </GsapReveal>
          <GsapReveal className="relative">
            <img src="/assets/home/career-counselling-hero.png" alt="" className="mx-auto max-h-[360px] w-full object-contain" />
            {trustBadges.slice(0, 3).map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="absolute hidden rounded-[16px] border border-[#E5EAF5] bg-white p-4 shadow-[0_18px_55px_rgba(10,42,136,0.12)] sm:flex sm:items-center sm:gap-3"
                  style={{ left: index === 1 ? "12%" : index === 2 ? "66%" : "3%", top: index === 1 ? "60%" : index === 2 ? "10%" : "22%" }}
                >
                  <Icon className="size-5 text-[#1147FF]" />
                  <span className="max-w-28 text-xs font-black text-[#061B5C]">{badge.label}</span>
                </div>
              );
            })}
          </GsapReveal>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[280px_1fr_280px]">
          <aside className="h-max rounded-[20px] border border-[#E5EAF5] bg-white p-5 shadow-[0_16px_50px_rgba(10,42,136,0.08)]">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-black text-[#061B5C]">
                <SlidersHorizontal className="size-5 text-[#1147FF]" />
                Filter Courses
              </h2>
              <button type="button" onClick={() => { setCategory("All Categories"); setLevel("All Levels"); setQuery(""); }} className="text-xs font-black text-[#1147FF]">
                Clear All
              </button>
            </div>
            <label className="mt-5 flex h-12 items-center gap-3 rounded-[14px] border border-[#E5EAF5] bg-white px-3">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses..." className="w-full bg-transparent text-sm outline-none placeholder:text-[#94A3B8]" />
              <Search className="size-4 text-[#64748B]" />
            </label>
            <FilterGroup title="Categories" items={courseCategories} value={category} onChange={setCategory} />
            <FilterGroup title="Level" items={levels} value={level} onChange={setLevel} />
            <FilterGroup title="Duration" items={durations} value="All Durations" onChange={() => undefined} />
            <div className="mt-6 border-t border-[#E5EAF5] pt-5">
              <p className="text-sm font-black text-[#061B5C]">Mode</p>
              <div className="mt-3 grid gap-3">
                {modes.map((mode) => (
                  <label key={mode} className="flex items-center gap-3 text-sm font-semibold text-[#334155]">
                    <input type="checkbox" defaultChecked={mode !== "Offline"} className="size-4 rounded border-[#E5EAF5] accent-[#1147FF]" />
                    {mode}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#061B5C]">All Courses</h2>
                <p className="mt-1 text-sm font-semibold text-[#64748B]">Showing {filtered.length} of {courses.length}+ courses</p>
              </div>
              <select className="h-11 rounded-[14px] border border-[#E5EAF5] bg-white px-4 text-sm font-semibold text-[#061B5C] outline-none">
                <option>Sort by: Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
              </select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((course) => <CourseCard key={course.slug} course={course} />)}
            </div>
            <div className="mt-8 flex justify-center">
              <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-[#1147FF] px-7 text-sm font-black text-[#1147FF] transition hover:-translate-y-1 hover:bg-white">
                Load More Courses <ArrowRight className="size-4 rotate-90" />
              </button>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[20px] border border-[#E5EAF5] bg-white p-6 shadow-[0_16px_50px_rgba(10,42,136,0.08)]">
              <h2 className="text-xl font-black text-[#061B5C]">Why Choose Our Courses?</h2>
              <div className="mt-5 space-y-5">
                {courseAdvantages.map((advantage) => {
                  const Icon = advantage.icon;
                  return (
                    <div key={advantage.title} className="flex gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F1F5FF] text-[#1147FF]">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-[#061B5C]">{advantage.title}</span>
                        <span className="text-xs leading-5 text-[#64748B]">{advantage.description}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="brand-gradient rounded-[20px] p-6 text-white shadow-[0_24px_75px_rgba(10,42,136,0.18)]">
              <h2 className="text-2xl font-black">Not sure which course is right for you?</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">Get FREE career counselling from our experts.</p>
              <CTAButton to={routes.freeCounselling} className="mt-6 bg-[#19D9FF] text-[#061B5C] hover:bg-white">
                Book Free Session
              </CTAButton>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-xs font-black uppercase tracking-[0.22em] text-[#1147FF]">Career Tracks</p>
          <h2 className="mt-4 text-center text-3xl font-black text-[#061B5C] sm:text-5xl">Choose Your Learning Path</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {careerTracks.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className="rounded-[20px] border border-[#E5EAF5] bg-white p-5 text-center shadow-[0_16px_45px_rgba(10,42,136,0.07)] transition hover:-translate-y-1">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#F1F5FF] text-[#1147FF]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-black text-[#061B5C]">{track.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#64748B]">{track.courses}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto grid max-w-[1280px] gap-5 rounded-[20px] border border-[#E5EAF5] bg-white p-6 shadow-[0_18px_60px_rgba(10,42,136,0.08)] md:grid-cols-4">
          {[
            ["10,000+", "Students Transformed"],
            ["95%", "Placement Rate"],
            ["8.5 LPA", "Average Package"],
            ["500+", "Hiring Partners"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-[#061B5C]">{value}</p>
              <p className="mt-1 text-sm font-semibold text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterGroup({
  title,
  items,
  value,
  onChange,
}: Readonly<{
  title: string;
  items: string[];
  value: string;
  onChange: (next: string) => void;
}>) {
  return (
    <div className="mt-6 border-t border-[#E5EAF5] pt-5">
      <p className="text-sm font-black text-[#061B5C]">{title}</p>
      <div className="mt-3 grid gap-3">
        {items.map((item, index) => (
          <label key={item} className="flex items-center gap-3 text-sm font-semibold text-[#334155]">
            <input
              type="checkbox"
              checked={item === value || (index === 0 && value === item)}
              onChange={() => onChange(item)}
              className="size-4 rounded border-[#E5EAF5] accent-[#1147FF]"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
