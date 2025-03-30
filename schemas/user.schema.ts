import { Sex } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(1, "Email required").email("Invalid email"),
  dateOfBirth: z
    .date()
    .refine((date) => date < new Date(), {
      message: "Date of birth must be in the past.",
    })
    .refine((date) => date > new Date("1900-01-01"), {
      message: "Date of birth is too old.",
    }),
  weight: z.number().refine((weight) => weight >= 40 && weight <= 200, {
    message: "Weight must be between 40 and 200.",
  }),
  height: z.number().refine((height) => height >= 50 && height <= 250, {
    message: "Height must be between 50 and 250 cm.",
  }),
  sex: z.nativeEnum(Sex),
});
