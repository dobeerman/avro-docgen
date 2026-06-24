import type { AvroDocConfig } from "./AvroDocConfig";

export const defaultConfig: AvroDocConfig = {
  schemaRoots: ["schemas"],
  schemaPatterns: ["**/*.avsc"],
  outputDir: "docs/avro",
  readmeFile: "README.md",
};
