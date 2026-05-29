import { expect, test } from "@playwright/test";

test("homepage exposes cinematic hero and conversion paths", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Degrees open doors/i })).toBeVisible();
  await expect(page.locator("video").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Book Free Counselling/i }).first()).toBeVisible();
  await page.getByRole("link", { name: /Explore Courses/i }).first().click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(page.getByRole("heading", { name: /Industry-Relevant Courses/i })).toBeVisible();
});

test("course search and detail route work", async ({ page }) => {
  await page.goto("/courses");
  await page.getByPlaceholder(/Search courses/i).fill("full stack");
  await expect(page.getByRole("heading", { name: /Full Stack Web Development/i }).first()).toBeVisible();
  await page.getByRole("link", { name: /Full Stack Web Development/i }).first().click();
  await expect(page).toHaveURL(/\/courses\/full-stack-web-development$/);
  await expect(page.getByRole("heading", { name: /Full Stack Web Development/i }).first()).toBeVisible();
});

test("public marketing pages are reachable", async ({ page }) => {
  const pages = [
    ["/placements", /Your Success is/i],
    ["/success-stories", /Real Stories/i],
    ["/mentors", /Learn From Industry Experts/i],
    ["/about", /Empowering India's Career Transformation/i],
    ["/contact", /Let's Start Your Career Transformation/i],
    ["/resources", /Insights, Trends/i],
  ] as const;

  for (const [url, heading] of pages) {
    await page.goto(url);
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
  }
});

test("auth screens are reachable", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("main").getByRole("link", { name: /^Login$/i })).toBeVisible();
  await page.goto("/signup");
  await expect(page.getByRole("main").getByRole("link", { name: /Sign Up/i })).toBeVisible();
});
