import { FC } from "react";
import { QuestionGroup as TQuestionGroup } from "../question-renderer/question-renderer.types";
import { Question } from "../question/question";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { generateDefaultValues } from "./question-group.utils";
import { Button } from "../ui/button";

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
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">{questionGroup.groupTitle}</h2>
      {questionGroup.intro && (
        <p className="text-gray-600">{questionGroup.intro}</p>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 pt-4"
        >
          {questionGroup.questions.map((question) => (
            <Question
              question={question}
              key={question.id}
              control={form.control}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};
