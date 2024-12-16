'use client'

import { useState, useCallback, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateMealPlan } from '@/lib/meal-plan-generator'
import { MealPlan, UserProfile } from '@/types/meal-plan'
import MealPlanDisplay from './meal-plan-display'
import ProgressTracker from './progress-tracker'
import ShoppingList from './shopping-list'
import ErrorBoundary from './error-boundary'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
  age: z.number().min(1).max(120, {
    message: 'Age must be between 1 and 120.',
  }),
  weight: z.number().min(1).max(500, {
    message: 'Weight must be between 1 and 500.',
  }),
  weightUnit: z.enum(['kg', 'lbs']),
  height: z.number().min(1).max(300, {
    message: 'Height must be between 1 and 300 cm, or 1 and 118 inches.',
  }).optional(),
  heightFeet: z.number().min(0).max(9, {
    message: 'Feet must be between 0 and 9.',
  }).optional(),
  heightInches: z.number().min(0).max(11, {
    message: 'Inches must be between 0 and 11.',
  }).optional(),
  heightUnit: z.enum(['cm', 'ft']),
  dietaryPreferences: z.enum(['none', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'gluten_free', 'dairy_free', 'low_carb'], {
    required_error: 'Please select a dietary preference.',
  }),
  healthGoal: z.enum(['lose_weight', 'bulk', 'be_healthier'], {
    required_error: 'Please select a health goal.',
  }),
  allergies: z.string().optional(),
  dislikes: z.string().optional(),
  activityLevel: z.enum(['light', 'moderate', 'very_active'], {
    required_error: 'Please select an activity level.',
  }),
})

type FormData = z.infer<typeof formSchema>

