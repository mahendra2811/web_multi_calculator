import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const WEATHER_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "wind-chill",
    inputs: [
      { id: "tempC", label: "Temperature (°C)", kind: "number", default: 5 },
      { id: "windKmh", label: "Wind speed (km/h)", kind: "number", default: 30 },
    ],
    outputs: [
      {
        id: "feels",
        label: "Feels like",
        format: "number",
        suffix: " °C",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const t = numF(i.tempC),
        v = numF(i.windKmh);
      return {
        feels: 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16),
      };
    },
  },
  {
    slug: "heat-index",
    inputs: [
      { id: "tempC", label: "Temperature (°C)", kind: "number", default: 32 },
      { id: "humidity", label: "Humidity %", kind: "percent", default: 70 },
    ],
    outputs: [
      {
        id: "feels",
        label: "Feels like",
        format: "number",
        suffix: " °C",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const T = (numF(i.tempC) * 9) / 5 + 32;
      const RH = numF(i.humidity);
      const HI =
        -42.379 +
        2.04901523 * T +
        10.14333127 * RH -
        0.22475541 * T * RH -
        0.00683783 * T * T -
        0.05481717 * RH * RH +
        0.00122874 * T * T * RH +
        0.00085282 * T * RH * RH -
        0.00000199 * T * T * RH * RH;
      return { feels: ((HI - 32) * 5) / 9 };
    },
  },
  {
    slug: "dew-point",
    inputs: [
      { id: "tempC", label: "Temperature (°C)", kind: "number", default: 25 },
      { id: "humidity", label: "Humidity %", kind: "percent", default: 60 },
    ],
    outputs: [
      {
        id: "dew",
        label: "Dew point",
        format: "number",
        suffix: " °C",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
    ],
    compute: (i) => {
      const T = numF(i.tempC),
        RH = numF(i.humidity);
      const a = 17.27,
        b = 237.7;
      const alpha = (a * T) / (b + T) + Math.log(Math.max(0.01, RH / 100));
      return { dew: (b * alpha) / (a - alpha) };
    },
  },
  {
    slug: "humidity",
    inputs: [
      { id: "tempC", label: "Temperature (°C)", kind: "number", default: 25 },
      { id: "rh", label: "Relative humidity %", kind: "percent", default: 60 },
    ],
    outputs: [
      {
        id: "absolute",
        label: "Absolute humidity (g/m³)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 2,
      },
    ],
    compute: (i) => {
      const T = numF(i.tempC);
      const sat = 6.112 * Math.exp((17.67 * T) / (T + 243.5));
      const partial = (sat * numF(i.rh)) / 100;
      const absolute = (partial * 2.1674) / (273.15 + T);
      return { absolute: absolute * 1000 };
    },
  },
  {
    slug: "uv-exposure",
    inputs: [
      { id: "uvi", label: "UV index", kind: "number", default: 7 },
      { id: "skinType", label: "Skin type (Fitzpatrick I-VI)", kind: "number", default: 3 },
    ],
    outputs: [
      {
        id: "minutes",
        label: "Time to burn",
        format: "integer",
        suffix: " min",
        tone: "primary",
        big: true,
      },
    ],
    compute: (i) => {
      const base = [10, 12, 20, 30, 40, 60][Math.max(0, Math.min(5, numF(i.skinType) - 1))];
      return { minutes: (base * 6) / Math.max(1, numF(i.uvi)) };
    },
  },
  {
    slug: "sunrise-sunset",
    inputs: [
      { id: "lat", label: "Latitude", kind: "number", default: 19.07 },
      { id: "lon", label: "Longitude", kind: "number", default: 72.88 },
      { id: "date", label: "Date", kind: "date" },
    ],
    outputs: [
      { id: "sunrise", label: "Sunrise (UTC)", format: "text", tone: "primary", big: true },
      { id: "sunset", label: "Sunset (UTC)", format: "text" },
    ],
    compute: (i) => {
      const d = new Date(String(i.date));
      if (isNaN(d.getTime())) return {};
      const N = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
      const lngHour = numF(i.lon) / 15;
      const calc = (rising: boolean) => {
        const t = N + ((rising ? 6 : 18) - lngHour) / 24;
        const M = 0.9856 * t - 3.289;
        let L =
          M +
          1.916 * Math.sin((M * Math.PI) / 180) +
          0.02 * Math.sin((2 * M * Math.PI) / 180) +
          282.634;
        L = (L + 360) % 360;
        let RA = (Math.atan(0.91764 * Math.tan((L * Math.PI) / 180)) * 180) / Math.PI;
        RA = (RA + 360) % 360;
        const Lq = Math.floor(L / 90) * 90;
        const RAq = Math.floor(RA / 90) * 90;
        RA = (RA + (Lq - RAq)) / 15;
        const sinDec = 0.39782 * Math.sin((L * Math.PI) / 180);
        const cosDec = Math.cos(Math.asin(sinDec));
        const cosH =
          (Math.cos((90.833 * Math.PI) / 180) - sinDec * Math.sin((numF(i.lat) * Math.PI) / 180)) /
          (cosDec * Math.cos((numF(i.lat) * Math.PI) / 180));
        if (cosH > 1 || cosH < -1) return null;
        let H = rising
          ? 360 - (Math.acos(cosH) * 180) / Math.PI
          : (Math.acos(cosH) * 180) / Math.PI;
        H /= 15;
        const T = H + RA - 0.06571 * t - 6.622;
        const UT = (T - lngHour + 24) % 24;
        const h = Math.floor(UT);
        const m = Math.floor((UT - h) * 60);
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      };
      return { sunrise: calc(true) ?? "—", sunset: calc(false) ?? "—" };
    },
  },
  {
    slug: "moon-phase",
    inputs: [{ id: "date", label: "Date", kind: "date" }],
    outputs: [
      { id: "phase", label: "Phase", format: "text", tone: "primary", big: true },
      { id: "illumination", label: "Illumination %", format: "percent", fractionDigits: 1 },
    ],
    compute: (i) => {
      const d = new Date(String(i.date));
      if (isNaN(d.getTime())) return {};
      const days = (d.getTime() - new Date(2000, 0, 6).getTime()) / 86400000;
      const cycles = days / 29.530588853;
      const phase = cycles - Math.floor(cycles);
      const names = [
        "New",
        "Waxing crescent",
        "First quarter",
        "Waxing gibbous",
        "Full",
        "Waning gibbous",
        "Last quarter",
        "Waning crescent",
      ];
      const idx = Math.floor(phase * 8) % 8;
      return { phase: names[idx], illumination: Math.abs(Math.cos(phase * 2 * Math.PI)) * 100 };
    },
  },
];
