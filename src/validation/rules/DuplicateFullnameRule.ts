import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../../domain/avro/AvroDiagnostic";
import type { ValidationRule } from "../ValidationRule";

export class DuplicateFullnameRule implements ValidationRule {
  readonly name = "duplicate-fullname";

  validate(_catalog: AvroCatalog): AvroDiagnostic[] {
    return [];
  }
}
