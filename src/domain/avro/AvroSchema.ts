import type { AvroNamedType } from "./AvroNamedType";

export interface AvroSchema {
  readonly filePath: string;
  readonly root: unknown;
  readonly namedTypes: AvroNamedType[];
}
