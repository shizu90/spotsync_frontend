import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SignUpData } from "./sign-up";

interface SignUpSuccessProps {
    data: SignUpData;
}

export function SignUpSuccess(props: SignUpSuccessProps) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <FaCheckCircle className="size-28 text-primary"/>
            <h1 className="text-2xl font-bold">Signed up successfully</h1>
            <p className="text-sm text-center">
                An email was sent to <span className="font-medium">{props.data.email}</span> with further instructions.
            </p>
            <Link
                to="/sign-in"
                className="underline text-sm hover:text-secondary"
            >
                Go to sign in
            </Link>
        </div>
    );
}