"use client";
import { ENERGY_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function EnergyConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={ENERGY_UNITS} />;
}
