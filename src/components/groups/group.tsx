import { Group as GroupType } from "@/types/groups";
import clsx from "clsx";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface GroupProps {
    group: GroupType;
}

export function Group(props: GroupProps) {
    return (
        <Link 
            to={`/groups/${props.group.id}`}
            className={clsx(
                "flex justify-between items-center p-2 cursor-pointer",
                "bg-popover shadow-sm border border-foreground/10",
                "hover:bg-foreground/10 focus:bg-foreground/10 duration-100 rounded-md"
            )}>
            <div className="flex items-center gap-4">
                {
                    props.group.group_picture ? (
                        <img src={props.group.group_picture} alt={props.group.name} className="w-16 h-16 rounded-full"/>
                    ) : (
                        <div className="text-center text-foreground/20 p-2">
                            <FaUserGroup/>
                        </div>
                    )
                }
                <div className="flex flex-col gap-1">
                    <h1
                        className="text-xs font-medium text-foreground cursor-pointer truncate text-ellipsis overflow-hidden w-11/12">
                        {props.group.name}
                    </h1>
                    <p className="text-xs truncate text-ellipsis overflow-hidden w-11/12">
                        {props.group.about}
                    </p>
                </div>
            </div>
        </Link>
    );
}