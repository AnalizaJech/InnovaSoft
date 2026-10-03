import React, { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useStored } from "./storage";
export default function Profile() {
  const [name, setName] = useStored("innovasoft:name", "");
  const [draft, setDraft] = useState(name);
  const [done, setDone] = useState(false);
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
          setName(draft.trim());
          setDone(true);
        }}
      >
        <label htmlFor="name">¿Cómo quieres que te llamemos?</label>
        <input
          id="name"
          required
          maxLength={50}
          autoComplete="given-name"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tu nombre"
        />
        <button className="button">
          Guardar mi perfil
          <ArrowRight size={18} />
        </button>
      </form>
      {done && <p role="status">Tu perfil está listo, {name}.</p>}
      <div className="profile-note">
        <ShieldCheck />
        <p>
          Este proyecto no dispone de servidor de autenticación. No solicita
          contraseñas ni crea cuentas en línea. El perfil y el progreso son
          locales.
        </p>
      </div>
      <a href="index.html">Volver a aprender →</a>
    </section>
  );
}
