import { useEffect } from "react";

import { siteConfig } from "@/config/site";

export function usePageMeta(title: string, description = siteConfig.description) {
  useEffect(() => {
    document.title = title === siteConfig.name ? title : `${title} | ${siteConfig.shortName}`;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }
    meta.content = description;
  }, [description, title]);
}
