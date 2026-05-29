import { z } from "zod";

export const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

export const optionalString = z.preprocess(emptyToUndefined, z.string().trim().optional());
export const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
export const optionalPort = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().min(1).max(65_535).optional(),
);

export const requiredUrl = z.preprocess(emptyToUndefined, z.string().url());
export const requiredString = z.preprocess(emptyToUndefined, z.string().trim().min(1));

export function parseEnv<TSchema extends z.ZodType<unknown>>(
  schema: TSchema,
  values: unknown,
  context: string,
): z.output<TSchema> {
  const result = schema.safeParse(values);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid ${context}: ${formatted}`);
  }

  return result.data;
}
