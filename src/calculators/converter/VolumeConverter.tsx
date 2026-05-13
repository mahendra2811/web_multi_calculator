"use client";
import { VOLUME_UNITS } from "@/lib/calculators/converter";
import UnitConverter from "./UnitConverter";
import type { CalculatorRuntimeProps } from "@/types/calculator";
export default function VolumeConverter(p: CalculatorRuntimeProps) {
  return <UnitConverter {...p} units={VOLUME_UNITS} />;
}
