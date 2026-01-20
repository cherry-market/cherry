import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, startAdornment, endAdornment, className = '', containerClassName = '', ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-2 ${containerClassName}`}>
                {label && <label className="block text-sm font-bold text-ink">{label}</label>}

                <div className={`
          w-full bg-gray-50 border rounded-xl px-4 flex items-center transition-all
          ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 focus-within:border-cherry focus-within:ring-1 focus-within:ring-cherry'}
          ${props.disabled ? 'bg-gray-100 text-gray-400' : ''}
        `}>
                    {startAdornment && <div className="mr-2 flex-shrink-0">{startAdornment}</div>}

                    <input
                        ref={ref}
                        className={`
              w-full h-12 bg-transparent outline-none font-medium text-sm
              placeholder:text-gray-400
              disabled:cursor-not-allowed
              ${className}
            `}
                        {...props}
                    />

                    {endAdornment && <div className="ml-2 flex-shrink-0">{endAdornment}</div>}
                </div>

                {error && <span className="text-xs text-red-500 font-medium ml-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, className = '', containerClassName = '', ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-2 ${containerClassName}`}>
                {label && <label className="block text-sm font-bold text-ink">{label}</label>}

                <textarea
                    ref={ref}
                    className={`
            w-full bg-gray-50 border rounded-xl px-4 py-4 outline-none resize-none text-sm leading-relaxed transition-all
            ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-100 focus:border-cherry focus:ring-1 focus:ring-cherry'}
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />

                {error && <span className="text-xs text-red-500 font-medium ml-1">{error}</span>}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
