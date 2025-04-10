"use client";

import { useState } from "react";
import { Slider } from "./slider";

interface SliderWithMarksProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export const SliderWithMarks: React.FC<SliderWithMarksProps> = ({
  value,
  defaultValue = 1,
  min = 1,
  max = 10,
  step = 1,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleChange = (val: number[]) => {
    if (value === undefined) {
      setInternalValue(val[0]);
    }
    onChange?.(val[0]);
  };

  return (
    <div className="flex flex-col gap-2 w-[200px]">
      <Slider
        value={[currentValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
      />
      <div className="flex justify-between text-sm text-muted-foreground px-1">
        {Array.from(
          { length: (max - min) / step + 1 },
          (_, i) => min + i * step
        ).map((stepValue) => (
          <span key={stepValue}>{stepValue}</span>
        ))}
      </div>
    </div>
  );
};
