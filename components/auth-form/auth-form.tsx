import { Root, Field, Label, Control, Submit } from "@radix-ui/react-form";
import Link from "next/link";
import { FormState } from "./auth-form.types";

interface Props {
  formAction: (payload: FormData) => void;
  state: FormState;
  isPending: boolean;
  title: string;
  submitText: string;
  hintText: string;
  secondActionPath: string;
  sectionActionText: string;
}

export default function AuthForm({
  formAction,
  state,
  isPending,
  title,
  submitText,
  hintText,
  secondActionPath,
  sectionActionText,
}: Props) {
  return (
    <Root className="FormRoot w-sm mx-auto" action={formAction}>
      <section>
        <h1 className="text-2xl text-center mb-6">{title}</h1>
      </section>
      <Field className="FormField mb-4" name="email">
        <div className="mb-2">
          <Label className="FormLabel">Email</Label>
        </div>
        <Control asChild>
          <input
            className="Input border-2 rounded-sm px-3 py-1 w-full"
            type="email"
            required
            placeholder="name@example.com"
          />
        </Control>
        <section>
          {state?.errors?.email && <p>{state.errors.email[0]}</p>}
        </section>
      </Field>
      <Field className="FormField  mb-4" name="password">
        <div className="mb-2">
          <Label className="FormLabel">Password</Label>
        </div>
        <Control asChild>
          <input
            className="Input border-2 rounded-sm px-3 py-1 w-full"
            type="password"
            required
          />
        </Control>
        <section>
          {state?.errors?.password && <p>{state.errors.password[0]}</p>}
        </section>
      </Field>
      <Submit asChild>
        <button
          className="Button w-full px-3 py-1 bg-gray-800 text-white border-gray-800 rounded-sm mb-4"
          disabled={isPending}
        >
          {submitText}
        </button>
      </Submit>
      <section>
        <p className="text-center">
          {hintText}{" "}
          <span className="font-bold text-sky-500">
            <Link href={secondActionPath}>{sectionActionText}</Link>
          </span>
        </p>
      </section>
    </Root>
  );
}
