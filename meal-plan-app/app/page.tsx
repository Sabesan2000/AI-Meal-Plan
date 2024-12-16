import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-extrabold text-center mb-8 text-green-600">
        Meal Plan Pro
      </h1>
      
      <section className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Vision</h2>
        <p className="text-2xl text-gray-600">
          Revolutionizing nutrition through AI-powered, personalized meal planning. 
          Your path to optimal health starts here.
        </p>
      </section>
      
      <Link href="/meal-plan">
        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          Start Your Plan
        </Button>
      </Link>
    </div>
  )
}

