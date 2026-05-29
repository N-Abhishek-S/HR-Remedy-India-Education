import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Heart, Star } from "lucide-react";

import type { Course } from "@/types/platform";
import { courseDetailRoute } from "@/lib/routes";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(value);
}

export function CourseCard({ course }: Readonly<{ course: Course; dark?: boolean }>) {
  return (
    <article className="premium-surface group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E5EAF5] bg-white shadow-[0_18px_55px_rgba(10,42,136,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#19D9FF]/45 hover:shadow-[0_24px_75px_rgba(17,71,255,0.16)]">
      <Link to={courseDetailRoute(course.slug)} className="block">
        <div className="relative aspect-[1.48] overflow-hidden bg-[#061B5C]">
          <img src={course.image} alt="" className="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <span className="absolute left-4 top-4 rounded-md bg-[#19D9FF] px-2.5 py-1 text-[10px] font-black uppercase text-[#061B5C]">
            {course.badge}
          </span>
          <button type="button" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/40 bg-[#061B5C]/40 text-white backdrop-blur transition hover:bg-white hover:text-[#1147FF]" aria-label={`Wishlist ${course.title}`}>
            <Heart className="size-4" />
          </button>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={courseDetailRoute(course.slug)} className="group/title">
          <h3 className="min-h-[3.2rem] text-xl font-black leading-tight text-[#061B5C] transition group-hover/title:text-[#1147FF]">{course.title}</h3>
        </Link>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
          <Clock3 className="size-3.5" />
          {course.duration} Program
        </p>
        <div className="mt-5 flex items-end gap-3">
          <p className="text-xl font-black text-[#061B5C]">{formatPrice(course.price)}</p>
          <p className="pb-0.5 text-xs font-semibold text-[#94A3B8] line-through">{formatPrice(course.oldPrice)}</p>
          <p className="ml-auto pb-0.5 text-xs font-black text-[#22C55E]">{course.discount}</p>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#E5EAF5] pt-4">
          <div className="flex items-center gap-3">
            <img src={course.mentorAvatar} alt="" className="size-9 rounded-full object-cover" loading="lazy" />
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-[#94A3B8]">Mentor</span>
              <span className="block text-xs font-black text-[#061B5C]">{course.mentor}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 text-xs font-black text-amber-500 sm:flex">
              <Star className="size-3.5 fill-current" />
              {course.rating}
            </span>
            <Link to={courseDetailRoute(course.slug)} className="grid size-10 place-items-center rounded-full border border-[#E5EAF5] text-[#061B5C] transition group-hover:rotate-[-8deg] group-hover:border-[#19D9FF] group-hover:bg-[#19D9FF] group-hover:text-[#061B5C]" aria-label={`View ${course.title}`}>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
