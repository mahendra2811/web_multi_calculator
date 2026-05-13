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
