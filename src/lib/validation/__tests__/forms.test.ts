import { describe, expect, it } from "vitest";

import { counsellingFormSchema, contactFormSchema } from "@/lib/validation/forms";

describe("lead form validation", () => {
  it("accepts a valid contact form", () => {
    const parsed = contactFormSchema.safeParse({
      fullName: "Priya Sharma",
      email: "priya@example.com",
      phone: "9876543210",
      consent: true,
      subject: "Course enquiry",
      message: "I want to understand the HR generalist program.",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid Indian phone numbers", () => {
    const parsed = counsellingFormSchema.safeParse({
      fullName: "Rahul",
      email: "rahul@example.com",
      phone: "12345",
      consent: true,
      careerStage: "fresher",
      goals: "I want to start a career in HR operations.",
      preferredDate: "2026-06-01",
      preferredTime: "11:30",
    });

    expect(parsed.success).toBe(false);
  });
});
