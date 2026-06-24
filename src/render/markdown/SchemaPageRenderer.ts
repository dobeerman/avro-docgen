import type { AvroNamedType } from "../../domain/avro/AvroNamedType";
import { FieldTableRenderer } from "./FieldTableRenderer";

export class SchemaPageRenderer {
  constructor(private readonly fieldTableRenderer = new FieldTableRenderer()) {}

  render(type: AvroNamedType): string[] {
    const lines = ["---", "", `## ${type.fullname}`, "", `Type: \`${type.kind}\``, ""];

    if (type.doc !== undefined) {
      lines.push(type.doc, "");
    }

    if (type.kind === "record") {
      lines.push(...this.fieldTableRenderer.render(type.fields));
      return lines;
    }

    if (type.kind === "enum") {
      lines.push("### Symbols", "", ...type.symbols.map((symbol) => `- \`${symbol}\``));
      return lines;
    }

    if (type.size !== undefined) {
      lines.push(`Size: \`${type.size}\``);
    }

    return lines;
  }
}
