import React from 'react';

interface CherryIconProps extends React.SVGProps<SVGSVGElement> {
    isLiked?: boolean;
    size?: number | string;
    strokeWidth?: number;
}

export const CherryIcon: React.FC<CherryIconProps> = ({
    isLiked = false,
    size = 24,
    strokeWidth = 2,
    className = "",
    ...props
}) => {
    // Colors
    const color = isLiked ? "currentColor" : "currentColor"; // Inherit color from parent (usually text-cherry or text-gray)
    // When liked, we want to fill the fruit.
    // However, if we put "fill-cherry" on the parent, it fills everything.
    // So we manage fill manually.

    // Strategy:
    // If isLiked is true, we assume the parent has set the text color to Cherry (or passed it).
    // The SVGs "fill" attribute will be set conditionally.

    // Lucide default props:
    // xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-cherry ${className}`}
            {...props}
        >
            {/* Fruit 1: Left */}
            <path
                d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
                className={`transition-colors duration-300 ${isLiked ? 'fill-cherry/90 stroke-cherry' : ''}`}
            />

            {/* Fruit 2: Right */}
            <path
                d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
                className={`transition-colors duration-300 ${isLiked ? 'fill-cherry/90 stroke-cherry' : ''}`}
            />

            {/* Stem */}
            <path
                d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"
                className={`transition-colors duration-300 ${isLiked ? 'stroke-cherry' : ''}`}
            />

            {/* Leaf */}
            <path
                d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"
                className={`transition-colors duration-300 ${isLiked ? 'stroke-cherry' : ''}`}
            />
        </svg>
    );
};
