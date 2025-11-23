import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
  ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = React.memo<ButtonProps>((
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    children,
    ...props
  }
) => {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';
