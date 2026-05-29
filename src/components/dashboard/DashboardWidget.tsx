import type { DashboardMetric } from "@/types/platform";

export function DashboardWidget({ metric }: Readonly<{ metric: DashboardMetric }>) {
  const Icon = metric.icon;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="grid size-11 place-items-center rounded-xl bg-[#EEF4FF] text-[#007BFF]">
          <Icon className="size-5" />
        </div>
        <span className="text-xs font-bold text-emerald-600">{metric.trend}</span>
      </div>
      <p className="mt-6 text-sm font-bold text-[#64748B]">{metric.label}</p>
      <p className="mt-1 text-3xl font-black text-[#0F172A]">{metric.value}</p>
    </article>
  );
}
