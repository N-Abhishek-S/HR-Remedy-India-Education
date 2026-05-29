import type { z } from "zod";

export type ActionState<TData = unknown> =
  | {
      status: "idle";
      data?: never;
      message?: never;
      fieldErrors?: never;
    }
  | {
      status: "success";
      data: TData;
      message: string;
      fieldErrors?: never;
    }
  | {
      status: "error";
      data?: never;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

export function fieldErrorsFromZodError(error: z.ZodError) {
  return error.flatten().fieldErrors;
}

export function successState<TData>(data: TData, message: string): ActionState<TData> {
  return {
    status: "success",
    data,
    message,
  };
}

export function errorState(message: string, fieldErrors?: Record<string, string[]>): ActionState {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}
