"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BigStat, Stat } from "@/components/calculator/Stat";
import { useHistory } from "@/lib/storage/stores";
import { track } from "@/lib/analytics/events";
import { formatINR, formatNumber } from "@/lib/format";
import type {
  CalculatorSchema,
  ComputeInputs,
  ComputeResult,
  InputField,
  OutputField,
} from "@/lib/calculators/schema-types";
import type { CalculatorRuntimeProps } from "@/types/calculator";

interface Props extends CalculatorRuntimeProps {
  schema: CalculatorSchema;
}

function defaultsFor(inputs: InputField[]): ComputeInputs {
  const out: ComputeInputs = {};
  for (const f of inputs) {
    if (f.default !== undefined) out[f.id] = f.default;
    else if (f.kind === "toggle") out[f.id] = false;
    else if (f.kind === "select") out[f.id] = f.options?.[0]?.value ?? "";
    else if (f.kind === "text" || f.kind === "textarea") out[f.id] = "";
    else if (f.kind === "date") out[f.id] = new Date().toISOString().slice(0, 10);
    else out[f.id] = 0;
  }
  return out;
}

function formatValue(v: unknown, field: OutputField): string {
  if (v == null || v === "") return "—";
  if (typeof v === "string") return v;
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v !== "number" || !Number.isFinite(v)) {
    return Number.isFinite(v as number) ? String(v) : v === Infinity ? "∞" : "—";
  }
  switch (field.format) {
    case "currency-inr":
      return formatINR(v, { fractionDigits: field.fractionDigits ?? 0 });
    case "currency":
      return formatNumber(v, "en-IN", field.fractionDigits ?? 2);
    case "percent":
      return `${formatNumber(v, "en-IN", field.fractionDigits ?? 2)}%`;
    case "integer":
      return formatNumber(v, "en-IN", 0);
    case "number":
      return formatNumber(v, "en-IN", field.fractionDigits ?? 2);
    case "date":
      return new Date(v).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    default:
      return formatNumber(v, "en-IN", field.fractionDigits ?? 2);
  }
}

function SchemaCalculatorInner({ meta, schema }: Props) {
  const defaults = useMemo(() => defaultsFor(schema.inputs), [schema.inputs]);
  const [values, setValues] = useState<ComputeInputs>(defaults);
  const push = useHistory((s) => s.push);

  const result: ComputeResult = useMemo(() => {
    try {
      return schema.compute(values);
    } catch {
      return {};
    }
  }, [values, schema]);

  useEffect(() => {
    const id = setTimeout(() => {
      push({
        calculatorId: meta.id,
        inputs: values as Record<string, unknown>,
        result: result as Record<string, unknown>,
      });
      track.calculatorCalculate(meta.id);
    }, 800);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const reset = () => setValues(defaults);

  const setField = (id: string, value: string | number | boolean) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  return (
    <CalculatorShell
      meta={meta}
      onReset={reset}
      inputs={
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {schema.inputs.map((f) => (
              <FieldRenderer
                key={f.id}
                field={f}
                value={values[f.id]}
                onChange={(v) => setField(f.id, v)}
              />
            ))}
          </CardContent>
        </Card>
      }
      result={
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 py-4">
            {schema.outputs
              .filter((o) => o.big)
              .map((o) => (
                <BigStat
                  key={o.id}
                  label={o.label}
                  value={formatValue(result[o.id], o)}
                  tone={o.tone ?? "primary"}
                />
              ))}
            {schema.outputs.some((o) => !o.big) && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {schema.outputs
                  .filter((o) => !o.big)
                  .map((o) => (
                    <Stat
                      key={o.id}
                      label={o.label}
                      value={formatValue(result[o.id], o)}
                      tone={o.tone}
                    />
                  ))}
              </div>
            )}
            {schema.formula && (
              <p className="text-text-tertiary mt-2 text-xs">
                <span className="font-semibold">Formula:</span> {schema.formula}
              </p>
            )}
          </CardContent>
        </Card>
      }
    />
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: InputField;
  value: string | number | boolean | undefined;
  onChange: (v: string | number | boolean) => void;
}) {
  if (field.kind === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-sm font-medium">{field.label}</label>
        <select
          value={String(value ?? "")}
          onChange={(e) => {
            const v = field.options?.find((o) => String(o.value) === e.target.value)?.value;
            onChange(v ?? e.target.value);
          }}
          className="bg-surface-elevated text-text border-border focus:border-primary h-11 w-full rounded-lg border px-3 text-sm outline-none"
        >
          {field.options?.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
        {field.hint && <p className="text-text-tertiary text-xs">{field.hint}</p>}
      </div>
    );
  }
  if (field.kind === "toggle") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-sm font-medium">{field.label}</label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={value ? "primary" : "secondary"}
            onClick={() => onChange(true)}
            className="flex-1"
          >
            Yes
          </Button>
          <Button
            size="sm"
            variant={!value ? "primary" : "secondary"}
            onClick={() => onChange(false)}
            className="flex-1"
          >
            No
          </Button>
        </div>
      </div>
    );
  }
  if (field.kind === "textarea") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-sm font-medium">{field.label}</label>
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="bg-surface-elevated text-text border-border focus:border-primary min-h-[100px] w-full rounded-lg border p-3 text-sm outline-none"
          placeholder={field.hint}
        />
      </div>
    );
  }
  return (
    <Input
      label={field.label}
      type={field.kind === "date" ? "date" : field.kind === "text" ? "text" : "number"}
      value={value as string | number}
      onChange={(e) => {
        const v =
          field.kind === "date" || field.kind === "text"
            ? e.target.value
            : Number(e.target.value) || 0;
        onChange(v);
      }}
      prefix={field.prefix}
      suffix={field.suffix}
      hint={field.hint}
      min={field.min}
      max={field.max}
      step={field.step}
    />
  );
}

export const SchemaCalculator = memo(SchemaCalculatorInner);
