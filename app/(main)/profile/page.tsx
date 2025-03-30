import UserProfile from "@/components/user-profile/user-profile";
import { Suspense } from "react";

export default async function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <UserProfile />
    </Suspense>
  );
}
