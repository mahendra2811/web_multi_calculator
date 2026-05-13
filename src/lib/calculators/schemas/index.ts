import type { CalculatorSchema } from "../schema-types";
import { FINANCE_GLOBAL_SCHEMAS } from "./finance-global";
import { FINANCE_INDIA_SCHEMAS } from "./finance-india";
import { MATH_SCHEMAS } from "./math";
import { HEALTH_SCHEMAS } from "./health";
import { DATETIME_SCHEMAS } from "./datetime";
import { CRYPTO_SCHEMAS } from "./crypto";
import { CONVERTER_SCHEMAS } from "./converter";
import { GEOMETRY_SCHEMAS } from "./geometry";
import { CONSTRUCTION_SCHEMAS } from "./construction";
import { AUTOMOTIVE_SCHEMAS } from "./automotive";
import { PHYSICS_SCHEMAS } from "./physics";
import { CHEMISTRY_SCHEMAS } from "./chemistry";
import { ELECTRICAL_SCHEMAS } from "./electrical";
import { COOKING_SCHEMAS } from "./cooking";
import { LIFESTYLE_SCHEMAS } from "./lifestyle";
import { DEVELOPER_SCHEMAS } from "./developer";
import { WEATHER_SCHEMAS } from "./weather";
import { SPORTS_SCHEMAS } from "./sports";

const ALL: CalculatorSchema[] = [
  ...FINANCE_GLOBAL_SCHEMAS,
  ...FINANCE_INDIA_SCHEMAS,
  ...MATH_SCHEMAS,
  ...HEALTH_SCHEMAS,
  ...DATETIME_SCHEMAS,
  ...CRYPTO_SCHEMAS,
  ...CONVERTER_SCHEMAS,
  ...GEOMETRY_SCHEMAS,
  ...CONSTRUCTION_SCHEMAS,
  ...AUTOMOTIVE_SCHEMAS,
  ...PHYSICS_SCHEMAS,
  ...CHEMISTRY_SCHEMAS,
  ...ELECTRICAL_SCHEMAS,
  ...COOKING_SCHEMAS,
  ...LIFESTYLE_SCHEMAS,
  ...DEVELOPER_SCHEMAS,
  ...WEATHER_SCHEMAS,
  ...SPORTS_SCHEMAS,
];

export const SCHEMAS_BY_SLUG: Record<string, CalculatorSchema> = Object.fromEntries(
  ALL.map((s) => [s.slug, s]),
);

export function getSchema(slug: string): CalculatorSchema | undefined {
  return SCHEMAS_BY_SLUG[slug];
}

export const SCHEMA_SLUGS: ReadonlySet<string> = new Set(Object.keys(SCHEMAS_BY_SLUG));
