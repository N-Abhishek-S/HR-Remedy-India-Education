import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Drawer({
  open,
  children,
  onClose,
}: Readonly<{ open: boolean; children: ReactNode; onClose: () => void }>) {
  return (
    <div className={open ? "fixed inset-0 z-50 lg:hidden" : "hidden"}>
      <button type="button" className="absolute inset-0 bg-[#031B34]/70 backdrop-blur-sm" aria-label="Close navigation" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[min(88vw,380px)] bg-white p-6 shadow-2xl">
        <button type="button" onClick={onClose} className="ml-auto flex rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close menu">
          <X className="size-5" />
        </button>
        {children}
      </aside>
    </div>
  );
}
