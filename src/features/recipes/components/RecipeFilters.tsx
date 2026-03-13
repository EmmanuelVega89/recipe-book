import type { Category } from "../types/recipe";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";

interface RecipeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
}

export function RecipeFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: RecipeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <SearchBar value={searchTerm} onChange={onSearchChange} />
      <CategoryFilter
        categories={categories}
        value={selectedCategory}
        onChange={onCategoryChange}
      />
    </div>
  );
}
