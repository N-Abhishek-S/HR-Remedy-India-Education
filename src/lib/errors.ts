import { ZodError } from "zod";

export type ErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

const defaultStatusByCode: Record<ErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, code: ErrorCode = "INTERNAL_ERROR", details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = defaultStatusByCode[code];
    this.details = details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function normalizeError(error: unknown) {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof ZodError) {
    return new AppError("Validation failed.", "VALIDATION_ERROR", error.flatten());
  }

  if (error instanceof Error) {
    return new AppError(error.message, "INTERNAL_ERROR");
  }

  return new AppError("An unexpected error occurred.", "INTERNAL_ERROR");
}

export function getErrorMessage(error: unknown) {
  return normalizeError(error).message;
}
