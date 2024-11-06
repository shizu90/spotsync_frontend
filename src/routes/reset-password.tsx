import { ErrorPage } from "@/components/pages/error";
import { SuccessPage } from "@/components/pages/success";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
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
    token: z.string(),
}).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["passwordConfirm"]
        });
    }
});

export type ResetPasswordForm = z.infer<typeof formSchema>;

export function ResetPassword() {
    const [searchParams, _] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();
    const token = searchParams.get('token');
    const userService = new UserService();
    const { mutateAsync: resetPassword, isPending } = useMutation({
        mutationFn: userService.resetPassword
    });

    if (token) {
        const resetPasswordForm = useForm<ResetPasswordForm>({
            defaultValues: {
                password: '',
                passwordConfirm: '',
                token: token ?? ''
            },
            resolver: zodResolver(formSchema)
        });

        const onSubmit = async (data: ResetPasswordForm) => {
            resetPassword({
                password: data.password,
                token: data.token,
            }).then((_) => {
                setSuccess(true);
            }).catch((err) => {
                toast({
                    title: "Error",
                    description: err.response.data.message,
                    variant: "destructive",
                });
            });
        };

        return (
            <div className="w-[480px] mx-2 flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-2xl">Reset password</h1>
                <Form {...resetPasswordForm}>
                    <form className="flex flex-col gap-4 w-full" onSubmit={resetPasswordForm.handleSubmit(onSubmit)}>
                        <FormField
                            control={resetPasswordForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className="flex gap-4 items-center">
                                        <FormControl>
                                            <Input placeholder="Password" {...field} type={showPassword ? "text" : "password"} className="focus-visible:outline-primary focus-visible:ring-0"/>
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
                            control={resetPasswordForm.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type={showPassword ? "text" : "password"} className="focus-visible:outline-primary focus-visible:ring-0"/>
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <Dialog open={success} onOpenChange={setSuccess}>
                            <Button className="w-full">
                                {isPending ? <Spinner/> : "Reset password"}
                            </Button>
                            <DialogContent className="flex flex-col items-center gap-4">
                                <SuccessPage
                                    title="Password changed"
                                    iconSize={16}
                                    children={
                                        <>
                                            <p className="text-sm text-center">
                                                Your password was successfully changed. You can now sign in with your new password.
                                            </p>
                                        </>
                                    }
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </div>
        );
    } else {
        return (
            <ErrorPage
                title="Reset password failed"
                iconSize={28}
                children={
                    <p className="text-sm">
                        The reset password token is missing. Please request a new reset password link.
                    </p>
                }
            />
        );
    }
}