import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Card = React.memo<CardProps>(({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardHeader = React.memo<CardHeaderProps>(({ className, children, ...props }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200', className)} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardBody = React.memo<CardBodyProps>(({ className, children, ...props }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CardFooter = React.memo<CardFooterProps>(({ className, children, ...props }) => {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-200 bg-gray-50', className)} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';
