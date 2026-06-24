import path from "node:path";
import type { SchemaParser } from "../avro/SchemaParser";
import type { SchemaScanner } from "../avro/SchemaScanner";
import type { AvroDocConfigOverrides } from "../config/AvroDocConfig";
import type { ConfigLoader } from "../config/ConfigLoader";
import type { Logger } from "../infrastructure/logging/Logger";
import type { GeneratedFileWriter } from "../io/GeneratedFileWriter";
import type { MarkdownRenderer } from "../render/markdown/MarkdownRenderer";
import { stableSort } from "../utils/stableSort";

export interface GenerateDocsOptions {
  readonly configPath?: string;
  readonly cwd: string;
  readonly overrides?: AvroDocConfigOverrides;
}

export interface GenerateDocsResult {
  readonly schemaCount: number;
  readonly namedTypeCount: number;
  readonly outputPath: string;
}

export class GenerateDocsUseCase {
  constructor(
    private readonly configLoader: ConfigLoader,
    private readonly scanner: SchemaScanner,
    private readonly parser: SchemaParser,
    private readonly renderer: MarkdownRenderer,
    private readonly writer: GeneratedFileWriter,
    private readonly logger: Logger,
  ) {}

  async execute(options: GenerateDocsOptions): Promise<GenerateDocsResult> {
    const config = await this.configLoader.load(options);
    const schemaFiles = await this.scanner.scan({ cwd: options.cwd, config });
    const schemas = await Promise.all(
      schemaFiles.map((filePath) => this.parser.parseFile(filePath)),
    );
    const namedTypes = stableSort(
      schemas.flatMap((schema) => schema.namedTypes),
      (type) => type.fullname,
    );
    const content = this.renderer.renderIndex({ schemas, namedTypes });
    const outputPath = path.resolve(options.cwd, config.outputDir, config.readmeFile);

    await this.writer.write(outputPath, content);
    this.logger.info(
      `Generated ${config.readmeFile} for ${schemas.length} schema file(s) and ${namedTypes.length} named type(s).`,
    );

    return {
      schemaCount: schemas.length,
      namedTypeCount: namedTypes.length,
      outputPath,
    };
  }
}
