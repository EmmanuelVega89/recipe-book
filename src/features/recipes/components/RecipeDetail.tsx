import { useParams, Link } from "react-router-dom";
import { useGetRecipeByIdQuery } from "../api/recipesApi";

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600" />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">No se pudo cargar la receta.</p>
        <Link to="/" className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium">
          &larr; Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium mb-6">
        &larr; Volver al listado
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-72 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full">
              {recipe.category}
            </span>
            <span className="text-sm text-gray-600">{recipe.difficulty}</span>
            <span className="text-sm text-gray-500">{recipe.prepTime} min</span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{recipe.description}</p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ingredientes</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Preparación</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
