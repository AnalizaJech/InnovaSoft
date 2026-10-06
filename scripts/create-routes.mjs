import { readFile, mkdir, writeFile } from "node:fs/promises";
const original = JSON.parse(await readFile("app/courses.json", "utf8"));
const extra = JSON.parse(await readFile("app/extra-courses.json", "utf8"));
const entry = await readFile("dist/index.html", "utf8");
const routes = [
  "saved",
  "progress",
  "space",
  ...[...original, ...extra].map((c) => `learn/${c.id}`),
];
for (const route of routes) {
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, entry);
}
console.log(`Generated ${routes.length} clean route entries for GitHub Pages.`);
