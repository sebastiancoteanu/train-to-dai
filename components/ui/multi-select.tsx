"use client";

import { FC, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Option = {
  label: string;
  value: string;
};

interface Props {
  options: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
}

export const MultiSelect: FC<Props> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  className,
  disabled = false,
  searchable = false,
}) => {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const isControlled = selectedValues !== undefined && onChange !== undefined;
  const currentValues = isControlled ? selectedValues : internalSelected;

  const toggleOption = (value: string) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (isControlled) {
      onChange?.(newValues);
    } else {
      setInternalSelected(newValues);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate max-w-[160px] overflow-hidden text-ellipsis">
            {currentValues.length > 0
              ? options
                  .filter((option) => currentValues.includes(option.value))
                  .map((option) => option.label)
                  .join(", ")
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {searchable && (
            <CommandInput placeholder="Search..." className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => toggleOption(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
