export type SportKey = "running" | "fitness" | "cycling" | "swimming";

export type Sport = {
  id: SportKey;
  name: string;
  icon: string;
}