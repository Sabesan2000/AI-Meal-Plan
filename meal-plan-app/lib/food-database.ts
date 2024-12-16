const foodDatabase = {
  breakfast: [
    {
      name: 'Greek Yogurt Parfait with Berries and Granola',
      nutritionalInfo: 'Calories: 350, Protein: 20g, Carbs: 45g, Fat: 12g',
      ingredients: [
        '1 cup Greek yogurt (0% fat)',
        '1/2 cup mixed berries (strawberries, blueberries, raspberries)',
        '1/4 cup low-fat granola',
        '1 tbsp honey',
        '1 tbsp chia seeds'
      ],
      instructions: [
        'In a glass or bowl, layer half of the Greek yogurt',
        'Add half of the mixed berries on top of the yogurt',
        'Sprinkle half of the granola over the berries',
        'Repeat the layers with the remaining yogurt, berries, and granola',
        'Drizzle honey over the top',
        'Sprinkle chia seeds as a finishing touch'
      ],
      prepTime: '5 minutes',
      calories: 350,
      imageUrl: '/greek-yogurt-parfait.jpg'
    },
    {
      name: 'Avocado Toast with Poached Egg',
      nutritionalInfo: 'Calories: 400, Protein: 18g, Carbs: 30g, Fat: 25g',
      ingredients: [
        '2 slices whole grain bread',
        '1 ripe avocado',
        '2 eggs',
        '1 tsp lemon juice',
        'Salt and pepper to taste',
        'Red pepper flakes (optional)'
      ],
      instructions: [
        'Toast the bread slices',
        'Mash the avocado with lemon juice, salt, and pepper',
        'Spread the avocado mixture on the toast',
        'Poach the eggs and place on top of the avocado toast',
        'Sprinkle with additional salt, pepper, and red pepper flakes if desired'
      ],
      prepTime: '10 minutes',
      calories: 400,
      imageUrl: '/avocado-toast.jpg'
    },
    {
      name: 'Spinach and Mushroom Omelette',
      nutritionalInfo: 'Calories: 300, Protein: 22g, Carbs: 8g, Fat: 20g',
      ingredients: [
        '3 large eggs',
        '1 cup fresh spinach',
        '1/2 cup sliced mushrooms',
        '1 oz feta cheese',
        '1 tsp olive oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Whisk the eggs with salt and pepper',
        'Heat olive oil in a non-stick pan over medium heat',
        'Sauté mushrooms until golden, then add spinach until wilted',
        'Pour the egg mixture over the vegetables',
        'Cook until the eggs are set, then add feta cheese',
        'Fold the omelette and serve'
      ],
      prepTime: '15 minutes',
      calories: 300,
      imageUrl: '/spinach-mushroom-omelette.jpg'
    },
    {
      name: 'Overnight Chia Seed Pudding',
      nutritionalInfo: 'Calories: 250, Protein: 10g, Carbs: 30g, Fat: 15g',
      ingredients: [
        '1/4 cup chia seeds',
        '1 cup almond milk',
        '1 tbsp maple syrup',
        '1/2 tsp vanilla extract',
        '1/4 cup mixed nuts and seeds for topping'
      ],
      instructions: [
        'Mix chia seeds, almond milk, maple syrup, and vanilla extract in a jar',
        'Refrigerate overnight or for at least 4 hours',
        'In the morning, stir the pudding and add more almond milk if needed',
        'Top with mixed nuts and seeds before serving'
      ],
      prepTime: '5 minutes (plus overnight soaking)',
      calories: 250,
      imageUrl: '/chia-seed-pudding.jpg'
    },
    {
      name: 'Whole Grain Breakfast Burrito',
      nutritionalInfo: 'Calories: 450, Protein: 25g, Carbs: 50g, Fat: 20g',
      ingredients: [
        '1 whole grain tortilla',
        '2 scrambled eggs',
        '1/4 cup black beans',
        '1/4 avocado, sliced',
        '2 tbsp salsa',
        '1 tbsp Greek yogurt'
      ],
      instructions: [
        'Warm the tortilla in a pan or microwave',
        'Scramble the eggs and season with salt and pepper',
        'Warm the black beans',
        'Assemble the burrito by layering eggs, beans, avocado, salsa, and Greek yogurt',
        'Roll up the burrito and serve'
      ],
      prepTime: '10 minutes',
      calories: 450,
      imageUrl: '/breakfast-burrito.jpg'
    }
  ],
  lunch: [
    {
      name: 'Quinoa and Black Bean Burrito Bowl',
      nutritionalInfo: 'Calories: 550, Protein: 20g, Carbs: 80g, Fat: 20g',
      ingredients: [
        '1/2 cup cooked quinoa',
        '1/3 cup black beans, drained and rinsed',
        '1/4 avocado, sliced',
        '1/4 cup corn kernels',
        '1/4 cup diced tomatoes',
        '2 tbsp red onion, finely chopped',
        '2 cups mixed salad greens',
        '2 tbsp cilantro, chopped',
        '1 tbsp olive oil',
        '1 tbsp lime juice',
        'Salt and pepper to taste'
      ],
      instructions: [
        'In a bowl, combine cooked quinoa and black beans',
        'Arrange mixed salad greens around the edges of the bowl',
        'Add corn, diced tomatoes, and red onion on top of the quinoa and beans',
        'Place sliced avocado on one side of the bowl',
        'In a small bowl, whisk together olive oil, lime juice, salt, and pepper to make the dressing',
        'Drizzle the dressing over the bowl',
        'Sprinkle chopped cilantro on top',
        'Mix all ingredients together before eating'
      ],
      prepTime: '15 minutes',
      calories: 550,
      imageUrl: '/quinoa-burrito-bowl.jpg'
    },
    {
      name: 'Grilled Chicken Caesar Salad',
      nutritionalInfo: 'Calories: 450, Protein: 35g, Carbs: 15g, Fat: 30g',
      ingredients: [
        '4 oz grilled chicken breast, sliced',
        '3 cups romaine lettuce, chopped',
        '2 tbsp Caesar dressing',
        '1 tbsp grated Parmesan cheese',
        '1/4 cup croutons',
        '1/2 lemon'
      ],
      instructions: [
        'Grill the chicken breast and slice it',
        'In a large bowl, toss the chopped romaine with Caesar dressing',
        'Add the grilled chicken slices on top',
        'Sprinkle with Parmesan cheese and croutons',
        'Serve with a lemon wedge on the side'
      ],
      prepTime: '20 minutes',
      calories: 450,
      imageUrl: '/grilled-chicken-caesar.jpg'
    },
    {
      name: 'Mediterranean Chickpea Salad',
      nutritionalInfo: 'Calories: 400, Protein: 15g, Carbs: 50g, Fat: 20g',
      ingredients: [
        '1 cup chickpeas, drained and rinsed',
        '1 cucumber, diced',
        '1 cup cherry tomatoes, halved',
        '1/4 red onion, finely chopped',
        '1/4 cup Kalamata olives, pitted and halved',
        '2 oz feta cheese, crumbled',
        '2 tbsp olive oil',
        '1 tbsp lemon juice',
        '1 tsp dried oregano',
        'Salt and pepper to taste'
      ],
      instructions: [
        'In a large bowl, combine chickpeas, cucumber, tomatoes, red onion, and olives',
        'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper',
        'Pour the dressing over the salad and toss to combine',
        'Sprinkle crumbled feta cheese on top',
        'Chill for at least 30 minutes before serving'
      ],
      prepTime: '15 minutes',
      calories: 400,
      imageUrl: '/mediterranean-chickpea.jpg'
    },
    {
      name: 'Turkey and Avocado Wrap',
      nutritionalInfo: 'Calories: 500, Protein: 30g, Carbs: 40g, Fat: 25g',
      ingredients: [
        '1 large whole wheat tortilla',
        '4 oz sliced turkey breast',
        '1/2 avocado, sliced',
        '1 slice Swiss cheese',
        '1 cup mixed salad greens',
        '2 slices tomato',
        '1 tbsp mustard'
      ],
      instructions: [
        'Lay the tortilla flat and spread mustard over it',
        'Layer turkey, Swiss cheese, avocado slices, tomato, and mixed greens',
        'Roll the wrap tightly, tucking in the sides as you go',
        'Cut in half diagonally and serve'
      ],
      prepTime: '10 minutes',
      calories: 500,
      imageUrl: '/turkey-avocado-wrap.jpg'
    },
    {
      name: 'Lentil and Vegetable Soup',
      nutritionalInfo: 'Calories: 350, Protein: 18g, Carbs: 60g, Fat: 5g',
      ingredients: [
        '1 cup cooked lentils',
        '2 cups vegetable broth',
        '1 carrot, diced',
        '1 celery stalk, diced',
        '1/4 onion, diced',
        '1 garlic clove, minced',
        '1 cup chopped spinach',
        '1 tsp olive oil',
        '1 tsp dried thyme',
        'Salt and pepper to taste'
      ],
      instructions: [
        'In a pot, heat olive oil and sauté onion, carrot, celery, and garlic until softened',
        'Add vegetable broth, lentils, and thyme. Bring to a boil',
        'Reduce heat and simmer for 15 minutes',
        'Add chopped spinach and cook for an additional 5 minutes',
        'Season with salt and pepper to taste',
        'Serve hot'
      ],
      prepTime: '25 minutes',
      calories: 350,
      imageUrl: '/lentil-vegetable-soup.jpg'
    }
  ],
  dinner: [
    {
      name: 'Baked Lemon Herb Salmon with Roasted Vegetables and Quinoa',
      nutritionalInfo: 'Calories: 650, Protein: 40g, Carbs: 50g, Fat: 35g',
      ingredients: [
        '5 oz salmon fillet',
        '1 cup mixed vegetables (broccoli, carrots, bell peppers)',
        '1/3 cup quinoa, uncooked',
        '1 tbsp olive oil',
        '1 lemon',
        '1 clove garlic, minced',
        '1 tsp dried oregano',
        '1 tsp dried thyme',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Preheat oven to 400°F (200°C)',
        'Cook quinoa according to package instructions',
        'In a small bowl, mix olive oil, juice of half a lemon, minced garlic, oregano, thyme, salt, and pepper',
        'Place salmon on a baking sheet and brush with half of the herb mixture',
        'Toss vegetables with remaining herb mixture and spread around the salmon',
        'Bake for 12-15 minutes or until salmon is cooked through and vegetables are tender',
        'Serve salmon and vegetables over a bed of quinoa',
        'Garnish with remaining lemon wedges'
      ],
      prepTime: '25 minutes',
      calories: 650,
      imageUrl: '/baked-salmon-quinoa.jpg'
    },
    {
      name: 'Grilled Chicken Fajitas',
      nutritionalInfo: 'Calories: 550, Protein: 35g, Carbs: 45g, Fat: 25g',
      ingredients: [
        '4 oz chicken breast, sliced',
        '1 bell pepper, sliced',
        '1 onion, sliced',
        '2 whole wheat tortillas',
        '1 tbsp olive oil',
        '1 tsp chili powder',
        '1 tsp cumin',
        '1/4 cup guacamole',
        '2 tbsp salsa',
        '2 tbsp Greek yogurt'
      ],
      instructions: [
        'Marinate chicken slices in olive oil, chili powder, and cumin for 15 minutes',
        'Grill chicken and vegetables until cooked through and slightly charred',
        'Warm the tortillas',
        'Assemble fajitas with chicken, vegetables, guacamole, salsa, and Greek yogurt'
      ],
      prepTime: '30 minutes',
      calories: 550,
      imageUrl: '/grilled-chicken-fajitas.jpg'
    },
    {
      name: 'Vegetarian Stir-Fry with Tofu',
      nutritionalInfo: 'Calories: 400, Protein: 20g, Carbs: 45g, Fat: 20g',
      ingredients: [
        '4 oz firm tofu, cubed',
        '2 cups mixed vegetables (broccoli, carrots, snap peas)',
        '1/2 cup brown rice, uncooked',
        '1 tbsp sesame oil',
        '1 tbsp soy sauce',
        '1 tsp ginger, minced',
        '1 clove garlic, minced',
        '1 tbsp cornstarch',
        '1/4 cup water'
      ],
      instructions: [
        'Cook brown rice according to package instructions',
        'Press tofu to remove excess water, then cube',
        'In a wok or large pan, heat sesame oil and stir-fry tofu until golden',
        'Add vegetables, ginger, and garlic, stir-fry for 5 minutes',
        'Mix soy sauce, cornstarch, and water, add to the pan',
        'Cook until sauce thickens',
        'Serve over brown rice'
      ],
      prepTime: '25 minutes',
      calories: 400,
      imageUrl: '/vegetarian-stir-fry.jpg'
    },
    {
      name: 'Turkey Meatballs with Zucchini Noodles',
      nutritionalInfo: 'Calories: 450, Protein: 35g, Carbs: 20g, Fat: 25g',
      ingredients: [
        '4 oz ground turkey',
        '1 egg',
        '1/4 cup breadcrumbs',
        '2 medium zucchini',
        '1/2 cup marinara sauce',
        '1 tbsp grated Parmesan cheese',
        '1 tsp olive oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Mix ground turkey, egg, breadcrumbs, salt, and pepper to form meatballs',
        'Bake meatballs at 375°F (190°C) for 20 minutes',
        'Spiralize zucchini to create noodles',
        'In a pan, heat olive oil and sauté zucchini noodles for 2-3 minutes',
        'Heat marinara sauce in a separate pan',
        'Serve meatballs over zucchini noodles, top with marinara sauce and Parmesan cheese'
      ],
      prepTime: '30 minutes',
      calories: 450,
      imageUrl: '/turkey-meatballs-zoodles.jpg'
    },
    {
      name: 'Grilled Portobello Mushroom Steaks',
      nutritionalInfo: 'Calories: 300, Protein: 10g, Carbs: 30g, Fat: 20g',
      ingredients: [
        '2 large portobello mushrooms',
        '1 tbsp balsamic vinegar',
        '1 tbsp olive oil',
        '1 clove garlic, minced',
        '1 tsp dried rosemary',
        '1 cup quinoa, cooked',
        '2 cups mixed salad greens',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Clean mushrooms and remove stems',
        'Mix balsamic vinegar, olive oil, garlic, and rosemary',
        'Brush mushrooms with the mixture and let marinate for 10 minutes',
        'Grill mushrooms for 4-5 minutes per side',
        'Serve over quinoa and mixed salad greens'
      ],
      prepTime: '20 minutes',
      calories: 300,
      imageUrl: '/portobello-mushroom-steak.jpg'
    }
  ],
  snacks: [
    {
      name: 'Greek Yogurt with Berries and Honey',
      nutritionalInfo: 'Calories: 150, Protein: 15g, Carbs: 20g, Fat: 2g',
      ingredients: [
        '1 cup Greek yogurt (0% fat)',
        '1/2 cup mixed berries',
        '1 tsp honey'
      ],
      instructions: [
        'Add Greek yogurt to a bowl',
        'Top with mixed berries',
        'Drizzle honey over the top'
      ],
      prepTime: '5 minutes',
      calories: 150,
      imageUrl: '/greek-yogurt-berries.jpg'
    },
    {
      name: 'Apple Slices with Almond Butter',
      nutritionalInfo: 'Calories: 200, Protein: 7g, Carbs: 25g, Fat: 12g',
      ingredients: [
        '1 medium apple',
        '2 tbsp almond butter'
      ],
      instructions: [
        'Slice the apple',
        'Serve with almond butter for dipping'
      ],
      prepTime: '5 minutes',
      calories: 200,
      imageUrl: '/apple-almond-butter.jpg'
    },
    {
      name: 'Hummus with Carrot Sticks',
      nutritionalInfo: 'Calories: 150, Protein: 5g, Carbs: 15g, Fat: 9g',
      ingredients: [
        '1/4 cup hummus',
        '1 cup carrot sticks'
      ],
      instructions: [
        'Serve hummus in a small bowl',
        'Arrange carrot sticks around the hummus'
      ],
      prepTime: '5 minutes',
      calories: 150,
      imageUrl: '/hummus-carrots.jpg'
    },
    {
      name: 'Trail Mix',
      nutritionalInfo: 'Calories: 180, Protein: 6g, Carbs: 15g, Fat: 13g',
      ingredients: [
        '1/4 cup mixed nuts',
        '2 tbsp dried fruits',
        '1 tbsp dark chocolate chips'
      ],
      instructions: [
        'Mix all ingredients in a small bowl or bag'
      ],
      prepTime: '2 minutes',
      calories: 180,
      imageUrl: '/trail-mix.jpg'
    },
    {
      name: 'Edamame',
      nutritionalInfo: 'Calories: 120, Protein: 11g, Carbs: 10g, Fat: 5g',
      ingredients: [
        '1 cup steamed edamame pods',
        'Sea salt to taste'
      ],
      instructions: [
        'Steam edamame pods',
        'Sprinkle with sea salt'
      ],
      prepTime: '5 minutes',
      calories: 120,
      imageUrl: '/edamame.jpg'
    }
  ]
}

export async function getFoodDatabase() {
  // In a real application, this might involve fetching data from an API or a local database
  return foodDatabase
}

