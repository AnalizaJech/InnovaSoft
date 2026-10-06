import { useState } from "react";
import {
  Accessibility,
  Menu,
  Moon,
  Sun,
  BookOpen,
  Bookmark,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import Modal from "./Modal";
export default function Header({
  view,
  home,
  saved,
  dark,
  onTheme,
  onAccessibility,
}: {
  view: string;
  home: boolean;
  saved: number;
  dark: boolean;
  onTheme: () => void;
  onAccessibility: () => void;
}) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "library", label: "Explorar", Icon: BookOpen },
    { id: "saved", label: "Guardados", Icon: Bookmark },
    { id: "progress", label: "Mi progreso", Icon: GraduationCap },
  ];
  const nav = (
    <>
      {links.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#/${id}`}
          aria-current={home && view === id ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          <Icon size={18} aria-hidden="true" />
          {label}
          {id === "saved" && saved > 0 && (
            <span
              className="nav-count"
              role="img"
              aria-label={`${saved} ${saved === 1 ? "módulo guardado" : "módulos guardados"}`}
            >
              {saved}
            </span>
          )}
        </a>
      ))}
    </>
  );
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#/library">
            <img
              className="brand-mark"
              src="./src/innovasoft-mark.svg"
              alt=""
              width="40"
              height="40"
            />
            <img
              src="./src/InnovaSoft.svg"
              alt="InnovaSoft"
              width="170"
              height="42"
            />
          </a>
          <nav className="desktop-nav" aria-label="Principal">
            {nav}
          </nav>
          <div className="header-tools">
            <button
              className="icon-button"
              aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
              onClick={onTheme}
            >
              {dark ? (
                <Sun size={21} aria-hidden="true" />
              ) : (
                <Moon size={21} aria-hidden="true" />
              )}
            </button>
            <button
              className="access-button"
              aria-label="Accesibilidad"
              onClick={onAccessibility}
              aria-haspopup="dialog"
            >
              <Accessibility size={22} aria-hidden="true" />
              <span>Accesibilidad</span>
            </button>
            <a className="profile-link" href="#/space">
              Mi espacio
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button
              className="icon-button menu-button"
              aria-label="Abrir navegación"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Navegación"
        className="navigation-modal"
      >
        <nav aria-label="Navegación móvil">
          {nav}
          <a href="#/space">
            Mi espacio
            <ArrowUpRight size={18} />
          </a>
        </nav>
      </Modal>
    </>
  );
}
