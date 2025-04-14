import { QuestionGroup } from "../question-renderer/question-renderer.types";
import { PlanState } from "@/lib/cache/plan-temp-store";

export type CreatePlanState = Pick<PlanState, "answers" | "questionGroups">;

export type CreatePlanAction =
  | {
      type: "SET_ANSWERS";
      payload: { groupId: string; answers: CreatePlanState["answers"][string] };
    }
  | { type: "ADD_QUESTION_GROUPS"; payload: QuestionGroup };
