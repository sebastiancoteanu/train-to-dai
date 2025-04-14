"use client";

import { useState } from "react";
import { QuestionRenderer } from "../question-renderer/question-renderer";
import { Button } from "../ui/button";
import { initPlan } from "@/lib/api/plan/init-plan.action";

export const CreatePlanWizard = () => {
  const [started, setStarted] = useState(false);

  const handleCreatePlanClick = async () => {
    const res = await initPlan();
    console.log(res);
    setStarted(true);
  };

  return (
    <section className="p-6 flex flex-col">
      <div className="flex self-end">
        {!started && <Button onClick={handleCreatePlanClick}>Create Plan</Button>}
        {started && <Button onClick={() => setStarted(false)}>Cancel</Button>}
      </div>
      {started && <QuestionRenderer />}
    </section>
  );
};
