import React, { useState, useMemo } from 'react';
import { 
  Filter, Search, X 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const Gallery: React.FC = () => {
  const { artworks } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOptions = [
    'All', 'Tattoo', 'Blood Painting', 'Rangoli', 'Sketch', 'Portrait', 
    'Popular', 'Latest', 'Traditional', 'Realistic', 'Minimal', 'Custom'
  ];

  const [mountTime] = useState(() => Date.now());

  const filteredArtworks = useMemo(() => {
    const cutoff = mountTime - 120 * 24 * 60 * 60 * 1000; // Artworks from recent 120 days
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
        const itemDate = new Date(art.createdAt).getTime();
        return !isNaN(itemDate) ? itemDate >= cutoff : true;
      }
      // Match style or tags
      return (
        art.style.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        art.subcategory.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        art.tags?.some(tag => tag.toLowerCase().includes(selectedFilter.toLowerCase()))
      );
    });
  }, [artworks, selectedFilter, searchQuery, mountTime]);

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
          {filteredArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
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

    </div>
  );
};
