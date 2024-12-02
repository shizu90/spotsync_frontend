import { Group as GroupType } from "@/types/groups";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface GroupProps {
    group: GroupType;
}

export function Group(props: GroupProps) {
    return (
        <div className="flex justify-between items-center p-2 m-2 shadow-sm border border-foreground/10 rounded-md">
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
                    <Link 
                        to={`/groups/${props.group.id}`}
                        className="text-xs font-medium text-foreground cursor-pointer hover:underline">
                        {props.group.name}
                    </Link>
                    <p className="text-xs">
                        {props.group.about}
                    </p>
                </div>
            </div>
        </div>
    );
}