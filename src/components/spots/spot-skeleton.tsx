import { Skeleton } from "../ui/skeleton";

export function SpotSkeleton() {
    return (
        <div className="w-full">
            <Skeleton className=" w-full h-36 bg-foreground/10"/>
            <div className="flex flex-col gap-2 mt-2">
                <Skeleton className="w-1/2 h-4 bg-foreground/10"/>
                <Skeleton className="w-1/4 h-4 bg-foreground/10"/>
            </div>
        </div>
    );
}