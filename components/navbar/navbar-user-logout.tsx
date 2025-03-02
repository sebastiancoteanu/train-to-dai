import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useTransition } from "react";
import { logout } from "@/lib/auth/logout.action";

export default function NavbarUserLogout() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
