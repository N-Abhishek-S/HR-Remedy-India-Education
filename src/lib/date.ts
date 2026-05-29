import { format, isValid, parseISO } from "date-fns";

export type DateInput = Date | string | number;

function toDate(value: DateInput) {
  const date = typeof value === "string" ? parseISO(value) : new Date(value);

  if (!isValid(date)) {
    throw new Error("Invalid date value.");
  }

  return date;
}

export function formatDate(value: DateInput, pattern = "dd MMM yyyy") {
  return format(toDate(value), pattern);
}

export function formatDateTime(value: DateInput, pattern = "dd MMM yyyy, h:mm a") {
  return format(toDate(value), pattern);
}

export function toIsoDate(value: DateInput) {
  return format(toDate(value), "yyyy-MM-dd");
}
