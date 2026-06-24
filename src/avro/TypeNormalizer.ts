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
    return type.map(formatAvroType).join(" | ");
  }

  if (typeof type.type === "string") {
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
