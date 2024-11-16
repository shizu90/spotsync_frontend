import { CreatePost } from "../../components/post/create-post";
import { ClosestSpots } from "./closest-spots";
import { OnGoingSpotEvents } from "./on-going-spot-events";
import { Posts } from "./posts";
import { SidebarMenu } from "./sidebar-menu";
import { TrendingSpots } from "./trending-spots";

export function Home() {
    return (
        <div className="w-3/5 max-[1000px]:w-full max-[1000px]:mx-4 flex flex-col gap-8">
            <div className="w-full flex justify-between gap-8 max-[1000px]:justify-center max-[1000px]:gap-0">
                <div className="w-3/5 max-[1000px]:w-full">
                    <CreatePost/>
                    <hr className="border-foreground/10 mt-4 mb-8"/>
                    <Posts/>
                </div>
                <div className="grow flex flex-col gap-8">
                    <SidebarMenu/>
                    <TrendingSpots/>
                    <ClosestSpots/>
                    <OnGoingSpotEvents/>
                </div>
            </div>
        </div>
    );
}