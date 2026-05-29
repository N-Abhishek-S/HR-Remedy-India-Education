export type LogContext = Record<string, unknown>;

type LogLevel = "debug" | "info" | "warn" | "error";

function serialize(level: LogLevel, message: string, context?: LogContext) {
  return {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };
}

export const logger = {
  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(serialize("debug", message, context));
    }
  },
  info(message: string, context?: LogContext) {
    console.info(serialize("info", message, context));
  },
  warn(message: string, context?: LogContext) {
    console.warn(serialize("warn", message, context));
  },
  error(message: string, context?: LogContext) {
    console.error(serialize("error", message, context));
  },
};
