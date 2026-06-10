import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BookPageProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "soft" | "hard";
  children: React.ReactNode;
}

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ children, className, density = "soft", ...props }, ref) => {
    return (
      <div 
        className={cn("page-face", className)} 
        ref={ref} 
        data-density={density}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BookPage.displayName = 'BookPage';
