import { LOCATIONS, SUBJECTS, TUTORS, type Tutor } from "./mock-data";

const normalizeText = (value: string) => value.toLowerCase().trim();

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const titleizeSlug = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const indexableLocations = Array.from(
  new Set(
    [
      ...LOCATIONS,
      ...TUTORS.flatMap((tutor) => [tutor.localArea, tutor.location.split(",")[0]?.trim()].filter(Boolean) as string[]),
    ].filter(Boolean),
  ),
);

export const indexableSubjects = Array.from(
  new Set([...SUBJECTS, ...TUTORS.flatMap((tutor) => [tutor.subject, ...tutor.tags])]),
);

export const indexablePincodes = Array.from(new Set(TUTORS.map((tutor) => tutor.pincode).filter(Boolean) as string[]));

export const buildTutorProfileText = (tutor: Tutor) =>
  normalizeText(
    [
      tutor.name,
      tutor.subject,
      tutor.location,
      tutor.localArea || "",
      tutor.pincode || "",
      tutor.bio,
      tutor.education,
      ...tutor.tags,
      ...tutor.availability,
      tutor.shortIntro || "",
      tutor.teachingMethod?.description || "",
      ...(tutor.teachingMethod?.points || []),
    ].join(" "),
  );

export const matchesTutorProfileText = (input: string, tutor: Tutor) => {
  const normalizedInput = normalizeText(input);

  if (!normalizedInput) return true;

  const tutorProfileText = buildTutorProfileText(tutor);

  return normalizedInput.split(/\s+/).every((word) => tutorProfileText.includes(word));
};

export const getCanonicalUrl = (path: string) => {
  if (typeof window === "undefined") return path;

  return `${window.location.origin}${path}`;
};
