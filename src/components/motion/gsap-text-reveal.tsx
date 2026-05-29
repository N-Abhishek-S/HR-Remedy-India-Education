"use client";

import { useEffect, useRef, type Ref } from "react";
import { cn } from "@/lib/utils";

type TextTag = "h1" | "h2" | "h3" | "p";

interface GsapTextRevealProps {
  readonly text: string;
  readonly className?: string;
  readonly tag?: TextTag;
  readonly delay?: number;
}

export function GsapTextReveal({
  text,
  className,
  tag = "h1",
  delay = 0,
}: GsapTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    let ctx: { revert: () => void } | undefined;
    let disposed = false;

    if (!element) {
      return;
    }

    const containerElement = element;

    /* Reduced-motion: ensure all words are visible immediately */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const words = containerElement.querySelectorAll<HTMLSpanElement>(
        "[data-word]",
      );
      words.forEach((word) => {
        word.style.opacity = "1";
        word.style.visibility = "visible";
      });
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

      const words = containerElement.querySelectorAll<HTMLSpanElement>(
        "[data-word]",
      );

      if (words.length === 0) {
        return;
      }

      ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: containerElement,
              start: "top 80%",
              once: true,
            },
          },
        );
      }, containerElement);
    }

    void animate();

    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [text, delay]);

  const words = text.split(" ");

  const content = words.map((word, i) => (
      <span
        key={`${word}-${i}`}
        data-word=""
        className="inline-block"
        style={{ visibility: "hidden" }}
      >
        {word}
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
  ));

  const headingRef = ref as Ref<HTMLHeadingElement>;
  const paragraphRef = ref as Ref<HTMLParagraphElement>;

  if (tag === "h2") {
    return <h2 ref={headingRef} className={cn(className)}>{content}</h2>;
  }

  if (tag === "h3") {
    return <h3 ref={headingRef} className={cn(className)}>{content}</h3>;
  }

  if (tag === "p") {
    return <p ref={paragraphRef} className={cn(className)}>{content}</p>;
  }

  return <h1 ref={headingRef} className={cn(className)}>{content}</h1>;
}
