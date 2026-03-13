import { useGetRecipesQuery } from "../api/recipesApi";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error al cargar las recetas. Verifica que el servidor esté corriendo.</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No hay recetas disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
