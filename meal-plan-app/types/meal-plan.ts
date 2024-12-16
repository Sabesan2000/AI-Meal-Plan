export interface UserProfile {
  name: string
  gender: 'male' | 'female' | 'other'
  age: number
  weight: number
  weightUnit: 'kg' | 'lbs'
  height: number
  heightUnit: 'cm' | 'ft'
  heightFeet?: number
  heightInches?: number
  dietaryPreferences: string
  healthGoal: 'lose_weight' | 'bulk' | 'be_healthier'
  allergies: string[]
  dislikes: string[]
  activityLevel: 'light' | 'moderate' | 'very_active'
}

export interface Meal {
  name: string
  nutritionalInfo: string
  ingredients: string[]
  instructions: string[]
  prepTime: string
  calories: number
  imageUrl?: string
}

export interface MealPlan {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
  totalCalories: number
}

