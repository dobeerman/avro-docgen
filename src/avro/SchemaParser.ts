import type { AvroSchema } from "../domain/avro/AvroSchema";
import type { FileSystem } from "../infrastructure/file-system/FileSystem";
import { parseJson } from "../utils/jsonUtils";
import { NamedTypeCollector } from "./NamedTypeCollector";

export class SchemaParser {
  private readonly collector = new NamedTypeCollector();

  constructor(private readonly fileSystem: FileSystem) {}

  async parseFile(filePath: string): Promise<AvroSchema> {
    const content = await this.fileSystem.readText(filePath);
    const root = parseJson(content, filePath);

    return {
      filePath,
      root,
      namedTypes: this.collector.collect(root, filePath),
    };
  }
}
