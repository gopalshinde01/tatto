import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Star, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const Home: React.FC = () => {
  const { artworks, testimonials } = useApp();
  const navigate = useNavigate();

  const featuredArtworks = artworks.filter(art => art.featured).slice(0, 8);

  const categoriesData = [
    {
      title: 'Tattoo Art',
      category: 'Tattoo',
      path: '/tattoo',
      image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=800&q=80',
      description: 'Precision fine line, spiritual mandalas, photorealistic portraits, and traditional Indian ink art.',
      styles: ['Minimal', 'Realistic', 'Mandala', 'Tribal', 'Floral', 'Lettering'],
      color: 'from-[#C85A32]/90 to-[#9A3412]',
      cta: 'View Tattoo Designs'
    },
    {
      title: 'Rangoli Art',
      category: 'Rangoli',
      path: '/rangoli',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      description: 'Grand festival floor art, peacocks, Diwali diyas, fresh flower petal Pookalams & competition masterpieces.',
      styles: ['Diwali', 'Floral', 'Peacock', 'Mandala', 'Geometric', 'Traditional'],
      color: 'from-[#D97706]/90 to-[#B45309]',
      cta: 'View Rangoli Designs'
    },
    {
      title: 'Sketch Art',
      category: 'Sketch',
      path: '/sketches',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      description: 'Deep expressive graphite portrait sketches, charcoal landscapes, vintage architecture & wildlife ink art.',
      styles: ['Human', 'Nature', 'Architecture', 'Animals', 'Anime', 'Creative'],
      color: 'from-[#1E293B]/90 to-[#0F172A]',
      cta: 'View Sketches'
    },
    {
      title: 'Blood Painting',
      category: 'Blood Painting',
      path: '/blood-painting',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      description: 'Intimate memorial keepsakes, couple vow monograms & dark romance fine art preserved with archival UV resin.',
      styles: ['Memorial', 'Couple Vows', 'Gothic', 'Sacred Crest', 'Dark Romance'],
      color: 'from-[#881337]/90 to-[#4C0519]',
      cta: 'View Blood Paintings'
    },
    {
      title: 'Portrait Art',
      category: 'Portrait',
      path: '/portraits',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-drawn single, couple, family heritage, pet & bridal portraits rendered with passion and archival paper.',
      styles: ['Single', 'Couple', 'Family', 'Celebrity', 'Pet'],
      color: 'from-[#9A3412]/90 to-[#7C2D12]',
      cta: 'View Portraits'
    },
  ];

  return (
    <div className="space-y-20 pb-16 pt-24">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-canvas-texture pt-8 pb-16 sm:pb-24 border-b border-[#E7E0D8]">
        {/* Subtle Decorative SVG Background strokes */}
        <div className="absolute top-10 left-5 opacity-10 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#C85A32" strokeWidth="1">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" />
            <path d="M50 0 V100 M0 50 H100" />
          </svg>
        </div>
        <div className="absolute bottom-5 right-5 opacity-10 pointer-events-none">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="#D97706">
            <path d="M50 0 C60 30 100 50 100 50 C100 50 60 70 50 100 C40 70 0 50 0 50 C0 50 40 30 50 0 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/20 text-[#C85A32] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gayatri Art Studio — Creative Art House</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1917] leading-[1.15] tracking-tight">
                Art That Tells <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#D97706] via-[#C85A32] to-[#9A3412] bg-clip-text text-transparent italic">
                  Your Story.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#78716C] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Custom tattoos, traditional rangoli, detailed sketches and realistic portraits — created with patience, creativity and passion.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#categories"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-semibold text-sm shadow-xl shadow-[#C85A32]/25 hover:shadow-2xl hover:shadow-[#C85A32]/40 hover:-translate-y-0.5 transition-all"
                >
                  <span>Explore Our Art</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/custom-order"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1C1917] font-semibold text-sm border-2 border-[#E7E0D8] hover:border-[#C85A32] hover:text-[#C85A32] transition-all shadow-sm"
                >
                  <span>Request Custom Artwork</span>
                </Link>
              </div>

              {/* Trust Micro Indicators */}
              <div className="pt-6 border-t border-[#E7E0D8]/80 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="font-serif text-2xl font-bold text-[#1C1917]">500+</p>
                  <p className="text-xs text-[#78716C]">Artworks Created</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-[#1C1917]">100+</p>
                  <p className="text-xs text-[#78716C]">Happy Clients</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-[#1C1917]">4.9 / 5</p>
                  <p className="text-xs text-[#78716C]">Client Rating</p>
                </div>
              </div>

            </div>

            {/* Right Hero Visual: 2x2 Collage Grid */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 p-3 rounded-3xl bg-white/70 backdrop-blur-md border border-[#E7E0D8] shadow-2xl relative">
                
                {/* Visual 1: Tattoo */}
                <div 
                  onClick={() => navigate('/tattoo')}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80" 
                    alt="Custom Tattoo Art" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Tattoo Art</span>
                    <p className="text-xs font-bold text-white">Fine Line & Mandala</p>
                  </div>
                </div>

                {/* Visual 2: Rangoli */}
                <div 
                  onClick={() => navigate('/rangoli')}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer mt-4"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80" 
                    alt="Traditional Rangoli" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Rangoli Art</span>
                    <p className="text-xs font-bold text-white">Peacock & Diwali</p>
                  </div>
                </div>

                {/* Visual 3: Sketch */}
                <div 
                  onClick={() => navigate('/sketches')}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer -mt-4"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" 
                    alt="Pencil Sketch" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Sketch Art</span>
                    <p className="text-xs font-bold text-white">Graphite & Charcoal</p>
                  </div>
                </div>

                {/* Visual 4: Portrait */}
                <div 
                  onClick={() => navigate('/portraits')}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                    alt="Portrait Art" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Portrait Art</span>
                    <p className="text-xs font-bold text-white">Realism & Couple</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ART CATEGORIES SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <SectionHeader 
          badge="Curated Specializations"
          title="Explore Our Art"
          subtitle="Five distinct artistic domains, executed with fine technique, premium materials, and deep craftsmanship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoriesData.map((cat, idx) => (
            <div 
              key={cat.title}
              className="group rounded-3xl overflow-hidden bg-white border border-[#E7E0D8] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                    <span className="text-[11px] uppercase tracking-widest font-bold opacity-90">0{idx + 1} Studio Art</span>
                    <h3 className="font-serif text-2xl font-bold">{cat.title}</h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    {cat.description}
                  </p>

                  <div>
                    <span className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-2">Available Styles:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.styles.map(style => (
                        <span key={style} className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-[#44403C] font-medium">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-6 pt-0">
                <Link
                  to={cat.path}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] text-xs font-bold hover:bg-[#C85A32] hover:text-white hover:border-[#C85A32] transition-colors"
                >
                  <span>{cat.cta}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* FEATURED CREATIONS SECTION */}
      <section className="bg-[#F4EFEA] py-16 sm:py-24 border-y border-[#E7E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            badge="Studio Portfolio"
            title="Featured Creations"
            subtitle="A curated showcase of recent custom commissions across tattoo, rangoli, sketch, and portrait projects."
          />

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>

          <div className="text-center pt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1C1917] text-white font-semibold text-sm hover:bg-[#C85A32] transition-colors shadow-lg"
            >
              <span>View Full Gallery Collection (20+ Artworks)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white p-8 sm:p-12 shadow-2xl border border-[#44403C] grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#44403C]">
          
          <div className="text-center space-y-1 pt-4 lg:pt-0">
            <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#D97706]">500+</p>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-300">Artworks Created</p>
            <p className="text-xs text-stone-400">Tattoo, Rangoli, Sketches & Portraits</p>
          </div>

          <div className="text-center space-y-1 pt-4 lg:pt-0">
            <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#C85A32]">100+</p>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-300">Happy Clients</p>
            <p className="text-xs text-stone-400">Across Pune, Mumbai & India</p>
          </div>

          <div className="text-center space-y-1 pt-4 lg:pt-0">
            <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#D97706]">4+ Years</p>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-300">Studio Experience</p>
            <p className="text-xs text-stone-400">Professional Excellence</p>
          </div>

          <div className="text-center space-y-1 pt-4 lg:pt-0">
            <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#C85A32]">4.9 / 5</p>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-300">Client Satisfaction</p>
            <p className="text-xs text-stone-400">Verified Client Reviews</p>
          </div>

        </div>
      </section>


      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          badge="Word of Trust"
          title="Client Testimonials"
          subtitle="Real feedback from individuals who entrusted their stories, celebrations, and memories to Gayatri Art Studio."
        />

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x">
          {testimonials.map((test) => (
            <div 
              key={test.id}
              className="snap-center min-w-[300px] sm:min-w-[360px] max-w-[380px] p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D97706]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D97706]" />
                  ))}
                </div>

                <p className="text-sm text-[#44403C] italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7E0D8] flex items-center gap-3">
                {test.avatar && (
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1C1917]">{test.name}</h4>
                  <p className="text-xs text-[#C85A32] font-semibold">{test.service} • {test.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
