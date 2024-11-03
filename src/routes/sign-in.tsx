import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    password: z.string(),
});

type SignInFormValues = z.infer<typeof formSchema>;

export function SignIn() {
    const signInForm = useForm<SignInFormValues>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: SignInFormValues) => {
        console.log(values);
    }

    return (
        <div className="w-96 flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <Tabs defaultValue="email" className="w-96 mt-8">
                <TabsList className="grid w-full grid-cols-2 bg-transparent">
                    <TabsTrigger value="email" className={clsx(
                        "border-b-transparent rounded-none border-b-2",
                        "data-[state=active]:border-b-secondary data-[state=active]:bg-transparent data-[state=active]:ring-0 data-[state=active]:shadow-none"
                    )}>
                        Sign in with e-mail
                    </TabsTrigger>
                    <TabsTrigger value="name" className={clsx(
                        "border-b-transparent rounded-none border-b-2",
                        "data-[state=active]:border-b-secondary data-[state=active]:bg-transparent data-[state=active]:ring-0 data-[state=active]:shadow-none"
                    )}>
                        Sign in with name
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="name">
                    <Form {...signInForm}>
                        <form className={clsx(
                            "flex flex-col gap-4"
                        )} onSubmit={signInForm.handleSubmit(onSubmit)}>
                            <FormField
                                control={signInForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signInForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} type="password"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button>Sign In</Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="email">
                    <Form {...signInForm}>
                        <form className={clsx(
                            "flex flex-col gap-4"
                        )} onSubmit={signInForm.handleSubmit(onSubmit)}>
                            <FormField
                                control={signInForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@email.com" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signInForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} type="password"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button>Sign In</Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
            <Link 
                className="text-sm underline cursor-pointer mt-4 hover:text-secondary focus:text-secondary duration-100"
                to="/sign-up"
            >
                Don't have an account? Sign up here
            </Link>
        </div>
    );
}