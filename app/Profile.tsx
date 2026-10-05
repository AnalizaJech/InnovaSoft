import React, { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useStored } from "./storage";
export default function Profile() {
  const [name, setName] = useStored("innovasoft:name", "");
  const [draft, setDraft] = useState(name);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className="profile-panel">
      <span className="eyebrow">TU ESPACIO PERSONAL</span>
      <h1>Haz tuyo el aprendizaje.</h1>
      <p>
        Personaliza tu nombre en este navegador. Tus guardados y tu progreso se
        conservan en este dispositivo.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) {
            setError("Escribe un nombre antes de guardar.");
            document.getElementById("name")?.focus();
            return;
          }
          setError("");
          setName(draft.trim());
          setDone(true);
        }}
      >
        <label htmlFor="name">¿Cómo quieres que te llamemos?</label>
        <input
          id="name"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "name-error" : undefined}
          required
          maxLength={50}
          autoComplete="given-name"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setDone(false);
            setError("");
          }}
          placeholder="Tu nombre"
        />
        {error && (
          <p className="profile-error" id="name-error" role="alert">
            {error}
          </p>
        )}
        <button className="button">
          Guardar mi perfil
          <ArrowRight size={18} />
        </button>
      </form>
      {done && <p role="status">Tu perfil está listo, {name}.</p>}
      <div className="profile-note">
        <ShieldCheck />
        <p>
          Tu nombre y progreso se guardan solo en este navegador. Puedes empezar
          a aprender sin crear una cuenta ni usar una contraseña.
        </p>
      </div>
      <a className="back-link" href="index.html">
        Volver a aprender <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
