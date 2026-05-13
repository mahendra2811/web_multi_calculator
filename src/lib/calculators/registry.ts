import { lazy, type LazyExoticComponent } from "react";
import type { CalculatorComponent } from "@/types/calculator";

type LazyCalc = LazyExoticComponent<CalculatorComponent>;

export const calculatorRegistry: Record<string, LazyCalc> = {
  // ── Finance (24) ─────────────────────────────────────────────────────
  sip: lazy(() => import("@/calculators/finance/SIPCalculator")),
  lumpsum: lazy(() => import("@/calculators/finance/LumpsumCalculator")),
  emi: lazy(() => import("@/calculators/finance/EMICalculator")),
  "simple-interest": lazy(() => import("@/calculators/finance/SimpleInterestCalculator")),
  "compound-interest": lazy(() => import("@/calculators/finance/CompoundInterestCalculator")),
  "fd-rd": lazy(() => import("@/calculators/finance/FDRDCalculator")),
  ppf: lazy(() => import("@/calculators/finance/PPFCalculator")),
  "currency-converter": lazy(() => import("@/calculators/finance/CurrencyConverter")),
  gst: lazy(() => import("@/calculators/finance/GSTCalculator")),
  "profit-loss": lazy(() => import("@/calculators/finance/ProfitLossCalculator")),
  discount: lazy(() => import("@/calculators/finance/DiscountCalculator")),
  salary: lazy(() => import("@/calculators/finance/SalaryCalculator")),
  "income-tax": lazy(() => import("@/calculators/finance/IncomeTaxCalculator")),
  mortgage: lazy(() => import("@/calculators/finance/MortgageCalculator")),
  retirement: lazy(() => import("@/calculators/finance/RetirementCalculator")),
  roi: lazy(() => import("@/calculators/finance/ROICalculator")),
  nps: lazy(() => import("@/calculators/finance/NPSCalculator")),
  cagr: lazy(() => import("@/calculators/finance/CAGRCalculator")),
  hra: lazy(() => import("@/calculators/finance/HRACalculator")),
  gratuity: lazy(() => import("@/calculators/finance/GratuityCalculator")),
  epf: lazy(() => import("@/calculators/finance/EPFCalculator")),
  "home-loan-vs-rent": lazy(() => import("@/calculators/finance/HomeLoanVsRent")),
  "net-worth": lazy(() => import("@/calculators/finance/NetWorthCalculator")),
  "break-even": lazy(() => import("@/calculators/finance/BreakEvenCalculator")),

  // ── Math (12) ────────────────────────────────────────────────────────
  basic: lazy(() => import("@/calculators/math/BasicCalculator")),
  scientific: lazy(() => import("@/calculators/math/ScientificCalculator")),
  percentage: lazy(() => import("@/calculators/math/PercentageCalculator")),
  fraction: lazy(() => import("@/calculators/math/FractionCalculator")),
  "number-system": lazy(() => import("@/calculators/math/NumberSystemConverter")),
  "prime-checker": lazy(() => import("@/calculators/math/PrimeChecker")),
  "gcd-lcm": lazy(() => import("@/calculators/math/GCDLCMCalculator")),
  statistics: lazy(() => import("@/calculators/math/StatisticsCalculator")),
  matrix: lazy(() => import("@/calculators/math/MatrixCalculator")),
  quadratic: lazy(() => import("@/calculators/math/QuadraticSolver")),
  logarithm: lazy(() => import("@/calculators/math/LogarithmCalculator")),
  "permutation-combination": lazy(() => import("@/calculators/math/PermutationCombination")),

  // ── Health (8) ───────────────────────────────────────────────────────
  bmi: lazy(() => import("@/calculators/health/BMICalculator")),
  bmr: lazy(() => import("@/calculators/health/BMRCalculator")),
  calorie: lazy(() => import("@/calculators/health/CalorieCalculator")),
  "body-fat": lazy(() => import("@/calculators/health/BodyFatCalculator")),
  "ideal-weight": lazy(() => import("@/calculators/health/IdealWeightCalculator")),
  "water-intake": lazy(() => import("@/calculators/health/WaterIntakeCalculator")),
  pregnancy: lazy(() => import("@/calculators/health/PregnancyDueDate")),
  macro: lazy(() => import("@/calculators/health/MacroCalculator")),

  // ── Converter (10) ───────────────────────────────────────────────────
  length: lazy(() => import("@/calculators/converter/LengthConverter")),
  mass: lazy(() => import("@/calculators/converter/MassConverter")),
  temperature: lazy(() => import("@/calculators/converter/TemperatureConverter")),
  area: lazy(() => import("@/calculators/converter/AreaConverter")),
  volume: lazy(() => import("@/calculators/converter/VolumeConverter")),
  speed: lazy(() => import("@/calculators/converter/SpeedConverter")),
  "time-units": lazy(() => import("@/calculators/converter/TimeUnitsConverter")),
  "data-storage": lazy(() => import("@/calculators/converter/DataStorageConverter")),
  energy: lazy(() => import("@/calculators/converter/EnergyConverter")),
  pressure: lazy(() => import("@/calculators/converter/PressureConverter")),

  // ── Date/Time (5) ────────────────────────────────────────────────────
  age: lazy(() => import("@/calculators/datetime/AgeCalculator")),
  "date-diff": lazy(() => import("@/calculators/datetime/DateDiffCalculator")),
  "date-add": lazy(() => import("@/calculators/datetime/DateAddCalculator")),
  "working-days": lazy(() => import("@/calculators/datetime/WorkingDaysCalculator")),
  timezone: lazy(() => import("@/calculators/datetime/TimezoneCalculator")),

  // ── Crypto / Stock (6) ───────────────────────────────────────────────
  "crypto-profit": lazy(() => import("@/calculators/crypto/CryptoProfitCalculator")),
  "staking-yield": lazy(() => import("@/calculators/crypto/StakingYieldCalculator")),
  dca: lazy(() => import("@/calculators/crypto/DCACalculator")),
  "stock-average": lazy(() => import("@/calculators/crypto/StockAverageCalculator")),
  "pe-ratio": lazy(() => import("@/calculators/crypto/PERatioCalculator")),
  "position-size": lazy(() => import("@/calculators/crypto/PositionSizeCalculator")),
};

export function getCalculatorComponent(slug: string): LazyCalc | undefined {
  return calculatorRegistry[slug];
}

export function isCalculatorImplemented(slug: string): boolean {
  return slug in calculatorRegistry;
}

export const IMPLEMENTED_SLUGS: ReadonlySet<string> = new Set(Object.keys(calculatorRegistry));
