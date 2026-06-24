import { formatAvroType } from "../../avro/TypeNormalizer";
import type { AvroField } from "../../domain/avro/AvroField";
import { stableJsonStringify } from "../../utils/jsonUtils";

export class FieldTableRenderer {
  render(fields: AvroField[]): string[] {
    if (fields.length === 0) {
      return ["No fields."];
    }

    return [
      "| Field | Type | Default | Description |",
      "| --- | --- | --- | --- |",
      ...fields.map((field) => {
        const defaultValue =
          field.defaultValue === undefined ? "" : code(stableJsonStringify(field.defaultValue));
        return `| ${escapeCell(field.name)} | ${code(formatAvroType(field.type))} | ${defaultValue} | ${escapeCell(field.doc ?? "")} |`;
      }),
    ];
  }
}

function code(value: string): string {
  return `\`${value.replaceAll("`", "\\`")}\``;
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}
