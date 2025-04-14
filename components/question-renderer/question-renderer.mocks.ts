import { QuestionGroup } from "./question-renderer.types";

export const questionGroup: QuestionGroup = {
  id: "baseline-assessment",
  groupTitle: "Baseline Assessment",
  intro:
    "Before we begin planning your training, I need to understand your current habits and status.",
  questions: [
    {
      id: "1",
      type: "text",
      key: "fullName",
      question: "What is your full name?",
    },
    {
      id: "2",
      type: "number",
      key: "age",
      question: "How old are you?",
      min: 12,
      max: 100,
    },
    {
      id: "3",
      type: "select",
      key: "activityLevel",
      question: "How would you describe your current activity level?",
      options: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active",
      ],
    },
    {
      id: "4",
      type: "multiselect",
      key: "mealPreferences",
      question: "Which meals do you usually eat during the day?",
      options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    },
    {
      id: "5",
      type: "yesNo",
      key: "smoker",
      question: "Do you smoke?",
    },
    {
      id: "6",
      type: "slider",
      key: "stressLevel",
      question: "How would you rate your current stress level?",
      min: 1,
      max: 10,
    },
  ],
};