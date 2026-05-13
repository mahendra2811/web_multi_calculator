"use client";
import { MASS_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function MassConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={MASS_UNITS} />;
}
