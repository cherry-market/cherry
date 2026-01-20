import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Base: Solid Object feel
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-[16px] tactile disabled:opacity-50 disabled:pointer-events-none transition-all relative overflow-hidden";
  
  const variants = {
    // Candy-like glossy pink
    primary: `
      bg-cherry text-white 
      shadow-[0_4px_0_0_#C20055,0_8px_16px_rgba(255,46,136,0.4)]
      border-t border-white/30
      hover:bg-cherry-neon hover:shadow-[0_4px_0_0_#C20055,0_12px_20px_rgba(255,46,136,0.6)]
      active:shadow-[0_0_0_0_#C20055] active:translate-y-[4px]
    `,
    // Frosted Metal
    secondary: `
      bg-white/70 backdrop-blur-md
      border border-white
      text-ink
      shadow-[0_4px_0_0_#D1D5DB,0_4px_10px_rgba(0,0,0,0.05)]
      hover:bg-white
      active:shadow-[0_0_0_0_#D1D5DB] active:translate-y-[4px]
    `,
    ghost: "bg-transparent text-silver-dark hover:text-ink hover:bg-black/5 rounded-lg",
    icon: `
      bg-white/60 backdrop-blur-xl 
      border border-white/80 
      text-ink p-2 
      shadow-[0_4px_10px_rgba(0,0,0,0.05)]
      hover:bg-white hover:scale-105
      rounded-full aspect-square
    `
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-5 py-2.5 h-12", // Taller for better touch target
    lg: "text-base px-6 py-3.5 h-14"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${variant !== 'icon' ? sizes[size] : ''} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
