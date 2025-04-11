import { z } from "zod";
import { QuestionGroup } from "../question-renderer/question-renderer.types";

export const generateDefaultValues = (group: QuestionGroup) => {
  const defaults: Record<string, any> = {};

  group.questions.forEach((q) => {
    switch (q.type) {
      case "text":
      case "select":
        defaults[q.key] = "";
        break;
      case "number":
      case "slider":
        defaults[q.key] = q.min ?? 0;
        break;
      case "multiselect":
        defaults[q.key] = [];
        break;
      case "yesNo":
        defaults[q.key] = false;
        break;
      default:
        defaults[q.key] = null;
    }
  });

  return defaults;
};

export const generateValidationSchema = (group: QuestionGroup) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  group.questions.forEach((q) => {
    switch (q.type) {
      case "text":
        shape[q.key] = z.string().min(1, `${q.question} is required`);
        break;
      case "number":
        shape[q.key] = z
          .number({
            required_error: `${q.question} is required`,
            invalid_type_error: `Enter a valid number`,
          })
          .min(q.min ?? 0)
          .max(q.max ?? Infinity);
        break;
      case "select":
        shape[q.key] = z.string().refine((val) => q.options?.includes(val), {
          message: `Invalid option for ${q.question}`,
        });
        break;
      case "multiselect":
        shape[q.key] = z
          .array(z.string())
          .refine((arr) => arr.every((val) => q.options?.includes(val)), {
            message: `One or more invalid selections in ${q.question}`,
          });
        break;
      case "yesNo":
        shape[q.key] = z.boolean();
        break;
      case "slider":
        shape[q.key] = z
          .number()
          .min(q.min ?? 0, `Minimum value is ${q.min}`)
          .max(q.max ?? 10, `Maximum value is ${q.max}`);
        break;
      default:
        shape[q.key] = z.any();
    }
  });

  return z.object(shape);
};
