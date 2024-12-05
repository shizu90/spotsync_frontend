import { Link } from "react-router-dom";

export function NavbarLinks() {
    return (
        <div className="flex items-center gap-4">
            <Link
                to={'/spots'}
                className="text-xs text-foreground/80 hover:text-foreground"
            >
                Spots
            </Link>
            <Link
                to={'/groups'}
                className="text-xs text-foreground/80 hover:text-foreground"
            >
                Groups
            </Link>
            <Link
                to={'/groups'}
                className="text-xs text-foreground/80 hover:text-foreground"
            >
                Events
            </Link>
        </div>
    );
}