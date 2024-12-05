import { useAuthStore } from "@/hooks/auth-store";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { SpotsyncIcon } from "../icon/spotsync-icon";
import { Container } from "../layout/container";
import { NavbarLinks } from "./navbar-links";
import { NavbarNotifications } from "./navbar-notifications";
import { NavbarUser } from "./navbar-user";

export function Navbar() {
    const { signedIn } = useAuthStore();

    return (
        <header className={clsx(
            "top-0 z-10 h-10 fixed w-full",
            "bg-popover text-foreground",
            "border-b border-b-black border-opacity-10",
            "flex items-center justify-center",
        )}>
            {signedIn ? (
                <Container>
                    <nav className={clsx(
                        "flex items-center justify-between",
                    )}>
                        <div className="flex gap-8 items-center">
                            <Link 
                                to={`/`}
                                className="flex items-center justify-center py-1 gap-2">
                                <SpotsyncIcon className="size-6"/>
                                <h3 className="text-md font-medium">Spotsync</h3>
                            </Link>
                            <NavbarLinks/>
                        </div>
                        <div className="flex gap-2 items-center">
                            <NavbarNotifications/>
                            <NavbarUser/>
                        </div>
                    </nav>
                </Container>
            ) :
                <nav className={clsx(
                    "flex items-center justify-center",
                    "mx-4 my-2"
                )}>
                    <SpotsyncIcon className="size-6"/>
                </nav> 
            }
        </header>
    );
}