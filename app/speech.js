/** Prefer the selected locale, then another voice in the same language. */
export function selectVoice(voices, locale, preferred = "") {
  const normalized = locale.toLowerCase().replaceAll("_", "-");
  const language = normalized.split("-")[0];
  const compatible = voices.filter(
    (v) => v.lang.toLowerCase().replaceAll("_", "-").split("-")[0] === language,
  );
  return (
    compatible.find((v) => v.voiceURI === preferred) ||
    compatible.find(
      (v) => v.lang.toLowerCase().replaceAll("_", "-") === normalized,
    ) ||
    compatible.find((v) => v.default) ||
    compatible[0] ||
    null
  );
}

/** Small utterances prevent browsers from truncating long lessons. */
export function speechChunks(text, limit = 220) {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const chunks = [];
  let current = "";
  for (const word of words) {
    if (current && current.length + word.length + 1 > limit) {
      chunks.push(current);
      current = "";
    }
    current += (current ? " " : "") + word;
  }
  if (current) chunks.push(current);
  return chunks;
}
