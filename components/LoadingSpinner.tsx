import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LoadingSpinner = ({ size = 'md', className = "" }: LoadingSpinnerProps) => {
  // Mapping sizes to Tailwind classes
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
    xl: 'w-24 h-24 border-8',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Track (Muted Brand Green) */}
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-brand-green-100 
          dark:border-brand-green-900/30
        `}
      />
      
      {/* Rotating Spinner (Brand Lemon) */}
      <div
        className={`
          ${sizeClasses[size]} 
          absolute 
          rounded-full 
          border-t-brand-lemon 
          border-r-transparent 
          border-b-transparent 
          border-l-transparent 
          animate-spin 
          ease-in-out
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
