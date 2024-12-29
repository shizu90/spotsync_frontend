import { useNotification } from "@/hooks/use-notification";
import { useToast } from "@/hooks/use-toast";
import { NotificationService } from "@/services/notifications";
import { Notification as NotificationModel } from "@/types/notifications";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { FaBell } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Notification } from "../notifications/notification";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

export function NavbarNotifications() {
    const socket = useNotification();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const {data, fetchNextPage, hasNextPage }  = useInfiniteQuery({
        queryKey: ['navbar-notifications'],
        queryFn: ({pageParam}) => {
            const notificationService = new NotificationService();

            return notificationService.paginate({
                page: pageParam, 
                limit: 12
            });
        },
        getNextPageParam: (res) => {
            return res?.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
        },
        initialPageParam: 1
    });
    const totalUnread = useQuery({
        queryKey: ['navbar-notifications-total-unread'],
        queryFn: () => {
            const notificationService = new NotificationService();

            return notificationService.getTotalUnread();
        }
    });

    const notifications = useMemo(() => {
        return data?.pages.reduce((acc: NotificationModel[], page) => {
            return [...acc, ...page?.data.data.items || []];
        }, []);
    }, [data]);

    const readAll = () => {
        const notificationService = new NotificationService();

        notificationService.readAll();

        queryClient.invalidateQueries({
            queryKey: ['navbar-notifications']
        });

        queryClient.invalidateQueries({
            queryKey: ['navbar-notifications-total-unread']
        });
    };

    useEffect(() => {
        socket.on('notification', (data: NotificationModel) => {
            toast({
                title: data.title,
                description: data.content,
            });

            queryClient.invalidateQueries({
                queryKey: ['navbar-notifications']
            });
        });
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full focus:bg-foreground/10 p-1 h-fit">
                <div className="relative caret-transparent">
                    <FaBell className="size-4"/>
                    {
                        totalUnread.data && totalUnread.data.data.data > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex justify-center items-center">
                                {totalUnread.data.data.data}
                            </span>
                        )
                    }
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none w-72" align="end">
                <div className="w-full flex justify-between p-2 items-center">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <button className="text-xs text-primary hover:underline" onClick={() => readAll()}>
                        Mark all as read
                    </button>
                </div>
                <DropdownMenuSeparator className="bg-foreground/10"/>
                    <DropdownMenuGroup>
                        <InfiniteScroll
                            dataLength={notifications?.length || 0}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Spinner/>}
                            endMessage={
                                <p className="text-center text-xs text-foreground/60 my-4">
                                    No more notifications to show
                                </p>
                            }
                            className="flex flex-col gap-1 h-full max-h-72"
                            height={300}
                        >
                            {
                                notifications?.map((notification) => (
                                    <DropdownMenuItem className="cursor-pointer focus:bg-foreground/10 hover:bg-foreground/10" key={notification.id}>
                                        <Notification
                                            notification={notification}
                                            onRead={() => {
                                                queryClient.invalidateQueries({
                                                    queryKey: ['navbar-notifications']
                                                });

                                                queryClient.invalidateQueries({
                                                    queryKey: ['navbar-notifications-total-unread']
                                                });
                                            }}
                                        />
                                    </DropdownMenuItem>
                                ))
                            }
                        </InfiniteScroll>
                    </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}