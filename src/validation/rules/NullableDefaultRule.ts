import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../../domain/avro/AvroDiagnostic";
import type { ValidationRule } from "../ValidationRule";

export class NullableDefaultRule implements ValidationRule {
  readonly name = "nullable-default";

  validate(_catalog: AvroCatalog): AvroDiagnostic[] {
    return [];
  }
}
