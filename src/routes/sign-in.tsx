import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/hooks/auth-store";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signInWithNameFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    rememberMe: z.boolean().optional(),
});

const signInWithEmailFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    rememberMe: z.boolean().optional(),
});

type SignInWithNameFormValues = z.infer<typeof signInWithNameFormSchema>;
type SignInWithEmailFormValues = z.infer<typeof signInWithEmailFormSchema>;

export function SignIn() {
    const { signIn, signedIn } = useAuthStore();
    const { toast } = useToast();
    const navigate = useNavigate();
    const authService = new AuthService();
    const { mutateAsync: signInFn, isPending } = useMutation({
        mutationFn: authService.signIn,
    });

    useEffect(() => {
        if (signedIn) {
            navigate("/");
        }
    }, []);

    const signInWithNameForm = useForm<SignInWithNameFormValues>({
        defaultValues: {
            name: "",
            password: "",
            rememberMe: false,
        },
        resolver: zodResolver(signInWithNameFormSchema),
    });

    const signInWithEmailForm = useForm<SignInWithEmailFormValues>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        resolver: zodResolver(signInWithEmailFormSchema),
    });

    const signInWithEmail = async (values: SignInWithEmailFormValues) => {
        signInFn({
            email: values.email,
            password: values.password,
        }).then((res) => {
            signIn({
                userId: res.data.data.id,
                bearerToken: res.data.data.bearer_token,
                email: res.data.data.email,
                rememberMe: values.rememberMe ?? false,
                userName: res.data.data.name,
            });

            toast({
                "title": "Welcome back!",
                "description": "Signed in as " + res.data.data.name,
            });

            navigate("/");
        }).catch((err) => {
            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": "destructive",
            });
        });
    };

    const signInWithName = async (values: SignInWithNameFormValues) => {
        signInFn({
            name: values.name,
            password: values.password,
        }).then((res) => {
            signIn({
                userId: res.data.data.id,
                bearerToken: res.data.data.bearer_token,
                email: res.data.data.email,
                rememberMe: values.rememberMe ?? false,
                userName: res.data.data.name,
            });

            toast({
                "title": "Welcome back!",
                "description": "Signed in as " + res.data.data.name,
            });

            navigate("/");
        }).catch((err) => {
            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": "destructive",
            });
        });
    };

    return (
        <div className="w-[480px] mx-2 flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <Tabs defaultValue="email" className="w-full mt-8">
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
                    <Form {...signInWithNameForm}>
                        <form className={clsx(
                            "flex flex-col gap-4 w-full"
                        )} onSubmit={signInWithNameForm.handleSubmit(signInWithName)}>
                            <FormField
                                control={signInWithNameForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Name"
                                                className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col">
                                <FormField
                                    control={signInWithNameForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Password" 
                                                    {...field} 
                                                    type="password"
                                                    className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    className="text-sm underline cursor-pointer hover:text-secondary focus:text-secondary duration-100 text-end mt-2"
                                    to="/forgot-password"
                                >
                                    Forgout your password?
                                </Link>
                            </div>
                            <FormField
                                control={signInWithNameForm.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={field.disabled}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormLabel className="pb-2">Remember me</FormLabel>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending}>
                                {isPending ? <Spinner/> : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="email">
                    <Form {...signInWithEmailForm}>
                        <form className={clsx(
                            "flex flex-col gap-4"
                        )} onSubmit={signInWithEmailForm.handleSubmit(signInWithEmail)}>
                            <FormField
                                control={signInWithEmailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="example@email.com" 
                                                {...field}
                                                className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col">
                                <FormField
                                    control={signInWithEmailForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Password" 
                                                    {...field} 
                                                    type="password"
                                                    className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    className="text-sm underline cursor-pointer hover:text-secondary focus:text-secondary duration-100 text-end mt-2"
                                    to="/forgot-password"
                                >
                                    Forgout your password?
                                </Link>
                            </div>
                            <FormField
                                control={signInWithEmailForm.control}
                                name="rememberMe"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={field.disabled}
                                                onBlur={field.onBlur}
                                            />
                                        </FormControl>
                                        <FormLabel className="pb-2">Remember me</FormLabel>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isPending}>
                                {isPending ? <Spinner/> : "Sign in"}
                            </Button>
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