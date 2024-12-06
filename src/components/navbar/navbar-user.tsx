import { useAuthStore } from "@/hooks/auth-store";
import clsx from "clsx";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Avatar, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function NavbarUser() {
    const { auth, signOut } = useAuthStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-fit focus:bg-foreground/10 rounded-full">
                <div className={clsx(
                    "rounded-lg",
                    "flex items-center justify-center gap-2 px-2 py-2"
                )}>
                    <h3 className="text-sm">{auth?.user.profile.display_name}</h3>
                    <Avatar className="size-5">
                        <AvatarImage src="src/assets/spotsync_icon.svg" />
                    </Avatar>
                    <FaChevronDown className="size-3"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center justify-between text-xs cursor-pointer">
                        <h3>Profile</h3>
                        <FaUser/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-between text-xs cursor-pointer">
                        <h3>Settings</h3>
                        <FaGear/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={clsx(
                        "flex items-center justify-between",
                        "focus:bg-red-500 text-xs cursor-pointer"
                    )} onClick={() => signOut()}>
                        Logout
                        <FaSignOutAlt/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}