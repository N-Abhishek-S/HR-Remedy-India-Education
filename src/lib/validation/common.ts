import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(254, "Email address is too long.");

export const indianPhoneSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number.");

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(80, "Name must be 80 characters or less.");

export const messageSchema = z
  .string()
  .trim()
  .min(10, "Message must be at least 10 characters.")
  .max(2_000, "Message must be 2,000 characters or less.");

export const consentSchema = z.literal(true, {
  errorMap: () => ({ message: "Consent is required." }),
});

export const honeypotSchema = z.string().max(0, "Spam prevention failed.").optional();

export const utmSchema = z.object({
  source: z.string().trim().max(120).optional(),
  medium: z.string().trim().max(120).optional(),
  campaign: z.string().trim().max(160).optional(),
  term: z.string().trim().max(160).optional(),
  content: z.string().trim().max(160).optional(),
});
