import { useState } from "react";
import { SpotsFilters, SpotsFiltersType } from "./spots-filters";

export function Spots() {
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

    return (
        <div className="flex justify-between gap-4 w-full">
            <div className="md:w-3/12">
                <SpotsFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                />
            </div>
        </div>
    );
}