import type { LucideIcon } from "lucide-react";

export type Category =
  | "finance"
  | "finance-india"
  | "math"
  | "health"
  | "converter"
  | "datetime"
  | "crypto"
  | "geometry"
  | "construction"
  | "automotive"
  | "physics"
  | "chemistry"
  | "electrical"
  | "cooking"
  | "lifestyle"
  | "developer"
  | "weather"
  | "sports";

export interface CalculatorMeta {
  id: string;
  name: string;
  shortDesc: string;
  category: Category;
  icon: string;
  keywords?: string[];
  hasChart?: boolean;
  has3DView?: boolean;
}

export interface CategoryMeta {
  id: Category;
  name: string;
  shortDesc: string;
  icon: string;
  color: string;
}

export interface HistoryEntry {
  id: string;
  calculatorId: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  createdAt: number;
}

export interface CalculatorRuntimeProps {
  meta: CalculatorMeta;
}

export type CalculatorComponent = React.ComponentType<CalculatorRuntimeProps>;

export interface CategoryDescriptor {
  category: Category;
  label: string;
  icon: LucideIcon;
}
