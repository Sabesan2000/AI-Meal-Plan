import MealPlanForm from '@/components/meal-plan-form'

export default function MealPlanPage() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-green-600">
        Create Your Meal Plan
      </h1>
      <MealPlanForm />
    </main>
  )
}

