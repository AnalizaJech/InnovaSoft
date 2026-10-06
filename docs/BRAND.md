# InnovaSoft · identidad visual

## Contexto y dirección

Biblioteca educativa de ingeniería de software para estudiantes y personas que comienzan o amplían su formación. Dirección: **conocimiento conectado**. Conserva la fotografía de realidad virtual y la identidad cromática que el usuario aprobó; añade una marca coherente sin cambiar funcionalidades.

El isologo integra una S abstracta, construida con dos piezas enlazadas, con el nombre InnovaSoft. El centro representa una conexión. El nombre utiliza contornos derivados de Space Grotesk 600; ningún SVG necesita descargar fuentes. No incluye texturas, degradados, efectos metálicos ni sombras.

## Paleta

| Token / color | Valor | Uso |
|---|---|---|
| Tinta | `#11151C` | Cabecera, bases oscuras, favicon |
| Papel | `#F6F4EF` | Fondo claro y nombre sobre tinta |
| Menta | `#98EBCA` | Identidad, conexiones, acentos oscuros |
| Rosa | `#F7B1E4` | Identidad, selección, acentos |
| Texto | `#171A21` | Lectura sobre superficies claras |
| Verde profundo | `#286D52` | Marca clara, progreso y éxito |
| Rosa profundo | `#994875` | Símbolo sobre fondos claros |
| Error | `#A91E33` | Mensajes de validación |
| Foco | `#2459D3` | Indicación de teclado sobre fondos claros |
| Azul auxiliar | `#B4DAF3` | Módulos y clasificación |
| Lavanda auxiliar | `#D5C6F6` | Módulos y clasificación |
| Amarillo auxiliar | `#F5E88C` | Categoría de costos; no anillos en inputs |

Los colores pastel acompañan texto oscuro; no se usan como texto sobre blanco. Éxitos, errores y selección se comunican también con texto, iconos o estados semánticos. Los inputs conservan su superficie y caret, sin el halo adicional rechazado por el usuario.

## Tipografía local

| Función | Familia | Archivos |
|---|---|---|
| Títulos, nombre | Space Grotesk, 300–700 | `public/fonts/space-grotesk.woff2` |
| Lectura, botones, formularios | Atkinson Hyperlegible, 400 y 700 | `atkinson-regular.woff2`, `atkinson-bold.woff2` |
| Código y contenido técnico | IBM Plex Mono, 400 | `public/fonts/plex-mono.woff2` |

Todas las fuentes se sirven desde el proyecto mediante `@font-face` y `font-display: swap`. No se consulta Google Fonts en ejecución. Los archivos se obtuvieron del repositorio oficial [Google Fonts](https://github.com/google/fonts); las licencias SIL Open Font License de cada familia se incluyen en `public/fonts/*-OFL.txt`.

## Archivos y reglas de uso

- `public/src/innovasoft-isologo-dark.svg`: composición integrada para fondos oscuros.
- `public/src/innovasoft-isologo-light.svg`: composición integrada para fondos claros.
- Los PNG correspondientes son exportaciones con transparencia a 1200 px, para documentación y aplicaciones externas.
- `public/src/innovasoft-symbol.svg`: favicon con fondo circular de tinta, simplificado para tamaños pequeños; PNG a 32, 180 y 512 px.
- `scripts/create-brand.py`: reproduce los contornos del nombre a partir de la fuente local. Requiere Python, fonttools y brotli; estas herramientas no son dependencias de la aplicación.

Mantener la proporción original. Reservar alrededor de la composición un espacio libre de al menos 8 unidades del SVG de 64 de alto. No separar nombre y símbolo dentro de la cabecera: se utiliza un único archivo y un único enlace accesible. El favicon usa solo el símbolo. No deformar, rotar ni aplicar filtros al isologo. Elegir la variante según el fondo y evitar colocarlo sobre fotografías sin una superficie sólida.

La cabecera emplea 226 px de ancho en escritorio; la composición se adapta a 178 y 140 px en móvil. El pie reutiliza la misma marca. El título de la pestaña conserva un texto descriptivo del módulo y utiliza el favicon simplificado.

## Brief y prompts utilizados

**Brief de diseño:** “Crear un isologo vectorial original para InnovaSoft, biblioteca educativa de ingeniería de software. Concepto: conocimiento conectado. Integrar una S abstracta formada por dos piezas enlazadas con el nombre completo en una composición compacta. Colores planos menta y rosa, tinta y papel. Transparencia real, contornos limpios, sin iconos de catálogo, texturas ni efectos metálicos. Derivar un favicon legible a 16–32 px”.

**Refinamiento:** “Mantener el nombre en contornos; equilibrar su altura óptica con el símbolo; ofrecer variantes para superficies claras y oscuras; adaptar el espacio ocupado a móvil sin recortar ni deformar”.

Se implementó directamente en SVG y se exportó con Sharp. No se usó generación raster por IA ni se presentan estos briefs como llamadas a un modelo de imágenes. La geometría es propia; la tipografía tiene licencia abierta. No se ha efectuado una búsqueda de registro de marca.

## Verificación

Compilación TypeScript/Vite, comprobación visual de transparencia y contornos y revisión del diseño en escritorio y móvil. Las URLs de fuentes en producción son relativas al despliegue de GitHub Pages. La marca no depende de servicios de fuentes externos.
