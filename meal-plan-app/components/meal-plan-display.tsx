import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MealPlan, UserProfile, Meal } from '@/types/meal-plan'
import { swapMeal } from '@/lib/meal-plan-generator'
import Image from 'next/image'

interface MealPlanDisplayProps {
  mealPlan: MealPlan
  userProfile: UserProfile
  recommendedCalories: number
}

export default function MealPlanDisplay({ mealPlan, userProfile, recommendedCalories }: MealPlanDisplayProps) {
  const [currentMealPlan, setCurrentMealPlan] = useState(mealPlan)
  const [currentMealType, setCurrentMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')

  const handleSwapMeal = useCallback(async (mealType: 'breakfast' | 'lunch' | 'dinner', currentMeal: Meal) => {
    try {
      const newMeal = await swapMeal(userProfile, mealType, currentMeal)
      setCurrentMealPlan(prevPlan => ({
        ...prevPlan,
        [mealType]: newMeal,
        totalCalories: prevPlan.totalCalories - currentMeal.calories + newMeal.calories
      }))
    } catch (error) {
      console.error("Failed to swap meal:", error)
    }
  }, [userProfile])

  const renderMeal = useCallback((mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const meal = currentMealPlan[mealType]

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}: {meal.name}</CardTitle>
          <CardDescription>{meal.nutritionalInfo}</CardDescription>
          <div className="mb-4">
            <Image
              src={meal.imageUrl || '/placeholder.svg?height=200&width=200'}
              alt={meal.name}
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h4 className="font-bold">Ingredients:</h4>
            <ul className="list-disc list-inside">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Cooking Instructions:</h4>
            <ol className="list-decimal list-inside">
              {meal.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          <p><span className="font-bold">Preparation Time:</span> {meal.prepTime}</p>
          <Button 
            onClick={() => handleSwapMeal(mealType, meal)}
            className="mt-4"
          >
            Swap this meal
          </Button>
        </CardContent>
      </Card>
    )
  }, [currentMealPlan, handleSwapMeal])

  const renderSnack = useCallback((snack: Meal) => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{snack.name}</CardTitle>
          <CardDescription>{snack.nutritionalInfo}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Image
              src={snack.imageUrl || '/placeholder.svg?height=200&width=200'}
              alt={snack.name}
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
          <p><span className="font-bold">Calories:</span> {snack.calories}</p>
          <div className="mb-4">
            <h4 className="font-bold">Ingredients:</h4>
            <ul className="list-disc list-inside">
              {snack.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          {snack.instructions && (
            <div className="mb-4">
              <h4 className="font-bold">Instructions:</h4>
              <ol className="list-decimal list-inside">
                {snack.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Your Personalized Meal Plan</h2>
      <p className="mb-4">Total daily calories: {currentMealPlan.totalCalories}</p>
      <p className="mb-4">Recommended daily calories: {recommendedCalories}</p>
      <p className="mb-4">Difference from recommended: {mealPlan.totalCalories - recommendedCalories} calories</p>
      
      <div className="flex justify-between mb-4">
        <Button onClick={() => setCurrentMealType('breakfast')} variant={currentMealType === 'breakfast' ? 'default' : 'outline'}>Breakfast</Button>
        <Button onClick={() => setCurrentMealType('lunch')} variant={currentMealType === 'lunch' ? 'default' : 'outline'}>Lunch</Button>
        <Button onClick={() => setCurrentMealType('dinner')} variant={currentMealType === 'dinner' ? 'default' : 'outline'}>Dinner</Button>
        <Button onClick={() => setCurrentMealType('snack')} variant={currentMealType === 'snack' ? 'default' : 'outline'}>Snack</Button>
      </div>

      {currentMealType === 'snack' ? (
        <div>
          <h3 className="text-2xl font-bold mb-4">Snack Options</h3>
          {mealPlan.snacks.map((snack, index) => (
            <div key={index} className="mb-6">
              {renderSnack(snack)}
            </div>
          ))}
        </div>
      ) : (
        renderMeal(currentMealType)
      )}
    </div>
  )
}

