import React from "react";
import { cn } from "@/utils/cn"; // Assuming a utility or I'll implement one inline if it doesn't exist yet, usually it's best to have one.

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
}

export function Container({
    as: Component = "div",
    className,
    children,
    ...props
}: ContainerProps) {
    return (
        <Component
            className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className || ""}`}
            {...props}
        >
            {children}
        </Component>
    );
}
