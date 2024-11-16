import { Spot } from "@/components/spots/spot";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { SpotService } from "@/services/spots";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

export function ClosestSpots() {
    const { auth } = useAuthStore();
    const isMobile = useMediaQuery("(max-width: 1000px)");

    if (!auth) {
        return null;
    }

    const spotService = new SpotService(auth.bearerToken);
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
                <h1 className="font-medium text-md">
                    Spots near you
                </h1>
            </header>
            <main className="h-fit border border-foreground/10 rounded-lg shadow-sm">
                {
                    isLoading ? (
                        <Spinner/>
                    ) : (
                        <ul>
                            {
                                data?.data.data.items.map((spot) => (
                                    <li>
                                        <Spot spot={spot} key={spot.id}/>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                <footer className="text-center text-xs text-foreground hover:underline my-4">
                    <Link to={`/spots?category=closest`}>
                        View more spots near you
                    </Link>
                </footer>
            </main>
        </article>
    );
}