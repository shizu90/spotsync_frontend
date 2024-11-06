import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ErrorPageProps {
    title: string;
    children?: React.ReactNode;
    iconSize?: number;
}

export function ErrorPage(props: ErrorPageProps) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <FaExclamationCircle className={`text-destructive size-${props.iconSize ? props.iconSize : 28}`}/>
            <h1 className="font-bold text-2xl">
                {props.title}
            </h1>
            {props.children}
            <Link
                to="/sign-in"
                className="text-sm underline cursor-pointer mt-4 hover:text-secondary focus:text-secondary duration-100"
            >
                Back to sign in
            </Link>
        </div>
    );
}