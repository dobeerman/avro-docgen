import type { AvroType } from "./AvroType";

export interface AvroField {
  readonly name: string;
  readonly type: AvroType;
  doc?: string;
  defaultValue?: unknown;
}
