import getCurrentUser from "@/lib/user/get-current-user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function NavbarUserAvatar() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const startingLetter = user.username ? user.username.charAt(0) : "U";

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage
        src={user.image ?? "/user-avatar.png"}
        alt={user.username ?? "User"}
      />
      <AvatarFallback>{startingLetter}</AvatarFallback>
    </Avatar>
  );
}
