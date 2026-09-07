import React from 'react';

interface StudioLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className={`relative rounded-full bg-gradient-to-br from-[#D97706] to-[#C85A32] flex items-center justify-center text-white shadow-md shadow-[#C85A32]/20 shrink-0 ${sizeClasses} ${className}`}>
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5"
      >
        {/* Simple stylized art pen / feather / brush with lotus curve */}
        <path 
          d="M20 7 C20 7 13 16 13 24 C13 28 16 31 20 31 C24 31 27 28 27 24 C27 16 20 7 20 7 Z" 
          fill="#FAF8F5" 
          opacity="0.95"
        />
        <path 
          d="M20 7 V31" 
          stroke="#C85A32" 
          strokeWidth="1.8" 
          strokeLinecap="round"
        />
        <circle cx="20" cy="21" r="2.5" fill="#D97706" />
        <circle cx="20" cy="5.5" r="1.5" fill="#FAF8F5" />
      </svg>
    </div>
  );
};
