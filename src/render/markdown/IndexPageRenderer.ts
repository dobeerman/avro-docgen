import path from "node:path";
import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import type { AvroNamedType } from "../../domain/avro/AvroNamedType";
import { toPosixPath } from "../../utils/pathUtils";
import { SchemaPageRenderer } from "./SchemaPageRenderer";

export class IndexPageRenderer {
  constructor(private readonly schemaPageRenderer = new SchemaPageRenderer()) {}

  render(catalog: AvroCatalog): string {
    const lines = [
      "# Avro Schema Documentation",
      "",
      `Generated from ${catalog.schemas.length} schema file(s).`,
      "",
      "## Schemas",
      "",
      ...this.renderSchemaList(catalog.namedTypes),
      "",
      ...catalog.namedTypes.flatMap((type) => this.schemaPageRenderer.render(type)),
      "",
    ];

    return `${lines.join("\n").trimEnd()}\n`;
  }

  private renderSchemaList(namedTypes: AvroNamedType[]): string[] {
    if (namedTypes.length === 0) {
      return ["No Avro named types found."];
    }

    return namedTypes.map((type) => {
      const fileName = toPosixPath(path.basename(type.filePath));
      return `- [${type.fullname}](#${anchor(type.fullname)}) (${type.kind}, ${fileName})`;
    });
  }
}

function anchor(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
