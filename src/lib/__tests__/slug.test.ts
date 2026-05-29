import { describe, expect, it } from "vitest";

import { createSlug, isValidSlug, slugify } from "@/lib/slug";

describe("slug utilities", () => {
  it("creates normalized slugs", () => {
    expect(slugify("HR Generalist & Compliance")).toBe("hr-generalist-and-compliance");
  });

  it("validates route-safe slugs", () => {
    expect(isValidSlug("payroll-and-compliance")).toBe(true);
    expect(isValidSlug("Payroll Compliance")).toBe(false);
  });

  it("throws when the generated slug is empty", () => {
    expect(() => createSlug("!!!")).toThrow("Invalid slug");
  });
});
