import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SignUpData } from "./sign-up";

interface RegisterFormProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    signUpData: SignUpData;
    setSignUpData: (data: RegisterFormValues) => void;
}

const formSchema = z.object({
    name: z.string({
        message: 'Name is required'
    }).max(255, { 
        message: 'Name is too long'
    }).min(3, { 
        message: 'Name is too short'
    }),
    email: z.string({
        message: 'E-mail is required'
    }).email({ 
        message: 'Invalid e-mail address'
    }),
    password: z.string({
        message: 'Password is required'
    }).min(6, { 
        message: 'Password is too short'
    }).max(32, { 
        message: 'Password is too long'
    }),
    passwordConfirm: z.string({
        message: 'Password confirmation is required'
    }),
    birthDate: z.string({
        message: 'Birth date is required'
    }),
    phoneNumber: z.string().max(20, {
        message: 'Phone number is too long'
    }).optional()
}).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["passwordConfirm"]
        });
    }
});

export type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm(props: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const registerForm = useForm<RegisterFormValues>({
        defaultValues: {
            name: props.signUpData.name,
            email: props.signUpData.email,
            password: props.signUpData.password,
            passwordConfirm: props.signUpData.passwordConfirm,
            birthDate: props.signUpData.birthDate,
        },
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (data: RegisterFormValues) => {
        props.setSignUpData(data);
        props.setCurrentStep(1);
    };

    return (
        <div className="w-96 flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-2xl">Welcome</h1>
            <Form {...registerForm}>
                <form className={clsx(
                    "flex flex-col gap-4 w-full"
                )} onSubmit={registerForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field}/>
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" {...field}/>
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="flex gap-4 items-center">
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type={showPassword ? "text" : "password"}/>
                                    </FormControl>
                                    {
                                        showPassword ? (
                                            <button onClick={() => setShowPassword(false)} type="button">
                                                <FaEyeSlash className="size-6 cursor-pointer"/>
                                            </button>
                                        ) : (
                                            <button onClick={() => setShowPassword(true)} type="button">
                                                <FaEye className="size-6 cursor-pointer"/>
                                            </button>
                                        )
                                    }
                                </div>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type={showPassword ? "text" : "password"}/>
                                    </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <FormField
                            control={registerForm.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Birth date</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Birth date" {...field} type="date"/>
                                        </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number (optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone number" {...field} type="text"/>
                                        </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button>Next</Button>
                </form>
            </Form>
            <Link to="/sign-in" className="text-sm underline cursor-pointer mt-4 hover:text-secondary focus:text-secondary duration-100">Already have an account? Sign in</Link>
        </div>
    );
}