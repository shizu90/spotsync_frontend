import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/hooks/auth-store";
import clsx from "clsx";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { FaCity, FaFolder, FaList, FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function SidebarMenu() {
    const { auth } = useAuthStore();
    const isMobile = useMediaQuery("(max-width: 1000px)");

    if (!auth) return null;

    return isMobile ? (
            <div className="fixed bottom-0 right-0 m-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-lg bg-primary text-background p-2">
                        <FaList/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background text-sm">
                        <Link 
                            to="#" 
                            className={clsx(
                                "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                                "flex items-center gap-2"
                            )}
                        >
                            <FaHome/>
                            <span>Home</span>
                        </Link>
                        <Link 
                            to="#" 
                            className={clsx(
                                "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                                "flex items-center gap-2"
                            )}
                        >
                            <FaCity/>
                            <span>Spots</span>
                        </Link>
                        <Link 
                            to="#" 
                            className={clsx(
                                "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                                "flex items-center gap-2"
                            )}
                        >
                            <FaCalendarAlt/>
                            <span>Spot events</span>
                        </Link>
                        <Link 
                            to="#" 
                            className={clsx(
                                "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                                "flex items-center gap-2"
                            )}
                        >
                            <FaFolder/>
                            <span>Spot folders</span>
                        </Link>
                        <Link 
                            to="#" 
                            className={clsx(
                                "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                                "flex items-center gap-2"
                            )}
                        >
                            <FaUserGroup/>
                            <span>Groups</span>
                        </Link>
                    </DropdownMenuContent>  
                </DropdownMenu>
            </div>
        ) : (
            <div className="flex flex-col gap-2 shadow-sm border border-foreground/10 rounded-lg text-sm p-2 h-fit">
                <Link 
                    to="#" 
                    className={clsx(
                        "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                        "flex items-center gap-2"
                    )}
                >
                    <FaHome/>
                    <span>Home</span>
                </Link>
                <Link 
                    to="#" 
                    className={clsx(
                        "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                        "flex items-center gap-2"
                    )}
                >
                    <FaCity/>
                    <span>Spots</span>
                </Link>
                <Link 
                    to="#" 
                    className={clsx(
                        "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                        "flex items-center gap-2"
                    )}
                >
                    <FaCalendarAlt/>
                    <span>Spot events</span>
                </Link>
                <Link 
                    to="#" 
                    className={clsx(
                        "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                        "flex items-center gap-2"
                    )}
                >
                    <FaFolder/>
                    <span>Spot folders</span>
                </Link>
                <Link 
                    to="#" 
                    className={clsx(
                        "text-foreground hover:bg-primary duration-100 px-4 py-2 rounded-md hover:text-background",
                        "flex items-center gap-2"
                    )}
                >
                    <FaUserGroup/>
                    <span>Groups</span>
                </Link>
            </div>
        )
}