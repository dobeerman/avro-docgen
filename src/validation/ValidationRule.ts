import type { AvroCatalog } from "../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../domain/avro/AvroDiagnostic";

export interface ValidationRule {
  readonly name: string;
  validate(catalog: AvroCatalog): AvroDiagnostic[];
}
