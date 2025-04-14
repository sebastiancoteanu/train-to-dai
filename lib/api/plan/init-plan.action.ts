"use server";

import openAIClient from "@/lib/ai/open-ai";
import getCurrentUser from "../user/get-current-user.action";

export const initPlan = async () => {
  const user = await getCurrentUser();
  console.log(user);
  // const response = await openAIClient.responses.create({
  //   model: "gpt-4o-mini",
  //   input: "Write a one-sentence bedtime story about a unicorn.",
  // });

  // return response;
};
