import type { AvroField } from "../domain/avro/AvroField";
import type { AvroNamedType, AvroNamedTypeKind } from "../domain/avro/AvroNamedType";
import type { AvroType } from "../domain/avro/AvroType";
import { getFullname, getNamespaceFromFullname } from "./TypeNormalizer";

export class NamedTypeCollector {
  collect(root: unknown, filePath: string): AvroNamedType[] {
    const namedTypes: AvroNamedType[] = [];
    this.visit(root, undefined, filePath, namedTypes);
    return namedTypes;
  }

  private visit(
    value: unknown,
    namespace: string | undefined,
    filePath: string,
    namedTypes: AvroNamedType[],
  ): void {
    if (Array.isArray(value)) {
      for (const item of value) {
        this.visit(item, namespace, filePath, namedTypes);
      }
      return;
    }

    if (!isRecord(value)) {
      return;
    }

    const type = value.type;

    if (Array.isArray(type) || isRecord(type)) {
      this.visit(type, namespace, filePath, namedTypes);
      return;
    }

    if (isNamedTypeKind(type) && typeof value.name === "string") {
      const typeNamespace = typeof value.namespace === "string" ? value.namespace : namespace;
      const fullname = getFullname(value.name, typeNamespace);
      const nestedNamespace = getNamespaceFromFullname(fullname) ?? typeNamespace;
      const fields = type === "record" ? readFields(value.fields) : [];
      const namedType: AvroNamedType = {
        kind: type,
        name: value.name,
        fullname,
        filePath,
        fields,
        symbols: type === "enum" ? readStringArray(value.symbols) : [],
      };

      if (typeNamespace !== undefined) {
        namedType.namespace = typeNamespace;
      }

      if (typeof value.doc === "string") {
        namedType.doc = value.doc;
      }

      if (type === "fixed" && typeof value.size === "number") {
        namedType.size = value.size;
      }

      namedTypes.push(namedType);

      for (const field of fields) {
        this.visit(field.type, nestedNamespace, filePath, namedTypes);
      }

      return;
    }

    if (type === "array") {
      this.visit(value.items, namespace, filePath, namedTypes);
      return;
    }

    if (type === "map") {
      this.visit(value.values, namespace, filePath, namedTypes);
      return;
    }

    this.visit(type, namespace, filePath, namedTypes);
  }
}

function readFields(value: unknown): AvroField[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord).flatMap((field) => {
    if (typeof field.name !== "string" || field.type === undefined) {
      return [];
    }

    const avroField: AvroField = {
      name: field.name,
      type: field.type as AvroType,
    };

    if (typeof field.doc === "string") {
      avroField.doc = field.doc;
    }

    if (Object.hasOwn(field, "default")) {
      avroField.defaultValue = field.default;
    }

    return [avroField];
  });
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function isNamedTypeKind(value: unknown): value is AvroNamedTypeKind {
  return value === "record" || value === "enum" || value === "fixed";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
