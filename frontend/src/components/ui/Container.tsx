import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    size?: "narrow" | "default" | "wide";
}

const sizeClasses = {
    narrow: "max-w-[768px]",
    default: "max-w-[1280px]",
    wide: "max-w-[1440px]",
};

export function Container({
    as: Component = "div",
    className = "",
    size = "default",
    children,
    ...props
}: ContainerProps) {
    return (
        <Component
            className={`mx-auto w-full px-6 md:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}
