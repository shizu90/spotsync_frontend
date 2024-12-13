import { Spot } from "@/components/spots/spot";
import { Spinner } from "@/components/ui/spinner";
import { SpotService } from "@/services/spots";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function ClosestSpots() {
    const isMobile = useMediaQuery("(max-width: 1000px)");
    const spotService = new SpotService();
    const { data, isLoading } = useQuery({
        queryKey: ["trending-spots"],
        queryFn: async () => {
            return await spotService.paginateSpots({
                paginate: true,
                limit: 10,
                sort: 'distance',
            });
        }
    });

    return !isMobile && (
        <article className="flex flex-col gap-4">
            <header>
                <h1 className="font-medium text-sm">
                    Spots near you
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
                                    data?.data.data.items.map((spot, index) => (
                                        <li className={clsx(
                                            index !== 0 && 'mt-2'
                                        )} key={spot.id}>
                                            <Spot spot={spot} key={spot.id}/>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-foreground text-xs">
                                No spots near you
                            </div>
                        )
                    )
                }
                <footer className="text-center text-xs text-foreground hover:underline my-4">
                    <Link to={`/spots?sort=distance`}>
                        View more spots near you
                    </Link>
                </footer>
            </main>
        </article>
    );
}