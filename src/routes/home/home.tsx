import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/routes/home/sidebar";
import clsx from "clsx";
import { CreatePost } from "../../components/post/create-post";
import { ClosestSpots } from "./closest-spots";
import { OnGoingSpotEvents } from "./on-going-spot-events";
import { Threads } from "./threads";
import { YourGroups } from "./your-groups";

export function Home() {
    return (
        <div className="flex justify-between gap-4 w-full">
            <div className={clsx(
                "hidden md:flex flex-col gap-4 md:w-60",
            )}>
                <Sidebar/>
                <YourGroups/>
            </div>
            <div className="md:w-3/4 overflow-hidden">
                <CreatePost/>
                <hr className="border-foreground/10 mt-4 mb-8"/>
                <h3 className="mb-4 font-medium text-sm">
                    Recent Activity
                </h3>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">
                            All
                        </TabsTrigger>
                        <TabsTrigger value="following">
                            Following
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <Threads/>
                    </TabsContent>
                    <TabsContent value="following">
                        <Threads/>
                    </TabsContent>
                </Tabs>
            </div>
            <div className={
                clsx(
                    "hidden md:flex flex-col gap-4 md:min-w-80",
                )
            }>
                <ClosestSpots/>
                <OnGoingSpotEvents/>
            </div>
        </div>
    );
}