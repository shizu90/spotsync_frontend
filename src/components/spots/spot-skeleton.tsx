import clsx from "clsx";
import { Skeleton } from "../ui/skeleton";

interface SpotSkeletonProps {
    className?: string;
}

export function SpotSkeleton(props: SpotSkeletonProps) {
    return (
        <div className={clsx("w-full", props.className)}>
            <Skeleton className=" w-full h-36 bg-foreground/10"/>
            <div className="flex flex-col gap-2 mt-2">
                <Skeleton className="w-1/2 h-4 bg-foreground/10"/>
                <Skeleton className="w-1/4 h-4 bg-foreground/10"/>
            </div>
        </div>
    );
}