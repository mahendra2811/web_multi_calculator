import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const AUTOMOTIVE_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "fuel-cost",
    inputs: [
      { id: "distance", label: "Distance (km)", kind: "number", default: 500 },
      { id: "mileage", label: "Mileage (km/L)", kind: "number", default: 15 },
      { id: "price", label: "Fuel price (₹/L)", kind: "currency", default: 100 },
    ],
    outputs: [
      { id: "fuel", label: "Fuel needed (L)", format: "number", fractionDigits: 2 },
      { id: "cost", label: "Total cost", format: "currency-inr", tone: "primary", big: true },
      { id: "perKm", label: "Cost per km", format: "currency-inr", fractionDigits: 2 },
    ],
    compute: (i) => {
      const fuel = numF(i.distance) / Math.max(0.001, numF(i.mileage));
      const cost = fuel * numF(i.price);
      return { fuel, cost, perKm: cost / Math.max(1, numF(i.distance)) };
    },
  },
  {
    slug: "mileage",
    inputs: [
      { id: "distance", label: "Distance covered (km)", kind: "number", default: 450 },
      { id: "fuel", label: "Fuel used (L)", kind: "number", default: 30 },
    ],
    outputs: [
      {
        id: "kmpl",
        label: "Mileage (km/L)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "mpg", label: "MPG (US)", format: "number", fractionDigits: 2 },
      { id: "lp100", label: "L/100 km", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const kmpl = numF(i.distance) / Math.max(0.001, numF(i.fuel));
      return { kmpl, mpg: kmpl * 2.35215, lp100: 100 / kmpl };
    },
  },
  {
    slug: "trip-cost",
    inputs: [
      {
        id: "distances",
        label: "Leg distances (km, comma)",
        kind: "text",
        default: "200, 350, 150",
      },
      { id: "mileage", label: "Mileage (km/L)", kind: "number", default: 15 },
      { id: "price", label: "Fuel price (₹/L)", kind: "currency", default: 100 },
    ],
    outputs: [
      { id: "totalDist", label: "Total distance", format: "number", suffix: " km" },
      {
        id: "totalCost",
        label: "Total fuel cost",
        format: "currency-inr",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const ds = String(i.distances)
        .split(/[,\s]+/)
        .map(Number)
        .filter(Number.isFinite);
      const total = ds.reduce((s, v) => s + v, 0);
      return { totalDist: total, totalCost: (total / numF(i.mileage)) * numF(i.price) };
    },
  },
  {
    slug: "horsepower",
    inputs: [
      { id: "torque", label: "Torque (Nm)", kind: "number", default: 200 },
      { id: "rpm", label: "RPM", kind: "number", default: 5000 },
    ],
    outputs: [
      {
        id: "hp",
        label: "Horsepower",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "kw", label: "Kilowatts", format: "number", fractionDigits: 1 },
    ],
    compute: (i) => {
      const kw = (numF(i.torque) * numF(i.rpm)) / 9549;
      return { hp: kw * 1.341, kw };
    },
  },
  {
    slug: "engine-displacement",
    inputs: [
      { id: "bore", label: "Bore (mm)", kind: "number", default: 80 },
      { id: "stroke", label: "Stroke (mm)", kind: "number", default: 90 },
      { id: "cyl", label: "Cylinders", kind: "number", default: 4 },
    ],
    outputs: [
      { id: "cc", label: "Displacement (cc)", format: "integer", tone: "primary", big: true },
      { id: "litres", label: "Litres", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const v = (Math.PI / 4) * numF(i.bore) ** 2 * numF(i.stroke) * numF(i.cyl);
      return { cc: v / 1000, litres: v / 1000000 };
    },
  },
  {
    slug: "tire-size",
    inputs: [
      { id: "width", label: "Width (mm)", kind: "number", default: 205 },
      { id: "aspect", label: "Aspect ratio %", kind: "number", default: 55 },
      { id: "rim", label: "Rim (inches)", kind: "number", default: 16 },
    ],
    outputs: [
      { id: "diameter", label: "Overall diameter (mm)", format: "number", fractionDigits: 1 },
      {
        id: "circumference",
        label: "Circumference (mm)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "revPerKm", label: "Revolutions per km", format: "integer" },
    ],
    compute: (i) => {
      const sidewall = numF(i.width) * (numF(i.aspect) / 100);
      const d = numF(i.rim) * 25.4 + 2 * sidewall;
      const circ = Math.PI * d;
      return { diameter: d, circumference: circ, revPerKm: Math.round(1000000 / circ) };
    },
  },
  {
    slug: "speed-avg",
    inputs: [
      { id: "distance", label: "Distance (km)", kind: "number", default: 100 },
      { id: "hours", label: "Time (hours)", kind: "number", default: 2 },
    ],
    outputs: [
      {
        id: "kmh",
        label: "Average speed",
        format: "number",
        suffix: " km/h",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
      { id: "mph", label: "MPH", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const kmh = numF(i.distance) / Math.max(0.001, numF(i.hours));
      return { kmh, mph: kmh / 1.609 };
    },
  },
  {
    slug: "travel-time",
    inputs: [
      { id: "distance", label: "Distance (km)", kind: "number", default: 300 },
      { id: "speed", label: "Avg speed (km/h)", kind: "number", default: 60 },
    ],
    outputs: [{ id: "time", label: "Estimated time", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const hr = numF(i.distance) / Math.max(0.001, numF(i.speed));
      const h = Math.floor(hr);
      const m = Math.round((hr - h) * 60);
      return { time: `${h}h ${m}m` };
    },
  },
  {
    slug: "lap-time",
    inputs: [
      { id: "distance", label: "Track length (m)", kind: "number", default: 5000 },
      { id: "laps", label: "Total laps", kind: "number", default: 70 },
      { id: "totalTime", label: "Total race time (min)", kind: "number", default: 90 },
    ],
    outputs: [
      { id: "avgLap", label: "Average lap time", format: "text", tone: "primary", big: true },
      { id: "avgSpeed", label: "Average speed (km/h)", format: "number", fractionDigits: 2 },
    ],
    compute: (i) => {
      const totalMin = numF(i.totalTime);
      const laps = Math.max(1, numF(i.laps));
      const lapMin = totalMin / laps;
      const lapSec = lapMin * 60;
      const totalKm = (numF(i.distance) * laps) / 1000;
      return {
        avgLap: `${Math.floor(lapSec / 60)}:${(lapSec % 60).toFixed(2).padStart(5, "0")}`,
        avgSpeed: totalKm / (totalMin / 60),
      };
    },
  },
  {
    slug: "toll-estimate",
    inputs: [
      { id: "distance", label: "Distance (km)", kind: "number", default: 500 },
      { id: "ratePerKm", label: "Toll rate (₹/km)", kind: "number", default: 2.5, step: 0.5 },
      {
        id: "vehicleClass",
        label: "Class",
        kind: "select",
        default: 1,
        options: [
          { value: 1, label: "Car" },
          { value: 2, label: "LCV" },
          { value: 3, label: "Truck/Bus" },
          { value: 4, label: "HCM/MAV" },
        ],
      },
    ],
    outputs: [
      { id: "toll", label: "Estimated toll", format: "currency-inr", tone: "primary", big: true },
    ],
    compute: (i) => ({ toll: numF(i.distance) * numF(i.ratePerKm) * numF(i.vehicleClass) }),
  },
  {
    slug: "ev-charging-cost",
    inputs: [
      { id: "battery", label: "Battery (kWh)", kind: "number", default: 60 },
      { id: "rate", label: "Electricity rate (₹/kWh)", kind: "number", default: 8 },
      { id: "efficiency", label: "Charging efficiency %", kind: "percent", default: 90 },
    ],
    outputs: [
      { id: "cost", label: "Full charge cost", format: "currency-inr", tone: "primary", big: true },
      { id: "perKwh", label: "Effective ₹/kWh", format: "currency-inr", fractionDigits: 2 },
    ],
    compute: (i) => {
      const eff = numF(i.efficiency) / 100;
      const energy = numF(i.battery) / Math.max(0.01, eff);
      return { cost: energy * numF(i.rate), perKwh: numF(i.rate) / eff };
    },
  },
  {
    slug: "ev-vs-petrol",
    inputs: [
      { id: "annualKm", label: "Annual km", kind: "number", default: 12000 },
      { id: "petrolMileage", label: "Petrol mileage (km/L)", kind: "number", default: 15 },
      { id: "petrolPrice", label: "Petrol price (₹/L)", kind: "currency", default: 100 },
      { id: "evRange", label: "EV range per charge (km)", kind: "number", default: 300 },
      { id: "evChargeCost", label: "Cost per full charge (₹)", kind: "currency", default: 480 },
    ],
    outputs: [
      { id: "petrolCost", label: "Petrol annual", format: "currency-inr" },
      { id: "evCost", label: "EV annual", format: "currency-inr" },
      {
        id: "savings",
        label: "Annual EV saving",
        format: "currency-inr",
        tone: "success",
        big: true,
      },
    ],
    compute: (i) => {
      const petrol = (numF(i.annualKm) / numF(i.petrolMileage)) * numF(i.petrolPrice);
      const ev = (numF(i.annualKm) / numF(i.evRange)) * numF(i.evChargeCost);
      return { petrolCost: petrol, evCost: ev, savings: petrol - ev };
    },
  },
];
