"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logout } from "@/lib/auth/logout.action";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function NavbarUserLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    signOut();
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
