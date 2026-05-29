import { Link, useParams } from "react-router-dom";
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Facebook,
  Linkedin,
  Play,
  Share2,
  Star,
  Twitter,
  Users,
} from "lucide-react";

import { GsapReveal } from "@/animations/GsapReveal";
import { CourseCard } from "@/components/cards/CourseCard";
import { MentorCard } from "@/components/cards/MentorCard";
import { PricingCard } from "@/components/cards/PricingCard";
import { FAQAccordion } from "@/components/common/FAQAccordion";
import { courses, faqs, mentors, successStories } from "@/data/platform";
import { usePageMeta } from "@/hooks/usePageMeta";
import { routes } from "@/lib/routes";

export default function CourseDetailsPage() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug) ?? courses[0]!;
  const mentor = mentors.find((item) => item.name === course.mentor) ?? mentors[0]!;
  const related = courses.filter((item) => item.slug !== course.slug && item.track === course.track).slice(0, 3);

  usePageMeta(course.title);

  return (
    <main className="page-shell">
      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#64748B]">
            <Link to={routes.home}>Home</Link>
            <ChevronRight className="size-4" />
            <Link to={routes.courses} className="text-[#1147FF]">Courses</Link>
            <ChevronRight className="size-4" />
            <span>{course.title}</span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_350px] lg:items-start">
            <GsapReveal className="rounded-[20px] border border-[#E5EAF5] bg-white p-6 shadow-[0_18px_60px_rgba(10,42,136,0.08)]">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="relative overflow-hidden rounded-[16px] bg-[#061B5C]">
                  <img src={course.image} alt="" className="aspect-video size-full object-cover opacity-90" loading="eager" />
                  <button type="button" className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/70 bg-white/20 text-white backdrop-blur" aria-label="Play course preview">
                    <Play className="ml-1 size-7 fill-current" />
                  </button>
                </div>
                <div>
                  <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-black uppercase text-amber-700">{course.badge}</span>
                  <h1 className="mt-5 text-3xl font-black leading-tight text-[#061B5C] sm:text-5xl">{course.title}</h1>
                  <p className="mt-4 text-sm leading-7 text-[#64748B]">{course.summary}</p>
                  <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      ["Duration", course.duration],
                      ["Projects", course.projects],
                      ["Mentors", "Industry"],
                      ["Support", "100%"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[14px] bg-[#F8FAFF] p-4">
                        <p className="text-lg font-black text-[#061B5C]">{value}</p>
                        <p className="mt-1 text-xs font-semibold text-[#64748B]">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 text-sm leading-7 text-[#334155]">{course.description}</p>
                </div>
              </div>
            </GsapReveal>
            <PricingCard course={course} />
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[20px] border border-[#E5EAF5] bg-white shadow-[0_18px_60px_rgba(10,42,136,0.08)]">
              <div className="hide-scrollbar flex overflow-x-auto border-b border-[#E5EAF5]">
                {["Overview", "Curriculum", "Projects", "Skills You'll Learn", "Placements", "Mentors", "Reviews", "FAQ"].map((tab, index) => (
                  <a key={tab} href={`#course-${index}`} className="min-w-max border-b-2 border-transparent px-6 py-4 text-sm font-black text-[#64748B] first:border-[#1147FF] first:text-[#1147FF]">
                    {tab}
                  </a>
                ))}
              </div>
              <div className="p-7 sm:p-9">
                <section id="course-0">
                  <h2 className="text-2xl font-black text-[#061B5C]">About This Course</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#64748B]">{course.description}</p>
                  <div className="mt-8 grid gap-5 md:grid-cols-4">
                    {[
                      { title: "Industry-Relevant Curriculum", icon: BookOpenCheck },
                      { title: "Hands-on Learning", icon: CheckCircle2 },
                      { title: "Expert Mentors", icon: Users },
                      { title: "Placement Support", icon: Award },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="border-r border-[#E5EAF5] last:border-r-0">
                          <Icon className="size-9 rounded-[14px] bg-[#F1F5FF] p-2 text-[#1147FF]" />
                          <h3 className="mt-3 text-sm font-black text-[#061B5C]">{item.title}</h3>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section id="course-1" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Curriculum</h2>
                  <div className="mt-5 space-y-4">
                    {course.curriculum.map((module, index) => (
                      <article key={module.title} className="rounded-[16px] border border-[#E5EAF5] bg-[#F8FAFF] p-5">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1147FF]">Module {index + 1}</p>
                        <h3 className="mt-2 text-xl font-black text-[#061B5C]">{module.title}</h3>
                        <p className="mt-2 text-sm text-[#64748B]">{module.description}</p>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {module.lessons.map((lesson) => (
                            <p key={lesson} className="flex gap-2 text-sm font-semibold text-[#334155]">
                              <CheckCircle2 className="size-4 shrink-0 text-[#1147FF]" />
                              {lesson}
                            </p>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="course-2" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">What You&apos;ll Build</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {course.projectsBuilt.map((project) => (
                      <article key={project.title} className="rounded-[16px] border border-[#E5EAF5] bg-white p-5 shadow-sm">
                        <h3 className="font-black text-[#061B5C]">{project.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#64748B]">{project.description}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="course-3" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Skills You&apos;ll Learn</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[...course.skills, ...course.tools].map((skill) => (
                      <span key={skill} className="rounded-md bg-[#F1F5FF] px-3 py-2 text-xs font-black text-[#1147FF]">{skill}</span>
                    ))}
                  </div>
                </section>

                <section id="course-4" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Placement Outcomes</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {course.outcomes.map((outcome) => (
                      <div key={outcome} className="rounded-[16px] bg-[#F8FAFF] p-5 text-sm font-black text-[#061B5C]">{outcome}</div>
                    ))}
                  </div>
                </section>

                <section id="course-5" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Top Mentor</h2>
                  <div className="mt-5 max-w-md">
                    <MentorCard mentor={mentor} />
                  </div>
                </section>

                <section id="course-6" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Student Reviews</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {successStories.slice(0, 2).map((story) => (
                      <article key={story.name} className="rounded-[16px] border border-[#E5EAF5] bg-white p-5">
                        <p className="flex text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="size-4 fill-current" />)}</p>
                        <p className="mt-4 text-sm leading-7 text-[#64748B]">{story.quote}</p>
                        <p className="mt-4 text-sm font-black text-[#061B5C]">- {story.name}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="course-7" className="mt-12">
                  <h2 className="text-2xl font-black text-[#061B5C]">Frequently Asked Questions</h2>
                  <div className="mt-5">
                    <FAQAccordion items={faqs} />
                  </div>
                </section>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[20px] border border-[#E5EAF5] bg-white p-6 shadow-[0_18px_60px_rgba(10,42,136,0.08)]">
              <h2 className="text-xl font-black text-[#061B5C]">This Course Includes</h2>
              <div className="mt-5 space-y-4">
                {course.includes.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 text-sm">
                    <span className="font-semibold text-[#64748B]">{item.label}</span>
                    <span className="font-black text-[#061B5C]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] border border-[#E5EAF5] bg-white p-6 shadow-[0_18px_60px_rgba(10,42,136,0.08)]">
              <h2 className="text-xl font-black text-[#061B5C]">Share This Course</h2>
              <div className="mt-5 flex gap-3">
                {[Share2, Facebook, Twitter, Linkedin].map((Icon, index) => (
                  <span key={index} className="grid size-10 place-items-center rounded-full bg-[#F1F5FF] text-[#1147FF]">
                    <Icon className="size-4" />
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-3xl font-black text-[#061B5C]">Related Courses</h2>
          <GsapReveal stagger className="mt-8 grid gap-6 md:grid-cols-3">
            {(related.length ? related : courses.slice(1, 4)).map((item) => <CourseCard key={item.slug} course={item} />)}
          </GsapReveal>
        </div>
      </section>
    </main>
  );
}
