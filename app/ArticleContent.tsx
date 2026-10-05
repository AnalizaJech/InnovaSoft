import { useMemo, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Lightbulb,
  ListChecks,
  Layers,
  Target,
  Compass,
  ShieldCheck,
  ChevronsUpDown,
} from "lucide-react";
const icons = [BookOpen, Layers, Target, Compass, ShieldCheck, ListChecks];
export function parseArticle(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const sections: { title: string; html: string }[] = [];
  let intro = "";
  let title = "";
  for (const node of Array.from(doc.body.children)) {
    if (node.tagName === "H2" && !title) {
      title = node.textContent?.trim() || "Conceptos esenciales";
      continue;
    }
    if (/^H[2-4]$/.test(node.tagName))
      sections.push({
        title: node.textContent?.trim() || "Concepto",
        html: "",
      });
    else if (sections.length)
      sections[sections.length - 1].html += node.outerHTML;
    else intro += node.outerHTML;
  }
  return { title, intro, sections, text: doc.body.textContent || "" };
}
export default function ArticleContent({ html }: { html: string }) {
  const root = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { title, intro, sections } = useMemo(() => parseArticle(html), [html]);
  return (
    <article ref={root} className="visual-article">
      <section className="concept-intro">
        <span className="concept-icon">
          <Lightbulb size={28} aria-hidden="true" />
        </span>
        <div>
          <span className="eyebrow">EL PUNTO DE PARTIDA</span>
          <h2>{title}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: intro }} />
        </div>
      </section>
      <div className="topic-label">
        <ListChecks size={20} aria-hidden="true" />
        <h2>Explora los conceptos</h2>
        <span>{sections.length} temas</span>
      </div>
      <button
        className="text-button expand-topics"
        onClick={() => {
          root.current?.querySelectorAll("details").forEach((d) => {
            d.open = !expanded;
          });
          setExpanded(!expanded);
        }}
      >
        <ChevronsUpDown size={18} aria-hidden="true" />
        {expanded ? "Cerrar todos los temas" : "Abrir todos los temas"}
      </button>
      <div className="concept-sections">
        {sections.map((section, i) => {
          const Icon = icons[i % icons.length];
          return section.html ? (
            <details className="concept-section" key={i} open={i < 2}>
              <summary>
                <span className="topic-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={21} aria-hidden="true" />
                <h3>{section.title}</h3>
                <ChevronDown
                  className="topic-chevron"
                  size={20}
                  aria-hidden="true"
                />
              </summary>
              <div
                className="prose concept-body"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </details>
          ) : (
            <h3 className="concept-divider" key={i}>
              <Icon size={22} aria-hidden="true" />
              {section.title}
            </h3>
          );
        })}
      </div>
    </article>
  );
}
