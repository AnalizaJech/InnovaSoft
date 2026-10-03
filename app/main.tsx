import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  Code2,
  Layers,
  ShieldCheck,
  Wallet,
  Search,
  Mic,
  Volume2,
  X,
  Menu,
  MessageCircle,
  Trash2,
  Download,
  Play,
  Sun,
  Moon,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";
import courses from "./courses.json";
import { searchCourses } from "./learning.js";
import Lesson from "./Lesson";
import Profile from "./Profile";
import { useStored } from "./storage";
import type { Progress } from "./types";

import "./style.css";
const icons = [Code2, Layers, ShieldCheck, CheckCircle2, Wallet];
function App() {
  const selected = courses.find(
    (c) => c.file === location.pathname.split("/").pop(),
  );
  const [view, setView] = useState(
    ["saved", "progress"].includes(location.hash.slice(1))
      ? location.hash.slice(1)
      : "library",
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useStored<string[]>("innovasoft:saved", []);
  const [progress, setProgress] = useStored<Progress>(
    "innovasoft:progress",
    {},
  );
  const [dark, setDark] = useStored("innovasoft:dark", false);
  const [large, setLarge] = useStored("innovasoft:large", false);
  const [notice, setNotice] = useState("");
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hola, soy Jech, tu guía de la biblioteca. ¿Qué tema quieres explorar?",
    },
  ]);
  const [message, setMessage] = useState("");
  const wasChatOpen = useRef(false);
  const chatButton = useRef<HTMLButtonElement>(null);
  const chatInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.classList.toggle("large-text", large);
  }, [dark, large]);
  useEffect(() => {
    document.title = selected
      ? `${selected.title} · InnovaSoft`
      : "Biblioteca de aprendizaje · InnovaSoft";
  }, [selected]);
  useEffect(() => {
    if (chat) chatInput.current?.focus();
    else if (wasChatOpen.current) chatButton.current?.focus();
    wasChatOpen.current = chat;
  }, [chat]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChat(false);
        setMenu(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    const updateView = () =>
      setView(
        ["saved", "progress"].includes(location.hash.slice(1))
          ? location.hash.slice(1)
          : "library",
      );
    window.addEventListener("hashchange", updateView);
    return () => window.removeEventListener("hashchange", updateView);
  }, []);
  const finished = courses.filter((c) => progress[c.id]?.read).length;
  function save(id: string) {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }
  function voice() {
    const Recognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setNotice(
        "La búsqueda por voz no está disponible en este navegador. Puedes escribir tu búsqueda.",
      );
      return;
    }
    const r = new Recognition();
    r.lang = "es-CO";
    r.onresult = (e: any) => {
      setQuery(e.results[0][0].transcript);
      setNotice("Búsqueda por voz completada.");
    };
    r.onerror = () =>
      setNotice(
        "No se pudo reconocer la voz. Revisa el permiso del micrófono.",
      );
    r.onend = () => {};
    try {
      r.start();
      setNotice("Escuchando…");
    } catch {
      setNotice("No se pudo iniciar el micrófono.");
    }
  }
  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    const found = searchCourses(courses, message);
    const answer = found[0];
    setMessages((m) => [
      ...m,
      { role: "user", text: message },
      {
        role: "bot",
        text: answer
          ? `${answer.title}: ${answer.description} Encuentra el artículo, los videos y el cuestionario en este módulo.`
          : "Puedo orientarte sobre ingeniería, arquitectura, normas ISO, validación y costos. Escribe uno de esos temas para empezar.",
      },
    ]);
    setMessage("");
  }
  const filtered = searchCourses(courses, query).filter(
    (c) =>
      (category === "Todos" || c.category === category) &&
      (view !== "saved" || saved.includes(c.id)),
  );
  const auth = ["login.html", "register.html"].includes(
    location.pathname.split("/").pop() || "",
  );
  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <aside className={`sidebar ${menu ? "open" : ""}`}>
        <a className="brand" href="index.html">
          <span className="brand-mark">
            i<span>↗</span>
          </span>
          InnovaSoft<span className="brand-dot">.</span>
        </a>
        <span className="sidebar-label">TU ESPACIO DE APRENDIZAJE</span>
        <nav aria-label="Navegación principal">
          {[
            [BookOpen, "library", "Biblioteca"],
            [Bookmark, "saved", "Mis guardados"],
            [GraduationCap, "progress", "Mi progreso"],
          ].map(([Icon, id, label]: any) => (
            <a
              key={id}
              href={selected || auth ? `index.html#${id}` : `#${id}`}
              className={!selected && view === id ? "active" : ""}
              onClick={() => {
                setView(id);
                setMenu(false);
              }}
            >
              <Icon size={20} />
              {label}
              {id === "saved" && saved.length > 0 && (
                <small>{saved.length}</small>
              )}
            </a>
          ))}
        </nav>
        <span className="sidebar-label">EXPLORA POR TEMA</span>
        <nav aria-label="Módulos">
          {courses.map((c, i) => {
            const Icon = icons[i];
            return (
              <a
                key={c.id}
                href={c.file}
                className={selected?.id === c.id ? "active" : ""}
              >
                <Icon size={18} />
                {c.title}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-note">
            <span className="tiny-symbol">✦</span>
            <strong>
              El conocimiento crece
              <br />
              cuando lo compartes.
            </strong>
            <p>
              Aprende a tu ritmo.
              <br />
              Construye con propósito.
            </p>
          </div>
          <span className="local-tag">
            <span />
            Progreso en este dispositivo
          </span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-button mobile-toggle"
            aria-label="Abrir navegación"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Menu size={22} />
          </button>
          <span className="breadcrumb">
            Tu espacio <span>/</span>{" "}
            <strong>
              {selected
                ? "Módulo de aprendizaje"
                : auth
                  ? "Perfil local"
                  : "Biblioteca"}
            </strong>
          </span>
          <div className="top-actions">
            <button
              className="icon-button"
              aria-label={
                large
                  ? "Restaurar tamaño del texto"
                  : "Aumentar tamaño del texto"
              }
              aria-pressed={large}
              onClick={() => setLarge(!large)}
            >
              Aa
            </button>
            <button
              className="icon-button"
              aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a className="profile-link" href="login.html">
              Mi espacio <span className="avatar">IS</span>
            </a>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {auth ? (
            <Profile />
          ) : selected ? (
            <Lesson
              key={selected.id}
              course={selected}
              saved={saved.includes(selected.id)}
              onSave={() => save(selected.id)}
              progress={progress[selected.id] || {}}
              onProgress={(p) =>
                setProgress((old) => ({
                  ...old,
                  [selected.id]: { ...old[selected.id], ...p },
                }))
              }
              notify={setNotice}
            />
          ) : (
            <>
              <div className="page-heading">
                <span className="eyebrow">APRENDE. CONSTRUYE. EVOLUCIONA.</span>
                <h1>
                  {view === "saved"
                    ? "Tu próxima lectura, a mano."
                    : view === "progress"
                      ? "Cada paso cuenta."
                      : "Un buen software empieza\ncon buenas ideas.".replace(
                          "\\n",
                          "\n",
                        )}
                </h1>
                <p>
                  Profundiza en los fundamentos. Conecta la teoría con la
                  práctica.
                  <br className="desktop-break" /> Haz espacio para lo que
                  quieres aprender hoy.
                </p>
              </div>
              <section className="feature" aria-labelledby="feature-title">
                <div className="feature-copy">
                  <span className="pill">
                    <span />
                    TU RUTA DE APRENDIZAJE
                  </span>
                  <h2 id="feature-title">
                    De la primera idea
                    <br />a un software de calidad.
                  </h2>
                  <p>
                    Cinco perspectivas, un mismo objetivo: construir mejor.
                    <br />
                    Comienza por los fundamentos y encuentra tu camino.
                  </p>
                  <a
                    className="button light"
                    href={
                      courses.find((c) => !progress[c.id]?.read)?.file ||
                      courses[0].file
                    }
                  >
                    {finished ? "Continuar aprendiendo" : "Comenzar mi ruta"}
                    <ArrowUpRight size={18} />
                  </a>
                  <div className="feature-meta">
                    <BookOpen size={15} />5 módulos<span>·</span>A tu ritmo
                    <span>·</span>En español
                  </div>
                </div>
                <div className="path-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <span className="orbit-label">IDEA → DISEÑO → IMPACTO</span>
                  <div className="art-tile tile-one">
                    <Code2 />
                    <span>Construir</span>
                  </div>
                  <div className="art-tile tile-two">
                    <Layers />
                    <span>Diseñar</span>
                  </div>
                  <div className="art-tile tile-three">
                    <ShieldCheck />
                    <span>Validar</span>
                  </div>
                  <div className="art-star">✳</div>
                  <span className="art-caption">
                    Conocimiento que se conecta.
                  </span>
                </div>
              </section>
              <section className="stats" aria-label="Resumen de la biblioteca">
                <div>
                  <BookOpen />
                  <p>
                    <strong>05</strong>
                    <span>Módulos de aprendizaje</span>
                  </p>
                </div>
                <div>
                  <Play />
                  <p>
                    <strong>
                      {courses.reduce((n, c) => n + c.videos.length, 0)}
                    </strong>
                    <span>Videos para profundizar</span>
                  </p>
                </div>
                <div>
                  <CheckCircle2 />
                  <p>
                    <strong>25</strong>
                    <span>Preguntas para practicar</span>
                  </p>
                </div>
                <div>
                  <GraduationCap />
                  <p>
                    <strong>
                      {finished}
                      <em>/ 5</em>
                    </strong>
                    <span>Módulos leídos</span>
                  </p>
                </div>
              </section>
              {view === "progress" ? (
                <section>
                  <div className="section-title">
                    <h2>Tu recorrido</h2>
                    <span>Guardado en este navegador</span>
                  </div>
                  <div className="progress-list">
                    {courses.map((c) => (
                      <a href={c.file} key={c.id}>
                        <span>{c.number}</span>
                        <strong>{c.title}</strong>
                        <span>
                          {progress[c.id]?.read ? "Leído" : "Por explorar"}
                        </span>
                        <span>
                          {progress[c.id]?.score !== undefined
                            ? `Quiz: ${progress[c.id].score}/5`
                            : "Sin evaluación"}
                        </span>
                        <ArrowRight size={18} />
                      </a>
                    ))}
                  </div>
                </section>
              ) : (
                <section aria-labelledby="explore-title">
                  <div className="section-title">
                    <div>
                      <h2 id="explore-title">
                        {view === "saved"
                          ? "Mis guardados"
                          : "Explora la biblioteca"}
                      </h2>
                      <p>Elige un tema. Descubre algo nuevo.</p>
                    </div>
                    <span className="count-label">
                      {filtered.length} módulos disponibles
                    </span>
                  </div>
                  <div className="filter-bar">
                    <div className="filters" aria-label="Filtrar por categoría">
                      {[
                        "Todos",
                        "Fundamentos",
                        "Diseño de sistemas",
                        "Calidad",
                        "Gestión",
                      ].map((cat) => (
                        <button
                          key={cat}
                          aria-pressed={category === cat}
                          className={category === cat ? "selected" : ""}
                          onClick={() => setCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="search">
                      <Search size={18} />
                      <input
                        aria-label="Buscar en la biblioteca"
                        placeholder="Buscar un tema…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      {query && (
                        <button
                          aria-label="Limpiar búsqueda"
                          onClick={() => setQuery("")}
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button aria-label="Buscar por voz" onClick={voice}>
                        <Mic size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="course-grid">
                    {filtered.map((c) => {
                      const i = courses.indexOf(c);
                      const Icon = icons[i];
                      return (
                        <article
                          className={`course-card color-${i}`}
                          key={c.id}
                        >
                          <div className="card-visual">
                            <span className="course-number">
                              MÓDULO / {c.number}
                            </span>
                            <Icon className="big-icon" strokeWidth={1.2} />
                            <span className="visual-lines" />
                            <button
                              className={`save ${saved.includes(c.id) ? "is-saved" : ""}`}
                              aria-label={`${saved.includes(c.id) ? "Quitar de" : "Añadir a"} guardados: ${c.title}`}
                              aria-pressed={saved.includes(c.id)}
                              onClick={() => save(c.id)}
                            >
                              <Bookmark
                                size={19}
                                fill={
                                  saved.includes(c.id) ? "currentColor" : "none"
                                }
                              />
                            </button>
                          </div>
                          <div className="card-content">
                            <span className="category">{c.category}</span>
                            <h3>
                              <a href={c.file}>{c.title}</a>
                            </h3>
                            <p>{c.description}</p>
                            <div className="card-footer">
                              <span>
                                <BookOpen size={14} />
                                {c.minutes} min de lectura
                              </span>
                              <a
                                href={c.file}
                                aria-label={`Explorar ${c.title}`}
                              >
                                <ArrowUpRight size={20} />
                              </a>
                            </div>
                            {progress[c.id]?.read && (
                              <span className="read-badge">
                                <Check size={14} />
                                Leído
                              </span>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  {!filtered.length && (
                    <div className="empty">
                      <Search />
                      <h3>
                        {view === "saved" && !saved.length
                          ? "Tu biblioteca personal empieza aquí"
                          : "No encontramos coincidencias"}
                      </h3>
                      <p>
                        {view === "saved" && !saved.length
                          ? "Guarda un módulo con el marcador para volver a él."
                          : "Prueba con otra palabra o elimina los filtros."}
                      </p>
                      <button
                        onClick={() => {
                          setQuery("");
                          setCategory("Todos");
                          setView("library");
                        }}
                      >
                        Explorar todos los módulos
                      </button>
                    </div>
                  )}
                </section>
              )}
              <section className="editorial-note">
                <span className="note-icon">
                  <SlidersHorizontal size={24} />
                </span>
                <div>
                  <span className="eyebrow">
                    DEL CONOCIMIENTO A LA PRÁCTICA
                  </span>
                  <h2>Aprender también es cuestionar.</h2>
                  <p>
                    Cada módulo incluye un reto práctico y fuentes para seguir
                    investigando.
                  </p>
                </div>
                <a href="Software-Engineering.html">
                  Descubre los fundamentos
                  <ArrowRight size={18} />
                </a>
              </section>
            </>
          )}
          <footer>
            <a className="footer-brand" href="index.html">
              InnovaSoft.
            </a>
            <span>Conocimiento abierto. Software con propósito.</span>
            <span>Diseñado para aprender a tu ritmo.</span>
          </footer>
        </main>
      </div>
      <div className="announcement" role="status">
        {notice && (
          <>
            <span>{notice}</span>
            <button aria-label="Cerrar aviso" onClick={() => setNotice("")}>
              <X size={16} />
            </button>
          </>
        )}
      </div>
      {chat && (
        <section className="chat" aria-label="Guía Jech">
          <header>
            <div>
              <span className="chat-avatar">
                <MessageCircle size={19} />
              </span>
              <div>
                <strong>Consulta a Jech</strong>
                <small>Guía local · sin IA externa</small>
              </div>
            </div>
            <button aria-label="Cerrar chat" onClick={() => setChat(false)}>
              <X size={20} />
            </button>
          </header>
          <div className="messages" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={m.role}>
                {m.text}
              </p>
            ))}
          </div>
          <button
            className="clear-chat"
            onClick={() =>
              setMessages([
                { role: "bot", text: "Chat borrado. ¿Qué quieres aprender?" },
              ])
            }
          >
            <Trash2 size={14} />
            Borrar conversación
          </button>
          <form onSubmit={send}>
            <input
              ref={chatInput}
              aria-label="Mensaje para Jech"
              placeholder="Pregunta por un tema…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button aria-label="Enviar mensaje">
              <ArrowRight size={20} />
            </button>
          </form>
        </section>
      )}
      <button
        ref={chatButton}
        className="chat-launch"
        aria-label={chat ? "Cerrar guía Jech" : "Abrir guía Jech"}
        aria-expanded={chat}
        onClick={() => setChat(!chat)}
      >
        {chat ? <X size={22} /> : <MessageCircle size={22} />}
        <span>¿Te orientamos?</span>
      </button>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
