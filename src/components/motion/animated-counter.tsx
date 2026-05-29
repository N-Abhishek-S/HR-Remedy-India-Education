"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  readonly value: number;
  readonly suffix?: string;
  readonly className?: string;
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = { value: 0 };
    const element = ref.current;
    let tween:
      | { kill: () => void; play: () => void; scrollTrigger?: { kill: () => void } }
      | undefined;
    let disposed = false;

    if (!element) {
      return;
    }

    const counterElement = element;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      counterElement.textContent = `${formatNumber(value)}${suffix}`;
      return;
    }

    async function animate() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      tween = gsap.to(target, {
        value,
        duration: 2.0,
        ease: "circ.out",
        paused: true,
        onUpdate: () => {
          counterElement.textContent = `${formatNumber(target.value)}${suffix}`;
        },
        scrollTrigger: {
          trigger: counterElement,
          start: "top 85%",
          once: true,
          onEnter: () => tween?.play(),
        },
      });
    }

    void animate();

    return () => {
      disposed = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [suffix, value]);

  return (
    <span ref={ref} className={cn(className)}>
      0{suffix}
    </span>
  );
}
