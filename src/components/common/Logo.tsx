import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { assetUrl } from "@/lib/asset-url";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  imageClassName,
  onDark = false,
  src,
}: Readonly<{ className?: string; imageClassName?: string; onDark?: boolean; src?: string }>) {
  return (
    <Link to={routes.home} className={cn("inline-flex items-center", className)} aria-label="HR Remedy home">
      <img
        src={src ?? siteConfig.logoPath}
        alt={siteConfig.name}
        className={cn("h-11 w-auto object-contain", onDark && "rounded-md bg-white", imageClassName)}
        loading="eager"
        onError={(event) => {
          event.currentTarget.src = siteConfig.logoFallbacks[0] ?? assetUrl("/assets/logo/company-logo-placeholder.svg");
        }}
      />
    </Link>
  );
}

