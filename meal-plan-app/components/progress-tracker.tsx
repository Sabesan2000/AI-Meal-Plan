import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserProfile } from '@/types/meal-plan'
import { saveProgress, getProgress } from '@/lib/database'

interface ProgressTrackerProps {
  userProfile: UserProfile
}

export default function ProgressTracker({ userProfile }: ProgressTrackerProps) {
  const [weight, setWeight] = useState<number | ''>('')
  const [progressHistory, setProgressHistory] = useState<{date: string, weight: number}[]>([])

  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getProgress(userProfile.name)
      setProgressHistory(progress)
    }
    fetchProgress()
  }, [userProfile.name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof weight === 'number') {
      await saveProgress(userProfile.name, weight)
      setProgressHistory([...progressHistory, { date: new Date().toISOString(), weight }])
      setWeight('')
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Track Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Current Weight ({userProfile.weightUnit})
            </label>
            <Input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
              className="mt-1"
            />
          </div>
          <Button type="submit">Log Weight</Button>
        </form>
        <div className="mt-4">
          <h4 className="font-bold mb-2">Progress History</h4>
          {progressHistory.length > 0 ? (
            <ul className="space-y-2">
              {progressHistory.map((entry, index) => (
                <li key={index}>
                  {new Date(entry.date).toLocaleDateString()}: {entry.weight} {userProfile.weightUnit}
                </li>
              ))}
            </ul>
          ) : (
            <p>No progress logged yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

