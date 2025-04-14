"use client";

import { CreatePlanWizard } from "@/components/create-plan-wizard/create-plan-wizard";
import { PlanProvider } from "@/lib/providers/plan-provider";

export default function CreatePlanPage() {
  return (
    <PlanProvider>
      <CreatePlanWizard />
    </PlanProvider>
  );
}
