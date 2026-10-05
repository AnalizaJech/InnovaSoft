import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  ArrowRight,
  Trash2,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Wallet,
} from "lucide-react";
import Modal from "./Modal";
import courses from "./courses.json";
import { searchCourses } from "./learning.js";
type Message = { role: "bot" | "user"; text: string; file?: string };
const greeting: Message = {
  role: "bot",
  text: "Hola, soy Jech. Te ayudo a encontrar recursos de la biblioteca. ¿Qué quieres aprender?",
};
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages]);
  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    const c = searchCourses(courses, draft)[0];
    setMessages((m) => [
      ...m,
      { role: "user", text: draft },
      {
        role: "bot",
        text: c
          ? `${c.title}. ${c.description}`
          : "Puedo ayudarte con normas ISO, costos, ingeniería, arquitectura y validación. Prueba con uno de esos temas.",
        file: c?.file,
      },
    ]);
    setDraft("");
    requestAnimationFrame(() => input.current?.focus());
  }
  return (
    <>
      <button
        className="chat-launch"
        aria-label="Abrir guía Jech"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <img src="./src/bot.svg" alt="" width="25" height="25" />
        <span>Consulta a Jech</span>
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Consulta a Jech"
        className="chat-modal"
      >
        <p className="chat-caption">
          <MessageCircle size={16} aria-hidden="true" />
          Guía de recursos · respuestas locales
        </p>
        <div
          ref={log}
          className="messages"
          role="log"
          aria-label="Conversación con Jech"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <span className="sr-only">
                {m.role === "bot" ? "Jech: " : "Tú: "}
              </span>
              <p>{m.text}</p>
              {m.file && (
                <a href={m.file}>
                  Abrir módulo
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="chat-suggestions">
          {["Normas ISO", "Arquitectura", "Costos"].map((t) => (
            <button key={t} onClick={() => setDraft(t)}>
              {t === "Normas ISO" ? (
                <ShieldCheck size={15} aria-hidden="true" />
              ) : t === "Arquitectura" ? (
                <Layers size={15} aria-hidden="true" />
              ) : (
                <Wallet size={15} aria-hidden="true" />
              )}
              {t}
            </button>
          ))}
        </div>
        <form className="chat-form" onSubmit={send}>
          <input
            ref={input}
            aria-label="Mensaje para Jech"
            placeholder="Escribe tu pregunta…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            className="icon-button"
            aria-label="Enviar mensaje"
            disabled={!draft.trim()}
          >
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </form>
        <button className="text-button" onClick={() => setMessages([greeting])}>
          <Trash2 size={16} aria-hidden="true" />
          Borrar conversación
        </button>
      </Modal>
    </>
  );
}
