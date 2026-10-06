import {
  courseHref,
  homeHref,
  basePath,
  navigate,
  currentRoute,
} from "./routes";
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
  const [route, setRoute] = useState(currentRoute);
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
      setRoute(currentRoute());
      window.scrollTo({ top: 0 });
    };
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        link.target ||
        link.hasAttribute("download")
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        !url.pathname.startsWith(basePath) ||
        url.hash ||
        /\.(pdf|svg|png)$/i.test(url.pathname)
      )
        return;
      event.preventDefault();
      navigate(url.pathname + url.search);
    };
    window.addEventListener("popstate", handler);
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("popstate", handler);
      document.removeEventListener("click", click);
    };
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
          <a href={homeHref()} className="footer-brand">
            <img
              src={`${basePath}src/innovasoft-isologo-dark.svg`}
              alt="InnovaSoft"
              width="226"
              height="52"
            />
          </a>
          <p>Curiosidad que se transforma en conocimiento.</p>
        </div>
        <a href={homeHref()}>
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
  (c) => c.file && c.file === location.pathname.split("/").pop(),
);
const oldHash = location.hash.slice(1).replace(/^\//, "");
if (oldHash && oldHash !== "main")
  history.replaceState(
    null,
    "",
    oldHash.startsWith("learn/") ? `${basePath}${oldHash}/` : homeHref(oldHash),
  );
else if (legacy) history.replaceState(null, "", courseHref(legacy.id));
else if (/\/(login|register)\.html$/.test(location.pathname))
  history.replaceState(null, "", homeHref("space"));
else if (location.pathname.endsWith("index.html"))
  history.replaceState(null, "", homeHref());
createRoot(document.getElementById("root")!).render(<App />);
if (import.meta.env.DEV && new URLSearchParams(location.search).has("audit"))
  import("./dev-audit");
