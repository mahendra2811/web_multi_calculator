export type FieldKind =
  | "number"
  | "currency"
  | "percent"
  | "select"
  | "date"
  | "text"
  | "toggle"
  | "textarea";

export interface InputField {
  id: string;
  label: string;
  kind: FieldKind;
  default?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  hint?: string;
  options?: Array<{ value: string | number; label: string }>;
}

export type OutputFormat =
  | "currency"
  | "currency-inr"
  | "percent"
  | "number"
  | "integer"
  | "text"
  | "date";

export interface OutputField {
  id: string;
  label: string;
  format?: OutputFormat;
  tone?: "primary" | "secondary" | "accent" | "success" | "error" | "default";
  big?: boolean;
  fractionDigits?: number;
  suffix?: string;
}

export type ComputeInputs = Record<string, string | number | boolean>;
export type ComputeResult = Record<string, string | number | boolean | null | undefined>;

export interface CalculatorSchema {
  slug: string;
  inputs: InputField[];
  outputs: OutputField[];
  compute: (inputs: ComputeInputs) => ComputeResult;
  /** Optional educational text shown below result */
  formula?: string;
}
