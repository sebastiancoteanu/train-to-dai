"use client";

import { useActionState } from "react";
import { signup } from "./signup-form.action";
import AuthForm from "../auth-form/auth-form";
import { FormState } from "../auth-form/auth-form.types";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signup,
    undefined
  );

  return (
    <AuthForm
      formAction={formAction}
      hintText="Already have an account?"
      isPending={isPending}
      secondActionPath="/login"
      sectionActionText="Login now"
      state={state}
      submitText="Sign Up"
      title="Create your account"
    />
  );
}
