export type TutorOnboardingStep = "basic" | "teaching" | "location" | "bio";

export type TutorProfileDraft = {
  name: string;
  experience: string;
  subjects: string;
  qualification: string;
  city: string;
  area: string;
  pincode: string;
  bio: string;
};

export type TutorAccountRecord = {
  email: string;
  name: string;
  avatar: string;
  profileCompleted: boolean;
  verified: boolean;
  currentStep: TutorOnboardingStep;
  completedSteps: TutorOnboardingStep[];
  profileData: TutorProfileDraft;
  lastUpdatedAt: string;
};

const TUTOR_ACCOUNT_STORAGE_KEY = "nexamid-tutor-accounts";

export const TUTOR_ONBOARDING_STEPS: TutorOnboardingStep[] = ["basic", "teaching", "location", "bio"];

export const TUTOR_ONBOARDING_STEP_LABELS: Record<TutorOnboardingStep, string> = {
  basic: "Basic Info",
  teaching: "Teaching Details",
  location: "Location",
  bio: "Profile Bio",
};

const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";

export const getDefaultTutorProfileDraft = (name = "New Tutor"): TutorProfileDraft => ({
  name,
  experience: "12 Years",
  subjects: "Mathematics, Physics, Calculus",
  qualification: "Ph.D. Mathematics",
  city: "Mumbai, Maharashtra",
  area: "Andheri West",
  pincode: "400053",
  bio: "Highly experienced tutor with a focus on building clarity, confidence, and strong academic performance.",
});

const readTutorAccountStore = (): Record<string, TutorAccountRecord> => {
  if (typeof window === "undefined") return {};

  const rawValue = window.localStorage.getItem(TUTOR_ACCOUNT_STORAGE_KEY);

  if (!rawValue) return {};

  try {
    return JSON.parse(rawValue) as Record<string, TutorAccountRecord>;
  } catch {
    return {};
  }
};

const writeTutorAccountStore = (records: Record<string, TutorAccountRecord>) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(TUTOR_ACCOUNT_STORAGE_KEY, JSON.stringify(records));
};

export const isTutorOnboardingStep = (value: string | null): value is TutorOnboardingStep => {
  return Boolean(value && TUTOR_ONBOARDING_STEPS.includes(value as TutorOnboardingStep));
};

export const createTutorAccountRecord = (email: string, name = "New Tutor", avatar = defaultAvatar): TutorAccountRecord => ({
  email,
  name,
  avatar,
  profileCompleted: false,
  verified: false,
  currentStep: "basic",
  completedSteps: [],
  profileData: getDefaultTutorProfileDraft(name),
  lastUpdatedAt: new Date().toISOString(),
});

export const getTutorAccountRecord = (email: string) => {
  const records = readTutorAccountStore();
  return records[email] || null;
};

export const saveTutorAccountRecord = (record: TutorAccountRecord) => {
  const records = readTutorAccountStore();
  records[record.email] = {
    ...record,
    lastUpdatedAt: new Date().toISOString(),
  };
  writeTutorAccountStore(records);
  return records[record.email];
};

export const removeTutorAccountRecord = (email: string) => {
  const records = readTutorAccountStore();
  delete records[email];
  writeTutorAccountStore(records);
};

export const getNextTutorOnboardingStep = (step: TutorOnboardingStep) => {
  const currentIndex = TUTOR_ONBOARDING_STEPS.indexOf(step);
  return TUTOR_ONBOARDING_STEPS[currentIndex + 1] || null;
};

export const getPreviousTutorOnboardingStep = (step: TutorOnboardingStep) => {
  const currentIndex = TUTOR_ONBOARDING_STEPS.indexOf(step);
  return TUTOR_ONBOARDING_STEPS[currentIndex - 1] || null;
};
