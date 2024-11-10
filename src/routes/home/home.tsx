import { CreatePost } from "./create-post";
import { Posts } from "./posts";

export function Home() {
    return (
        <div className="w-3/5 max-[1000px]:w-full max-[1000px]:mx-4">
            <div className="w-3/5">
                <CreatePost/>
                <hr className="border-foreground/10 my-4 mb-8"/>
                <Posts/>
            </div>
        </div>
    );
}