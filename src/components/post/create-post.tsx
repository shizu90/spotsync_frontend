import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/hooks/auth-store";
import { useToast } from "@/hooks/use-toast";
import { PostService } from "@/services/posts";
import { Group } from "@/types/groups";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegImage } from "react-icons/fa6";
import { z } from "zod";
import { DefaultUserIcon } from "../icon/default-user-icon";
import { Spinner } from "../ui/spinner";
import { UploadedFile, UploadedFiles, UploadFile, UploadFileRoot } from "../ui/upload-file";

const formSchema = z.object({
    content: z.string().min(1),
});

type CreatePostFormValues = z.infer<typeof formSchema>;

interface CreatePostProps {
    group?: Group;
    onCreated?: () => void;
}

export function CreatePost(props: CreatePostProps) {
    const queryClient = useQueryClient();
    const { auth } = useAuthStore();
    
    const createPostFn = async (data: CreatePostFormValues) => {
        const service = new PostService();
        return await service.createPost({
            title: '',
            content: data.content,
            group_id: props.group?.id,
            attachments: selectedFiles.map((file) => file.file),
        });
    }

    const { toast } = useToast();
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
    
    const createPostForm = useForm<CreatePostFormValues>({
        defaultValues: {
            content: "",
        },
        resolver: zodResolver(formSchema),
    });

    const { mutateAsync: createPostMutate, isPending } = useMutation({
        mutationFn: createPostFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['home-threads']
            });

            createPostForm.reset();

            setSelectedFiles([]);
        },
        onError: (error) => {
            toast({
                title: "Failed to create post",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const onSubmit = (data: CreatePostFormValues) => {
        createPostMutate(data);
    };

    return (
        <Form {...createPostForm}>
            <UploadFileRoot controlledSelectedFiles={selectedFiles} setControlledSelectedFiles={setSelectedFiles}>
                <form className="bg-popover w-full p-4 rounded-lg shadow-sm border border-foreground/10" onSubmit={
                    createPostForm.handleSubmit(onSubmit)
                }>
                    <div className="flex gap-4 h-fit w-full">
                        {
                            auth?.user.profile.profile_picture ? (
                                <Avatar className="size-10 caret-transparent">
                                    <AvatarImage src={auth?.user.profile.profile_picture} />
                                </Avatar>
                            ) : (
                                <DefaultUserIcon className="p-2 caret-transparent"/>
                            )
                        }
                        <FormField
                            control={createPostForm.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Textarea
                                        {...field}
                                        className={clsx(
                                            "border-none outline-none shadow-none focus-visible:ring-0 resize-none",
                                        )}
                                        placeholder="Create a post"
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
                            <UploadFile
                                accept="image/*,video/*"
                                className="cursor-pointer"
                            >
                                <div className="flex gap-2 items-center cursor-pointer caret-transparent">
                                    <FaRegImage className="text-md size-4"/>
                                    <span className="text-xs">Image</span>
                                </div>
                            </UploadFile>
                        </div>
                        <Button 
                            className="focus-visible:outline-primary focus-visible:ring-0 caret-transparent" 
                            disabled={isPending || !createPostForm.watch('content')}>
                            {isPending ? <Spinner/> : "Create"}
                        </Button>
                    </div>
                </form>
            </UploadFileRoot>
        </Form>
    );
}