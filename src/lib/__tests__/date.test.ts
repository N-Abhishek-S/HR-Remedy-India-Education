import { describe, expect, it } from "vitest";

import { formatDate, toIsoDate } from "@/lib/date";

describe("date utilities", () => {
  it("formats ISO dates for India-facing pages", () => {
    expect(formatDate("2026-05-27")).toBe("27 May 2026");
  });

  it("returns ISO date strings", () => {
    expect(toIsoDate("2026-05-27T10:30:00.000Z")).toBe("2026-05-27");
  });
});
