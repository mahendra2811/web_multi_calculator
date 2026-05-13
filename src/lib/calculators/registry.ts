import { lazy, type LazyExoticComponent } from "react";
import type { CalculatorComponent } from "@/types/calculator";

type LazyCalc = LazyExoticComponent<CalculatorComponent>;

export const calculatorRegistry: Record<string, LazyCalc> = {
  // Finance
  sip: lazy(() => import("@/calculators/finance/SIPCalculator")),
  // Math
  basic: lazy(() => import("@/calculators/math/BasicCalculator")),
  // Health
  bmi: lazy(() => import("@/calculators/health/BMICalculator")),
};

export function getCalculatorComponent(slug: string): LazyCalc | undefined {
  return calculatorRegistry[slug];
}
