import { expect, test } from "vitest";
import { formatAvroType } from "../src/avro/TypeNormalizer";

test("formats nullable unions without exposing Avro branch ordering", () => {
  expect(formatAvroType(["null", "int"])).toBe("int (nullable)");
  expect(formatAvroType(["Section", "null"])).toBe("Section (nullable)");
});

test("formats arrays and maps with their nested value types", () => {
  expect(formatAvroType({ type: "array", items: "Position" })).toBe("array<Position>");
  expect(formatAvroType({ type: "map", values: "Position" })).toBe("map<Position>");
  expect(
    formatAvroType({ type: "array", items: { type: "long", logicalType: "timestamp-millis" } }),
  ).toBe("array<long (timestamp-millis)>");
});
