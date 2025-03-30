
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";

import NavbarMain from "./navbar-main";
import NavbarUser from "./navbar-user";

const Navbar = () => {
  return (
    <NavigationMenu className="max-w-auto w-full flex items-center justify-between p-4 border-b bg-background">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="p-0">
            <Link href="/dashboard">
              <Image src="/logo.svg" alt="Home" width={36} height={36} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavbarMain />
      <NavbarUser />
    </NavigationMenu>
  );
};

export default Navbar;
