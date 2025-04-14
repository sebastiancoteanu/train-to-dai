"use client";

import { useState } from "react";
import { QuestionRenderer } from "../question-renderer/question-renderer";
import { initPlan } from "@/lib/api/plan/init-plan.action";
import { SportSelector } from "../sport-selector/sport-selector";
import { SportKey } from "../sport-selector/sport-selector.types";

export const CreatePlanWizard = () => {
  const [started, setStarted] = useState(false);

  const onSportSelect = async (sport: SportKey) => {
    const res = await initPlan({ sport });
    setStarted(true);
    console.log(res);
  };

  return (
    <section className="p-6 flex flex-col">
      {started ? (
        <QuestionRenderer />
      ) : (
        <SportSelector onSelect={onSportSelect} />
      )}
    </section>
  );
};
