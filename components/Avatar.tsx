import React from 'react';

interface AvatarProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', className = '' }) => {
    let sizeClass = 'w-12 h-12'; // md default

    switch (size) {
        case 'sm':
            sizeClass = 'w-10 h-10';
            break;
        case 'md':
            sizeClass = 'w-12 h-12';
            break;
        case 'lg':
            sizeClass = 'w-16 h-16';
            break;
    }

    return (
        <div className={`relative rounded-full overflow-hidden bg-gray-200 border border-gray-100 ${sizeClass} ${className}`}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
            {/* Subtle inner shadow overlay for depth */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
        </div>
    );
};
