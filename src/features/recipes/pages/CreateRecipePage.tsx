import { RecipeForm } from "../components/RecipeForm";

export function CreateRecipePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Receta</h2>
      <RecipeForm />
    </div>
  );
}
