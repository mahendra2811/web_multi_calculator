export type BMICategory = "underweight" | "normal" | "overweight" | "obese";

export interface BMIResult {
  bmi: number;
  category: BMICategory;
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  if (heightM <= 0 || weightKg <= 0) {
    return { bmi: 0, category: "underweight" };
  }
  const bmi = weightKg / (heightM * heightM);
  let category: BMICategory = "normal";
  if (bmi < 18.5) category = "underweight";
  else if (bmi < 25) category = "normal";
  else if (bmi < 30) category = "overweight";
  else category = "obese";
  return { bmi, category };
}

export interface BMRInput {
  weightKg: number;
  heightCm: number;
  ageYears: number;
  sex: "male" | "female";
}

export function calculateBMR({ weightKg, heightCm, ageYears, sex }: BMRInput) {
  if (sex === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
}

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";
const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
};

export function calculateTDEE(bmr: number, activity: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIER[activity];
}

export interface BodyFatInput {
  sex: "male" | "female";
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // female only
}
export function calculateBodyFat({ sex, heightCm, neckCm, waistCm, hipCm }: BodyFatInput): number {
  // US Navy method
  if (sex === "male") {
    return (
      495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450
    );
  }
  const hip = hipCm ?? 0;
  return (
    495 / (1.29579 - 0.35004 * Math.log10(waistCm + hip - neckCm) + 0.221 * Math.log10(heightCm)) -
    450
  );
}

export interface IdealWeightInput {
  sex: "male" | "female";
  heightCm: number;
}
export function calculateIdealWeight({ sex, heightCm }: IdealWeightInput) {
  const inches = heightCm / 2.54;
  const over5ft = Math.max(inches - 60, 0);
  const robinson = sex === "male" ? 52 + 1.9 * over5ft : 49 + 1.7 * over5ft;
  const miller = sex === "male" ? 56.2 + 1.41 * over5ft : 53.1 + 1.36 * over5ft;
  const devine = sex === "male" ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
  const hamwi = sex === "male" ? 48 + 2.7 * over5ft : 45.5 + 2.2 * over5ft;
  return { robinson, miller, devine, hamwi };
}

export function calculateWaterIntake(weightKg: number, activityHoursPerDay: number): number {
  // Base: 35 ml/kg of body weight + 350ml per hour of activity
  return weightKg * 35 + activityHoursPerDay * 350;
}

export function calculatePregnancyDueDate(lmpIsoDate: string) {
  const lmp = new Date(lmpIsoDate);
  if (Number.isNaN(lmp.getTime())) return null;
  const due = new Date(lmp);
  due.setDate(due.getDate() + 280); // 40 weeks
  const today = new Date();
  const elapsedDays = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
  const week = Math.floor(elapsedDays / 7);
  let trimester: 1 | 2 | 3 = 1;
  if (week >= 27) trimester = 3;
  else if (week >= 13) trimester = 2;
  return { due, week: Math.max(0, week), trimester };
}

export interface MacroSplit {
  protein: number;
  carbs: number;
  fats: number;
}
export function macroSplit(
  totalCalories: number,
  split: { protein: number; carbs: number; fats: number },
): MacroSplit {
  // split values are percentages summing to 100
  const total = split.protein + split.carbs + split.fats || 100;
  const p = (split.protein / total) * totalCalories;
  const c = (split.carbs / total) * totalCalories;
  const f = (split.fats / total) * totalCalories;
  // grams: protein 4 kcal/g, carbs 4 kcal/g, fats 9 kcal/g
  return { protein: p / 4, carbs: c / 4, fats: f / 9 };
}
