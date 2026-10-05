import { test } from "node:test";
import assert from "node:assert/strict";
import { selectVoice, speechChunks } from "../app/speech.js";
test("Audio prefers the selected locale and never falls back to a different language", () => {
  const voices = [
    { lang: "en-US", voiceURI: "english", default: true },
    { lang: "es-ES", voiceURI: "spain" },
    { lang: "es-CO", voiceURI: "colombia" },
  ];
  assert.equal(selectVoice(voices, "es-CO").voiceURI, "colombia");
  assert.equal(selectVoice(voices, "es-CO", "spain").voiceURI, "spain");
  assert.equal(selectVoice(voices, "es-MX", "english").voiceURI, "spain");
  assert.equal(selectVoice(voices, "pt-BR"), null);
  assert.equal(selectVoice([], "es-CO"), null);
});
test("Long narration is chunked without losing words or punctuation", () => {
  const text =
    "Concepto uno.\n  Verificar antes de publicar: calidad y accesibilidad. ".repeat(
      35,
    );
  const chunks = speechChunks(text);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.length <= 220));
  assert.equal(chunks.join(" "), text.replace(/\s+/g, " ").trim());
  assert.deepEqual(speechChunks("  "), []);
});
