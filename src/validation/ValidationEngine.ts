import type { AvroCatalog } from "../domain/avro/AvroCatalog";
import type { AvroDiagnostic } from "../domain/avro/AvroDiagnostic";
import type { ValidationRule } from "./ValidationRule";

export class ValidationEngine {
  constructor(private readonly rules: ValidationRule[]) {}

  validate(catalog: AvroCatalog): AvroDiagnostic[] {
    return this.rules.flatMap((rule) => rule.validate(catalog));
  }
}
