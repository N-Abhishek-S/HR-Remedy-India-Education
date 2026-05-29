import { z } from "zod";

import {
  consentSchema,
  emailSchema,
  honeypotSchema,
  indianPhoneSchema,
  messageSchema,
  nameSchema,
  utmSchema,
} from "./common";

const dateStringSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.");

const timeStringSchema = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time.");

const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid course reference.");

const leadBaseSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: indianPhoneSchema,
  consent: consentSchema,
  website: honeypotSchema,
  utm: utmSchema.optional(),
});

export const contactFormSchema = leadBaseSchema.extend({
  subject: z.string().trim().min(3, "Subject must be at least 3 characters.").max(120),
  message: messageSchema,
});

export const enquiryFormSchema = leadBaseSchema.extend({
  courseSlug: slugSchema,
  message: messageSchema.optional(),
  preferredMode: z.enum(["online", "classroom", "hybrid"]).optional(),
});

export const counsellingFormSchema = leadBaseSchema.extend({
  careerStage: z.enum([
    "student",
    "fresher",
    "final_year_student",
    "working_professional",
    "career_switcher",
    "hr_professional",
  ]),
  currentRole: z.string().trim().max(120).optional(),
  goals: messageSchema,
  preferredDate: dateStringSchema,
  preferredTime: timeStringSchema,
});

export const demoBookingFormSchema = leadBaseSchema.extend({
  courseSlug: slugSchema,
  preferredDate: dateStringSchema,
  preferredTime: timeStringSchema,
  learningMode: z.enum(["online", "classroom", "hybrid"]),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type EnquiryFormInput = z.infer<typeof enquiryFormSchema>;
export type CounsellingFormInput = z.infer<typeof counsellingFormSchema>;
export type DemoBookingFormInput = z.infer<typeof demoBookingFormSchema>;
