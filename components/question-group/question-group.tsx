import { FC } from "react";
import { QuestionGroup as TQuestionGroup } from "../question-renderer/question-renderer.types";
import { Question } from "../question/question";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { generateDefaultValues } from "./question-group.utils";

interface Props {
  questionGroup: TQuestionGroup;
}

export const QuestionGroup: FC<Props> = ({ questionGroup }) => {
  const defaultValues = generateDefaultValues(questionGroup);
  const form = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    console.log("Form values:", data);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {questionGroup.groupTitle}
      </h2>
      {questionGroup.intro && (
        <p className="text-gray-600 mb-4">{questionGroup.intro}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {questionGroup.questions.map((question) => (
            <Question
              question={question}
              key={question.id}
              control={form.control}
            />
          ))}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};
