import { Skeleton } from "../ui/skeleton";

export function GroupSkeleton() {
    return (
        <div className="flex gap-4 w-full">
            <Skeleton className="w-6 h-6 rounded-full bg-foreground/10" />
            <div className="flex flex-col gap-2">
                <Skeleton className="w-12 h-4 bg-foreground/10" />
                <Skeleton className="w-40 h-4 bg-foreground/10" />
            </div>
        </div>
    );
}