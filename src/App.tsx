import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeList } from "./features/recipes/components/RecipeList";
import { RecipeDetail } from "./features/recipes/components/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <h1 className="text-2xl font-bold px-8 py-6">Recipe Book</h1>
        </header>
        <main className="max-w-6xl mx-auto px-8 py-8">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
