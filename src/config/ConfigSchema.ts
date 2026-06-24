import { z } from "zod";

export const configSchema = z.object({
  schemaRoots: z.array(z.string().min(1)).min(1),
  schemaPatterns: z.array(z.string().min(1)).min(1),
  outputDir: z.string().min(1),
  readmeFile: z.string().min(1),
});
