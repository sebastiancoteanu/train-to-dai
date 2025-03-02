import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export default function NavbarMain() {
  return (
    <NavigationMenuList className="gap-2">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/create-plan">Create plan</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/explore">Explore</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
