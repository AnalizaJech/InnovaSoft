import courses from "./catalog";
export type Course = (typeof courses)[number];
export type Progress = Record<string, { read?: boolean; score?: number }>;
