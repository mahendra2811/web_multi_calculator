"use client";
import { SPEED_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function SpeedConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={SPEED_UNITS} />;
}
