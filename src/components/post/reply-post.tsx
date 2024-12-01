import { useToast } from "@/hooks/use-toast";
import { PostService } from "@/services/posts";
import { Post } from "@/types/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileAlt, FaRegSmile } from "react-icons/fa";
import { FaRegImage, FaX } from "react-icons/fa6";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    content: z.string().min(1),
});

type ReplyPostFormValues = z.infer<typeof formSchema>;

type UploadedFile = {
    file: File;
    type: 'video' | 'image';
};

const TOTAL_FILES_LIMIT = 5;

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

    const updateSelectedFiles = (files: FileList | null) => {
        if (files) {
            let updateArr = [
                ...selectedFiles,
                ...Array.from(files).map(file => ({
                    file,
                    type: file.type.includes('image') ? 'image' : 'video',
                } as UploadedFile)),
            ];

            if (updateArr.length > TOTAL_FILES_LIMIT) {
                toast({
                    title: "Upload files limit reached",
                    description: `A post can have a maximum of ${TOTAL_FILES_LIMIT} attachments.`,
                    variant: "destructive",
                });
                
                updateArr = updateArr.slice(0, TOTAL_FILES_LIMIT);
            }
    
            setSelectedFiles(updateArr);
        }
    };

    const onSubmit = (data: ReplyPostFormValues) => {
        replyPostMutate(data);
        if (props.onReplied) {
            props.onReplied();
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <div className="flex gap-4 rounded-lg p-4 hover:bg-popover cursor-pointer hover:shadow-sm border border-transparent hover:border-foreground/10">
                <Avatar className="size-6">
                    <AvatarImage src="src/assets/spotsync_icon.svg" />
                </Avatar>
                <p className="text-xs h-fit w-full">
                    {props.parentPost.content}
                </p>
            </div>

            <Form {...replyPostForm}>
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
                                {
                                    selectedFiles.map((uploadedFile) => (
                                        <div key={uploadedFile.file.name} className="relative">
                                            {
                                                uploadedFile.type === 'image' ? (
                                                    <img 
                                                        src={URL.createObjectURL(uploadedFile.file)} 
                                                        alt={uploadedFile.file.name} 
                                                        className="w-16 h-16 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="flex gap-2 items-center p-2 hover:text-secondary duration-100">
                                                        <FaFileAlt className="size-6"/>
                                                        <span className="text-xs truncate text-ellipsis overflow-hidden max-w-24">
                                                            {uploadedFile.file.name}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            <button 
                                                className="absolute top-0 right-0 rounded-full bg-background text-foreground p-1" 
                                                onClick={() => setSelectedFiles(
                                                    selectedFiles.filter((file) => file.file.name !== uploadedFile.file.name)
                                                )}
                                            >
                                                <FaX className="size-2"/>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <div className="flex relative hover:text-secondary duration-100">
                                <div className="flex gap-2 items-center cursor-pointer">
                                    <FaRegImage className="text-md size-4"/>
                                    <span className="text-xs">Image</span>
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*" 
                                    multiple 
                                    onChange={(e) => updateSelectedFiles(e.target.files)}
                                    className="absolute inset-0 opacity-0 w-full h-full p-0 m-0"
                                />
                            </div>
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
            </Form>
        </div>
    );
}