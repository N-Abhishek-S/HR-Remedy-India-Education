import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function GsapReveal({
  children,
  className,
  stagger = false,
}: Readonly<{ children: ReactNode; className?: string; stagger?: boolean }>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanup: (() => void) | undefined;
    let disposed = false;
    const target = element;

    async function run() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          stagger ? target.children : target,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: stagger ? 0.08 : 0,
            scrollTrigger: { trigger: target, start: "top 92%", once: true },
          },
        );
      }, target);
      cleanup = () => ctx.revert();
    }

    void run();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [stagger]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
