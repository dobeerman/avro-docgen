import type { Logger } from "./Logger";

export class ConsoleLogger implements Logger {
  info(message: string): void {
    console.info(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  error(message: string): void {
    console.error(message);
  }

  debug(message: string): void {
    if (process.env.AVRO_DOCGEN_DEBUG === "1") {
      console.debug(message);
    }
  }
}
