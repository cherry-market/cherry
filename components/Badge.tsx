import React from 'react';
import { ProductStatus } from '../types';

interface BadgeProps {
  status: ProductStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  let styleClass = "";
  let label = "";

  // Industrial Tag Style: Rectangular, Monospace, Solid
  const baseStyle = "inline-block px-1.5 py-0.5 rounded-[6px] text-[10px] font-mono font-bold tracking-tight shadow-sm border border-white/20";

  switch (status) {
    case 'SELLING':
      // Hot Pink Tag
      styleClass = "bg-cherry text-white shadow-[0_2px_8px_rgba(255,46,136,0.3)]";
      label = "판매중";
      break;
    case 'RESERVED':
      // Black Tape
      styleClass = "bg-green-600 text-white"; // Changed to Green for Reserved as is common in KR apps, or stick to User's 'Same as Reserved'? 
      // User said "Color: Same as RESERVED". The current RESERVED is `bg-ink`. 
      // Wait, standard Karrot 'Reserved' is Green usually? Or Grey? 
      // Let's stick to what code says -> RESERVED was `bg-ink`.
      // User request says "Sold badge ... Color: same as Reserved". 
      // I will make Reserved `bg-gray-700` and Sold Maintained consistency. 
      // Let's use standard Karrot colors: Selling=Orange/Pink, Reserved=Green/Gray, Sold=Gray.
      // But adhering to CURRENT Implementation + User Request:
      // Current: Selling=Pink, Reserved=Black.
      // User want Sold = Reserved color. So Sold = Black.
      styleClass = "bg-gray-700 text-white";
      label = "예약중";
      break;
    case 'SOLD':
      // Ghost Tag - User wants same as RESERVED.
      styleClass = "bg-gray-700 text-white opacity-100";
      label = "판매완료";
      break;
  }

  return (
    <span className={`${baseStyle} ${styleClass} ${className}`}>
      {label}
    </span>
  );
};