import { cosmiconfig } from "cosmiconfig";
import { ZodError } from "zod";
import type { AvroDocConfig, AvroDocConfigOverrides } from "./AvroDocConfig";
import { configSchema } from "./ConfigSchema";
import { defaultConfig } from "./DefaultConfig";

export interface LoadConfigOptions {
  readonly configPath?: string;
  readonly cwd: string;
  readonly overrides?: AvroDocConfigOverrides;
}

const searchPlaces = [
  "package.json",
  ".avrodocrc",
  ".avrodocrc.json",
  ".avrodocrc.yaml",
  ".avrodocrc.yml",
  "avrodoc.config.json",
  "avrodoc.config.yaml",
  "avrodoc.config.yml",
];

export class ConfigLoader {
  async load(options: LoadConfigOptions): Promise<AvroDocConfig> {
    const explorer = cosmiconfig("avrodoc", { searchPlaces });
    const result = options.configPath
      ? await explorer.load(options.configPath)
      : await explorer.search(options.cwd);

    const rawConfig = result?.config ?? {};

    try {
      return configSchema.parse({
        ...defaultConfig,
        ...rawConfig,
        ...options.overrides,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues
          .map((issue) => `${issue.path.join(".") || "config"}: ${issue.message}`)
          .join("; ");
        throw new Error(`Invalid avrodoc configuration: ${details}`);
      }

      throw error;
    }
  }
}