export default function MealPlanForm() {
  const [currentStep, setCurrentStep] = useState<'form' | 'result' | 'mealPlan' | 'progress' | 'shopping'>('form')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [maintenanceCalories, setMaintenanceCalories] = useState<number | null>(null)
  const [adjustedCalories, setAdjustedCalories] = useState<number | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      age: undefined,
      weight: undefined,
      weightUnit: 'kg',
      height: undefined,
      heightFeet: undefined,
      heightInches: undefined,
      heightUnit: 'cm',
      dietaryPreferences: 'none',
      healthGoal: 'be_healthier',
      allergies: '',
      dislikes: '',
      activityLevel: 'moderate',
    },
  })

  const watchHeightUnit = form.watch('heightUnit')

  useEffect(() => {
    if (watchHeightUnit === 'cm') {
      form.setValue('heightFeet', undefined)
      form.setValue('heightInches', undefined)
    } else {
      form.setValue('height', undefined)
    }
  }, [watchHeightUnit, form])

  const calculateMaintenanceCalories = (profile: UserProfile): number => {
    let bmr: number

    // Convert weight to kg if necessary
    const weightInKg = profile.weightUnit === 'lbs' ? profile.weight * 0.45359237 : profile.weight

    // Convert height to cm if necessary
    const heightInCm = profile.heightUnit === 'ft' 
      ? ((profile.heightFeet || 0) * 30.48) + ((profile.heightInches || 0) * 2.54)
      : profile.height || 0

    // Calculate BMR using the Mifflin-St Jeor Equation
    if (profile.gender === 'male') {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * profile.age + 5
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * profile.age - 161
    }

    // Adjust BMR based on activity level
    let activityMultiplier: number
    switch (profile.activityLevel) {
      case 'light':
        activityMultiplier = 1.375
        break
      case 'moderate':
        activityMultiplier = 1.55
        break
      case 'very_active':
        activityMultiplier = 1.725
        break
      default:
        activityMultiplier = 1.55
    }

    return Math.round(bmr * activityMultiplier)
  }

  const onSubmit = useCallback(async (values: FormData) => {
    try {
      setError(null)
      if (values.heightUnit === 'ft') {
        values.height = ((values.heightFeet || 0) * 30.48) + ((values.heightInches || 0) * 2.54)
      }
      const profile: UserProfile = {
        ...values,
        allergies: values.allergies ? values.allergies.split(',').map(item => item.trim()) : [],
        dislikes: values.dislikes ? values.dislikes.split(',').map(item => item.trim()) : []
      }
      setUserProfile(profile)

      const maintenance = calculateMaintenanceCalories(profile)
      setMaintenanceCalories(maintenance)

      let adjusted: number
      switch (profile.healthGoal) {
        case 'lose_weight':
          adjusted = Math.max(1200, maintenance - 500) // Ensure minimum 1200 calories
          break
        case 'bulk':
          adjusted = maintenance + 500
          break
        default:
          adjusted = maintenance
      }
      setAdjustedCalories(adjusted)

      const generatedMealPlan = await generateMealPlan(profile)
      if (!generatedMealPlan) {
        throw new Error('Failed to generate meal plan')
      }
      setMealPlan(generatedMealPlan)
      setCurrentStep('result')
    } catch (error) {
      console.error("Failed to generate meal plan:", error)
      setError(`An error occurred while generating your meal plan: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setMealPlan(null)
    }
  }, [])

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: number | undefined) => void) => {
    const value = e.target.value
    if (value === '') {
      onChange(undefined)
    } else {
      const number = parseFloat(value)
      if (!isNaN(number)) {
        onChange(number)
      }
    }
  }

  return (
    <ErrorBoundary>
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {currentStep === 'form' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} className="bold-input" />
                    </FormControl>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bold-select">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        value={field.value ?? ''}
                        className="bold-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bold-label">Weight</FormLabel>
                      <div className="flex items-center space-x-4">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => handleNumberInput(e, field.onChange)}
                            value={field.value ?? ''}
                            className="bold-input flex-grow"
                          />
                        </FormControl>
                        <FormField
                          control={form.control}
                          name="weightUnit"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value === 'lbs'}
                                  onCheckedChange={(checked) => field.onChange(checked ? 'lbs' : 'kg')}
                                />
                              </FormControl>
                              <Label>{field.value === 'kg' ? 'kg' : 'lbs'}</Label>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormMessage className="text-red-600 font-semibold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heightUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="bold-label">Height Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bold-select">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {watchHeightUnit === 'cm' ? (
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="bold-label">Height (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => handleNumberInput(e, field.onChange)}
                            value={field.value ?? ''}
                            className="bold-input"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 font-semibold" />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="heightFeet"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="bold-label">Feet</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => handleNumberInput(e, field.onChange)}
                              value={field.value ?? ''}
                              className="bold-input"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-semibold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="heightInches"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="bold-label">Inches</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => handleNumberInput(e, field.onChange)}
                              value={field.value ?? ''}
                              className="bold-input"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600 font-semibold" />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="dietaryPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Dietary Preferences</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bold-select">
                          <SelectValue placeholder="Select your dietary preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No specific preference (All foods)</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian (No meat, may include dairy and eggs)</SelectItem>
                        <SelectItem value="vegan">Vegan (No animal products)</SelectItem>
                        <SelectItem value="pescatarian">Pescatarian (Vegetarian diet with fish)</SelectItem>
                        <SelectItem value="keto">Keto (High-fat, low-carb)</SelectItem>
                        <SelectItem value="paleo">Paleo (Lean meats, fish, fruits, vegetables, nuts and seeds)</SelectItem>
                        <SelectItem value="gluten_free">Gluten-free (No wheat, barley, rye)</SelectItem>
                        <SelectItem value="dairy_free">Dairy-free (No milk products)</SelectItem>
                        <SelectItem value="low_carb">Low-carb (Reduced carbohydrate intake)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="healthGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Health Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bold-select">
                          <SelectValue placeholder="Select a health goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lose_weight">Lose Weight</SelectItem>
                        <SelectItem value="bulk">Bulk</SelectItem>
                        <SelectItem value="be_healthier">Be Healthier</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Allergies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any food allergies, separated by commas"
                        {...field}
                        className="bold-input"
                      />
                    </FormControl>
                    <FormDescription>
                      List any food allergies you have, separated by commas (e.g., peanuts, shellfish, dairy)
                    </FormDescription>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dislikes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Dislikes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any foods you dislike, separated by commas"
                        {...field}
                        className="bold-input"
                      />
                    </FormControl>
                    <FormDescription>
                      List any foods you dislike, separated by commas (e.g., broccoli, mushrooms, olives)
                    </FormDescription>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="bold-label">Physical Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bold-select">
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light (1-2 times a week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-4 times a week)</SelectItem>
                        <SelectItem value="very_active">Very Active (Everyday)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-600 font-semibold" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bold-button w-full">
                Generate Meal Plan
              </Button>
            </form>
          </Form>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === 'result' && userProfile && (
          <div className="bold-result mt-8">
            <h2 className="bold-result-title">Your Nutrition Profile</h2>
            <div className="bold-result-content">
              <p><span className="bold-result-label">Name:</span> {userProfile.name}</p>
              <p><span className="bold-result-label">Gender:</span> {userProfile.gender}</p>
              <p><span className="bold-result-label">Age:</span> {userProfile.age}</p>
              <p><span className="bold-result-label">Weight:</span> {userProfile.weight} {userProfile.weightUnit}</p>
              <p><span className="bold-result-label">Height:</span> {
                userProfile.heightUnit === 'cm' 
                  ? `${userProfile.height} cm` 
                  : `${userProfile.heightFeet}'${userProfile.heightInches}" (${Math.round(userProfile.height!)} cm)`
              }</p>
              <p><span className="bold-result-label">Dietary Preferences:</span> {userProfile.dietaryPreferences.replace('_', ' ')}</p>
              <p><span className="bold-result-label">Health Goal:</span> {userProfile.healthGoal.replace('_', ' ')}</p>
              <p><span className="bold-result-label">Allergies:</span> {userProfile.allergies.join(', ') || 'None'}</p>
              <p><span className="bold-result-label">Dislikes:</span> {userProfile.dislikes.join(', ') || 'None'}</p>
              <p><span className="bold-result-label">Activity Level:</span> {userProfile.activityLevel.replace('_', ' ')}</p>
              <p><span className="bold-result-label">Maintenance Calories:</span> {maintenanceCalories} calories/day</p>
              <p><span className="bold-result-label">Recommended Daily Calories:</span> {adjustedCalories} calories/day</p>
            </div>
            <div className="mt-6 space-y-4">
              <Button onClick={() => setCurrentStep('mealPlan')} className="w-full">View Meal Plan</Button>
              <Button onClick={() => setCurrentStep('progress')} className="w-full">Track Progress</Button>
              <Button onClick={() => setCurrentStep('shopping')} className="w-full">View Shopping List</Button>
            </div>
          </div>
        )}

        {currentStep === 'mealPlan' && mealPlan && userProfile && (
          <>
            <Button onClick={() => setCurrentStep('result')} className="mb-4">Back to Results</Button>
            <MealPlanDisplay mealPlan={mealPlan} userProfile={userProfile} recommendedCalories={adjustedCalories || 0} />
          </>
        )}

        {currentStep === 'progress' && userProfile && (
          <>
            <Button onClick={() => setCurrentStep('result')} className="mb-4">Back to Results</Button>
            <ProgressTracker userProfile={userProfile} />
          </>
        )}

        {currentStep === 'shopping' && mealPlan && (
          <>
            <Button onClick={() => setCurrentStep('result')} className="mb-4">Back to Results</Button>
            <ShoppingList mealPlan={mealPlan} />
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}

