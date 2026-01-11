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
      label = "ON_SALE"; 
      break;
    case 'RESERVED':
      // Black Tape
      styleClass = "bg-ink text-white";
      label = "RESERVED";
      break;
    case 'SOLD':
      // Ghost Tag
      styleClass = "bg-silver-metal text-white opacity-90";
      label = "SOLD";
      break;
  }

  return (
    <span className={`${baseStyle} ${styleClass} ${className}`}>
      {label}
    </span>
  );
};