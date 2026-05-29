import { clientEnv } from "@/lib/env";
import { assetUrl } from "@/lib/asset-url";

export const siteConfig = {
  name: "HR Remedy India Education",
  shortName: "HR Remedy",
  url: clientEnv.VITE_SITE_URL,
  locale: "en_IN",
  description:
    "Premium career transformation courses, HR training, certifications, mentorship, and placement support for modern Indian learners.",
  logoPath: assetUrl("/assets/logo/hr-remedy-official.png"),
  logoFallbacks: [assetUrl("/assets/logo/hr-remedy-logo.png"), assetUrl("/assets/logo/company-logo-placeholder.svg")],
  contactEmail: "info@hrremedyindia.com",
  contactPhone: "+91 91090 72316",
  whatsapp: "https://wa.me/919109072316",
} as const;
