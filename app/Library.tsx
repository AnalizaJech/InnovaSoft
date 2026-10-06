import { courseHref, homeHref, navigate } from "./routes";
import { useEffect, useState, useRef } from "react";
import {
  Search,
  Mic,
  X,
  ArrowUpRight,
  ArrowRight,
  Bookmark,
  BookOpen,
  Code2,
  ShieldCheck,
  Wallet,
  Layers,
  CheckCircle2,
  Play,
  Check,
  GraduationCap,
} from "lucide-react";
import { useStored } from "./storage";
import courses from "./catalog";
import { searchCourses } from "./learning.js";
import type { Progress } from "./types";
const details: Record<
  string,
  { Icon: typeof Code2; label: string; className: string }
> = {
  engineering: { Icon: Code2, label: "DESARROLLA", className: "mint" },
  architecture: { Icon: Layers, label: "DISEÑA", className: "lavender" },
  iso: { Icon: ShieldCheck, label: "ASEGURA", className: "pink" },
  validation: { Icon: CheckCircle2, label: "COMPRUEBA", className: "blue" },
  costs: { Icon: Wallet, label: "PLANIFICA", className: "yellow" },
  git: { Icon: Code2, label: "COLABORA", className: "lavender" },
  web: { Icon: Layers, label: "CONECTA", className: "blue" },
  inclusive: { Icon: GraduationCap, label: "INCLUYE", className: "pink" },
  security: { Icon: ShieldCheck, label: "PROTEGE", className: "mint" },
};
export default function Library({
  view,
  saved,
  onSave,
  progress,
  notify,
}: {
  view: string;
  saved: string[];
  onSave: (id: string) => void;
  progress: Progress;
  notify: (message: string) => void;
}) {
  const [audioLanguage] = useStored("innovasoft:audio-language", "es-CO");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [listening, setListening] = useState(false);
  const recognition = useRef<any>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const previous = useRef(view);
  useEffect(() => {
    if (previous.current !== view) {
      setQuery("");
      setCategory("Todos");
      heading.current?.focus();
      previous.current = view;
    }
  }, [view]);
  useEffect(() => () => recognition.current?.abort(), []);
  const filtered = searchCourses(courses, query).filter(
    (c) =>
      (category === "Todos" || c.category === category) &&
      (view !== "saved" || saved.includes(c.id)),
  );
  const completed = courses.filter((c) => progress[c.id]?.read).length;
  function voice() {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const Recognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      notify(
        "La búsqueda por voz no está disponible aquí. Escribe el tema en el buscador.",
      );
      return;
    }
    const r = new Recognition();
    recognition.current = r;
    r.lang = audioLanguage;
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onerror = () =>
      notify(
        "No se pudo reconocer la voz. Revisa el permiso del micrófono o escribe tu búsqueda.",
      );
    r.onresult = (e: any) => {
      setQuery(e.results[0][0].transcript);
      notify("Búsqueda por voz completada.");
    };
    try {
      r.start();
    } catch {
      setListening(false);
      notify("No se pudo iniciar el micrófono.");
    }
  }
  return (
    <>
      <section className="learning-stage" aria-labelledby="page-title">
        <div className="stage-content">
          <div className="stage-heading">
            <span className="eyebrow">
              <span className="color-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              CONOCIMIENTO QUE ABRE POSIBILIDADES
            </span>
            <h1 id="page-title" ref={heading} tabIndex={-1}>
              {view === "saved" ? (
                <>
                  Tus ideas.
                  <br />
                  <em>A un clic.</em>
                </>
              ) : view === "progress" ? (
                <>
                  Tu camino.
                  <br />
                  <em>Cada paso cuenta.</em>
                </>
              ) : (
                <>
                  Aprende hoy.
                  <br />
                  <em>Construye lo que sigue.</em>
                </>
              )}
            </h1>
            <p>
              {view === "saved"
                ? "Lo que te interesa, reunido para cuando quieras volver."
                : view === "progress"
                  ? "Tu recorrido, tus logros y lo que todavía puedes descubrir."
                  : "Ingeniería, arquitectura y calidad de software. Explora a tu ritmo, conecta ideas y ponlas a prueba."}
            </p>
          </div>
          <div className="stage-caption">
            {view !== "progress" && (
              <form
                className="search"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("modules")
                    ?.scrollIntoView({ block: "start" });
                }}
              >
                <label htmlFor="library-search" className="sr-only">
                  Buscar en la biblioteca
                </label>
                <Search size={23} aria-hidden="true" />
                <input
                  id="library-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Qué quieres aprender hoy?"
                  autoComplete="off"
                />
                {query && (
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Limpiar búsqueda"
                    onClick={() => setQuery("")}
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                )}
                <button
                  className={`voice-button ${listening ? "listening" : ""}`}
                  type="button"
                  aria-label={
                    listening ? "Detener búsqueda por voz" : "Buscar por voz"
                  }
                  aria-pressed={listening}
                  onClick={voice}
                >
                  <Mic size={23} aria-hidden="true" />
                </button>
                <button
                  className="search-submit"
                  aria-label="Ver resultados de búsqueda"
                >
                  <ArrowRight size={23} aria-hidden="true" />
                </button>
              </form>
            )}
            <div className="stage-meta">
              <span>
                <BookOpen size={17} aria-hidden="true" />
                {courses.length} módulos
              </span>
              <span>
                <Play size={16} aria-hidden="true" />
                57 videos
              </span>
              <span>
                <GraduationCap size={19} aria-hidden="true" />
                {courses.reduce((n, c) => n + c.questions.length, 0)} preguntas
              </span>
            </div>

            <a
              className="start-link"
              href={courseHref(
                courses.find((c) => !progress[c.id]?.read)?.id || courses[0].id,
              )}
            >
              <span>
                {completed
                  ? "Continuar aprendiendo"
                  : "Empieza por los fundamentos"}
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>{" "}
        </div>
      </section>
      <div className="library-body">
        {view === "progress" ? (
          <section
            id="modules"
            className="progress-section"
            aria-labelledby="modules-heading"
          >
            <div className="section-title">
              <div>
                <span className="eyebrow">TU RECORRIDO</span>
                <h2 id="modules-heading">Aprender también es avanzar.</h2>
              </div>
              <span className="count-label">
                {completed} de {courses.length} módulos leídos
              </span>
            </div>
            <div className="overall-progress">
              <label htmlFor="overall-progress">
                Lectura completada: {completed * 20}%
              </label>
              <progress
                id="overall-progress"
                max={courses.length}
                value={completed}
              />
            </div>
            <div className="progress-list">
              {courses.map((c) => {
                const { Icon, className } = details[c.id] || {
                  Icon: BookOpen,
                  label: "EXPLORA",
                  className: "mint",
                };
                return (
                  <article key={c.id}>
                    <span className={`progress-icon ${className}`}>
                      <Icon size={27} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>
                        <a href={courseHref(c.id)}>{c.title}</a>
                      </h3>
                      <p>
                        {progress[c.id]?.read
                          ? "Lectura completada"
                          : "Pendiente de lectura"}{" "}
                        ·{" "}
                        {progress[c.id]?.score !== undefined
                          ? `Último cuestionario: ${progress[c.id].score}/5`
                          : "Cuestionario pendiente"}
                      </p>
                    </div>
                    <a
                      className="icon-button"
                      href={courseHref(c.id)}
                      aria-label={`Continuar ${c.title}`}
                    >
                      <ArrowUpRight aria-hidden="true" size={24} />
                    </a>
                  </article>
                );
              })}
            </div>
            <p className="storage-note">
              Tu progreso se guarda en este navegador y no se sincroniza entre
              dispositivos.
            </p>
          </section>
        ) : (
          <section id="modules" aria-labelledby="modules-heading">
            <div className="section-title">
              <div>
                <span className="eyebrow">ELIGE TU PRÓXIMA IDEA</span>
                <h2 id="modules-heading">
                  {view === "saved"
                    ? "Tu colección personal."
                    : "Nuevos temas. Más conexiones."}
                </h2>
              </div>
              <span className="count-label" role="status" aria-live="polite">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "módulo disponible"
                  : "módulos disponibles"}
              </span>
            </div>
            <div
              className="filters"
              role="group"
              aria-label="Filtrar por categoría"
            >
              {["Todos", ...new Set(courses.map((c) => c.category))].map(
                (cat) => (
                  <button
                    key={cat}
                    aria-pressed={category === cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat === "Todos" ? (
                      <BookOpen size={16} aria-hidden="true" />
                    ) : cat === "Fundamentos" ? (
                      <Code2 size={16} aria-hidden="true" />
                    ) : cat === "Diseño de sistemas" ? (
                      <Layers size={16} aria-hidden="true" />
                    ) : cat === "Calidad" ? (
                      <ShieldCheck size={16} aria-hidden="true" />
                    ) : (
                      <Wallet size={16} aria-hidden="true" />
                    )}{" "}
                    {cat}
                  </button>
                ),
              )}
            </div>
            <div className="course-grid">
              {filtered.map((c) => {
                const { Icon, label, className } = details[c.id] || {
                  Icon: BookOpen,
                  label: "EXPLORA",
                  className: "mint",
                };
                return (
                  <article className={`course-card ${className}`} key={c.id}>
                    <div className="card-top">
                      <span className="category">{c.category}</span>
                      <button
                        className="save icon-button"
                        aria-label={`${saved.includes(c.id) ? "Quitar de" : "Añadir a"} guardados: ${c.title}`}
                        aria-pressed={saved.includes(c.id)}
                        onClick={() => onSave(c.id)}
                      >
                        <Bookmark
                          aria-hidden="true"
                          size={21}
                          fill={saved.includes(c.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <div className="card-symbol">
                      <Icon aria-hidden="true" size={55} strokeWidth={1.5} />
                      <span>{label}</span>
                    </div>
                    <h3>
                      <a className="course-link" href={courseHref(c.id)}>
                        {c.title}
                      </a>
                    </h3>
                    <p>{c.description}</p>
                    <div className="card-footer">
                      <span>
                        <BookOpen size={16} aria-hidden="true" />
                        {c.minutes} min · {c.questions.length} preguntas
                      </span>
                      <a
                        className="course-open"
                        href={courseHref(c.id)}
                        aria-label={`Explorar ${c.title}`}
                      >
                        <ArrowUpRight size={23} aria-hidden="true" />
                      </a>
                    </div>
                    {progress[c.id]?.read && (
                      <span className="read-badge">
                        <Check size={15} aria-hidden="true" />
                        Lectura completada
                      </span>
                    )}
                  </article>
                );
              })}
            </div>
            {!filtered.length && (
              <div className="empty">
                <Search size={34} aria-hidden="true" />
                <h3>
                  {view === "saved" && !saved.length
                    ? "Haz espacio para tus próximos descubrimientos."
                    : "No encontramos ese tema."}
                </h3>
                <p>
                  {view === "saved" && !saved.length
                    ? "Usa el marcador de un módulo para guardarlo aquí."
                    : "Prueba otra palabra o restablece los filtros."}
                </p>
                <button
                  className="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("Todos");
                    navigate(homeHref());
                  }}
                >
                  Explorar todos los módulos
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
        )}
        <section className="knowledge-strip" aria-labelledby="knowledge-title">
          <div className="strip-intro">
            <span className="color-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="eyebrow">MÁS ALLÁ DE LA TEORÍA</span>
            <h2 id="knowledge-title">
              Una idea se aprende.
              <br />
              Una habilidad se practica.
            </h2>
          </div>
          <div>
            <p>
              Lecturas, videos, cuestionarios y retos para hacer tuyos los
              conceptos. Empieza donde tengas curiosidad.
            </p>
            <a href={courseHref("engineering")}>
              Ir a los fundamentos
              <ArrowUpRight size={21} aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
