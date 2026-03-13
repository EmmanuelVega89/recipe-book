import type { Category } from "../types/recipe";

interface CategoryFilterProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    >
      <option value="">Todas las categorías</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
