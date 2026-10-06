import { useEffect, useRef, useState } from "react";
import { Volume2, Square, Languages, Gauge } from "lucide-react";
import ChoiceMenu from "./ChoiceMenu";
import { useStored } from "./storage";
import { selectVoice, speechChunks } from "./speech.js";
export default function AudioReader({
  text,
  notify,
}: {
  text: string;
  notify: (s: string) => void;
}) {
  const [locale, setLocale] = useStored("innovasoft:audio-language", "es-CO");
  const [preferred, setPreferred] = useStored("innovasoft:audio-voice", "");
  const [rate, setRate] = useStored("innovasoft:audio-rate", 1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [reading, setReading] = useState(false);
  const [position, setPosition] = useState(0);
  const generation = useRef(0);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const chunks = speechChunks(text);
  const voice = selectVoice(voices, locale, preferred);
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const refresh = () => setVoices(speechSynthesis.getVoices());
    refresh();
    speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, []);
  useEffect(() => {
    stop();
    return stop;
  }, [locale, preferred, rate, text]);
  function stop() {
    generation.current++;
    currentUtterance.current = null;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setReading(false);
    setPosition(0);
  }
  function start() {
    if (!("speechSynthesis" in window)) {
      notify("Este navegador no admite lectura en voz alta.");
      return;
    }
    if (!voice) {
      notify(
        "No hay una voz en español disponible. Activa una voz en español en tu dispositivo y vuelve a intentarlo.",
      );
      return;
    }
    stop();
    const run = generation.current;
    setReading(true);
    function next(index: number) {
      if (generation.current !== run) return;
      if (index >= chunks.length) {
        setReading(false);
        setPosition(0);
        notify("Lectura completada.");
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      currentUtterance.current = utterance;
      utterance.lang = locale;
      utterance.voice = voice;
      utterance.rate = rate;
      utterance.onend = () => next(index + 1);
      utterance.onerror = () => {
        if (generation.current === run) {
          stop();
          notify("No se pudo reproducir el audio. Prueba otra voz disponible.");
        }
      };
      setPosition(index + 1);
      speechSynthesis.speak(utterance);
    }
    next(0);
  }
  return (
    <section className="audio-reader" aria-label="Lectura en voz alta">
      <div className="audio-title">
        <span className="concept-icon">
          <Volume2 size={25} aria-hidden="true" />
        </span>
        <div>
          <h2>Escúchalo a tu manera</h2>
          <p>Lectura completa del módulo, incluidos los temas cerrados.</p>
        </div>
      </div>
      <div className="audio-settings">
        <div className="audio-setting">
          <span>
            <Languages size={16} aria-hidden="true" />
            Idioma del audio
          </span>
          <ChoiceMenu
            label="Idioma del audio"
            value={locale}
            onChange={(value) => {
              setLocale(value);
              setPreferred("");
            }}
            options={[
              { value: "es-CO", label: "Español · Colombia" },
              { value: "es-MX", label: "Español · México" },
              { value: "es-ES", label: "Español · España" },
            ]}
          />
        </div>
        <div className="audio-setting">
          <span>
            <Volume2 size={16} aria-hidden="true" />
            Voz disponible
          </span>
          <ChoiceMenu
            label="Voz disponible"
            value={voice?.voiceURI || ""}
            onChange={setPreferred}
            disabled={!voice}
            options={
              voice
                ? voices
                    .filter((v) => v.lang.toLowerCase().startsWith("es"))
                    .map((v) => ({
                      value: v.voiceURI,
                      label: `${v.name} · ${v.lang}`,
                    }))
                : [{ value: "", label: "Sin voz en español" }]
            }
          />
        </div>
        <div className="audio-setting">
          <span>
            <Gauge size={16} aria-hidden="true" />
            Velocidad
          </span>
          <ChoiceMenu
            label="Velocidad"
            value={String(rate)}
            onChange={(value) => setRate(Number(value))}
            options={[
              { value: "0.8", label: "Pausada · 0.8×" },
              { value: "1", label: "Normal · 1×" },
              { value: "1.2", label: "Ágil · 1.2×" },
            ]}
          />
        </div>
      </div>
      <div className="audio-controls">
        <button
          className="button"
          onClick={reading ? stop : start}
          aria-pressed={reading}
        >
          {reading ? (
            <Square size={18} aria-hidden="true" />
          ) : (
            <Volume2 size={18} aria-hidden="true" />
          )}
          {reading ? "Detener lectura" : "Escuchar módulo"}
        </button>
        <span role="status">
          {reading
            ? `Fragmento ${position} de ${chunks.length}`
            : "Español: el mismo idioma del contenido."}
        </span>
      </div>
      {voice && voice.lang.toLowerCase() !== locale.toLowerCase() && (
        <p className="voice-note">
          Tu dispositivo usará la voz en español disponible ({voice.lang}); no
          incluye una voz de la región seleccionada.
        </p>
      )}
    </section>
  );
}
