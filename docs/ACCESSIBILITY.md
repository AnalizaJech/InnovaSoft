# Accesibilidad y validación

Revisión realizada durante el rediseño, entre el 3 y el 5 de octubre de 2026. Navegador Chromium integrado en Codex. Las capturas muestran la aplicación real ejecutándose con Vite.

## Comprobación automática

axe-core 4.13.0, reglas WCAG 2 A/AA, WCAG 2.1 AA, WCAG 2.2 AA y buenas prácticas. Evidencias en `docs/audits`:

| Vista                                | Infracciones detectadas | Observaciones                                                                             |
| ------------------------------------ | ----------------------: | ----------------------------------------------------------------------------------------- |
| Ingeniería, contenido expandido      |                       0 | 46 reglas aprobadas                                                                       |
| Arquitectura, contenido expandido    |                       0 | 46 reglas aprobadas                                                                       |
| Normas ISO, contenido expandido      |                       0 | 46 reglas aprobadas                                                                       |
| Verificación y validación, expandido |                       0 | 50 reglas aprobadas; incluye tabla                                                        |
| Costos, contenido expandido          |                       0 | 46 reglas aprobadas                                                                       |
| Biblioteca de escritorio             |                       0 | 9 nodos de contraste sobre fondos complejos requieren revisión manual                     |
| Panel de accesibilidad               |                       0 | 21 reglas aprobadas                                                                       |
| Cuestionario con resultado           |                       0 | Evaluado durante el rediseño; el informe conserva elementos que requerían revisión manual |

La herramienta de auditoría solo se carga en desarrollo con `?audit`. El botón **Ejecutar auditoría** o la tecla **F8** ejecutan la comprobación; no se incluye en el sitio publicado.

## Comprobaciones manuales realizadas

1. Foco visible, controles con nombres accesibles y acceso a contenido mediante teclado. El botón de accesibilidad mantiene su nombre cuando el texto se oculta en móvil.
2. Los diálogos nativos admiten Escape y devuelven el foco al control que los abrió. El formulario de Jech devuelve el foco al campo del mensaje al enviarlo.
3. Texto al 150% a 320 píxeles: biblioteca y módulo de validación sin desbordamiento horizontal del documento. Las tablas pueden desplazarse dentro de su área.
4. Navegación superior y panel del módulo sin superposición: panel desplazado debajo de la barra y estático en móvil y con texto al 150%.
5. Filtros, guardados y lectura completada reflejados en sus vistas. Un cuestionario produjo 4/5 respuestas correctas y mostró la corrección de la quinta.
6. Perfil: un nombre compuesto solo por espacios muestra error, se vincula al campo y dirige allí el foco.
7. Audio: preferencia regional persistente entre módulos; cuando no hay voces en español, se anuncia la limitación. Pruebas unitarias verifican que la selección nunca usa voces de otro idioma y que la fragmentación conserva las palabras.
8. Temas claro y oscuro inspeccionados visualmente. Preferencias de contraste y movimiento disponibles mediante controles nativos.

## Alcance y límites

No se declara conformidad ni certificación WCAG. La automatización no sustituye una evaluación manual completa. Quedan fuera de esta comprobación una sesión con NVDA/JAWS/VoiceOver, todos los dispositivos físicos, zoom del navegador al 400%, y el contenido externo de YouTube y de los PDFs originales.

El navegador de pruebas no dispone de voces de síntesis en español: se verificaron la configuración, persistencia, aviso y lógica de selección, pero no la calidad audible de una voz instalada. Las voces regionales deben comprobarse en el dispositivo final.

## Dirección de diseño

La referencia fue el repositorio original: fotografía de realidad virtual, logotipo manuscrito y acentos rosa, menta y amarillo. La biblioteca se presenta pronto, con filtros visibles y módulos identificables por icono y color. Las acciones con texto usan formas de cápsula; los controles solo con icono son circulares. Los artículos mantienen el contenido íntegro y añaden introducciones destacadas, temas desplegables y listas visuales.

Se aplicó la skill `frontend-design` y una auditoría de Product Design sobre las capturas del diseño previo y del original. Se corrigieron la separación entre navegación y contenido, jerarquía, nombres accesibles, controles que parecían enlaces y el desbordamiento con texto ampliado.

## Revisión de la ampliación (5 de octubre de 2026)

- Rutas React con hash: navegación, enlace antiguo de ingeniería redirigido y salto al contenido sin perder la ruta.
- Menús de audio personalizados: ratón, Home/End, flechas, Enter, Escape y Tab; no hay elementos select nativos en el módulo.
- Foco redondeado azul en superficies claras y menta en superficies oscuras. Los anillos amarillos se sustituyeron manteniendo una indicación visible de teclado.
- Biblioteca sin desbordamiento horizontal a 390 px y a 320 px con texto al 150%.
- Cuestionario nuevo de UX y accesibilidad completado: 5/5, correcciones y puntuación visibles.
- `new-module.json`: axe-core, cero infracciones y cero comprobaciones incompletas en la vista de lectura de UX y accesibilidad.
- `custom-audio.json`: cero infracciones con el menú abierto; el informe anterior al ajuste de referencias ARIA conserva tres comprobaciones incompletas de atributos y una de contraste. No se presenta como una certificación.
