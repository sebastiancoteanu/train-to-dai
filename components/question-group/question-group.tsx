import { FC } from "react";
import { QuestionGroup as QuestionGroupType } from "../question-renderer/question-renderer.types";
import { Question } from "../question/question";

interface Props {
  questionGroup: QuestionGroupType;
}

export const QuestionGroup: FC<Props> = ({ questionGroup }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {questionGroup.groupTitle}
      </h2>
      {questionGroup.intro && (
        <p className="text-gray-600 mb-4">{questionGroup.intro}</p>
      )}
      {questionGroup.questions.map((question) => (
        <Question question={question} key={question.id} />
      ))}
    </div>
  );
};
