import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ArtworkModal: React.FC = () => {
  const { selectedArtworkModal, setSelectedArtworkModal } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtworkModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedArtworkModal]);

  if (!selectedArtworkModal) return null;

  const artwork = selectedArtworkModal;

  const handleRequestSimilar = () => {
    setSelectedArtworkModal(null);
    navigate(`/custom-order?service=${artwork.category}&style=${encodeURIComponent(artwork.style)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E7E0D8] max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedArtworkModal(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="w-full md:w-1/2 bg-[#1C1917] relative min-h-[300px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover max-h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none md:hidden"></div>
        </div>

        {/* Modal Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF8F5]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#C85A32] text-white">
                {artwork.category} Art
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#E7E0D8] text-[#1C1917]">
                {artwork.style}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#F4EFEA] text-[#78716C]">
                {artwork.subcategory}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
              {artwork.title}
            </h3>

            <div className="p-3.5 rounded-xl bg-white border border-[#E7E0D8] flex items-center justify-between">
              <span className="text-xs text-[#78716C] font-semibold uppercase tracking-wider">Estimated Artwork Cost</span>
              <span className="text-xl font-serif font-bold text-[#C85A32]">₹{artwork.price.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Artwork Description</h4>
              <p className="text-sm text-[#44403C] leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Features / Specs */}
            <div className="pt-2 space-y-2 text-xs text-[#44403C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                <span>100% Handcrafted by Senior Gayatri Art Studio Artists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                <span>Customization available for dimensions, colors & placement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                <span>Archival materials & high-resolution digital previews</span>
              </div>
            </div>

            {artwork.tags && artwork.tags.length > 0 && (
              <div className="pt-2">
                <span className="text-xs text-[#78716C] font-semibold block mb-1.5">Style Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {artwork.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-[#E7E0D8] text-[#44403C]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-[#E7E0D8] space-y-3">
            <button
              onClick={handleRequestSimilar}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Request Similar Custom Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedArtworkModal(null)}
              className="w-full py-2.5 text-xs text-[#78716C] hover:text-[#1C1917] font-semibold transition-colors"
            >
              Close Preview
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
