"use client";
import { DATA_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function DataStorageConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={DATA_UNITS} />;
}
