import { mobile } from "@/constants/media-query";
import { useAuthStore } from "@/hooks/auth-store";
import clsx from "clsx";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { SpotsyncIcon } from "../icon/spotsync-icon";
import { Container } from "../layout/container";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavbarLinks } from "./navbar-links";
import { NavbarNotifications } from "./navbar-notifications";
import { NavbarUser } from "./navbar-user";

export function Navbar() {
    const { signedIn } = useAuthStore();
    const isMobile = useMediaQuery(`(max-width: ${mobile})`);

    return (
        <header className={clsx(
            "top-0 z-10 h-fit fixed w-full",
            "bg-popover text-foreground",
            "border-b border-b-black border-opacity-10",
            "flex items-center justify-center",
        )}>
            {signedIn ? (
                <Container>
                    <nav className={clsx(
                        "flex items-center justify-between flex-wrap",
                    )}>
                        <div className={clsx(
                            "flex items-center",
                            isMobile ? "gap-4" : "gap-8"
                        )}>
                            {
                                isMobile ? (
                                    <>
                                        <Popover>
                                            <PopoverTrigger>
                                                <FaBars/>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-screen mt-1.5 rounded-none shadown-none border-none">
                                                <NavbarLinks orientation="vertical" linkClassName="text-md"/>
                                            </PopoverContent>
                                        </Popover>
                                        <Link
                                            to={`/`}
                                            className="flex items-center justify-center py-1 gap-2">
                                            <SpotsyncIcon className="size-6"/>
                                            <h3 className="text-md font-medium">Spotsync</h3>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                        to={`/`}
                                        className="flex items-center justify-center py-1 gap-2">
                                            <SpotsyncIcon className="size-6"/>
                                            <h3 className="text-md font-medium">Spotsync</h3>
                                        </Link>
                                        <NavbarLinks/>
                                    </>
                                )
                            }
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