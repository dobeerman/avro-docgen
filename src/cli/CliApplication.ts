import { Command } from "commander";
import { GenerateDocsUseCase } from "../application/GenerateDocsUseCase";
import { SchemaParser } from "../avro/SchemaParser";
import { SchemaScanner } from "../avro/SchemaScanner";
import { ConfigLoader } from "../config/ConfigLoader";
import { NodeFileSystem } from "../infrastructure/file-system/NodeFileSystem";
import { ConsoleLogger } from "../infrastructure/logging/ConsoleLogger";
import { GeneratedFileWriter } from "../io/GeneratedFileWriter";
import { MarkdownRenderer } from "../render/markdown/MarkdownRenderer";
import { GenerateCommand } from "./commands/GenerateCommand";

export class CliApplication {
  async run(argv: string[]): Promise<void> {
    const logger = new ConsoleLogger();
    const fileSystem = new NodeFileSystem();
    const program = new Command()
      .name("avro-docgen")
      .description("Generate Markdown documentation from Apache Avro schema files.");

    const generateDocs = new GenerateDocsUseCase(
      new ConfigLoader(),
      new SchemaScanner(fileSystem),
      new SchemaParser(fileSystem),
      new MarkdownRenderer(),
      new GeneratedFileWriter(fileSystem),
      logger,
    );

    new GenerateCommand(generateDocs).register(program);

    try {
      await program.parseAsync(argv);
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}
