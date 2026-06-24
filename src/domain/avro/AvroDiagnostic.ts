export type AvroDiagnosticSeverity = "error" | "warning";

export interface AvroDiagnostic {
  readonly rule: string;
  readonly severity: AvroDiagnosticSeverity;
  readonly message: string;
  readonly filePath?: string;
  readonly fullname?: string;
}
