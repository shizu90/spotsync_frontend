import { PostSkeleton } from "./post-skeleton";

export function ThreadSkeleton() {
    return (
        <div className="w-full">
            <PostSkeleton/>
            <hr className="my-8 border-foreground/10"/>

            <div className="flex flex-col gap-4">
                <PostSkeleton/>
                <PostSkeleton/>
                <PostSkeleton/>
            </div>
        </div>
    );
}