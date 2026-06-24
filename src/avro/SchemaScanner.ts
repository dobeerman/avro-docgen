import path from "node:path";
import type { AvroDocConfig } from "../config/AvroDocConfig";
import type { FileSystem } from "../infrastructure/file-system/FileSystem";
import { stableSort } from "../utils/stableSort";

export interface ScanSchemasOptions {
  readonly cwd: string;
  readonly config: AvroDocConfig;
}

export class SchemaScanner {
  constructor(private readonly fileSystem: FileSystem) {}

  async scan(options: ScanSchemasOptions): Promise<string[]> {
    const filesByRoot = await Promise.all(
      options.config.schemaRoots.map((root) => {
        const resolvedRoot = path.resolve(options.cwd, root);
        return this.fileSystem.listFiles(resolvedRoot, options.config.schemaPatterns);
      }),
    );

    return stableSort([...new Set(filesByRoot.flat())], (filePath) => filePath);
  }
}
