import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MealPlan } from '@/types/meal-plan'

interface ShoppingListProps {
  mealPlan: MealPlan
}

export default function ShoppingList({ mealPlan }: ShoppingListProps) {
  const [shoppingList, setShoppingList] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const generateShoppingList = () => {
      const allIngredients = [
        ...mealPlan.breakfast.ingredients,
        ...mealPlan.lunch.ingredients,
        ...mealPlan.dinner.ingredients
      ]
      const uniqueIngredients = Array.from(new Set(allIngredients))
      setShoppingList(uniqueIngredients)
    }
    generateShoppingList()
  }, [mealPlan])

  const renderItems = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return shoppingList.slice(startIndex, endIndex).map((item, index) => (
      <div key={startIndex + index} className="flex items-center space-x-2">
        <Checkbox id={`item-${startIndex + index}`} />
        <label htmlFor={`item-${startIndex + index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {item}
        </label>
      </div>
    ))
  }, [shoppingList, currentPage])

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Shopping List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {renderItems()}
        </div>
        <div className="flex justify-between mt-4">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {Math.ceil(shoppingList.length / itemsPerPage)}</span>
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(shoppingList.length / itemsPerPage)))} 
            disabled={currentPage === Math.ceil(shoppingList.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

