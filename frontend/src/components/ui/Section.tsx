import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    id?: string;
    spacing?: "sm" | "md" | "lg" | "xl";
    withGradient?: boolean;
}

const spacingClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
    xl: "py-24 md:py-40",
};

export function Section({
    id,
    className = "",
    children,
    spacing = "lg",
    withGradient = false,
    ...props
}: SectionProps) {
    return (
        <section
            id={id}
            className={`relative overflow-hidden ${spacingClasses[spacing]} ${className}`}
            {...props}
        >
            {withGradient && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[var(--primary-600)]/8 via-transparent to-transparent blur-3xl" />
                </div>
            )}
            {children}
        </section>
    );
}
