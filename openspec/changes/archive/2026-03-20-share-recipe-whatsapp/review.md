## Security

- El texto del mensaje se construye con datos de la API (nombre y categoría de receta). Estos valores son de confianza (propios del sistema), pero MUST aplicarse `encodeURIComponent` para evitar URL malformadas y cualquier intento de inyección en el parámetro `text`.
- No se envía información sensible: el mensaje solo incluye nombre, categoría y URL pública.
- El enlace abre en `target="_blank"` — MUST incluir `rel="noopener noreferrer"` para evitar acceso al contexto padre desde la pestaña abierta.

## Performance

- Sin impacto en rendimiento: no hay requests adicionales, no se cargan librerías externas.
- El botón solo aparece cuando la receta ya está cargada — sin overhead en estados de carga.
- La función de construcción de URL es O(1) y se ejecuta solo on-click.

## Accessibility

- El botón MUST tener texto visible descriptivo ("Compartir por WhatsApp") o un `aria-label` equivalente.
- MUST ser navegable con teclado (Enter/Space para activar).
- El color verde de WhatsApp debe tener contraste suficiente (≥ 4.5:1) contra el fondo — verificar con Tailwind.
- El ícono decorativo (si se añade) MUST tener `aria-hidden="true"`.

## Testing

- **Happy path:** clic en el botón abre `wa.me/?text=...` con nombre, categoría y URL codificados correctamente.
- **Formato del mensaje:** verificar que el mensaje incluye los tres campos esperados.
- **Codificación:** caracteres especiales en el nombre (ej: "Café & Leche") deben codificarse sin romper la URL.
- **Edge case:** receta con nombre muy largo — la URL sigue siendo válida.
- **Estado de carga/error:** el botón no debe renderizarse cuando `isLoading` o `isError` es true.

## Sign-off

- [x] Security reviewed
- [x] Performance reviewed
- [x] Accessibility reviewed
- [x] Testing plan defined
