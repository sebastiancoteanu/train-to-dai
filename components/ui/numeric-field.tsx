import { Input } from "./input";

export const NumericField = ({
  onChange,
  ...props
}: Omit<React.ComponentProps<"input">, "onChange"> & {
  onChange: (_: number) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseFloat(raw);

    onChange?.(isNaN(parsed) ? 0 : parsed);
  };

  return <Input {...props} onChange={handleChange} type="number" />;
};
