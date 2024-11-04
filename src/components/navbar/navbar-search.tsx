import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const search_items = [
    "Spots",
    "Spot folders",
    "Spot events",
    "Groups",
    "Users",
];

const formSchema = z.object({
    subject: z.string(),
    search: z.string().optional(),
});

type SearchFormValues = z.infer<typeof formSchema>;

export function NavbarSearch() {
    const navigate = useNavigate();

    const searchForm = useForm<SearchFormValues>({
        defaultValues: {
            subject: search_items[0],
            search: "",
        },
        resolver: zodResolver(formSchema),
    });
    
    const onSubmit = (data: SearchFormValues) => {
        navigate(`/search?subject=${data.subject}&search=${data.search}`);
    };

    return (
        <Form {...searchForm}>
            <form
                onSubmit={searchForm.handleSubmit(onSubmit)} 
                className="flex items-center justify-center bg-popover text-popover-foreground rounded-lg pr-4 max-[1000px]:px-2">
                <FormField
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <Select 
                                name={field.name}
                                disabled={field.disabled}
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <SelectTrigger className="w-52 border-none max-[1000px]:hidden">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-none" >
                                    <SelectGroup>
                                        {
                                            search_items.map((item, _) => (
                                                <SelectItem value={item} key={`navbar-search-${item}`} className={"mb-0.5"}>
                                                    {item}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    name="search"
                    render={({ field }) => (
                        <Input
                            {...field}
                            className={clsx(
                                "border-none outline-none mr-2",
                                "max-[1000px]:hidden"
                            )}
                            placeholder={`Search for something`}
                        />
                    )}
                />
                <Button className="bg-transparent hover:bg-transparent border-none text-foreground shadow-none">
                    <FaSearch className="w-8 cursor-pointer"/>
                </Button>
            </form>
        </Form>
    );
}