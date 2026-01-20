import React from 'react';
import { ProductStatus } from '../types';

interface StatusBadgeProps {
    status: ProductStatus;
    variant?: 'default' | 'overlay';
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default', className = '' }) => {
    // Base configuration for logic
    let label = '';
    let colorClass = '';

    switch (status) {
        case 'SELLING':
            label = '판매중';
            colorClass = 'bg-cherry text-white border-cherry';
            break;
        case 'RESERVED':
            label = '예약중';
            colorClass = 'bg-gray-700 text-white border-gray-700'; // Standardized to Gray-700
            break;
        case 'SOLD':
            label = '판매완료';
            colorClass = 'bg-gray-800 text-white border-gray-800'; // Slightly darker for Sold
            break;
    }

    // Variant Styles
    const baseStyle = "inline-flex items-center justify-center px-2 py-0.5 rounded-[6px] text-[11px] font-bold tracking-tight shadow-sm border";

    if (variant === 'overlay') {
        // Overlay style for images (ProductRow)
        return (
            <span className={`text-white text-xs font-bold px-2 py-1 bg-black/50 rounded-lg backdrop-blur-sm ${className}`}>
                {label}
            </span>
        );
    }

    return (
        <span className={`${baseStyle} ${colorClass} ${className}`}>
            {label}
        </span>
    );
};
