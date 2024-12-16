import { UserProfile, MealPlan, Meal } from '@/types/meal-plan'
import { getFoodDatabase } from './food-database'

export async function generateMealPlan(userProfile: UserProfile): Promise<MealPlan> {
  try {
    const foodDatabase = await getFoodDatabase()
    
    if (!foodDatabase || !foodDatabase.breakfast || !foodDatabase.lunch || !foodDatabase.dinner || !foodDatabase.snacks) {
      throw new Error('Food database is not properly initialized')
    }

    const breakfast = generateMeal(foodDatabase.breakfast, userProfile, 'breakfast')
    const lunch = generateMeal(foodDatabase.lunch, userProfile, 'lunch')
    const dinner = generateMeal(foodDatabase.dinner, userProfile, 'dinner')
    const snacks = generateSnacks(foodDatabase.snacks, userProfile, (breakfast.calories + lunch.calories + dinner.calories) * 0.1, 2)

    if (!breakfast || !lunch || !dinner || !snacks) {
      throw new Error('Failed to generate one or more meals')
    }

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snacks.reduce((total, snack) => total + snack.calories, 0)

    return {
      breakfast,
      lunch,
      dinner,
      snacks,
      totalCalories
    }
  } catch (error) {
    console.error('Error in generateMealPlan:', error)
    throw error
  }
}

function generateMeal(meals: Meal[], userProfile: UserProfile, mealType: string): Meal {
  // Filter meals based on user's dietary preferences and allergies
  const suitableMeals = meals.filter(meal => 
    !userProfile.allergies.some(allergy => 
      meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(allergy.toLowerCase()))
    ) &&
    !userProfile.dislikes.some(dislike => 
      meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(dislike.toLowerCase()))
    )
  )

  if (suitableMeals.length === 0) {
    throw new Error(`No suitable ${mealType} found for the user's preferences and restrictions.`)
  }

  const randomIndex = Math.floor(Math.random() * suitableMeals.length)
  return suitableMeals[randomIndex]
}

function generateSnacks(snacks: Meal[], userProfile: UserProfile, targetCalories: number, count: number): Meal[] {
  const suitableSnacks = snacks.filter(snack => 
    !userProfile.allergies.some(allergy => 
      snack.ingredients.some(ingredient => ingredient.toLowerCase().includes(allergy.toLowerCase()))
    ) &&
    !userProfile.dislikes.some(dislike => 
      snack.ingredients.some(ingredient => ingredient.toLowerCase().includes(dislike.toLowerCase()))
    )
  )

  if (suitableSnacks.length === 0) {
    throw new Error(`No suitable snacks found for the user's preferences and restrictions.`)
  }

  suitableSnacks.sort((a, b) => Math.abs(a.calories - targetCalories / count) - Math.abs(b.calories - targetCalories / count))

  return suitableSnacks.slice(0, count)
}

export async function swapMeal(userProfile: UserProfile, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', currentMeal: Meal): Promise<Meal> {
  try {
    const foodDatabase = await getFoodDatabase()
    const meals = mealType === 'snack' ? foodDatabase.snacks : foodDatabase[mealType]

    // Filter out the current meal and apply user preferences
    const availableMeals = meals.filter(meal => 
      meal.name !== currentMeal.name &&
      !userProfile.allergies.some(allergy => 
        meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(allergy.toLowerCase()))
      ) &&
      !userProfile.dislikes.some(dislike => 
        meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(dislike.toLowerCase()))
      )
    )

    if (availableMeals.length === 0) {
      throw new Error(`No suitable alternative ${mealType} found for the user's preferences and restrictions.`)
    }

    const randomIndex = Math.floor(Math.random() * availableMeals.length)
    return availableMeals[randomIndex]
  } catch (error) {
    console.error('Error in swapMeal:', error)
    throw error
  }
}

function calculateTargetCalories(userProfile: UserProfile): number {
  // Placeholder for a more sophisticated calorie calculation based on user profile
  return 2000;
}

