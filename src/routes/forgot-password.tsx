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
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email(),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

export function ForgotPassword() {
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();
    const userService = new UserService();
    const { mutateAsync: newPasswordRecovery, isPending } = useMutation({
        mutationFn: userService.newPasswordRecovery,
    });

    const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: ForgotPasswordFormValues) => {
        newPasswordRecovery({
            email: values.email,
        }).then((_) => {
            setSuccess(true);
        }).catch((err) => {
            console.log(err);
            toast({
                "title": "Error",
                "description": err.response.data.message,
                "variant": "destructive",
            });
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
            <h1 className="font-bold text-2xl">Forgot password</h1>
            <Form {...forgotPasswordForm}>
                <form className={clsx("flex flex-col gap-4 w-full")} onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={forgotPasswordForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="example@email.com"
                                        className="focus-visible:outline-primary focus-visible:ring-0 active:outline-primary active:ring-0"
                                    />
                                </FormControl>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                    <Dialog open={success} onOpenChange={setSuccess}>
                        <Button className="w-full" disabled={isPending}>
                            {isPending ? <Spinner/> : "Send"}
                        </Button>
                        <DialogContent className="flex flex-col items-center gap-4">
                            <SuccessPage
                                title="E-mail sent"
                                iconSize={16}
                                children={
                                    <p className="text-sm">
                                        An e-mail was sent to <span className="font-medium"> {forgotPasswordForm.getValues().email}</span> with further instructions.
                                    </p>
                                }
                            />
                        </DialogContent>
                    </Dialog>
                </form>
            </Form>
            <Link
                to="/sign-in"
                className="text-sm underline cursor-pointer mt-4 hover:text-secondary focus:text-secondary duration-100"
            >
                Back to sign in
            </Link>
        </div>
    );
}