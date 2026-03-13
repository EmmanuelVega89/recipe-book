## Context

Recipe Book es una aplicación React + TypeScript con Vite que actualmente tiene un store de Redux vacío y un componente App mínimo. La arquitectura está preparada para módulos por dominio en `src/features/` y componentes compartidos en `src/shared/components/`. La API mock (JSON Server) ya expone `GET /recipes` en `localhost:3001` con 10 recetas mexicanas, cada una con: id, name, description, ingredients, steps, category, difficulty, prepTime e imageUrl.

## Goals / Non-Goals

**Goals:**
- Establecer el patrón de data fetching con RTK Query que se reutilizará en toda la aplicación
- Mostrar todas las recetas en un grid responsive de cards
- Definir los tipos del dominio Recipe como base para futuras features

**Non-Goals:**
- Filtrado o búsqueda de recetas (será una feature futura)
- Paginación (el dataset actual es de 10 recetas, no es necesario)
- Detalle de receta individual (click en card)
- Manejo de formularios o CRUD de recetas
- Routing (la app sigue siendo single-page por ahora)

## Decisions

### 1. RTK Query API slice en el feature module

La API slice (`recipesApi`) se define dentro de `src/features/recipes/api/recipesApi.ts` en lugar de en un módulo compartido genérico.

**Rationale**: Mantiene la cohesión del feature module. RTK Query permite combinar múltiples API slices en el store, por lo que cada feature puede definir sus propios endpoints sin conflicto.

**Alternativa descartada**: API slice global en `src/store/api.ts` — agregaría acoplamiento prematuro entre features y complicaría la organización cuando crezca la app.

### 2. Estructura del feature module

```
src/features/recipes/
├── api/
│   └── recipesApi.ts        # RTK Query API slice + hooks exportados
├── components/
│   ├── RecipeList.tsx        # Container: usa hook de RTK Query, maneja loading/error
│   └── RecipeCard.tsx        # Presentacional: recibe Recipe como prop, renderiza la card
└── types/
    └── recipe.ts             # Interface Recipe
```

**Rationale**: Separa responsabilidades claramente — data fetching, presentación y tipos. RecipeList actúa como container (side effects) y RecipeCard es puro presentacional (testeable, reutilizable).

### 3. Tailwind CSS para el layout y estilos de las cards

Se usa Tailwind v4 (ya configurado) con utility classes directas en los componentes.

**Rationale**: Es el approach estándar del proyecto. No requiere dependencias adicionales ni archivos CSS separados. El grid responsive se logra con `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

### 4. Estados de loading y error inline

Los estados de carga y error se manejan directamente en RecipeList con indicadores simples (spinner/mensaje), sin componentes compartidos por ahora.

**Rationale**: Es la primera feature — no hay patrones compartidos que reutilizar aún. Extraer a `shared/components/` cuando aparezca la segunda feature que lo necesite.

## Risks / Trade-offs

- **[Imágenes placeholder]** → Las recetas usan URLs de placehold.co que requieren conexión a internet. Aceptable para el mock; en producción se usarán imágenes reales.
- **[Sin paginación]** → Con 10 recetas no es problema, pero si el dataset crece será necesario agregar paginación o infinite scroll. RTK Query soporta ambos patrones.
- **[Sin error boundary]** → Un error de red muestra un mensaje inline pero no tiene retry automático. RTK Query provee `refetch()` que se puede exponer al usuario más adelante.
