# InnovaSoft

Biblioteca de aprendizaje de ingeniería de software en español. React 19.3, TypeScript y Vite, compatible con GitHub Pages.

## Desarrollo

Requiere Node.js 22.12 o posterior compatible con Vite.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## Experiencia

- Cinco módulos originales, 57 videos, 25 preguntas y cinco PDFs.
- Búsqueda por texto completo sin acentos, filtros y búsqueda por voz cuando el navegador la admite.
- Artículos con lectura en voz alta, evaluación con correcciones y retos prácticos con fuentes primarias.
- Guardados, lectura completada, puntuación, tema y perfil local persistidos en el navegador.
- Navegación semántica, enlace para saltar al contenido, foco visible, formularios etiquetados, movimiento reducido, texto ampliable y diseño adaptable.
- Las ocho direcciones HTML originales siguen disponibles.

## Límites del producto

No hay backend ni autenticación real. Las páginas de acceso anteriores ahora ofrecen un perfil local sin contraseñas. Jech es una guía basada en la biblioteca, no una integración de IA. El progreso no se sincroniza entre dispositivos. La disponibilidad de videos depende de YouTube. Los PDFs conservan el contenido original; las ampliaciones están en el sitio. No se declara certificación de accesibilidad.

## Publicación

El workflow `.github/workflows/pages.yml` valida las pruebas, compila y publica `dist` al actualizar `master`. En el repositorio, seleccionar **Settings → Pages → Source → GitHub Actions**. No publicar directamente los archivos fuente: requieren compilación. La base relativa mantiene compatibilidad con `/InnovaSoft/`.

## Estructura

- `app/main.tsx`: biblioteca y guía; `Lesson.tsx` y `Profile.tsx`: módulo y perfil.
- `app/courses.json`: artículos, videos y cuestionarios migrados.
- `app/updates.ts`: ampliaciones y fuentes primarias.
- `app/learning.js`: búsqueda y puntuación, verificadas con Node Test Runner.
- `app/style.css`: tokens, temas, composición y adaptación móvil.
- `public/PDF`: documentos descargables.
- `scripts/migrate.mjs`: regeneración del contenido desde el commit original `27c4433`; no ejecuta scripts del HTML.

## Fuentes de ampliación

- W3C: https://www.w3.org/TR/WCAG22/
- ISO: https://www.iso.org/standard/78176.html
- Google SRE: https://sre.google/workbook/implementing-slos/
- FinOps Foundation: https://www.finops.org/framework/
