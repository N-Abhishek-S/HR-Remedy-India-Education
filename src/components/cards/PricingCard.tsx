import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

import type { Course } from "@/types/platform";
import { CTAButton } from "@/components/common/CTAButton";
import { routes } from "@/lib/routes";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" }).format(value);
}

export function PricingCard({ course }: Readonly<{ course: Course }>) {
  return (
    <aside className="sticky top-32 rounded-[20px] border border-[#E5EAF5] bg-white p-7 shadow-[0_22px_80px_rgba(10,42,136,0.12)]">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-3xl font-black text-[#061B5C]">{formatPrice(course.price)}</p>
        <p className="text-sm font-bold text-[#94A3B8] line-through">{formatPrice(course.oldPrice)}</p>
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-black text-[#22C55E]">{course.discount}</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-[#64748B]">EMI starts at ₹2,083/month</p>
      <CTAButton to={routes.demoBooking} className="mt-6 w-full">
        Enroll Now
      </CTAButton>
      <CTAButton to={routes.freeCounselling} variant="secondary" className="mt-3 w-full">
        Book Free Demo
      </CTAButton>
      <div className="mt-6 space-y-3">
        {[course.duration, "Live Classes + Recorded Videos", "Hands-on Projects", "Certificate of Completion", course.placementSupport].map((item) => (
          <p key={item} className="flex gap-3 text-sm font-semibold text-[#334155]">
            <CheckCircle2 className="size-5 shrink-0 text-[#1147FF]" />
            {item}
          </p>
        ))}
      </div>
      <div className="mt-7 rounded-[14px] border border-[#E5EAF5] bg-[#F8FAFF] p-4">
        <div className="flex items-center gap-3">
          <MessageCircle className="size-5 text-[#1147FF]" />
          <div>
            <p className="text-sm font-black text-[#061B5C]">Have questions?</p>
            <p className="text-xs font-semibold text-[#64748B]">Talk to our course expert</p>
          </div>
          <ArrowRight className="ml-auto size-4 text-[#1147FF]" />
        </div>
      </div>
    </aside>
  );
}
