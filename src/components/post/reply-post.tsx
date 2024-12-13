import { useToast } from "@/hooks/use-toast";
import { PostService } from "@/services/posts";
import { Post } from "@/types/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegSmile } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { UploadedFile, UploadedFiles, UploadFile, UploadFileRoot } from "../ui/upload-file";

const formSchema = z.object({
    content: z.string().min(1),
});

type ReplyPostFormValues = z.infer<typeof formSchema>;

interface ReplyPostProps {
    parentPost: Post;
    onReplied?: () => void;
}

export function ReplyPost(props: ReplyPostProps) {
    const replyPostFn = async (data: ReplyPostFormValues) => {
        const service = new PostService();

        return await service.createPost({
            title: '',
            content: data.content,
            group_id: props.parentPost.group?.id,
            parent_id: props.parentPost.id,
        });
    };

    const { toast } = useToast();
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);

    const { mutateAsync: replyPostMutate, isPending } = useMutation({
        mutationFn: replyPostFn,
        onError: (error) => {
            toast({
                title: "Failed to create post",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const replyPostForm = useForm<ReplyPostFormValues>({
        defaultValues: {
            content: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: ReplyPostFormValues) => {
        replyPostMutate(data);
        if (props.onReplied) {
            props.onReplied();
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <div className="flex gap-4 rounded-lg mt-4">
                <Avatar className="size-6">
                    <AvatarImage src="src/assets/spotsync_icon.svg" />
                </Avatar>
                <p className="text-xs h-fit w-full">
                    {props.parentPost.content}
                </p>
            </div>

            <Form {...replyPostForm}>
                <UploadFileRoot
                    controlledSelectedFiles={selectedFiles}
                    setControlledSelectedFiles={setSelectedFiles}
                >
                    <form className="w-full rounded-lg" onSubmit={
                        replyPostForm.handleSubmit(onSubmit)
                    }>
                        <div className="flex gap-4 h-fit w-full">
                            <FormField
                                control={replyPostForm.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <Textarea
                                            {...field}
                                            className={clsx(
                                                "border-none outline-none shadow-none focus-visible:ring-0 resize-none",
                                            )}
                                            placeholder={`Reply to ${props.parentPost.creator.profile.display_name}'s post`}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex gap-4 items-center justify-start">
                            {
                                selectedFiles.length > 0 &&
                                <div className="flex gap-2 flex-wrap">
                                    <UploadedFiles/>
                                </div>
                            }
                        </div>
                        <div className="flex gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                <UploadFile>
                                    <div className="flex gap-2 items-center cursor-pointer">
                                        <FaRegImage className="text-md size-4"/>
                                        <span className="text-xs">Image</span>
                                    </div>
                                </UploadFile>
                                <button className="outline-none text-foreground focus:text-secondary duration-100 hover:text-secondary">
                                    <div className="flex gap-2 items-center cursor-pointer">
                                        <FaRegSmile className="text-md size-4"/>
                                        <span className="text-xs">
                                            Emoji
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <Button className="focus-visible:outline-primary focus-visible:ring-0" disabled={isPending || !replyPostForm.watch('content')}>
                                {isPending ? <Spinner/> : "Reply"}
                            </Button>
                        </div>
                    </form>
                </UploadFileRoot>
            </Form>
        </div>
    );
}