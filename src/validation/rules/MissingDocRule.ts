import type { AvroCatalog } from "../../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../../domain/avro/AvroDiagnostic";
import type { ValidationRule } from "../ValidationRule";

export class MissingDocRule implements ValidationRule {
  readonly name = "missing-doc";

  validate(_catalog: AvroCatalog): AvroDiagnostic[] {
    return [];
  }
}
