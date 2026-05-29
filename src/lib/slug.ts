const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function assertValidSlug(slug: string) {
  if (!slugPattern.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  return slug;
}

export function isValidSlug(slug: string) {
  return slugPattern.test(slug);
}

export function createSlug(...parts: string[]) {
  return assertValidSlug(slugify(parts.filter(Boolean).join(" ")));
}
