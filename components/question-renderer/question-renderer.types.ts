export type QuestionType =
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "yesNo"
  | "slider";

export interface Question {
  id: string;
  key: string;
  type: QuestionType;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
}

export interface QuestionGroup {
  groupTitle: string;
  intro?: string;
  questions: Question[];
}

export type UserAnswers = Record<string, string | string[] | number | boolean>;
