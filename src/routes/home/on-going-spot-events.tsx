import { SpotEvent } from "@/components/spot-events/spot-event";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { SpotEventService } from "@/services/spot-events";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function OnGoingSpotEvents() {
    const { auth } = useAuthStore();
    const isMobile = useMediaQuery("(max-width: 1000px)");

    if (!auth) {
        return null;
    }

    const spotEventService = new SpotEventService(auth.bearerToken);

    const { data, isLoading } = useQuery({
        queryKey: ['on-going-spot-events'],
        queryFn: async () => await spotEventService.paginateSpotEvents({
        })
    });

    return !isMobile && (
        <article className="flex flex-col gap-4">
            <header>
                <h1 className="font-medium text-md">
                    On-going spot events
                </h1>
            </header>
            <main className="h-fit border border-foreground/10 rounded-lg shadow-sm">
                {
                    isLoading ? (
                        <Spinner/>
                    ) : (
                        <ul>
                            {
                                data?.data.data.items.map((spotEvent) => (
                                    <li>
                                        <SpotEvent spotEvent={spotEvent} key={spotEvent.id}/>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                <footer className="text-center text-xs text-foreground hover:underline my-4">
                    <Link to={`/spot-events?category=on-going`}>
                        View more on-going spot events
                    </Link>
                </footer>
            </main>
        </article>
    );
}