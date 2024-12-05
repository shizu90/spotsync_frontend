interface IconProps {
    className?: string;
}

export function SpotsyncIcon(props: IconProps) {
    return (
        <img
            src="src/assets/spotsync_icon.svg"
            alt="Spotsync icon"
            className={props.className}
        />
    );
}