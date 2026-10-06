import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { scoreQuiz, searchCourses } from "../app/learning.js";
const courses = JSON.parse(
  fs.readFileSync(new URL("../app/courses.json", import.meta.url), "utf8"),
);
test("Conserva todos los recursos originales y las respuestas válidas", () => {
  assert.equal(courses.length, 5);
  assert.equal(
    courses.reduce((n, c) => n + c.videos.length, 0),
    57,
  );
  for (const c of courses) {
    assert.equal(c.questions.length, 5);
    assert.ok(c.article.length > 1000);
    assert.ok(
      fs.existsSync(new URL("../public/PDF/" + c.pdf, import.meta.url)),
    );
    for (const q of c.questions)
      assert.ok(q.options.some((o) => o.value === q.answer));
  }
});
test("Búsqueda ignora acentos y busca dentro de artículos", () => {
  assert.equal(searchCourses(courses, "arquitectura")[0].id, "architecture");
  assert.ok(searchCourses(courses, "ingenieria").length);
  assert.equal(searchCourses(courses, "zzzz inexistente").length, 0);
  assert.equal(searchCourses(courses, "").length, 5);
  assert.ok(searchCourses(courses, "FinOps").length);
});
test("Evaluación distingue respuestas correctas, incorrectas e incompletas", () => {
  for (const c of courses) {
    const correct = Object.fromEntries(
      c.questions.map((q, i) => [i, q.answer]),
    );
    assert.equal(scoreQuiz(c.questions, correct), 5);
    assert.equal(scoreQuiz(c.questions, {}), 0);
    correct[0] = "invalid";
    assert.equal(scoreQuiz(c.questions, correct), 4);
  }
});

test("Los módulos nuevos tienen contenido, evaluación y búsquedas útiles", () => {
  const extra = JSON.parse(
    fs.readFileSync(
      new URL("../app/extra-courses.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(new Set([...courses, ...extra].map((c) => c.id)).size, 9);
  for (const c of extra) {
    assert.ok(c.article.length > 1000);
    assert.equal(c.questions.length, 5);
    assert.equal(
      scoreQuiz(
        c.questions,
        Object.fromEntries(c.questions.map((q, i) => [i, q.answer])),
      ),
      5,
    );
    for (const q of c.questions)
      assert.equal(q.options.filter((o) => o.value === q.answer).length, 1);
  }
  assert.ok(
    searchCourses([...courses, ...extra], "autorizacion").some(
      (c) => c.id === "security",
    ),
  );
  assert.ok(
    searchCourses([...courses, ...extra], "conflicto").some(
      (c) => c.id === "git",
    ),
  );
});
