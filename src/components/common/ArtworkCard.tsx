import React from 'react';
import { Eye } from 'lucide-react';
import type { Artwork } from '../../types';
import { useApp } from '../../context/AppContext';

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { setSelectedArtworkModal } = useApp();

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Tattoo': return 'bg-[#C85A32] text-white';
      case 'Rangoli': return 'bg-[#D97706] text-white';
      case 'Sketch': return 'bg-[#1E293B] text-white';
      case 'Portrait': return 'bg-[#9A3412] text-white';
      default: return 'bg-[#44403C] text-white';
    }
  };

  return (
    <div 
      onClick={() => setSelectedArtworkModal(artwork)}
      className="group relative rounded-2xl overflow-hidden bg-white border border-[#E7E0D8] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image Container with Zoom */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-[#F4EFEA]">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide ${getCategoryColor(artwork.category)}`}>
            {artwork.category}
          </span>
          <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C1917] shadow-sm">
            {artwork.style}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-20">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
            <span className="text-xs text-[#D97706] font-semibold uppercase tracking-wider">{artwork.subcategory}</span>
            <h4 className="font-serif text-lg font-bold text-white leading-tight">{artwork.title}</h4>
            <p className="text-xs text-stone-300 line-clamp-2">{artwork.description}</p>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Est. ₹{artwork.price.toLocaleString('en-IN')}</span>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D97706] text-white text-xs font-semibold shadow-md hover:bg-[#B45309] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer (Visible when not hovering) */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#C85A32] transition-colors line-clamp-1">
            {artwork.title}
          </h4>
          <p className="text-xs text-[#78716C] mt-1 line-clamp-2">{artwork.description}</p>
        </div>
        
        <div className="mt-3 pt-3 border-t border-[#E7E0D8] flex items-center justify-between text-xs">
          <span className="text-[#A8A29E] font-medium">{artwork.style} Style</span>
          <span className="font-bold text-[#1C1917]">₹{artwork.price.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
