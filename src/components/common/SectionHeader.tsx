import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  center = true
}) => {
  return (
    <div className={`space-y-3 mb-10 ${center ? 'text-center max-w-2xl mx-auto' : ''}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]"></span>
          <span>{badge}</span>
        </div>
      )}
      
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight leading-tight">
        {title}
      </h2>

      {/* Subtle pencil stroke line */}
      <div className={`w-16 h-1 bg-gradient-to-r from-[#D97706] to-[#C85A32] rounded-full my-2 ${center ? 'mx-auto' : ''}`}></div>

      {subtitle && (
        <p className="text-base text-[#78716C] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
