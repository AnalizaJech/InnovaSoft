import fs from "node:fs";
import { load } from "cheerio";
const path = "app/courses.json";
const courses = JSON.parse(fs.readFileSync(path, "utf8"));
for (const course of courses) {
  const $ = load(course.article, null, false);
  $("h2,h4").each((i, e) => {
    if (i > 0) {
      e.tagName = "h3";
      e.name = "h3";
    }
  });
  course.article = $.html();
}
fs.writeFileSync(path, JSON.stringify(courses, null, 2));
