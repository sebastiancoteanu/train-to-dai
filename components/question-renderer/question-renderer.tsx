"use client";

import { useState } from "react";
import { QuestionGroup as TQuestionGroup } from "./question-renderer.types";
import { QuestionGroup } from "../question-group/question-group";
import { Stepper } from "../ui/stepper";
import { questionGroup } from "./question-renderer.mocks";

export const QuestionRenderer = () => {
  const [questionGroups, setQuestionGroups] = useState<TQuestionGroup[]>([
    questionGroup,
  ]);

  const [activeGroupId, setActiveGroupId] = useState(
    questionGroups[0].groupTitle
  );

  const activeIdx = questionGroups.findIndex(
    (group) => group.groupTitle === activeGroupId
  );

  if (activeIdx < 0) {
    return <div>Something went wrong ...</div>;
  }

  const stepMetadata = questionGroups.map((group, index) => ({
    id: group.groupTitle,
    label: group.groupTitle,
    completed: false,
    disabled: index > activeIdx,
  }));

  const onStepChange = (id: string) => {
    setActiveGroupId(id);
  };

  return (
    <Stepper
      activeStepId={activeGroupId}
      stepMetadata={stepMetadata}
      onStepChange={onStepChange}
      className="flex flex-col gap-6"
    >
      <QuestionGroup questionGroup={questionGroups[activeIdx]} />
    </Stepper>
  );
};
