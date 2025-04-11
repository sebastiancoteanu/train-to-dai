import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth/nextAuth";

export default async function NavbarUserAvatar() {
  const session = await getServerSession(authOptions);
  const user: Session["user"] = session?.user;

  if (!user) {
    return null;
  }

  const fallback = user.username ? user.username.charAt(0) : "U";
  const avatarSource = user.image
    ? `${user.image}?bust=${user.updatedAt}`
    : "/user-avatar.png";
  const avatarAlt = user.username ?? user.email;

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={avatarSource} alt={avatarAlt} width={96} height={96} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
