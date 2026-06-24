import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../../domain/avro/AvroDiagnostic";
import type { ValidationRule } from "../ValidationRule";

export class BrokenReferenceRule implements ValidationRule {
  readonly name = "broken-reference";

  validate(_catalog: AvroCatalog): AvroDiagnostic[] {
    return [];
  }
}
