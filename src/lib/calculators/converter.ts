export interface Unit {
  id: string;
  label: string;
  factor: number; // value × factor = base unit
}

export const LENGTH_UNITS: Unit[] = [
  { id: "m", label: "Meter (m)", factor: 1 },
  { id: "km", label: "Kilometer (km)", factor: 1000 },
  { id: "cm", label: "Centimeter (cm)", factor: 0.01 },
  { id: "mm", label: "Millimeter (mm)", factor: 0.001 },
  { id: "in", label: "Inch (in)", factor: 0.0254 },
  { id: "ft", label: "Foot (ft)", factor: 0.3048 },
  { id: "yd", label: "Yard (yd)", factor: 0.9144 },
  { id: "mi", label: "Mile (mi)", factor: 1609.344 },
  { id: "nmi", label: "Nautical mile (nmi)", factor: 1852 },
];

export const MASS_UNITS: Unit[] = [
  { id: "kg", label: "Kilogram (kg)", factor: 1 },
  { id: "g", label: "Gram (g)", factor: 0.001 },
  { id: "mg", label: "Milligram (mg)", factor: 1e-6 },
  { id: "lb", label: "Pound (lb)", factor: 0.45359237 },
  { id: "oz", label: "Ounce (oz)", factor: 0.0283495 },
  { id: "ton", label: "Metric ton", factor: 1000 },
];

export const AREA_UNITS: Unit[] = [
  { id: "m2", label: "Square meter (m²)", factor: 1 },
  { id: "km2", label: "Square kilometer (km²)", factor: 1e6 },
  { id: "cm2", label: "Square centimeter (cm²)", factor: 1e-4 },
  { id: "ft2", label: "Square foot (ft²)", factor: 0.09290304 },
  { id: "in2", label: "Square inch (in²)", factor: 0.00064516 },
  { id: "acre", label: "Acre", factor: 4046.8564224 },
  { id: "hectare", label: "Hectare (ha)", factor: 10000 },
  { id: "mi2", label: "Square mile (mi²)", factor: 2589988.110336 },
];

export const VOLUME_UNITS: Unit[] = [
  { id: "L", label: "Liter (L)", factor: 1 },
  { id: "mL", label: "Milliliter (mL)", factor: 0.001 },
  { id: "m3", label: "Cubic meter (m³)", factor: 1000 },
  { id: "galUS", label: "Gallon (US)", factor: 3.785411784 },
  { id: "galUK", label: "Gallon (UK)", factor: 4.54609 },
  { id: "cup", label: "Cup (US)", factor: 0.2365882365 },
  { id: "tbsp", label: "Tablespoon", factor: 0.01478676478 },
  { id: "tsp", label: "Teaspoon", factor: 0.00492892159 },
];

export const SPEED_UNITS: Unit[] = [
  { id: "m/s", label: "Meter/sec", factor: 1 },
  { id: "km/h", label: "Kilometer/hr", factor: 1 / 3.6 },
  { id: "mph", label: "Miles/hr", factor: 0.44704 },
  { id: "knots", label: "Knots", factor: 0.51444 },
  { id: "ft/s", label: "Feet/sec", factor: 0.3048 },
];

export const TIME_UNITS: Unit[] = [
  { id: "s", label: "Second", factor: 1 },
  { id: "min", label: "Minute", factor: 60 },
  { id: "hr", label: "Hour", factor: 3600 },
  { id: "day", label: "Day", factor: 86400 },
  { id: "week", label: "Week", factor: 604800 },
  { id: "month", label: "Month (30d)", factor: 2592000 },
  { id: "year", label: "Year (365d)", factor: 31536000 },
];

export const DATA_UNITS: Unit[] = [
  { id: "B", label: "Byte", factor: 1 },
  { id: "KB", label: "Kilobyte (1000 B)", factor: 1000 },
  { id: "MB", label: "Megabyte", factor: 1e6 },
  { id: "GB", label: "Gigabyte", factor: 1e9 },
  { id: "TB", label: "Terabyte", factor: 1e12 },
  { id: "KiB", label: "Kibibyte (1024 B)", factor: 1024 },
  { id: "MiB", label: "Mebibyte", factor: 1024 ** 2 },
  { id: "GiB", label: "Gibibyte", factor: 1024 ** 3 },
  { id: "TiB", label: "Tebibyte", factor: 1024 ** 4 },
];

export const ENERGY_UNITS: Unit[] = [
  { id: "J", label: "Joule", factor: 1 },
  { id: "kJ", label: "Kilojoule", factor: 1000 },
  { id: "cal", label: "Calorie", factor: 4.184 },
  { id: "kcal", label: "Kilocalorie", factor: 4184 },
  { id: "Wh", label: "Watt-hour", factor: 3600 },
  { id: "kWh", label: "Kilowatt-hour", factor: 3.6e6 },
  { id: "BTU", label: "BTU", factor: 1055.06 },
];

export const PRESSURE_UNITS: Unit[] = [
  { id: "Pa", label: "Pascal", factor: 1 },
  { id: "kPa", label: "Kilopascal", factor: 1000 },
  { id: "bar", label: "Bar", factor: 100000 },
  { id: "atm", label: "Atmosphere", factor: 101325 },
  { id: "psi", label: "PSI", factor: 6894.757 },
  { id: "mmHg", label: "mmHg", factor: 133.322 },
];

export function convertFactorBased(value: number, from: Unit, to: Unit): number {
  return (value * from.factor) / to.factor;
}

// Temperature has offsets, not just factors
export type TempUnit = "C" | "F" | "K";
export function convertTemperature(value: number, from: TempUnit, to: TempUnit): number {
  let kelvin = value;
  if (from === "C") kelvin = value + 273.15;
  else if (from === "F") kelvin = ((value - 32) * 5) / 9 + 273.15;
  if (to === "K") return kelvin;
  if (to === "C") return kelvin - 273.15;
  return ((kelvin - 273.15) * 9) / 5 + 32;
}
