import courses from "./courses.json";
export type Course = (typeof courses)[number];
export type Progress = Record<string, { read?: boolean; score?: number }>;
