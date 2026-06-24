import type { AvroNamedType } from "./AvroNamedType";
import type { AvroSchema } from "./AvroSchema";

export interface AvroCatalog {
  readonly schemas: AvroSchema[];
  readonly namedTypes: AvroNamedType[];
}
