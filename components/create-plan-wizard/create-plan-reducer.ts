import { CreatePlanAction, CreatePlanState } from "./create-plan.types";

export const initialCreatePlanState: CreatePlanState = {
  answers: {},
  questionGroups: [],
};

export const createPlanReducer = (state: CreatePlanState, action: CreatePlanAction): CreatePlanState => {
  switch (action.type) {
    case 'SET_ANSWERS':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.groupId]: action.payload.answers
        }
      };
    case 'ADD_QUESTION_GROUPS':
      return {
        ...state,
        questionGroups: [...state.questionGroups, action.payload]
      };
    default:
      return state;
  }
};
