import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetCategoriesQuery, useCreateRecipeMutation } from "../api/recipesApi";

const recipeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  ingredients: z
    .array(z.object({ value: z.string().min(1, "Ingresa el ingrediente") }))
    .min(1),
  steps: z
    .array(z.object({ value: z.string().min(1, "Ingresa el paso") }))
    .min(1),
  category: z.string().min(1, "Selecciona una categoría"),
  difficulty: z.string().min(1, "Selecciona la dificultad"),
  prepTime: z.coerce.number().min(1, "El tiempo debe ser mayor a 0"),
  imageUrl: z.string().url("Ingresa una URL válida"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export function RecipeForm() {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } =
    useGetCategoriesQuery();
  const [createRecipe, { isLoading: isSubmitting }] = useCreateRecipeMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
      difficulty: "",
      category: "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({ control, name: "steps" });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: RecipeFormData) => {
    setSubmitError(null);
    try {
      const result = await createRecipe({
        name: data.name,
        description: data.description,
        ingredients: data.ingredients.map((i) => i.value),
        steps: data.steps.map((s) => s.value),
        category: data.category,
        difficulty: data.difficulty,
        prepTime: data.prepTime,
        imageUrl: data.imageUrl,
      }).unwrap();
      navigate(`/recipes/${result.id}`);
    } catch {
      setSubmitError("Ocurrió un error al guardar la receta. Intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Nombre de la receta"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Descripción breve de la receta"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría <span className="text-red-500">*</span>
        </label>
        {categoriesError ? (
          <p className="text-sm text-red-600">Error al cargar las categorías.</p>
        ) : (
          <select
            {...register("category")}
            disabled={categoriesLoading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
          >
            <option value="">
              {categoriesLoading ? "Cargando..." : "Selecciona una categoría"}
            </option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Dificultad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dificultad <span className="text-red-500">*</span>
        </label>
        <select
          {...register("difficulty")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Selecciona la dificultad</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
        {errors.difficulty && (
          <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>
        )}
      </div>

      {/* Tiempo de preparación */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tiempo de preparación (minutos) <span className="text-red-500">*</span>
        </label>
        <input
          {...register("prepTime")}
          type="number"
          min={1}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Ej: 30"
        />
        {errors.prepTime && (
          <p className="mt-1 text-sm text-red-600">{errors.prepTime.message}</p>
        )}
      </div>

      {/* URL de imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de imagen <span className="text-red-500">*</span>
        </label>
        <input
          {...register("imageUrl")}
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      {/* Ingredientes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingredientes <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`ingredients.${index}.value`)}
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={`Ingrediente ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                disabled={ingredientFields.length === 1}
                className="px-3 py-2 text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Eliminar ingrediente"
              >
                ✕
              </button>
            </div>
          ))}
          {errors.ingredients && (
            <div>
              {errors.ingredients.map?.((err, i) =>
                err?.value ? (
                  <p key={i} className="text-sm text-red-600">
                    {err.value.message}
                  </p>
                ) : null
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => appendIngredient({ value: "" })}
          className="mt-2 text-sm text-amber-600 hover:text-amber-800 font-medium"
        >
          + Agregar ingrediente
        </button>
      </div>

      {/* Pasos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pasos de preparación <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {stepFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <span className="mt-2 text-sm font-medium text-gray-500 w-5 shrink-0">
                {index + 1}.
              </span>
              <textarea
                {...register(`steps.${index}.value`)}
                rows={2}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder={`Paso ${index + 1}`}
              />
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveStep(index, index - 1)}
                  disabled={index === 0}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  aria-label="Subir paso"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(index, index + 1)}
                  disabled={index === stepFields.length - 1}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  aria-label="Bajar paso"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  disabled={stepFields.length === 1}
                  className="px-2 py-1 text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  aria-label="Eliminar paso"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {errors.steps && (
            <div>
              {errors.steps.map?.((err, i) =>
                err?.value ? (
                  <p key={i} className="text-sm text-red-600">
                    {err.value.message}
                  </p>
                ) : null
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => appendStep({ value: "" })}
          className="mt-2 text-sm text-amber-600 hover:text-amber-800 font-medium"
        >
          + Agregar paso
        </button>
      </div>

      {/* Error general */}
      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      {/* Acciones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          )}
          Guardar receta
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
