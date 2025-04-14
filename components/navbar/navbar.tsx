import { NavigationMenu } from "../ui/navigation-menu";

import NavbarMain from "./navbar-main";
import NavbarUser from "./navbar-user";

const Navbar = () => {
  return (
    <NavigationMenu className="max-w-auto w-full flex items-center justify-between p-4 border-b bg-background">
      <NavbarMain />
      <NavbarUser />
    </NavigationMenu>
  );
};

export default Navbar;
