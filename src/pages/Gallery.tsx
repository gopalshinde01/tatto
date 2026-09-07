import React, { useState, useMemo } from 'react';
import { 
  Filter, Search, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const Gallery: React.FC = () => {
  const { artworks, setSelectedArtworkModal } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterOptions = [
    'All', 'Tattoo', 'Blood Painting', 'Rangoli', 'Sketch', 'Portrait', 
    'Popular', 'Latest', 'Traditional', 'Realistic', 'Minimal', 'Custom'
  ];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      // Search query matching
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.style.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category / Tag filter matching
      if (selectedFilter === 'All') return true;
      if (['Tattoo', 'Blood Painting', 'Rangoli', 'Sketch', 'Portrait'].includes(selectedFilter)) {
        return art.category === selectedFilter;
      }
      if (selectedFilter === 'Popular') {
        return (art.views && art.views > 400) || art.featured;
      }
      if (selectedFilter === 'Latest') {
        return art.createdAt.startsWith('2026-02') || art.createdAt.startsWith('2026-03');
      }
      // Match style or tags
      return (
        art.style.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        art.subcategory.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        art.tags?.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()))
      );
    });
  }, [artworks, selectedFilter, searchQuery]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredArtworks.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredArtworks.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredArtworks[lightboxIndex] : null;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      {/* GALLERY HERO HEADER */}
      <SectionHeader 
        badge="Art Portfolio"
        title="Our Creative Collection"
        subtitle="Explore our expansive repository of custom tattoos, traditional festival rangolis, graphite sketches, and realistic portraits."
      />

      {/* SEARCH & FILTER CONTROLS */}
      <div className="space-y-6">
        
        {/* Search Input Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artwork by title, style, or tag..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#E7E0D8] text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C85A32] shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white shadow-md scale-105'
                  : 'bg-white text-[#44403C] border border-[#E7E0D8] hover:border-[#C85A32] hover:text-[#C85A32]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* MASONRY ARTWORK GRID */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork, idx) => (
            <div key={artwork.id} onClick={() => openLightbox(idx)}>
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E0D8] max-w-md mx-auto p-8 space-y-3">
          <Filter className="w-10 h-10 text-[#A8A29E] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#1C1917]">No Artworks Found</h3>
          <p className="text-xs text-[#78716C]">Try resetting your filter or search query to explore other creations.</p>
          <button
            onClick={() => {
              setSelectedFilter('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-full bg-[#C85A32] text-white text-xs font-semibold shadow-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL WITH PREV / NEXT NAVIGATION */}
      {currentLightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          
          {/* Close Lightbox */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-50 p-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous Artwork"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-50 p-3.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next Artwork"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Card */}
          <div className="relative max-w-4xl w-full bg-[#1C1917] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row max-h-[85vh]">
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="w-full h-full object-contain max-h-[550px]"
              />
            </div>
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#C85A32] text-white">
                    {currentLightboxItem.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-stone-800 text-stone-300">
                    {currentLightboxItem.style}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold">{currentLightboxItem.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{currentLightboxItem.description}</p>
                
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Estimated Price:</span>
                  <span className="text-lg font-serif font-bold text-[#D97706]">₹{currentLightboxItem.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 space-y-3">
                <button
                  onClick={() => {
                    const item = currentLightboxItem;
                    setLightboxIndex(null);
                    setSelectedArtworkModal(item);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-xs shadow-md"
                >
                  Request Similar Design
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  Use left/right arrows to navigate collection ({lightboxIndex! + 1} of {filteredArtworks.length})
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
