import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { load } from "cheerio";
const meta = [
  [
    "engineering",
    "Software-Engineering.html",
    "Ingeniería de software",
    "Construye una base sólida para desarrollar productos que resuelven problemas reales.",
    "ingenieria.pdf",
    "Fundamentos",
    "01",
    "code",
  ],
  [
    "architecture",
    "Software-Architecture.html",
    "Arquitectura de software",
    "Toma decisiones de diseño para crear sistemas mantenibles y escalables.",
    "arquitectura.pdf",
    "Diseño de sistemas",
    "02",
    "layers",
  ],
  [
    "iso",
    "iso-norms.html",
    "Normas ISO",
    "Entiende los estándares que orientan la calidad y la seguridad del software.",
    "ISO.pdf",
    "Calidad",
    "03",
    "shield",
  ],
  [
    "validation",
    "Verification-Validation.html",
    "Verificación y validación",
    "Comprueba que construyes correctamente el producto que tus usuarios necesitan.",
    "Validacion.pdf",
    "Calidad",
    "04",
    "check",
  ],
  [
    "costs",
    "Costs-budgets.html",
    "Costos y presupuestos",
    "Estima, planifica y controla los recursos de tu próximo proyecto.",
    "Costos.pdf",
    "Gestión",
    "05",
    "chart",
  ],
];
const courses = meta.map(
  ([id, file, title, description, pdf, category, number, icon]) => {
    const source = execFileSync(
      "git",
      ["show", "27c44332b6c105a6db8d347ee9f9dc65900ec8a5:" + file],
      { encoding: "utf8" },
    );
    const $ = load(source);
    const article = $("#Contenido");
    article.find("*").each((_, el) => {
      for (const key of Object.keys(el.attribs ?? {})) $(el).removeAttr(key);
    });
    article.find("h2").each((i, e) => {
      if (i > 0) {
        e.tagName = "h3";
        e.name = "h3";
      }
    });
    const answers = Object.fromEntries(
      [...source.matchAll(/question(\d+):\s*["']([abc])["']/g)].map((m) => [
        "question" + m[1],
        m[2],
      ]),
    );
    const questions = $("#quizSection form > div")
      .toArray()
      .filter((el) => $(el).find("input[type=radio]").length)
      .map((el) => ({
        prompt: $(el).find("p").first().text().trim(),
        options: $(el)
          .find("label")
          .toArray()
          .map((l) => ({
            value: $(l).find("input").attr("value"),
            text: $(l).text().trim(),
          })),
        answer: answers[$(el).find("input").first().attr("name")],
      }));
    return {
      id,
      file,
      title,
      description,
      pdf,
      category,
      number,
      icon,
      article: article.html(),
      questions,
      videos: $("iframe")
        .toArray()
        .map((el) => $(el).attr("src")),
      minutes: Math.max(8, Math.ceil(article.text().split(/\s+/).length / 180)),
    };
  },
);
fs.writeFileSync("app/courses.json", JSON.stringify(courses, null, 2));
console.log(
  courses
    .map(
      (c) =>
        `${c.title}: ${c.questions.length} preguntas, ${c.videos.length} videos`,
    )
    .join("\n"),
);
