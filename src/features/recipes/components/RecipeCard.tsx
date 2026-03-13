import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
            {recipe.category}
          </span>
          <span className="text-sm text-gray-600">{recipe.difficulty}</span>
          <span className="text-sm text-gray-500">{recipe.prepTime} min</span>
        </div>
      </div>
    </div>
  );
}
