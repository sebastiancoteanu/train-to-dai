import { FC } from "react";
import { Question as TQuestion } from "../question-renderer/question-renderer.types";
import { MultiSelect } from "../ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SliderWithMarks } from "../ui/slider-with-marks";

interface Props {
  question: TQuestion;
}

export const Question: FC<Props> = ({ question }) => {
  return (
    <div key={question.id}>
      <label htmlFor={question.key}>{question.question}</label>
      {question.type === "text" && <input type="text" id={question.key} />}
      {question.type === "number" && (
        <input
          type="number"
          id={question.key}
          min={question.min}
          max={question.max}
        />
      )}
      {question.type === "select" && (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {question.type === "multiselect" && (
        <MultiSelect
          options={
            question.options?.map((option) => ({
              label: option,
              value: option,
            })) ?? []
          }
          placeholder="Select options"
        />
      )}
      {question.type === "yesNo" && (
        <div>
          <label>
            <input type="radio" name={question.key} value="yes" /> Yes
          </label>
          <label>
            <input type="radio" name={question.key} value="no" /> No
          </label>
        </div>
      )}
      {question.type === "slider" && (
        <SliderWithMarks
          min={question.min}
          max={question.max}
          step={1}
        />
      )}
    </div>
  );
};
