import type { Command } from "commander";
import type { GenerateDocsUseCase } from "../../application/GenerateDocsUseCase";
import type { AvroDocConfigOverrides } from "../../config/AvroDocConfig";

interface GenerateCommandOptions {
  config?: string;
  cwd: string;
  output?: string;
  schemaRoot?: string[];
}

export class GenerateCommand {
  constructor(private readonly generateDocs: GenerateDocsUseCase) {}

  register(program: Command): void {
    program
      .command("generate")
      .description("Generate Markdown documentation from Avro schemas.")
      .option("-c, --config <path>", "Path to an avrodoc config file.")
      .option("--cwd <path>", "Working directory for config and relative paths.", process.cwd())
      .option("-o, --output <dir>", "Directory where generated documentation is written.")
      .option("--schema-root <dir...>", "Schema root directories to scan.")
      .action(async (options: GenerateCommandOptions) => {
        const overrides: AvroDocConfigOverrides = {};

        if (options.output !== undefined) {
          overrides.outputDir = options.output;
        }

        if (options.schemaRoot !== undefined) {
          overrides.schemaRoots = options.schemaRoot;
        }

        await this.generateDocs.execute({
          ...(options.config === undefined ? {} : { configPath: options.config }),
          cwd: options.cwd,
          overrides,
        });
      });
  }
}
