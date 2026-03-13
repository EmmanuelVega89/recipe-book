## Context

El listado de recetas ya funciona: `RecipeList` consume `useGetRecipesQuery` y renderiza un grid de `RecipeCard`. Las recetas vienen de `GET /recipes` y las categorías están disponibles en `GET /categories` (JSON Server). Actualmente no hay forma de buscar o filtrar — el usuario ve todas las recetas.

## Goals / Non-Goals

**Goals:**
- Permitir al usuario buscar recetas por texto (nombre y descripción)
- Permitir filtrar por categoría usando datos del endpoint `/categories`
- Combinar ambos filtros (AND lógico)
- Mostrar feedback claro: contador de resultados y estado vacío con filtros

**Non-Goals:**
- Búsqueda server-side (el dataset es pequeño, el filtrado client-side es suficiente)
- Debounce en el input de búsqueda (con 10 recetas no hay impacto de performance)
- Filtros por dificultad o tiempo de preparación
- Persistencia de filtros en URL (query params)

## Decisions

### 1. Filtrado client-side con `useMemo`

Las recetas se obtienen completas con `useGetRecipesQuery` y se filtran en el componente con `useMemo` basado en el estado local de búsqueda y categoría.

**Rationale**: Con un dataset de 10-50 recetas, el filtrado en memoria es instantáneo y evita llamadas adicionales al servidor. JSON Server soporta `?q=` y `?category=` pero añadiría complejidad innecesaria al API slice sin beneficio real.

**Alternativa descartada**: Query params en RTK Query (`/recipes?q=text&category=X`) — requeriría invalidación de cache por cada cambio de filtro y no mejoraría la UX con este volumen de datos.

### 2. Estado de filtros local con `useState`

Los filtros (searchTerm y selectedCategory) se manejan como estado local en `RecipeList` con `useState`, no en Redux.

**Rationale**: El estado de filtros es UI-local — no necesita persistirse ni compartirse con otros componentes. Usar Redux sería over-engineering para estado transitorio de un solo componente.

### 3. Nuevo endpoint `getCategories` en el API slice existente

Se agrega `getCategories` a `recipesApi` en vez de crear un nuevo API slice.

**Rationale**: Las categorías son parte del dominio de recetas. RTK Query permite múltiples endpoints en un solo `createApi`. Las categorías se cachean automáticamente y solo se fetchean una vez.

### 4. Componentes de filtro separados, orquestados por RecipeList

```
RecipeList (container — orquesta filtros + grid)
├── RecipeFilters (layout — agrupa los controles de filtro)
│   ├── SearchBar (input de texto controlado)
│   └── CategoryFilter (dropdown de categorías)
├── Contador de resultados (inline)
└── Grid de RecipeCards (existente)
```

**Rationale**: `SearchBar` y `CategoryFilter` son componentes presentacionales puros (reciben value/onChange). `RecipeFilters` los agrupa visualmente. `RecipeList` mantiene el estado y la lógica de filtrado — es el único componente que necesita conocer ambos filtros.

## Risks / Trade-offs

- **[Performance con datasets grandes]** → El filtrado client-side funciona bien para <100 recetas. Si el catálogo crece significativamente, migrar a filtrado server-side con query params en RTK Query.
- **[Sin debounce]** → Cada keystroke re-filtra. Imperceptible con el dataset actual, pero agregar `useDeferredValue` si aparece lag.
- **[Categorías hardcoded vs API]** → Usamos el endpoint `/categories` para que los filtros se mantengan sincronizados con los datos. Si la API falla, el dropdown queda vacío pero la búsqueda sigue funcionando.
