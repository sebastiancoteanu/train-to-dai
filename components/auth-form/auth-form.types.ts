export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
} | undefined;