import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SpotsSortByType = {
    sortBy?: "name" | "rating" | "distance";
    sortDirection?: "asc" | "desc";
}

interface SpotsSortByProps {
    sortBy?: SpotsSortByType; 
    onChange: (sortBy: SpotsSortByType) => void;
}

export function SpotsSortBy(props: SpotsSortByProps) {
    return (
        <div className="flex flex-col w-full">
            <h3 className="text-sm font-medium">Sort by</h3>

            <div className="flex justify-between gap-2 mt-2">
                <div className="flex gap-2 w-full">
                    <Select defaultValue="name" onValueChange={(value: "name" | "rating" | "distance") => props.onChange({ ...props.sortBy, sortBy: value })}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder={"Sort by"}/>
                        </SelectTrigger>
                        <SelectContent className="bg-popover w-full" align="end">
                            <SelectItem value="name" className="hover:cursor-pointer">
                                Name
                            </SelectItem>
                            <SelectItem value="rating" className="hover:cursor-pointer">
                                Rating
                            </SelectItem>
                            <SelectItem value="distance" className="hover:cursor-pointer">
                                Distance
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="asc" onValueChange={(value: "asc" | "desc") => props.onChange({ ...props.sortBy, sortDirection: value })}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder={"Sort direction"}/>
                        </SelectTrigger>
                        <SelectContent className="bg-popover w-full" align="end">
                            <SelectItem value="asc" className="hover:cursor-pointer">
                                Ascending
                            </SelectItem>
                            <SelectItem value="desc" className="hover:cursor-pointer">
                                Descending
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}