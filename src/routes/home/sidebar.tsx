import { useAuthStore } from "@/hooks/auth-store";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCity, FaFolder, FaList, FaUser, FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { DropdownMenu, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

export function SidebarContent() {
    return (
        <div className="flex flex-col">
            <Link to="/spots" className={clsx(
                "hover:bg-foreground/10 focus:bg-foreground/10 px-4 py-2 rounded-md duration-100",
                "flex gap-2 items-center"
            )}>
                <FaCity/>
                <span>Spots</span>
            </Link>
            <Link to="/spot-events" className={clsx(
                "hover:bg-foreground/10 focus:bg-foreground/10 px-4 py-2 rounded-md duration-100",
                "flex gap-2 items-center"
            )}>
                <FaCalendarAlt/>
                <span>Spot Events</span>
            </Link>
            <Link to="/spot-folders" className={clsx(
                "hover:bg-foreground/10 focus:bg-foreground/10 px-4 py-2 rounded-md duration-100",
                "flex gap-2 items-center"
            )}>
                <FaFolder/>
                <span>Spot folders</span>
            </Link>
            <Link to="/groups" className={clsx(
                "hover:bg-foreground/10 focus:bg-foreground/10 px-4 py-2 rounded-md duration-100",
                "flex gap-2 items-center"
            )}>
                <FaUserGroup/>
                <span>Groups</span>
            </Link>
            <Link to="/users" className={clsx(
                "hover:bg-foreground/10 focus:bg-foreground/10 px-4 py-2 rounded-md duration-100",
                "flex gap-2 items-center"
            )}>
                <FaUser/>
                <span>Users</span>
            </Link>
        </div>
    );
}

export function Sidebar() {
    const auth = useAuthStore();
    const isMobile = useMediaQuery("(max-width: 1000px)");

    if (!auth) return null;

    return isMobile ? (
        <div className="fixed bottom-0 left-0 m-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-lg bg-primary text-background p-2">
                    <FaList/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover text-sm">
                    <SidebarContent/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    ) : (
        <div className="text-sm">
            <SidebarContent/>
        </div>
    )
}