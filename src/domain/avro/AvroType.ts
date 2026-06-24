export type AvroType = string | AvroType[] | AvroTypeObject;

export interface AvroTypeObject {
  readonly type?: AvroType;
  readonly name?: string;
  readonly namespace?: string;
  readonly logicalType?: string;
  readonly [key: string]: unknown;
}
