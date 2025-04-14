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
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { NumericField } from "../ui/numeric-field";
import { Switch } from "../ui/switch";

interface Props {
  question: TQuestion;
  control: Control;
}

export const Question: FC<Props> = ({ question, control }) => {
  return (
    <>
      {question.type === "text" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                {question.question}
              </FormLabel>
              <FormControl className="w-[400px]">
                <Input placeholder="example-username" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500 mt-1" />
            </FormItem>
          )}
        />
      )}
      {question.type === "number" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                {question.question}
              </FormLabel>
              <FormControl className="w-[400px]">
                <NumericField {...field} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="text-sm text-red-500 mt-1" />
            </FormItem>
          )}
        />
      )}
      {question.type === "select" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                {question.question}
              </FormLabel>

              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      )}
      {question.type === "multiselect" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-sm font-medium text-gray-700">
                {question.question}
              </FormLabel>
              <FormControl className="w-[400px]">
                <MultiSelect
                  options={
                    question.options?.map((option) => ({
                      label: option,
                      value: option,
                    })) ?? []
                  }
                  selectedValues={field.value}
                  onChange={field.onChange}
                  placeholder="Select options"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500 mt-1" />
            </FormItem>
          )}
        />
      )}
      {question.type === "yesNo" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <div className="space-y-0.5">
                <FormLabel>{question.question}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      {question.type === "slider" && (
        <FormField
          control={control}
          name={question.key}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <div className="space-y-0.5">
                <FormLabel>{question.question}</FormLabel>
              </div>
              <FormControl className="w-[400px]">
                <SliderWithMarks
                  min={question.min}
                  max={question.max}
                  step={1}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </>
  );
};
