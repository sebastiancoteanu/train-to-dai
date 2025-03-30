import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import Link from "next/link";
import NavbarUserLogout from "./navbar-user-logout";
import NavbarUserAvatar from "./navbar-user-avatar";
import { Suspense } from "react";

export default function NavbarUser() {
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Suspense fallback={<div>Loading profile...</div>}>
                <NavbarUserAvatar />
              </Suspense>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <NavbarUserLogout />
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
