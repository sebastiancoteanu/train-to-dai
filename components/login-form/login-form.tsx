"use client";

import { useActionState } from "react";
import { login } from "./login-form.actions";
import AuthForm from "../auth-form/auth-form";
import { FormState } from "../auth-form/auth-form.types";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    login,
    undefined
  );

  return (
    <AuthForm
      formAction={formAction}
      hintText="Dont have an account?"
      isPending={isPending}
      secondActionPath="/signup"
      sectionActionText="Register now"
      state={state}
      submitText="Sign in"
      title="Login to your account"
    />
  );
}
