import { Spot } from "@/components/spots/spot";
import { SpotSkeleton } from "@/components/spots/spot-skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { mobile } from "@/constants/media-query";
import { SpotService } from "@/services/spots";
import { Spot as SpotModel } from "@/types/spots";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "usehooks-ts";
import { SpotsFilters, SpotsFiltersType } from "./spots-filters";
import { SpotsSortBy, SpotsSortByType } from "./spots-sort-by";

export function Spots() {
    const isMobile = useMediaQuery(`(max-width: ${mobile})`);
    const [filters, setFilters] = useState<SpotsFiltersType>({
        search: undefined,
        types: [],
        distance: [0, 30],
        address: {
            country: undefined,
            state: undefined,
            city: undefined,
        },
        rating: [0, 10],
    });
    const [sortBy, setSortBy] = useState<SpotsSortByType>({
        sortBy: "name",
        sortDirection: "asc",
    });
    const debouncedFilters = useDebounce(filters, 500);
    const debouncedSortBy = useDebounce(sortBy, 500);

    const { data, fetchNextPage, hasNextPage }  = useInfiniteQuery({
        queryKey: ['spots', debouncedFilters, debouncedSortBy],
        queryFn: ({pageParam}) => {
            const spotService = new SpotService();

            return spotService.paginateSpots({
                name: filters.search,
                type: filters.types,
                min_distance: filters.distance?.[0],
                max_distance: filters.distance?.[1],
                min_rating: filters.rating?.[0],
                max_rating: filters.rating?.[1],
                country: filters.address?.country,
                state: filters.address?.state,
                city: filters.address?.city,
                sort: sortBy.sortBy,
                sort_direction: sortBy.sortDirection,
                page: pageParam, 
                limit: 12
            });
        },
        getNextPageParam: (res) => {
            return res?.data.data.has_next_page ? res.data.data.current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });

    const spots = useMemo(() => {
        return data?.pages.reduce((acc: SpotModel[], page) => {
            return [...acc, ...page?.data.data.items || []];
        }, []);
    }, [data]);

    return (
        <div className="flex justify-between gap-4 w-full md:flex-row flex-col">
            {
                isMobile ? (
                    <Collapsible>
                        <CollapsibleTrigger className="bg-foreground/10 w-full text-start p-2 text-sm font-medium flex hover:bg-foreground/20 duration-100 rounded shadow-sm items-center">
                            Customize search
                            <FaChevronDown className="ml-auto"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="md:w-3/12 flex flex-col gap-8 px-2 mt-6">
                                <SpotsFilters
                                    filters={filters}
                                    onFiltersChange={setFilters}
                                />
                                <SpotsSortBy
                                    sortBy={sortBy}
                                    onChange={setSortBy}
                                />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ) : (
                    <div className="md:w-3/12 flex flex-col gap-8">
                        <SpotsFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        <SpotsSortBy
                            sortBy={sortBy}
                            onChange={setSortBy}
                        />
                    </div>
                )
            }
            <div className="flex flex-col w-full">
                <InfiniteScroll
                    dataLength={spots?.length || 0}    
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={
                        <>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                            <SpotSkeleton className={clsx("w-full", !isMobile && "max-w-[300px]")}/>
                        </>
                    }
                    className="flex gap-4 flex-wrap w-full items-start justify-stretch"
                    style={{overflow: 'hidden'}}   
                >
                    {
                        spots?.map((spot) => (
                            <div key={spot.id} className={
                                clsx(
                                    "w-full",
                                    !isMobile && "max-w-[300px]"
                                )
                            }>
                                <Spot spot={spot}/>
                            </div>
                        ))
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
}