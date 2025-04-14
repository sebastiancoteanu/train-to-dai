import { QuestionGroup } from "@/components/question-renderer/question-renderer.types";
import { SportKey } from "@/components/sport-selector/sport-selector.types";
import { SafeUser } from "@/types/user";

export type PlanState = {
  profile: Pick<SafeUser, "dateOfBirth" | "sex" | "height" | "weight"> | null;
  sport: SportKey | null;
  questionGroups: QuestionGroup[];
  answers: Record<string, Record<string, string>>;
};

const planStore: Record<string, PlanState> = {};

export const saveToPlanStore = (id: string, data: Partial<PlanState>) => {
  const answers = {
    ...(planStore[id]?.answers || {}),
    ...(data.answers || {}),
  };

  planStore[id] = {
    ...planStore[id],
    ...data,
    answers,
  };
};

export const getFromPlanStore = (id: string): PlanState | undefined => {
  return planStore[id];
};
