import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function NavbarHome() {
    return (
        <Link to={"/"} className="px-2 flex items-center focus:outline-primary">
            <FaHouse className="size-5"/>
        </Link>
    );
}