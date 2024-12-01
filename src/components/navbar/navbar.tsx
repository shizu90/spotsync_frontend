import { useAuthStore } from "@/hooks/auth-store";
import clsx from "clsx";
import { Icon } from "../icon/icon";
import { NavbarHome } from "./navbar-home";
import { NavbarNotifications } from "./navbar-notifications";
import { NavbarSearch } from "./navbar-search";
import { NavbarUser } from "./navbar-user";

export function Navbar() {
    const { signedIn } = useAuthStore();

    return (
        <header className={clsx(
            "top-0 z-10 h-12",
            "bg-popover text-foreground",
            "border-b border-b-black border-opacity-10"
        )}>
            {signedIn ? (
                <nav className={clsx(
                    "flex items-center justify-between",
                    "mx-4 my-2"
                )}>
                    <div className="flex gap-4">
                        <Icon className="size-10"/>
                        <NavbarSearch/>
                    </div>
                    <div className="flex border border-foreground/10 shadow-sm rounded-lg px-4">
                        <NavbarHome/>
                        <NavbarNotifications/>
                        <NavbarUser/>
                    </div>
                </nav>
            ) :
                <nav className={clsx(
                    "flex items-center justify-center",
                    "mx-4 my-2"
                )}>
                    <Icon className="size-10"/>
                </nav> 
            }
        </header>
    );
}