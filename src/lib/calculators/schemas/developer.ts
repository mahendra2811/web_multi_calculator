import type { CalculatorSchema } from "../schema-types";

const numF = (n: unknown) => (typeof n === "number" ? n : Number(n) || 0);

export const DEVELOPER_SCHEMAS: CalculatorSchema[] = [
  {
    slug: "ip-subnet",
    inputs: [
      { id: "cidr", label: "CIDR (e.g. 192.168.1.0/24)", kind: "text", default: "192.168.1.0/24" },
    ],
    outputs: [
      { id: "netmask", label: "Subnet mask", format: "text", tone: "primary", big: true },
      { id: "wildcard", label: "Wildcard", format: "text" },
      { id: "hosts", label: "Usable hosts", format: "integer" },
      { id: "broadcast", label: "Broadcast", format: "text" },
    ],
    compute: (i) => {
      const [ip, bitsStr] = String(i.cidr).split("/");
      const bits = parseInt(bitsStr, 10);
      if (!ip || isNaN(bits) || bits < 0 || bits > 32) return {};
      const octets = ip.split(".").map(Number);
      const maskNum = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
      const ipNum = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
      const broadcast = (ipNum | (~maskNum >>> 0)) >>> 0;
      const toIP = (n: number) =>
        `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;
      return {
        netmask: toIP(maskNum),
        wildcard: toIP(~maskNum >>> 0),
        hosts: bits >= 31 ? 0 : Math.pow(2, 32 - bits) - 2,
        broadcast: toIP(broadcast),
      };
    },
  },
  {
    slug: "subnet-mask-converter",
    inputs: [
      { id: "value", label: "Mask (dotted or /CIDR)", kind: "text", default: "255.255.255.0" },
    ],
    outputs: [
      { id: "cidr", label: "CIDR", format: "text", tone: "primary", big: true },
      { id: "dotted", label: "Dotted decimal", format: "text" },
    ],
    compute: (i) => {
      const s = String(i.value).trim();
      if (s.startsWith("/")) {
        const bits = parseInt(s.slice(1), 10);
        const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
        return {
          cidr: s,
          dotted: `${(mask >>> 24) & 255}.${(mask >>> 16) & 255}.${(mask >>> 8) & 255}.${mask & 255}`,
        };
      }
      const octets = s.split(".").map(Number);
      if (octets.length !== 4) return {};
      const num = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
      let bits = 0;
      for (let k = 0; k < 32; k++) if ((num >>> (31 - k)) & 1) bits++;
      return { cidr: `/${bits}`, dotted: s };
    },
  },
  {
    slug: "mac-lookup",
    inputs: [{ id: "mac", label: "MAC address", kind: "text", default: "00:1A:2B:3C:4D:5E" }],
    outputs: [
      { id: "oui", label: "OUI", format: "text", tone: "primary", big: true },
      { id: "vendor", label: "Vendor", format: "text" },
    ],
    compute: (i) => {
      const cleaned = String(i.mac)
        .replace(/[^0-9A-Fa-f]/g, "")
        .slice(0, 6)
        .toUpperCase();
      const known: Record<string, string> = {
        "001A2B": "Apple",
        F4F5D8: "Google",
        "001E58": "Cisco",
        B827EB: "Raspberry Pi",
        B8278B: "Samsung",
      };
      return { oui: cleaned, vendor: known[cleaned] ?? "Unknown (offline lookup)" };
    },
  },
  {
    slug: "base64",
    inputs: [
      {
        id: "mode",
        label: "Mode",
        kind: "select",
        default: "encode",
        options: [
          { value: "encode", label: "Encode" },
          { value: "decode", label: "Decode" },
        ],
      },
      { id: "text", label: "Input", kind: "textarea", default: "Hello World" },
    ],
    outputs: [{ id: "result", label: "Result", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      try {
        const t = String(i.text);
        return {
          result:
            i.mode === "encode"
              ? btoa(unescape(encodeURIComponent(t)))
              : decodeURIComponent(escape(atob(t))),
        };
      } catch {
        return { result: "Invalid input" };
      }
    },
  },
  {
    slug: "url-encode",
    inputs: [
      {
        id: "mode",
        label: "Mode",
        kind: "select",
        default: "encode",
        options: [
          { value: "encode", label: "Encode" },
          { value: "decode", label: "Decode" },
        ],
      },
      { id: "text", label: "URL", kind: "text", default: "https://example.com/path?key=value 1" },
    ],
    outputs: [{ id: "result", label: "Result", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      try {
        return {
          result:
            i.mode === "encode"
              ? encodeURIComponent(String(i.text))
              : decodeURIComponent(String(i.text)),
        };
      } catch {
        return { result: "Invalid input" };
      }
    },
  },
  {
    slug: "html-entity",
    inputs: [
      {
        id: "mode",
        label: "Mode",
        kind: "select",
        default: "encode",
        options: [
          { value: "encode", label: "Encode" },
          { value: "decode", label: "Decode" },
        ],
      },
      { id: "text", label: "HTML", kind: "textarea", default: "<div>Hi & welcome</div>" },
    ],
    outputs: [{ id: "result", label: "Result", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const t = String(i.text);
      const enc = (s: string) =>
        s.replace(
          /[<>&'"]/g,
          (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] ?? c,
        );
      const dec = (s: string) =>
        s.replace(
          /&(lt|gt|amp|apos|quot);/g,
          (m) => ({ "&lt;": "<", "&gt;": ">", "&amp;": "&", "&apos;": "'", "&quot;": '"' })[m] ?? m,
        );
      return { result: i.mode === "encode" ? enc(t) : dec(t) };
    },
  },
  {
    slug: "hash-generator",
    inputs: [
      { id: "text", label: "Input text", kind: "textarea", default: "hello world" },
      {
        id: "algo",
        label: "Algorithm",
        kind: "select",
        default: "SHA-256",
        options: [
          { value: "SHA-1", label: "SHA-1" },
          { value: "SHA-256", label: "SHA-256" },
          { value: "SHA-384", label: "SHA-384" },
          { value: "SHA-512", label: "SHA-512" },
        ],
      },
    ],
    outputs: [
      { id: "hash", label: "Hash (use browser)", format: "text", tone: "primary", big: true },
    ],
    compute: () => ({ hash: "Run in browser — hash computed via Web Crypto on render" }),
  },
  {
    slug: "uuid-generator",
    inputs: [{ id: "count", label: "How many", kind: "number", default: 1 }],
    outputs: [{ id: "uuids", label: "UUIDs", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const out: string[] = [];
      const n = Math.min(10, Math.max(1, numF(i.count)));
      for (let k = 0; k < n; k++) {
        out.push(
          typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : "—",
        );
      }
      return { uuids: out.join("\n") };
    },
  },
  {
    slug: "password-generator",
    inputs: [
      { id: "length", label: "Length", kind: "number", default: 16 },
      { id: "lower", label: "Lowercase", kind: "toggle", default: true },
      { id: "upper", label: "Uppercase", kind: "toggle", default: true },
      { id: "digits", label: "Digits", kind: "toggle", default: true },
      { id: "symbols", label: "Symbols", kind: "toggle", default: true },
    ],
    outputs: [{ id: "password", label: "Password", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      let pool = "";
      if (i.lower) pool += "abcdefghijklmnopqrstuvwxyz";
      if (i.upper) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (i.digits) pool += "0123456789";
      if (i.symbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      if (!pool) return { password: "Select at least one option" };
      let pw = "";
      for (let k = 0; k < numF(i.length); k++) pw += pool[Math.floor(Math.random() * pool.length)];
      return { password: pw };
    },
  },
  {
    slug: "password-strength",
    inputs: [{ id: "password", label: "Password", kind: "text", default: "Tr0ub4dor&3" }],
    outputs: [
      {
        id: "entropy",
        label: "Entropy (bits)",
        format: "number",
        tone: "primary",
        big: true,
        fractionDigits: 1,
      },
      { id: "verdict", label: "Strength", format: "text" },
    ],
    compute: (i) => {
      const p = String(i.password);
      let pool = 0;
      if (/[a-z]/.test(p)) pool += 26;
      if (/[A-Z]/.test(p)) pool += 26;
      if (/[0-9]/.test(p)) pool += 10;
      if (/[^a-zA-Z0-9]/.test(p)) pool += 33;
      const ent = p.length * Math.log2(Math.max(1, pool));
      const verdict =
        ent < 28
          ? "Very weak"
          : ent < 36
            ? "Weak"
            : ent < 60
              ? "Reasonable"
              : ent < 128
                ? "Strong"
                : "Very strong";
      return { entropy: ent, verdict };
    },
  },
  {
    slug: "random-string",
    inputs: [
      { id: "length", label: "Length", kind: "number", default: 12 },
      {
        id: "charset",
        label: "Charset",
        kind: "select",
        default: "alphanumeric",
        options: [
          { value: "alpha", label: "Alphabet only" },
          { value: "alphanumeric", label: "Alphanumeric" },
          { value: "hex", label: "Hex" },
        ],
      },
    ],
    outputs: [{ id: "result", label: "Random string", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const sets: Record<string, string> = {
        alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        hex: "0123456789abcdef",
      };
      const pool = sets[String(i.charset)] ?? sets.alphanumeric;
      let r = "";
      for (let k = 0; k < numF(i.length); k++) r += pool[Math.floor(Math.random() * pool.length)];
      return { result: r };
    },
  },
  {
    slug: "bandwidth",
    inputs: [
      { id: "size", label: "File size", kind: "number", default: 100 },
      {
        id: "sizeUnit",
        label: "Unit",
        kind: "select",
        default: "MB",
        options: [
          { value: "KB", label: "KB" },
          { value: "MB", label: "MB" },
          { value: "GB", label: "GB" },
        ],
      },
      { id: "speed", label: "Speed", kind: "number", default: 50 },
      {
        id: "speedUnit",
        label: "Speed unit",
        kind: "select",
        default: "Mbps",
        options: [
          { value: "Kbps", label: "Kbps" },
          { value: "Mbps", label: "Mbps" },
          { value: "Gbps", label: "Gbps" },
        ],
      },
    ],
    outputs: [{ id: "time", label: "Download time", format: "text", tone: "primary", big: true }],
    compute: (i) => {
      const sizeM: Record<string, number> = { KB: 0.001, MB: 1, GB: 1000 };
      const speedM: Record<string, number> = { Kbps: 0.001, Mbps: 1, Gbps: 1000 };
      const MB = numF(i.size) * (sizeM[String(i.sizeUnit)] ?? 1);
      const Mbps = numF(i.speed) * (speedM[String(i.speedUnit)] ?? 1);
      const seconds = (MB * 8) / Math.max(0.001, Mbps);
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.round(seconds % 60);
      return { time: `${h}h ${m}m ${s}s` };
    },
  },
  {
    slug: "color-converter",
    inputs: [{ id: "hex", label: "Hex", kind: "text", default: "#0D9488" }],
    outputs: [
      { id: "rgb", label: "RGB", format: "text", tone: "primary", big: true },
      { id: "hsl", label: "HSL", format: "text" },
    ],
    compute: (i) => {
      const h = String(i.hex).replace("#", "");
      if (h.length !== 6) return {};
      const r = parseInt(h.slice(0, 2), 16),
        g = parseInt(h.slice(2, 4), 16),
        b = parseInt(h.slice(4, 6), 16);
      const r1 = r / 255,
        g1 = g / 255,
        b1 = b / 255;
      const max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1);
      let hH = 0,
        s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r1:
            hH = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
            break;
          case g1:
            hH = (b1 - r1) / d + 2;
            break;
          case b1:
            hH = (r1 - g1) / d + 4;
            break;
        }
        hH /= 6;
      }
      return {
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${Math.round(hH * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      };
    },
  },
  {
    slug: "cron-helper",
    inputs: [
      { id: "minute", label: "Minute (0-59 or *)", kind: "text", default: "0" },
      { id: "hour", label: "Hour (0-23 or *)", kind: "text", default: "9" },
      { id: "day", label: "Day of month (1-31 or *)", kind: "text", default: "*" },
      { id: "month", label: "Month (1-12 or *)", kind: "text", default: "*" },
      { id: "weekday", label: "Day of week (0-6 or *)", kind: "text", default: "1-5" },
    ],
    outputs: [
      { id: "cron", label: "Cron expression", format: "text", tone: "primary", big: true },
      { id: "english", label: "In plain English (approx)", format: "text" },
    ],
    compute: (i) => {
      const cron = `${i.minute} ${i.hour} ${i.day} ${i.month} ${i.weekday}`;
      let eng = `At minute ${i.minute}`;
      if (String(i.hour) !== "*") eng += `, hour ${i.hour}`;
      if (String(i.weekday) !== "*") eng += ` on weekday(s) ${i.weekday}`;
      return { cron, english: eng };
    },
  },
];
