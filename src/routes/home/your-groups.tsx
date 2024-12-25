import { Group } from "@/components/groups/group";
import { GroupSkeleton } from "@/components/groups/group-skeleton";
import { GroupService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function YourGroups() {
    const groupService = new GroupService();
    const isMobile = useMediaQuery("(max-width: 1000px)");

    const { data, isLoading } = useQuery({
        queryKey: ['your-groups'],
        queryFn: () => groupService.paginateGroups({
            limit: 5,
        }),
    });

    return !isMobile && (
        <article className="flex flex-col gap-4">
            <header>
                <h1 className="font-medium text-sm">
                    Your groups
                </h1>
            </header>
            <main className="h-fit">
                {
                    isLoading ? (
                        <div className="flex flex-col gap-2">
                            <GroupSkeleton/>
                            <GroupSkeleton/>
                        </div>
                    ) : (
                        data && data.data.data.items.length > 0 ? (
                            <>
                                <ul>
                                    {
                                        data?.data.data.items.map((group, index) => (
                                            <li className={clsx(
                                                index !== 0 && 'mt-2'
                                            )} key={group.id}>
                                                <Group group={group} key={group.id}/>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <footer className="text-center text-xs text-foreground hover:underline my-4">
                                    <Link to={`/groups?participating=true`}>
                                        View more groups
                                    </Link>
                                </footer>
                            </>
                        ) : (
                            <div className="p-4 text-center text-foreground text-xs">
                                No groups
                            </div>
                        )
                    )
                }
            </main>
        </article>
    );
}