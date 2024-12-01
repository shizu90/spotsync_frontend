import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PostService } from "@/services/posts";
import { Group } from "@/types/groups";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileAlt, FaRegSmile } from "react-icons/fa";
import { FaRegImage, FaX } from "react-icons/fa6";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
    content: z.string().min(1),
});

type CreatePostFormValues = z.infer<typeof formSchema>;

type UploadedFile = {
    file: File;
    type: 'video' | 'image';
};

const TOTAL_FILES_LIMIT = 5;

interface CreatePostProps {
    group?: Group;
    onCreated?: () => void;
}

export function CreatePost(props: CreatePostProps) {
    const queryClient = useQueryClient();
    
    const createPostFn = async (data: CreatePostFormValues) => {
        const service = new PostService();
        return await service.createPost({
            title: '',
            content: data.content,
            group_id: props.group?.id,
        });
    }

    const { toast } = useToast();
    const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
    const { mutateAsync: createPostMutate, isPending } = useMutation({
        mutationFn: createPostFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['home-posts']
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to create post",
                description: error.message,
                variant: "destructive",
            });
        }
    });

    const createPostForm = useForm<CreatePostFormValues>({
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

    const onSubmit = (data: CreatePostFormValues) => {
        createPostMutate(data);
    };

    return (
        <Form {...createPostForm}>
            <form className="bg-popover w-full p-4 rounded-lg shadow-sm border border-foreground/10" onSubmit={
                createPostForm.handleSubmit(onSubmit)
            }>
                <div className="flex gap-4 h-fit w-full">
                    <Avatar className="size-10">
                        <AvatarImage src="src/assets/spotsync_icon.svg" />
                    </Avatar>
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
                    <Button className="focus-visible:outline-primary focus-visible:ring-0" disabled={isPending || !createPostForm.watch('content')}>
                        {isPending ? <Spinner/> : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}