import { clientEnv } from "@/lib/env";

export const siteConfig = {
  name: "HR Remedy India Education",
  shortName: "HR Remedy",
  url: clientEnv.VITE_SITE_URL,
  locale: "en_IN",
  description:
    "Premium career transformation courses, HR training, certifications, mentorship, and placement support for modern Indian learners.",
  logoPath: "/assets/logo/hr-remedy-official.png",
  logoFallbacks: ["/assets/logo/hr-remedy-logo.png", "/assets/logo/company-logo-placeholder.svg"],
  contactEmail: "info@hrremedyindia.com",
  contactPhone: "+91 91090 72316",
  whatsapp: "https://wa.me/919109072316",
} as const;
