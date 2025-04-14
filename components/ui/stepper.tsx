"use client";

import { FC, ReactNode } from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type StepMetadata = {
  id: string;
  label: string;
  completed: boolean;
  disabled: boolean;
};

type Props = {
  stepMetadata: StepMetadata[];
  activeStepId: string;
  onStepChange?: (id: string) => void;
  children: ReactNode;
  className?: string;
};

export const Stepper: FC<Props> = ({
  stepMetadata,
  activeStepId,
  onStepChange,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      <div className="flex">
        {stepMetadata.map((step, index) => (
          <div key={step.id} className="flex justify-center relative flex-1">
            {index > 0 && (
              <div className="h-px top-3 bg-gray-200 flex-shrink-0 absolute flex-1 left-[calc(--spacing(6)-50%)] right-[calc(--spacing(6)+50%)]" />
            )}
            <Button
              onClick={() => !step.disabled && onStepChange?.(step.id)}
              disabled={step.disabled}
              variant="ghost"
              className="p-0 flex flex-col h-auto w-auto hover:bg-transparent"
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium",
                  step.completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-800"
                )}
              >
                {step.completed ? <CheckIcon className="w-4 h-4" /> : index + 1}
              </div>
              <span className="mt-1 text-sm text-center">{step.label}</span>
            </Button>
          </div>
        ))}
      </div>
      <>{children}</>
    </div>
  );
};
