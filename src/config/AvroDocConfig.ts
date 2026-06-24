import type { z } from "zod";
import type { configSchema } from "./ConfigSchema";

export type AvroDocConfig = z.infer<typeof configSchema>;
export type AvroDocConfigOverrides = Partial<AvroDocConfig>;
