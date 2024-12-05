import { addressToString } from "@/lib/utils";
import { SpotEventStatus, SpotEvent as SpotEventType } from "@/types/spot-events";
import clsx from "clsx";
import { ImageOff } from "lucide-react";
import { Link } from "react-router-dom";

export interface SpotEventProps {
    spotEvent: SpotEventType;
}

export function SpotEvent(props: SpotEventProps) {
    return (
        <Link
            to={`/spot-events/${props.spotEvent.id}`} 
            className={clsx(
                "p-2 border border-foreground/10 rounded-md shadow-sm flex flex-col gap-4",
                "bg-popover cursor-pointer"
            )}>
            {
                props.spotEvent.spot.photos.length > 0 ? (
                    <img src={props.spotEvent.spot.photos[0].file_path} alt={props.spotEvent.spot.name} className="w-full h-32 object-cover rounded-lg"/>
                ) : (
                    <div className="w-full h-32 rounded-lg flex justify-center items-center text-foreground/20">
                        <ImageOff/>
                    </div>
                )
            }
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 text-sm items-center">
                    <h1 className="font-medium">
                        {props.spotEvent.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className={clsx(
                            "rounded-full w-2 h-2",
                            props.spotEvent.status == SpotEventStatus.SCHEDULED ?
                                "bg-yellow-500" :
                                props.spotEvent.status == SpotEventStatus.ONGOING ?
                                    "bg-primary animate-pulse" :
                                    props.spotEvent.status == SpotEventStatus.CANCELLED ?
                                        "bg-red-500" :
                                        "bg-secondary"
                        )}></div>
                        <div className={clsx(
                            "text-xs",
                            props.spotEvent.status == SpotEventStatus.SCHEDULED ?
                                "text-yellow-500" :
                                props.spotEvent.status == SpotEventStatus.ONGOING ?
                                    "text-primary" :
                                    props.spotEvent.status == SpotEventStatus.CANCELLED ?
                                        "text-red-500" :
                                        "text-blue-700"
                        )}>
                            {
                                props.spotEvent.status == SpotEventStatus.SCHEDULED ?
                                    "Scheduled" :
                                    props.spotEvent.status == SpotEventStatus.ONGOING ?
                                        "Ongoing" :
                                        props.spotEvent.status == SpotEventStatus.CANCELLED ?
                                            "Cancelled" :
                                            "Ended"
                            }
                        </div>
                    </div>
                </div>
                <div className="text-xs">
                    {props.spotEvent.description}
                </div>
                <div className="text-foreground text-xs flex">
                    {addressToString(props.spotEvent.spot.address)}
                </div>
            </div>
        </Link>
    );
}