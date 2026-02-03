import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    grid?: boolean;
}

export function Section({
    id,
    className,
    children,
    grid = false,
    ...props
}: SectionProps) {
    return (
        <section
            id={id}
            className={`relative py-24 overflow-hidden ${className || ""}`}
            {...props}
        >
            {grid && (
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            )}
            {children}
        </section>
    );
}
