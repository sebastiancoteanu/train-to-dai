"use server";

import openAIClient from "@/lib/ai/open-ai";
import getCurrentUser from "../user/get-current-user.action";
import { SportKey } from "@/components/sport-selector/sport-selector.types";
import { getFromPlanStore, saveToPlanStore } from "@/lib/cache/plan-temp-store";

export const initPlan = async ({ sport }: { sport: SportKey }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { dateOfBirth, sex, height, weight } = user;
  const tempId = crypto.randomUUID();

  console.log("saveToPlanStore", user);

  saveToPlanStore(tempId, {
    sport,
    profile: {
      dateOfBirth,
      sex,
      height,
      weight,
    },
  });

  return getFromPlanStore(tempId);
  // const response = await openAIClient.responses.create({
  //   model: "gpt-4o-mini",
  //   input: "Write a one-sentence bedtime story about a unicorn.",
  // });

  // return response;
};
