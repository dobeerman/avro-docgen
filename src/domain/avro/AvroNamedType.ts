import type { AvroField } from "./AvroField";

export type AvroNamedTypeKind = "record" | "enum" | "fixed";

export interface AvroNamedType {
  readonly kind: AvroNamedTypeKind;
  readonly name: string;
  namespace?: string;
  readonly fullname: string;
  doc?: string;
  readonly filePath: string;
  readonly fields: AvroField[];
  readonly symbols: string[];
  size?: number;
}
