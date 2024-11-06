import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SuccessPageProps {
    title: string;
    children?: React.ReactNode;
    iconSize?: number;
}

export function SuccessPage(props: SuccessPageProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <FaCheckCircle className={`text-primary size-${props.iconSize ? props.iconSize : 28}`} />
            <h1 className="font-bold text-md">
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