import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { X, ArrowUpRight } from "lucide-react";
import Header from "./Header";
import Library from "./Library";
import Lesson from "./Lesson";
import Profile from "./Profile";
import Chat from "./Chat";
import AccessibilityPanel, { type Preferences } from "./AccessibilityPanel";
import { useStored } from "./storage";
import courses from "./catalog";
import type { Progress } from "./types";
import "./style.css";
function App() {
  const [route, setRoute] = useState(
    () => location.hash.slice(1).replace(/^\//, "") || "library",
  );
  const selected = courses.find((c) => route === `learn/${c.id}`);
  const auth = route === "space";
  const home = !selected && !auth;
  const view = ["saved", "progress"].includes(route) ? route : "library";
  const [saved, setSaved] = useStored<string[]>("innovasoft:saved", []);
  const [progress, setProgress] = useStored<Progress>(
    "innovasoft:progress",
    {},
  );
  const [dark, setDark] = useStored("innovasoft:dark", false);
  const [preferences, setPreferences] = useStored<Preferences>(
    "innovasoft:accessibility",
    { scale: 100, contrast: false, motion: false },
  );
  const [accessibility, setAccessibility] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    document.documentElement.dataset.scale = String(preferences.scale);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.contrast = preferences.contrast
      ? "high"
      : "normal";
    document.documentElement.dataset.motion = preferences.motion
      ? "reduced"
      : "normal";
    document.documentElement.style.setProperty(
      "--reading-scale",
      String(preferences.scale / 100),
    );
    document.documentElement.style.fontSize = `${preferences.scale}%`;
  }, [dark, preferences]);
  useEffect(() => {
    const handler = () => {
      setRoute(location.hash.slice(1).replace(/^\//, "") || "library");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    document.title = selected
      ? `${selected.title} · InnovaSoft`
      : auth
        ? "Mi espacio · InnovaSoft"
        : view === "saved"
          ? "Mis guardados · InnovaSoft"
          : view === "progress"
            ? "Mi progreso · InnovaSoft"
            : "Explora y aprende · InnovaSoft";
  }, [selected, auth, view]);
  function save(id: string) {
    const exists = saved.includes(id);
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    setNotice(
      exists
        ? "Módulo eliminado de tus guardados."
        : "Módulo añadido a tus guardados.",
    );
  }
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <Header
        view={view}
        home={home}
        saved={saved.length}
        dark={dark}
        onTheme={() => setDark(!dark)}
        onAccessibility={() => setAccessibility(true)}
      />
      <main
        id="main"
        tabIndex={-1}
        className={home ? "home-main" : "lesson-main"}
      >
        {home ? (
          <Library
            view={view}
            saved={saved}
            onSave={save}
            progress={progress}
            notify={setNotice}
          />
        ) : auth ? (
          <Profile />
        ) : (
          <Lesson
            key={selected!.id}
            course={selected!}
            saved={saved.includes(selected!.id)}
            onSave={() => save(selected!.id)}
            progress={progress[selected!.id] || {}}
            onProgress={(p) =>
              setProgress((old) => ({
                ...old,
                [selected!.id]: { ...old[selected!.id], ...p },
              }))
            }
            notify={setNotice}
          />
        )}
      </main>
      <footer className="site-footer">
        <div>
          <a href="#/library" className="footer-brand">
            <img
              src="./src/innovasoft-isologo-dark.svg"
              alt="InnovaSoft"
              width="226"
              height="52"
            />
          </a>
          <p>Curiosidad que se transforma en conocimiento.</p>
        </div>
        <a href="#/library">
          Volver a explorar
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
        <span>Hecho para aprender a tu manera.</span>
      </footer>
      <AccessibilityPanel
        open={accessibility}
        onClose={() => setAccessibility(false)}
        value={preferences}
        onChange={setPreferences}
      />
      <Chat />
      <div
        className={`announcement ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice && (
          <>
            <span>{notice}</span>
            <button
              className="icon-button"
              aria-label="Cerrar aviso"
              onClick={() => setNotice("")}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </>
  );
}
const legacy = courses.find(
  (c) => c.file === location.pathname.split("/").pop(),
);
if (
  location.pathname.endsWith(".html") &&
  !location.pathname.endsWith("index.html")
) {
  const target = legacy ? `#/learn/${legacy.id}` : "#/space";
  location.replace(new URL(`./${target}`, location.href).href);
} else createRoot(document.getElementById("root")!).render(<App />);
if (import.meta.env.DEV && new URLSearchParams(location.search).has("audit"))
  import("./dev-audit");
