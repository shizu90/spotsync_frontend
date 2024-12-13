import { SpotEvent } from "@/components/spot-events/spot-event";
import { Spinner } from "@/components/ui/spinner";
import { SpotEventService } from "@/services/spot-events";
import { SpotEventStatus } from "@/types/spot-events";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function OnGoingSpotEvents() {
    const isMobile = useMediaQuery("(max-width: 1000px)");

    const spotEventService = new SpotEventService();

    const { data, isLoading } = useQuery({
        queryKey: ['on-going-spot-events'],
        queryFn: async () => await spotEventService.paginateSpotEvents({
            status: SpotEventStatus.ONGOING,
            limit: 5,
        })
    });

    return !isMobile && (
        <article className="flex flex-col gap-4">
            <header>
                <h1 className="font-medium text-sm">
                    On-going spot events
                </h1>
            </header>
            <main className="h-fit">
                {
                    isLoading ? (
                        <Spinner/>
                    ) : (
                        data && data.data.data.items.length > 0 ? (
                                <ul>
                                    {
                                        data?.data.data.items.map((spotEvent, index) => (
                                            <li className={clsx(
                                                index !== 0 && 'mt-2'
                                            )} key={spotEvent.id}>
                                                <SpotEvent spotEvent={spotEvent} key={spotEvent.id}/>
                                            </li>
                                        ))
                                    }
                                </ul>
                        ) : (
                            <div className="p-4 text-center text-foreground text-xs">
                                No on-going spot events
                            </div>
                        )
                            
                    )
                }
                <footer className="text-center text-xs text-foreground hover:underline my-4">
                    <Link to={`/spot-events?status=ongoing`}>
                        View more on-going spot events
                    </Link>
                </footer>
            </main>
        </article>
    );
}