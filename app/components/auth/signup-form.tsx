"use client";

import { useActionState } from "react";
import { signup } from "./signup-form.action";
import { FormState } from "./signup-form.types";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signup,
    undefined
  );

  console.log(state?.errors);

  return (
    <form action={formAction}>
      <section>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
        {state?.errors?.email && <p>{state.errors.email[0]}</p>}
      </section>
      <section>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {state?.errors?.password && (
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </section>
      {state?.errors?.general && <p>{state.errors.general}</p>}
      <button disabled={isPending}>Sign Up</button>
    </form>
  );
}
