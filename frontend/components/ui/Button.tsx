import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses = "flex items-center justify-center font-bold rounded-md shadow-sm focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  // Variant classes
  const variantClasses = {
    primary: "text-white border",
    secondary: "text-white border",
    outline: "bg-transparent border",
    ghost: "bg-transparent border border-transparent",
    danger: "text-white border",
  };

  // Variant styles
  const variantStyles = {
    primary: { backgroundColor: '#210a87', borderColor: '#210a87' },
    secondary: { backgroundColor: '#00A3A3', borderColor: '#00A3A3' },
    outline: { color: '#210a87', borderColor: '#210a87' },
    ghost: { color: '#00A3A3' },
    danger: { backgroundColor: '#FF0000', borderColor: '#FF0000' },
  };

  // Size classes (responsive)
  const sizeClasses = {
    sm: "py-1.5 sm:py-1.5 md:py-2 lg:py-1.5 xl:py-2.5 2xl:py-3 px-2 sm:px-2.5 md:px-3 lg:px-2.5 xl:px-4 2xl:px-5 text-[10px] sm:text-[10px] md:text-xs lg:text-[10px] xl:text-sm 2xl:text-base",
    md: "py-2 sm:py-2 md:py-2.5 lg:py-2 xl:py-4 2xl:py-5 px-3 sm:px-3 md:px-4 lg:px-3 xl:px-6 2xl:px-8 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg",
    lg: "py-2.5 sm:py-2.5 md:py-3 lg:py-3 xl:py-5 2xl:py-6 px-4 sm:px-4 md:px-5 lg:px-5 xl:px-8 2xl:px-10 text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg 2xl:text-xl",
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`.trim();

  const buttonStyle = variantStyles[variant];
  const hoverStyle = variant === "primary" 
    ? { backgroundColor: '#1a0870', borderColor: '#1a0870' }
    : variant === "secondary"
    ? { backgroundColor: '#008080', borderColor: '#008080' }
    : variant === "outline"
    ? { backgroundColor: '#210a87', color: '#FFFFFF', borderColor: '#210a87' }
    : variant === "ghost"
    ? { backgroundColor: '#F8F9FA', color: '#00A3A3' }
    : { backgroundColor: '#CC0000', borderColor: '#CC0000' };

  return (
    <button
      className={combinedClasses}
      style={buttonStyle}
      disabled={disabled || isLoading}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          Object.assign(e.currentTarget.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          if (variant === "outline") {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#210a87';
            e.currentTarget.style.borderColor = '#210a87';
          } else {
            Object.assign(e.currentTarget.style, buttonStyle);
          }
        }
      }}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;

