import getCurrentUser from "@/lib/user/get-current-user.action";
import { ProfileForm } from "../profile-form/profile-form";

export default async function UserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <ProfileForm user={user} />;
}
