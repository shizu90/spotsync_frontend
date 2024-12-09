import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Input } from "./input";

export class UploadedFile {
    public file: File;
    public type: string;

    constructor(file: File, type: string) {
        this.file = file;
        this.type = type;
    }
}

const UploadFileContext = React.createContext({
    selectedFiles: [] as UploadedFile[],
    maxFiles: 5,
    setSelectedFiles: (files: UploadedFile[]) => {},
});

interface UploadedFilesProps {
    className?: string;
}

export function UploadedFiles(props: UploadedFilesProps) {
    const { selectedFiles, setSelectedFiles } = React.useContext(UploadFileContext);

    const removeFile = (index: number) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    return (
        <div className={clsx(
            "flex flex-wrap gap-2",
            props.className,
        )}>
            {
                selectedFiles.map((file, index) => (
                    <div key={file.file.name} className="relative">
                        {
                            file.type.includes("image") || file.type.includes("video") ? (
                            <Dialog>
                                {
                                    file.type.includes("image") ? (
                                        <>
                                            <DialogTrigger className="relative">
                                                <img
                                                    src={URL.createObjectURL(file.file)}
                                                    alt={file.file.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <span
                                                    className="absolute top-0 right-0 rounded-full bg-background text-foreground p-1"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <FaX className="size-2"/>
                                                </span>
                                            </DialogTrigger>
                                            <DialogContent className="p-0 border-0 shadow-none rounded-lg">
                                                <img
                                                    src={URL.createObjectURL(file.file)}
                                                    alt={file.file.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </DialogContent>
                                        </>
                                    ) : (
                                        <>
                                            <DialogTrigger className="relative">
                                                <video
                                                    src={URL.createObjectURL(file.file)}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <span
                                                    className="absolute top-0 right-0 rounded-full bg-background text-foreground p-1"
                                                    onClick={() => removeFile(index)}
                                                >
                                                    <FaX className="size-2"/>
                                                </span>
                                            </DialogTrigger>
                                            <DialogContent className="p-0 border-0 shadow-none rounded-lg">
                                                <video
                                                    src={URL.createObjectURL(file.file)}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </DialogContent>
                                        </>
                                    )
                                }
                            </Dialog>
                            ) : (
                                <div className="flex gap-2 items-center p-2 hover:text-secondary duration-100">
                                    <FaFileAlt className="size-6"/>
                                    <span className="text-xs truncate text-ellipsis overflow-hidden max-w-24">
                                        {file.file.name}
                                    </span>
                                    <button
                                        className="rounded-full bg-background text-foreground p-1"
                                        onClick={() => removeFile(index)}
                                    >
                                        <FaX className="size-2"/>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}

interface UploadFileProps {
    children: React.ReactNode;
    accept?: string;
    className?: string;
}

export function UploadFile(
    props: UploadFileProps,
) {
    const { selectedFiles, maxFiles, setSelectedFiles } = React.useContext(UploadFileContext);
    const { toast } = useToast();

    const updateSelectedFiles = (files: FileList | null) => {
        console.log(files);
        
        if (files) {
            let updateArr = [
                ...selectedFiles,
                ...Array.from(files).map(file => ({
                    file,
                    type: file.type,
                } as UploadedFile)),
            ];

            if (updateArr.length > maxFiles) {
                toast({
                    title: "Upload files limit reached",
                    description: `A post can have a maximum of ${maxFiles} attachments.`,
                    variant: "destructive",
                });
                
                updateArr = updateArr.slice(0, maxFiles);
            }

            console.log(updateArr);

            setSelectedFiles(updateArr);
        }
    };

    return (
        <div className={clsx(
            "flex relative hover:text-secondary focus:text-secondary duration-100",
            props.className,
        )}>
            { props.children }
            <Input
                type="file"
                accept={props.accept ?? "*"}
                multiple
                onClick={(e) => e.currentTarget.value = ""}
                onChange={(e) => updateSelectedFiles(e.target.files)}
                className="absolute inset-0 opacity-0 w-full h-full p-0 m-0"
            />
        </div>
    );
}

interface UploadFileRootProps {
    children: React.ReactNode;
    controlledSelectedFiles?: UploadedFile[];
    setControlledSelectedFiles?: (files: UploadedFile[]) => void;
    maxFiles?: number;
}

export function UploadFileRoot(
    props: UploadFileRootProps,
) {
    const [selectedFiles, setSelectedFiles] = React.useState<UploadedFile[]>([]);
    return (
        <UploadFileContext.Provider value={{
            selectedFiles: props.controlledSelectedFiles ?? selectedFiles,
            maxFiles: props.maxFiles ?? 5,
            setSelectedFiles: props.setControlledSelectedFiles ?? setSelectedFiles,
        }}>
            { props.children }
        </UploadFileContext.Provider>
    );
}