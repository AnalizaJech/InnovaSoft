import { homeHref, basePath } from "./routes";
import React, { useState, useMemo, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Download,
  Play,
  ArrowLeft,
  Sparkles,
  Target,
  RotateCcw,
  Code2,
  Layers,
  ShieldCheck,
  Wallet,
  GraduationCap,
} from "lucide-react";
import ArticleContent, { parseArticle } from "./ArticleContent";
import AudioReader from "./AudioReader";
import { scoreQuiz } from "./learning.js";
import { updates } from "./updates";
import type { Course, Progress } from "./types";
export default function Lesson({
  course: c,
  saved,
  onSave,
  progress,
  onProgress,
  notify,
}: {
  course: Course;
  saved: boolean;
  onSave: () => void;
  progress: Progress[string];
  onProgress: (p: Progress[string]) => void;
  notify: (s: string) => void;
}) {
  const [tab, setTab] = useState("article");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<number | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const update = updates[c.id];
  const moduleVisuals: Record<string, { Icon: typeof Code2; color: string }> = {
    engineering: { Icon: Code2, color: "mint" },
    architecture: { Icon: Layers, color: "lavender" },
    iso: { Icon: ShieldCheck, color: "pink" },
    validation: { Icon: CheckCircle2, color: "blue" },
    costs: { Icon: Wallet, color: "yellow" },
  };
  const visual = moduleVisuals[c.id] || { Icon: BookOpen, color: "mint" };
  const ModuleIcon = visual.Icon;
  const narration = useMemo(
    () =>
      `${parseArticle(c.article).text} ${update.title}. ${update.body} Tu reto práctico. ${update.exercise}`,
    [c.article, update],
  );
  function evaluate(e: React.FormEvent) {
    e.preventDefault();
    const score = scoreQuiz(c.questions, answers);
    setResult(score);
    onProgress({ score });
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  return (
    <>
      <a className="back-link" href={homeHref()}>
        <ArrowLeft size={18} aria-hidden="true" /> Volver a la biblioteca
      </a>
      <div className={`lesson-heading ${visual.color}`}>
        <span className="module-symbol">
          <ModuleIcon size={34} aria-hidden="true" />
        </span>
        <span className="eyebrow">
          MÓDULO {c.number} / {c.category.toUpperCase()}
        </span>
        <h1>{c.title}</h1>
        <p>{c.description}</p>
        <div className="lesson-actions">
          <span>
            <BookOpen size={16} />
            {c.minutes} min de lectura
          </span>
          <button onClick={onSave} aria-pressed={saved}>
            <Bookmark size={17} />
            {saved ? "Guardado" : "Guardar módulo"}
          </button>
          {c.pdf && (
            <a href={`${basePath}PDF/${c.pdf}`} download>
              <Download size={17} />
              Descargar PDF original
            </a>
          )}
        </div>
      </div>
      <div
        className="lesson-tabs"
        role="group"
        aria-label="Contenido del módulo"
      >
        {[
          ["article", "Contenido"],
          [
            "videos",
            c.videos.length ? `Videos (${c.videos.length})` : "Documentación",
          ],
          ["quiz", "Cuestionario"],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={tab === id}
            className={tab === id ? "selected" : ""}
            onClick={() => {
              setTab(id);
              if ("speechSynthesis" in window) speechSynthesis.cancel();
            }}
          >
            {id === "article" ? (
              <BookOpen size={18} aria-hidden="true" />
            ) : id === "videos" ? (
              <Play size={18} aria-hidden="true" />
            ) : (
              <GraduationCap size={18} aria-hidden="true" />
            )}{" "}
            {label}
          </button>
        ))}
      </div>
      {tab === "article" ? (
        <div className="reading-layout">
          <div>
            <AudioReader text={narration} notify={notify} />
            <div>
              <ArticleContent html={c.article} />
              <section className="update">
                <span className="eyebrow">
                  <Sparkles size={20} aria-hidden="true" />
                  AMPLÍA TU PERSPECTIVA
                </span>
                <h2>{update.title}</h2>
                <p>{update.body}</p>
                <div className="exercise">
                  <strong>
                    <Target size={22} aria-hidden="true" /> Tu reto práctico
                  </strong>
                  <p>{update.exercise}</p>
                </div>
                <a href={update.url} target="_blank" rel="noreferrer">
                  {update.source}
                  <ArrowUpRight size={16} />
                </a>
              </section>
            </div>
            <button
              className="button"
              onClick={() => onProgress({ read: !progress.read })}
            >
              <CheckCircle2 size={18} />
              {progress.read
                ? "Marcar como pendiente"
                : "Marcar módulo como leído"}
            </button>
          </div>
          <aside className="lesson-aside">
            <span className="eyebrow">EN ESTE MÓDULO</span>
            <h3>Aprende con intención.</h3>
            <p>
              Lee los conceptos, contrasta las fuentes y comprueba lo aprendido.
            </p>
            <button onClick={() => setTab("videos")}>
              <Play size={18} />
              {c.videos.length
                ? "Ver recursos en video"
                : "Consultar documentación"}
              <ArrowRight size={16} />
            </button>
            <button onClick={() => setTab("quiz")}>
              <GraduationCap size={18} />
              Ponerme a prueba
              <ArrowRight size={16} />
            </button>
            <hr />
            <strong>
              {progress.read ? "Lectura completada" : "Un paso a la vez"}
            </strong>
            <p>Tu avance se guarda en este dispositivo.</p>
            <small>
              Los artículos y PDFs originales se conservan como material de
              referencia. La ampliación incluye fuentes verificables.
            </small>
          </aside>
        </div>
      ) : tab === "videos" ? (
        <section className="video-grid">
          {!c.videos.length && (
            <article className="concept-intro">
              <BookOpen size={32} aria-hidden="true" />
              <div>
                <h2>Profundiza con la fuente original.</h2>
                <p>{update.source}: lectura de referencia para este módulo.</p>
                <a
                  className="button"
                  href={update.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir documentación{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          )}
          {c.videos.map((url, i) => (
            <article key={url}>
              <iframe
                src={url}
                title={`${c.title}: recurso en video ${i + 1}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <h2>
                Recurso {String(i + 1).padStart(2, "0")} · {c.title}
              </h2>
              <a
                href={url.replace("/embed/", "/watch?v=")}
                target="_blank"
                rel="noreferrer"
              >
                Abrir en YouTube
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </section>
      ) : (
        <form className="quiz" onSubmit={evaluate}>
          <h2>Comprueba lo que aprendiste.</h2>
          <p>
            Responde las cinco preguntas y consulta el resultado con las
            respuestas correctas.
          </p>
          {c.questions.map((q, i) => (
            <fieldset key={i}>
              <legend>{q.prompt}</legend>
              {q.options.map((o) => (
                <label
                  key={o.value}
                  className={answers[i] === o.value ? "chosen" : ""}
                >
                  <input
                    required
                    type="radio"
                    name={`question-${i}`}
                    value={o.value}
                    checked={answers[i] === o.value}
                    onChange={() => {
                      setAnswers((a) => ({ ...a, [i]: o.value }));
                      setResult(null);
                    }}
                  />
                  {o.text}
                </label>
              ))}
            </fieldset>
          ))}
          <button className="button">
            Evaluar mis respuestas
            <ArrowRight size={18} />
          </button>
          {result !== null && (
            <div className="quiz-result" ref={resultRef} tabIndex={-1}>
              <h2>
                {result} de {c.questions.length} respuestas correctas
              </h2>
              <p>
                {Math.round((result / c.questions.length) * 100)}% ·{" "}
                {result === 5
                  ? "¡Excelente trabajo!"
                  : "Revisa las respuestas y vuelve a intentarlo."}
              </p>
              {c.questions.map((q, i) => (
                <p key={i}>
                  <strong>
                    {i + 1}.{" "}
                    {answers[i] === q.answer ? "Correcta" : "Por repasar"}
                  </strong>
                  <br />
                  {q.options.find((o) => o.value === q.answer)?.text}
                </p>
              ))}
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setResult(null);
                }}
              >
                <RotateCcw size={18} aria-hidden="true" /> Volver a intentar
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
