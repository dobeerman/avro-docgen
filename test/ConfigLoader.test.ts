import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { ConfigLoader } from "../src/config/ConfigLoader";

const tempDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempDirectories.splice(0).map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

test("loads default config when no config file exists", async () => {
  const tempDirectory = await mkdtemp(path.join(os.tmpdir(), "avro-docgen-config-"));
  tempDirectories.push(tempDirectory);
  const config = await new ConfigLoader().load({ cwd: tempDirectory });

  expect(config).toEqual({
    schemaRoots: ["schemas"],
    schemaPatterns: ["**/*.avsc"],
    outputDir: "docs/avro",
    readmeFile: "README.md",
  });
});

test("reports human-readable validation failures", async () => {
  await expect(
    new ConfigLoader().load({
      cwd: process.cwd(),
      overrides: { schemaRoots: [] },
    }),
  ).rejects.toThrow("Invalid avrodoc configuration: schemaRoots: Too small");
});
