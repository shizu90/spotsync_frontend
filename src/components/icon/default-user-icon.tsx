import clsx from "clsx";
import { FaUser } from "react-icons/fa6";

interface DefaultUserIconProps {
    className?: string;
}

export function DefaultUserIcon(props: DefaultUserIconProps) {
    return (
        <FaUser
            className={clsx(
                'rounded-full size-10 text-foreground/40 bg-foreground/10',
                'hover:text-foreground/30',
                props.className
            )}
        />
    );
}