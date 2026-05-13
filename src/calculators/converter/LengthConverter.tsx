"use client";
import { LENGTH_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function LengthConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={LENGTH_UNITS} />;
}
