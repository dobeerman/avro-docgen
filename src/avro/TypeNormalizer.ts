import type { AvroType } from "../domain/avro/AvroType";

export function getFullname(name: string, namespace: string | undefined): string {
  if (name.includes(".")) {
    return name;
  }

  return namespace === undefined || namespace.length === 0 ? name : `${namespace}.${name}`;
}

export function getNamespaceFromFullname(fullname: string): string | undefined {
  const lastDot = fullname.lastIndexOf(".");
  return lastDot === -1 ? undefined : fullname.slice(0, lastDot);
}

export function formatAvroType(type: AvroType): string {
  if (typeof type === "string") {
    return type;
  }

  if (Array.isArray(type)) {
    const nonNullTypes = type.filter((item) => item !== "null");

    if (nonNullTypes.length === 1 && nonNullTypes.length !== type.length) {
      return `${formatAvroType(nonNullTypes[0] as AvroType)} (nullable)`;
    }

    return type.map(formatAvroType).join(" | ");
  }

  if (typeof type.type === "string") {
    if (type.type === "array") {
      return `array<${formatAvroType(readNestedType(type.items))}>`;
    }

    if (type.type === "map") {
      return `map<${formatAvroType(readNestedType(type.values))}>`;
    }

    const base = typeof type.name === "string" ? type.name : type.type;
    return typeof type.logicalType === "string" ? `${base} (${type.logicalType})` : base;
  }

  if (Array.isArray(type.type)) {
    return type.type.map(formatAvroType).join(" | ");
  }

  if (typeof type.type === "object" && type.type !== null) {
    return formatAvroType(type.type);
  }

  return "unknown";
}

function readNestedType(value: unknown): AvroType {
  if (typeof value === "string" || Array.isArray(value)) {
    return value as AvroType;
  }

  if (typeof value === "object" && value !== null) {
    return value as AvroType;
  }

  return "unknown";
}
