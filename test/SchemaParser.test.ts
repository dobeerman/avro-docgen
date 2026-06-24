import path from "node:path";
import { expect, test } from "vitest";
import { SchemaParser } from "../src/avro/SchemaParser";
import { NodeFileSystem } from "../src/infrastructure/file-system/NodeFileSystem";

test("collects named record types from an Avro schema", async () => {
  const schema = await new SchemaParser(new NodeFileSystem()).parseFile(
    path.resolve("test/fixtures/nested-records/schemas/order.avsc"),
  );

  expect(schema.namedTypes.map((type) => type.fullname)).toEqual([
    "com.example.Order",
    "com.example.OrderLine",
  ]);
  expect(schema.namedTypes[0]?.fields.map((field) => field.name)).toEqual(["id", "line"]);
});
