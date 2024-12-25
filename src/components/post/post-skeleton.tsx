import { Skeleton } from "../ui/skeleton";

export function PostSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center">
                <Skeleton className="w-12 h-12 rounded-full bg-foreground/10"/>
                <Skeleton className="w-1/4 h-4 bg-foreground/10"/>
            </div>
            <Skeleton className="w-full h-4 bg-foreground/10"/>
            <Skeleton className="w-3/4 h-4 bg-foreground/10"/>
            <Skeleton className="w-1/2 h-4 bg-foreground/10"/>
        </div>
    );
}