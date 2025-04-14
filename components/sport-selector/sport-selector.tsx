"use client";

import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { Sport } from "./sport-selector.types";

const sports: Sport[] = [
  { id: "running", name: "Running", icon: "mdi:run-fast" },
  { id: "fitness", name: "Fitness", icon: "mdi:dumbbell" },
  { id: "cycling", name: "Cycling", icon: "mdi:bike" },
  { id: "swimming", name: "Swimming", icon: "mdi:swim" },
];

interface Props {
  onSelect: (sportId: Sport["id"]) => void;
}

export const SportSelector: FC<Props> = ({ onSelect }) => {
  const [search, setSearch] = useState("");

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-4 flex flex-col items-center gap-6">
      <section className="relative max-w-[400px] flex w-full mb-0">
        <SearchIcon
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
          size={20}
        />
        <Input
          type="text"
          placeholder="Search for a sport"
          className="w-full pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <section
        className="grid gap-6 justify-center w-full sm:grid-cols-2 grid-cols-1"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(0, 250px))" }}
      >
        {filteredSports.map((sport) => (
          <div className="w-full aspect-square" key={sport.id}>
            <Button
              variant="outline"
              className="w-full h-full flex flex-col items-center justify-center text-center hover:shadow cursor-pointer"
              onClick={() => onSelect(sport.id)}
            >
              <Icon icon={sport.icon} className="size-5" />
              <span className="font-medium">{sport.name}</span>
            </Button>
          </div>
        ))}
      </section>
    </section>
  );
};
