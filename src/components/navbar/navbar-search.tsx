import clsx from "clsx";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const search_items = [
    "Spots",
    "Spot folders",
    "Spot events",
    "Groups",
    "Users",
];

export function NavbarSearch() {
    const [selectedSearch, setSelectedSearch] = useState(search_items[0]);

    return (
        <div className="flex items-center justify-center bg-popover text-popover-foreground rounded-lg pr-4 max-[1000px]:px-2">
            <Select value={selectedSearch} onValueChange={setSelectedSearch}>
                <SelectTrigger className=" w-52 border-none max-[1000px]:hidden">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent className="bg-popover border-none" >
                    <SelectGroup>
                        {
                            search_items.map((item, _) => (
                                <SelectItem value={item} key={`navbar-search-${item}`} className={clsx(
                                    selectedSearch === item && "bg-accent text-accent-foreground",
                                    "mb-0.5"
                                )}>
                                    {item}
                                </SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Input
                className={clsx(
                    "border-none outline-none mr-2",
                    "max-[1000px]:hidden"
                )}
                placeholder={`Search for ${selectedSearch.toLowerCase()}`}
            />
            <FaSearch className="w-8 cursor-pointer"/>
        </div>
    );
}