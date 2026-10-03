export const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function scoreQuiz(questions, answers) {
  return questions.reduce(
    (score, q, i) => score + (answers[i] === q.answer ? 1 : 0),
    0,
  );
}
/** @template {{title:string,description:string,category:string,article:string}} T @param {T[]} courses @param {string} query @returns {T[]} */
export function searchCourses(courses, query) {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const relevance = (c) =>
    words.reduce(
      (n, w) =>
        n +
        (normalize(c.title).includes(w) ? 10 : 0) +
        (normalize(c.category).includes(w) ? 3 : 0),
      0,
    );
  return courses
    .filter((c) =>
      words.every((word) =>
        normalize(
          `${c.title} ${c.description} ${c.category} ${c.article.replace(/<[^>]*>/g, " ")}`,
        ).includes(word),
      ),
    )
    .sort((a, b) => relevance(b) - relevance(a));
}
