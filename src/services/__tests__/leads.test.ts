import { describe, expect, it, vi } from "vitest";

import { submitLead } from "@/services/leads";

vi.mock("@/lib/supabase/browser", () => ({
  createSupabaseBrowserClient: () => null,
}));

describe("submitLead", () => {
  it("rejects invalid contact payloads before persistence", async () => {
    await expect(submitLead("contact", { email: "bad" })).rejects.toThrow("Please check the form details");
  });

  it("returns a local result when Supabase is not configured", async () => {
    const result = await submitLead("contact", {
      fullName: "Priya Sharma",
      email: "priya@example.com",
      phone: "9876543210",
      subject: "Career counselling",
      message: "I want help choosing the right career course.",
      consent: true,
      website: "",
    });

    expect(result.id).toMatch(/^local-/);
  });
});
