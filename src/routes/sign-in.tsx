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

    const signInFn = async (data: SignInWithNameFormValues | SignInWithEmailFormValues) => {
        const service = new AuthService();

        if ("email" in data) {
            return await service.signIn({
                email: data.email,
                password: data.password,
            });
        } else {
            return await service.signIn({
                name: data.name,
                password: data.password,
            });
        }
    };

    const { mutateAsync: signInMutate, isPending } = useMutation({
        mutationFn: signInFn,
        onError: (err: any) => {
            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": "destructive",
            });
        }
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
        signInMutate(values).then((res) => {
            signIn({
                bearerToken: res.data.data.bearer_token,
                user: res.data.data.user,
                rememberMe: values.rememberMe ?? false,
            });

            toast({
                "title": "Welcome back!",
                "description": "Signed in as " + res.data.data.user.credentials.name,
            });

            navigate("/");
        });
    };

    const signInWithName = async (values: SignInWithNameFormValues) => {
        signInMutate(values).then((res) => {
            console.log(res);
            signIn({
                bearerToken: res.data.data.bearer_token,
                user: res.data.data.user,
                rememberMe: values.rememberMe ?? false,
            });

            toast({
                "title": "Welcome back!",
                "description": "Signed in as " + res.data.data.user.credentials.name,
            });

            navigate("/");
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <Tabs defaultValue="email" className="w-full mt-8">
                <TabsList className="grid w-full grid-cols-2 bg-transparent">
                    <TabsTrigger value="email">
                        Sign in with e-mail
                    </TabsTrigger>
                    <TabsTrigger value="name">
                        Sign in with name
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="name" tabIndex={undefined}>
                    <Form {...signInWithNameForm}>
                        <form className="flex flex-col gap-4 w-full" onSubmit={signInWithNameForm.handleSubmit(signInWithName)}>
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
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    className="text-sm underline cursor-pointer hover:text-secondary focus:text-secondary duration-100 text-end mt-2 outline-none"
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
                <TabsContent value="email" tabIndex={undefined}>
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
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                                <Link
                                    className="text-sm underline cursor-pointer hover:text-secondary focus:text-secondary duration-100 text-end mt-2 outline-none"
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
                className="text-sm underline cursor-pointer mt-4 hover:text-secondary focus:text-secondary duration-100 outline-none"
                to="/sign-up"
            >
                Don't have an account? Sign up here
            </Link>
        </div>
    );
}