import { Root, Field, Label, Control, Submit } from "@radix-ui/react-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormState } from "./auth-form.types";
import Form from "next/form";
import { Button } from "../ui/button";

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
    <div>
      <Root className="FormRoot w-sm mx-auto" asChild>
        <Form action={formAction}>
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
          <Field className="FormField" name="password">
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
          <section className="mt-2">
            {state?.errors?.general && <p>{state.errors.general[0]}</p>}
          </section>
          <Submit asChild>
            <button
              className="Button w-full px-3 py-1 bg-gray-800 text-white border-gray-800 rounded-sm my-4"
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
        </Form>
      </Root>
      <Button onClick={() => signIn("google")}>Continue with Google</Button>
      <Button onClick={() => signIn("facebook")}>Continue with Facebook</Button>
      <Button onClick={() => signIn("apple")}>Continue with Apple</Button>
    </div>
  );
}
