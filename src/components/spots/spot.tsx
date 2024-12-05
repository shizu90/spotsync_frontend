import { addressToString } from "@/lib/utils";
import { Spot as SpotType } from "@/types/spots";
import clsx from "clsx";
import { ImageOff } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface SpotProps {
    spot: SpotType;
}

export function Spot(props: SpotProps) {
    return (
        <Link 
            to={`/spots/${props.spot.id}`}
            className={clsx(
                "p-2 border border-foreground/10 rounded-md shadow-sm flex flex-col gap-4",
                "bg-popover cursor-pointer"
            )}>
            {
                props.spot.photos.length > 0 ? (
                    <img src={props.spot.photos[0].file_content} alt={props.spot.name} className="w-full h-32 object-cover rounded-lg"/>
                ) : (
                    <div className="w-full h-32 rounded-lg flex justify-center items-center text-foreground/20">
                        <ImageOff/>
                    </div>
                )
            }
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-sm items-center">
                    <h1 className="font-medium">
                        {props.spot.name}
                    </h1>
                    <div className="text-xs text-secondary">
                        {props.spot.total_favorites} favorites
                    </div>
                    <div className="flex gap-2 items-center text-yellow-500 text-xs">
                        <FaStar/>
                        <span>
                            {props.spot.average_rating}
                        </span>
                    </div>
                </div>
                <div className="text-xs">
                    {props.spot.description}
                </div>
                <div className="text-foreground text-xs flex">
                    {addressToString(props.spot.address)}
                </div>
            </div>
        </Link>
    );
}