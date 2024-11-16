import { ErrorPage } from "@/components/pages/error";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/hooks/auth-store";
import { useToast } from "@/hooks/use-toast";
import { UserService } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function UserActivation() {
    const [searchParams, _] = useSearchParams();
    const code = searchParams.get('code');
    const userId = searchParams.get('userId');

    if (userId && code) {
        const { signIn } = useAuthStore();
        const navigate = useNavigate();
        const { toast } = useToast();

        const userService = new UserService();
        const { mutateAsync: activateUser, isPending } = useMutation({
            mutationFn: () => {return userService.activateUser(userId , {
                code: code,
                auto_login: true
            })}
        });

        useEffect(() => {
            activateUser().then((res) => {
                signIn({
                    bearerToken: res.data.data.bearer_token,
                    user: res.data.data.user,
                    rememberMe: false,
                });
    
                navigate('/');
    
                toast({
                    title: 'User activated',
                    description: 'You have successfully activated your account',
                });
            }).catch((err) => {
                toast({
                    title: 'Error',
                    description: err.response.data.message,
                    variant: 'destructive'
                });
            });
        }, []);

    
        return isPending ? 
        <div className="flex flex-col items-center justify-center gap-4">
            <Spinner/>
            <p className="text-sm">Activating user...</p>
        </div> : 
        <ErrorPage
            title="User activation failed"
            iconSize={28}
            children={
                <>
                    <p className="text-sm">
                        An error occurred while activating your account. Please try again.
                    </p>
                </>
            }
        />;
    } else {
        return (
            <ErrorPage
                title="Invalid activation link"
                iconSize={28}
                children={
                    <>
                        <p className="text-sm">
                            The activation link is invalid. Please try again.
                        </p>
                    </>
                }
            />
        );
    }
}