import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { FaRegSmile } from "react-icons/fa";
import { FaPaperclip, FaRegImage } from "react-icons/fa6";

export function CreatePost() {
    return (
        <div className="bg-background w-full p-4 rounded-lg shadow-sm border border-foreground/10">
            <div className="flex gap-4 h-full">
                <Avatar className="size-10">
                    <AvatarImage src="src/assets/spotsync_icon.svg" />
                </Avatar>
                <Textarea 
                    className={clsx(
                        "border-none outline-none shadow-none focus-visible:ring-0 resize-none",
                    )} 
                    placeholder="Create a post"
                />
            </div>
            <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-2">
                    <button className="outline-none text-foreground focus:text-secondary duration-100 hover:text-secondary">
                        <FaPaperclip className="text-md size-4"/>
                    </button>
                    <button className="outline-none text-foreground focus:text-secondary duration-100 hover:text-secondary">
                        <FaRegImage className="text-md size-4"/>
                    </button>
                    <button className="outline-none text-foreground focus:text-secondary duration-100 hover:text-secondary">
                        <FaRegSmile className="text-md size-4"/>
                    </button>
                </div>
                <Button className="focus-visible:outline-primary focus-visible:ring-0">
                    Send
                </Button>
            </div>
        </div>
    );
}