## 1. Implementación del botón en RecipeDetail

- [x] 1.1 Leer el componente `src/features/recipes/components/RecipeDetail.tsx` para entender su estructura actual
- [x] 1.2 Crear la función `buildWhatsAppUrl(name: string, category: string): string` inline en `RecipeDetail.tsx` que construya `https://wa.me/?text=<encodeURIComponent(mensaje)>` con formato: `¡Mira esta receta! 🍽️ *<nombre>* | Categoría: <categoría> <window.location.href>`
- [x] 1.3 Añadir el botón "Compartir por WhatsApp" en el JSX de `RecipeDetail`, visible solo cuando la receta cargó exitosamente (no durante `isLoading` o `isError`)
- [x] 1.4 El botón MUST usar `<a href={buildWhatsAppUrl(...)} target="_blank" rel="noopener noreferrer">` para abrir en nueva pestaña

## 2. Accesibilidad y seguridad

- [x] 2.1 Verificar que el elemento `<a>` tiene texto visible "Compartir por WhatsApp" (o `aria-label` equivalente si se usa solo ícono)
- [x] 2.2 Confirmar que `rel="noopener noreferrer"` está presente en el atributo del enlace

## 3. Verificación

- [x] 3.1 Navegar a `/recipes/:id` y confirmar que el botón "Compartir por WhatsApp" aparece cuando la receta carga correctamente
- [x] 3.2 Hacer clic en el botón y verificar que se abre WhatsApp (app o web) con el mensaje correcto: nombre, categoría y URL de la receta
- [x] 3.3 Verificar que el botón NO aparece en el estado de carga o error
- [x] 3.4 Probar con un nombre con caracteres especiales (acentos, símbolos) y confirmar que la URL se codifica correctamente
