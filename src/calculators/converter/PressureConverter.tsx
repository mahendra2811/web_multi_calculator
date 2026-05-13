"use client";
import { PRESSURE_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function PressureConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={PRESSURE_UNITS} />;
}
