import { useMemo, useState } from "react";
import { useGetRecipesQuery, useGetCategoriesQuery } from "../api/recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RecipeFilters } from "./RecipeFilters";

export function RecipeList() {
  const { data: recipes, isLoading, isError } = useGetRecipesQuery();
  const { data: categories } = useGetCategoriesQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((recipe) => {
      const matchesSearch =
        !searchTerm ||
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

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

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "";

  return (
    <div>
      <RecipeFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories ?? []}
      />

      <p className="text-sm text-gray-600 mb-4">
        {filteredRecipes.length === 1
          ? "1 receta encontrada"
          : `${filteredRecipes.length} recetas encontradas`}
      </p>

      {filteredRecipes.length === 0 && hasActiveFilters ? (
        <div className="text-center py-12 text-gray-500">
          <p>No se encontraron recetas con los filtros aplicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
