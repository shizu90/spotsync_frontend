import { SuccessPage } from "@/components/pages/success";
import { SignUpData } from "./sign-up";

interface SignUpSuccessProps {
    data: SignUpData;
}

export function SignUpSuccess(props: SignUpSuccessProps) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <SuccessPage
                title="Signed up successfully"
                iconSize={28}
                children={
                    <>
                        <p className="text-sm text-center">
                            An email was sent to <span className="font-medium">{props.data.email}</span> with further instructions.
                        </p>
                    </>
                }
            />
        </div>
    );
}