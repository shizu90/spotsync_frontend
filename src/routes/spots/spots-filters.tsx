import { CountrySelect, StateSelect } from "@/components/ui/country-select";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { SpotType } from "@/types/spots";
import { useState } from "react";

export type SpotsFiltersType = {
    search?: string;
    types?: string[];
    distance?: number[];
    address?: {
        country?: string;
        state?: string;
        city?: string;
    };
    rating?: number[];
}

interface SpotsFiltersProps {
    filters: SpotsFiltersType;
    onFiltersChange: (filters: SpotsFiltersType) => void;
}

export function SpotsFilters(props: SpotsFiltersProps) {
    const [locationFilterType, setLocationFilterType] = useState<"distance" | "address">("distance");

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-sm font-medium mb-2">
                Filters
            </h3>
            
            <div className="flex justify-between gap-2">
                <Input
                    placeholder="Search for spots"
                    className="h-10"
                    onChange={(e) => props.onFiltersChange({...props.filters, search: e.target.value})}
                />
            </div>

            <div className="flex flex-col mt-6">
                <h3 className="text-xs">
                    Types
                </h3>

                <MultiSelect
                    options={Object.entries(SpotType).map(([key, value]) => ({ 
                        label: value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase(),
                        value: key 
                    }))}
                    placeholder="Select types"
                    defaultValue={props.filters.types}
                    onValueChange={(types) => props.onFiltersChange({...props.filters, types})}
                    className="focus:bg-popover hover:bg-popover mt-2 font-normal bg-popover"
                />
            </div>

            <div className="flex flex-col mt-6">
                <div className="w-full flex justify-between">
                    <h3
                        className="text-xs"
                    >
                        {locationFilterType === "distance" ? "Distance" : "Address"}
                    </h3>
                    <h3 
                        onClick={() => setLocationFilterType(locationFilterType === "distance" ? "address" : "distance")}
                        className="text-xs hover:cursor-pointer hover:underline hover:text-secondary duration-100"
                    >
                        Filter by {locationFilterType === "distance" ? "address" : "distance"}
                    </h3>
                </div>

                {
                    locationFilterType === "address" ? (
                        <div className="flex flex-col mt-2 gap-2">
                            <CountrySelect
                                value={props.filters.address?.country}
                                onChange={(country) => props.onFiltersChange({...props.filters, address: { ...props.filters.address, country, state: undefined }, distance: undefined})}
                            />
                            <StateSelect
                                disabled={!props.filters.address?.country}
                                country={props.filters.address?.country}
                                value={props.filters.address?.state}
                                onChange={(state) => props.onFiltersChange({...props.filters, address: { ...props.filters.address, state }, distance: undefined})}
                            />
                            <Input
                                placeholder="City"
                                className="h-10"
                                disabled={!props.filters.address?.state}
                                onChange={(e) => props.onFiltersChange({...props.filters, address: { ...props.filters.address, city: e.target.value }, distance: undefined})}
                            />
                        </div>
                    ) : (
                        <DualRangeSlider
                            label={(value) => <span className="text-xs mt-10">{value}km</span>}
                            value={props.filters.distance || [0, 30]}
                            onValueChange={(distance) => props.onFiltersChange({...props.filters, distance, address: undefined})}
                            min={0}
                            max={100}
                            step={1}
                            className="text-sm mt-2"
                        />
                    )
                }
            </div>

            <div className="flex flex-col mt-6">
                <h3 className="text-xs">
                    Rating
                </h3>

                <DualRangeSlider
                    label={(value) => <span className="text-xs mt-10">{value}</span>}
                    value={props.filters.rating || [0, 10]}
                    onValueChange={(rating) => props.onFiltersChange({...props.filters, rating})}
                    min={0}
                    max={10}
                    step={0.1}
                    className="text-sm mt-2"
                />
            </div>
        </div>
    );
}