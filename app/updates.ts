export const updates: Record<
  string,
  { title: string; body: string; exercise: string; url: string; source: string }
> = {
  engineering: {
    title: "Accesibilidad desde los requisitos",
    body: "WCAG 2.2 amplía las pautas de accesibilidad. Integra navegación por teclado, foco visible, objetivos táctiles y mensajes de error comprensibles en tus criterios de aceptación.",
    exercise:
      "Define tres criterios de aceptación para un formulario que pueda completarse sin ratón.",
    url: "https://www.w3.org/TR/WCAG22/",
    source: "W3C · WCAG 2.2",
  },
  architecture: {
    title: "Diseña para una confiabilidad medible",
    body: "Un SLI mide el comportamiento del servicio; un SLO fija el objetivo. Usa indicadores centrados en la experiencia del usuario y un presupuesto de error para priorizar mejoras de confiabilidad.",
    exercise:
      "Para un servicio de búsqueda, elige un indicador de latencia y explica cómo medirías su objetivo.",
    url: "https://sre.google/workbook/implementing-slos/",
    source: "Google · SRE Workbook",
  },
  iso: {
    title: "Calidad de producto: ISO/IEC 25010:2023",
    body: "La edición 2023 define un modelo de calidad de producto. Utiliza la norma como marco para especificar y evaluar atributos de calidad; distingue la evaluación de un producto de la certificación de un sistema de gestión.",
    exercise:
      "Elige dos atributos de calidad de tu aplicación y propón evidencia para evaluarlos.",
    url: "https://www.iso.org/standard/78176.html",
    source: "ISO · ISO/IEC 25010:2023",
  },
  validation: {
    title: "Prueba también la experiencia accesible",
    body: "La validación debe comprobar que las personas pueden completar sus tareas. Combina herramientas automáticas con recorridos manuales de teclado y lectores de pantalla. Una prueba automática por sí sola no demuestra conformidad.",
    exercise:
      "Recorre registro, búsqueda y cuestionario usando solo Tab, Enter y las flechas. Documenta cualquier bloqueo.",
    url: "https://www.w3.org/TR/WCAG22/",
    source: "W3C · WCAG 2.2",
  },
  costs: {
    title: "FinOps: costos conectados al valor",
    body: "FinOps reúne a ingeniería, finanzas y negocio para decidir sobre el gasto tecnológico. Identifica el uso, atribuye los costos y evalúa el valor antes de optimizar. Revisa los costos de forma continua.",
    exercise:
      "Estima el costo por usuario activo de un servicio y explica qué decisión permitiría tomar.",
    url: "https://www.finops.org/framework/",
    source: "FinOps Foundation · Framework",
  },
};
