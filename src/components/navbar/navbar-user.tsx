import clsx from "clsx";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function NavbarUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={clsx(
                    "bg-popover text-popover-foreground rounded-lg",
                    "flex items-center justify-center gap-2 px-4 py-2"
                )}>
                    <h3 className="text-sm">Username</h3>
                    <Avatar className="size-6">
                        <AvatarImage src="src/assets/spotsync_icon.svg" />
                    </Avatar>
                    <FaChevronDown className="size-4"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none w-52" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center justify-between">
                        <h3>Profile</h3>
                        <FaUser/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between">
                        <h3>Settings</h3>
                        <FaGear/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={clsx(
                        "flex items-center justify-between",
                        "focus:bg-red-500"
                    )}>
                        Logout
                        <FaSignOutAlt/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}