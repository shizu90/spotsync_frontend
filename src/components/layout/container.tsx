import clsx from "clsx";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className={clsx(
            "mr-auto ml-auto px-4 xl:px-12 max-w-7xl w-full",
        )}>
            {children}
        </div>
    );
}