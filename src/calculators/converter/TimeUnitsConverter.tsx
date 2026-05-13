"use client";
import { TIME_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function TimeUnitsConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={TIME_UNITS} />;
}
