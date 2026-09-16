import React from "react";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * PageContainer - A standardized container for page content
 * Ensures proper width constraints and prevents overflow
 */
const PageContainer: React.FC<PageContainerProps> = ({
    children,
    className = "",
}) => {
    return (
        <div className={`w-full max-w-full overflow-x-hidden ${className}`}>
            {children}
        </div>
    );
};

export default PageContainer;

