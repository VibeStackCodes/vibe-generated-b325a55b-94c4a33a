import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.memo<CheckboxProps>(({ label, className, ...props }) => {
  const id = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer group"
      >
        <div
          className={cn(
            'w-5 h-5 border-2 border-gray-300 rounded-md transition-all',
            'group-hover:border-primary-600',
            'flex items-center justify-center',
            props.checked && 'bg-primary-600 border-primary-600',
            className
          )}
        >
          {props.checked && <Check size={16} className="text-white" />}
        </div>
        {label && <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>}
      </label>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
