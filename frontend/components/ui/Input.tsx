"use client";

import React, { useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  leftIcon,
  rightIcon,
  error,
  helperText,
  containerClassName = "",
  className = "",
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Base input classes
  const baseInputClasses = "block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500 transition-colors";

  // Icon color - changes to teal (#00A3A3) when focused, gray when not
  const iconColorStyle = isFocused ? { color: '#00A3A3' } : { color: '#9CA3AF' };

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-1 sm:mb-1.5 lg:mb-1 xl:mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none transition-colors" style={iconColorStyle}>
            <div className="transition-colors" style={iconColorStyle}>
              {leftIcon}
            </div>
          </div>
        )}
        <input
          id={inputId}
          className={`${baseInputClasses} ${rightIcon ? 'pr-10 sm:pr-12 md:pr-14 lg:pr-12 xl:pr-20 2xl:pr-24' : ''} ${error ? 'border-red-300 focus:border-red-500' : ''} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[9px] sm:text-[9px] md:text-[10px] lg:text-[9px] xl:text-sm 2xl:text-base text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-[9px] sm:text-[9px] md:text-[10px] lg:text-[9px] xl:text-sm 2xl:text-base text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;

