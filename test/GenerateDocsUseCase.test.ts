import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { GenerateDocsUseCase } from "../src/application/GenerateDocsUseCase";
import { SchemaParser } from "../src/avro/SchemaParser";
import { SchemaScanner } from "../src/avro/SchemaScanner";
import { ConfigLoader } from "../src/config/ConfigLoader";
import { NodeFileSystem } from "../src/infrastructure/file-system/NodeFileSystem";
import type { Logger } from "../src/infrastructure/logging/Logger";
import { GeneratedFileWriter } from "../src/io/GeneratedFileWriter";
import { MarkdownRenderer } from "../src/render/markdown/MarkdownRenderer";

const tempDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirectories.splice(0).map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

test("generates a README from simple fixture schemas", async () => {
  const tempDirectory = await mkdtemp(path.join(os.tmpdir(), "avro-docgen-"));
  tempDirectories.push(tempDirectory);
  const fixtureRoot = path.resolve("test/fixtures/simple-inline/schemas");
  const useCase = createUseCase();

  const result = await useCase.execute({
    cwd: tempDirectory,
    overrides: {
      schemaRoots: [fixtureRoot],
      outputDir: "docs/avro",
    },
  });

  const output = await readFile(result.outputPath, "utf8");

  expect(result.schemaCount).toBe(1);
  expect(result.namedTypeCount).toBe(1);
  expect(output).toContain("# Avro Schema Documentation");
  expect(output).toContain("## com.example.User");
  expect(output).toContain("| id | `string` |  | Stable user identifier. |");
  expect(output).toContain("| age | `null | int` | `null` | Optional age in years. |");
});

function createUseCase(): GenerateDocsUseCase {
  const fileSystem = new NodeFileSystem();

  return new GenerateDocsUseCase(
    new ConfigLoader(),
    new SchemaScanner(fileSystem),
    new SchemaParser(fileSystem),
    new MarkdownRenderer(),
    new GeneratedFileWriter(fileSystem),
    quietLogger,
  );
}

const quietLogger: Logger = {
  debug() {},
  error() {},
  info() {},
  warn() {},
};
