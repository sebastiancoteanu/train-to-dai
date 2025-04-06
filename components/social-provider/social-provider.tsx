import { FC } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

interface Props {
  icon: string;
  label: string;
  id: string;
  iconWidth: number;
  iconHeight: number;
}

export const SocialProvider: FC<Props> = ({
  icon,
  label,
  id,
  iconWidth,
  iconHeight,
}) => {
  return (
    <Button
      key={id}
      className="cursor-pointer"
      variant="outline"
      onClick={() => signIn(id)}
    >
      <Image
        src={icon}
        alt={id}
        width={iconWidth}
        height={iconHeight}
        className="w-5 h-5"
      />
      {label}
    </Button>
  );
};
