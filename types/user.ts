import { User } from "@prisma/client";

export type SafeUser = Pick<
  User,
  | "id"
  | "username"
  | "email"
  | "dateOfBirth"
  | "weight"
  | "height"
  | "sex"
  | "createdAt"
  | "updatedAt"
  | "image"
>;
