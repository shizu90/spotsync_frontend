import { Group } from "@/components/groups/group";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { GroupService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function YourGroups() {
    const { auth } = useAuthStore();

    if (!auth) {
        return null;
    }

    const groupService = new GroupService(auth.bearerToken);
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
                <h1 className="font-medium text-md">
                    Your groups
                </h1>
            </header>
            <main className="h-fit border border-foreground/10 rounded-lg shadow-sm">
                {
                    isLoading ? (
                        <Spinner/>
                    ) : (
                        data && data.data.data.items.length > 0 ? (
                            <ul>
                                {
                                    data?.data.data.items.map((group) => (
                                        <li>
                                            <Group group={group} key={group.id}/>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-foreground text-xs">
                                No groups
                            </div>
                        )
                    )
                }
                <footer className="text-center text-xs text-foreground hover:underline my-4">
                    <Link to={`/groups?participating=true`}>
                        View more groups
                    </Link>
                </footer>
            </main>
        </article>
    );
}