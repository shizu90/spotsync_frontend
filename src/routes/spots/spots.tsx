import { CountrySelect, StateSelect } from "@/components/ui/country-select";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { SpotType } from "@/types/spots";
import { useState } from "react";

export function Spots() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [distance, setDistance] = useState([0, 100]);
    const [rating, setRating] = useState([0, 10]);

    return (
        <div className="flex justify-between gap-4 w-full">
            <div className="md:w-3/12">
                <h3 className="text-sm font-medium mb-2">Filters</h3>
                <div className="flex justify-between gap-2">
                    <Input
                        placeholder="Search for spots"
                        className="h-10"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <h3 className="text-xs">
                        Types
                    </h3>

                    <MultiSelect
                        options={Object.entries(SpotType).map(([key, value]) => ({ label: key, value }))}
                        placeholder="Select types"
                        defaultValue={selectedTypes}
                        onValueChange={setSelectedTypes}
                        className="focus:bg-popover hover:bg-popover mt-2 font-normal bg-popover"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <h3 className="text-xs">
                        Distance
                    </h3>

                    <DualRangeSlider
                        label={(value) => <span className="text-xs mt-10">{value}km</span>}
                        value={distance}
                        onValueChange={setDistance}
                        min={0}
                        max={100}
                        step={1}
                        className="text-sm mt-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <h3 className="text-xs">
                        Rating
                    </h3>

                    <DualRangeSlider
                        label={(value) => <span className="text-xs mt-10">{value}</span>}
                        value={rating}
                        onValueChange={setRating}
                        min={0}
                        max={10}
                        step={0.1}
                        className="text-sm mt-2"
                    />
                </div>
                <div className="flex flex-col mt-6">
                    <h3 className="text-xs">
                        Country
                    </h3>

                    <CountrySelect className="mt-2"/>
                </div>
                <div className="flex flex-col mt-6">
                    <h3 className="text-xs">
                        State
                    </h3>

                    <StateSelect
                        country="BR"
                        className="mt-2"
                    />
                </div>
            </div>
        </div>
    );
}