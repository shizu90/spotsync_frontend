import clsx from "clsx";
import { Link } from "react-router-dom";

interface NavbarLinksProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    linkClassName?: string;
}

export function NavbarLinks(props: NavbarLinksProps) {
    return (
        <div className={clsx(
            `flex ${props.orientation == 'vertical' && 'flex-col'} gap-4`,
            props.className,
        )}>
            <Link
                to={'/spots'}
                className={clsx(
                    "text-xs text-foreground/80 hover:text-foreground",
                    props.linkClassName
                )}
            >
                Spots
            </Link>
            <Link
                to={'/groups'}
                className={clsx(
                    "text-xs text-foreground/80 hover:text-foreground",
                    props.linkClassName
                )}
            >
                Groups
            </Link>
            <Link
                to={'/groups'}
                className={clsx(
                    "text-xs text-foreground/80 hover:text-foreground",
                    props.linkClassName
                )}
            >
                Events
            </Link>
        </div>
    );
}