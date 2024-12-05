import { FaBell } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

const notifications = [
    {
        'title': 'Notification 1',
        'description': 'Your have a new follower follower follower follower follower follower.',
    },
    {
        'title': 'Notification 2',
        'description': 'Description 2',
    },
    {
        'title': 'Notification 3',
        'description': 'Description 3',
    },
    {
        'title': 'Notification 4',
        'description': 'Description 4',
    },
    {
        'title': 'Notification 5',
        'description': 'Description 5',
    },
    {
        'title': 'Notification 6',
        'description': 'Description 6',
    },
    {
        'title': 'Notification 7',
        'description': 'Description 7',
    },
    {
        'title': 'Notification 8',
        'description': 'Description 8',
    },
    {
        'title': 'Notification 9',
        'description': 'Description 9',
    },
    {
        'title': 'Notification 10',
        'description': 'Description 10',
    },
];

export function NavbarNotifications() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline rounded-full focus:bg-foreground/10 p-1 h-fit">
                <FaBell className="size-4"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none w-72" align="end">
                <DropdownMenuGroup>
                    <ScrollArea className="h-72">
                        {
                            notifications.map((notification, _) => (
                                <DropdownMenuItem className="flex flex-col gap-2 items-start cursor-pointer">
                                    <h3 className="font-medium">{notification.title}</h3>
                                    <p>{notification.description}</p>
                                </DropdownMenuItem>
                            ))
                        }
                    </ScrollArea>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}