import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const SketchPage: React.FC = () => {
  const { artworks } = useApp();
  const navigate = useNavigate();

  const sketchArtworks = artworks.filter(art => art.category === 'Sketch');

  const sketchTypes = [
    { title: 'Pencil', desc: 'Detailed 2B - 9B graphite shading with smooth tonal blends', icon: '✏️' },
    { title: 'Charcoal', desc: 'Deep high-contrast chiaroscuro shadows on textured paper', icon: '🖤' },
    { title: 'Ink', desc: 'Cross-hatching, stippling & fluid brush line illustrations', icon: '✒️' },
    { title: 'Nature', desc: 'Expressive trees, botanical studies & landscape horizons', icon: '🌿' },
    { title: 'Architecture', desc: 'Precision perspective sketches of historic Indian heritage', icon: '🏛️' },
    { title: 'Creative', desc: 'Surreal concept art, fantasy themes & fusion sketches', icon: '💡' },
    { title: 'Animal', desc: 'Wildlife drawings capturing fur textures & wild gazes', icon: '🐅' },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* SKETCH HERO */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-14 overflow-hidden border border-stone-800 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-stone-700/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-stone-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Monochrome Precision</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white">
            Every Line Has a Story.
          </h1>
          <p className="text-base text-stone-300 leading-relaxed">
            Hand-drawn graphite and charcoal sketches crafted on museum-grade heavy cartridge paper. We transform memories, landscapes, and ideas into permanent monochrome art.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/custom-order?service=Sketch')}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <span>Order a Custom Sketch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SKETCH TYPES */}
      <section className="space-y-8">
        <SectionHeader
          badge="Mediums & Subjects"
          title="Explore Sketch Art Media"
          subtitle="Select your preferred medium — graphite pencil, dark charcoal, or fine nib ink art."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {sketchTypes.map((t) => (
            <div
              key={t.title}
              onClick={() => navigate(`/custom-order?service=Sketch&style=${encodeURIComponent(t.title)}`)}
              className="p-5 rounded-2xl bg-white border border-[#E7E0D8] hover:border-[#1E293B] hover:shadow-lg transition-all cursor-pointer space-y-2"
            >
              <span className="text-2xl">{t.icon}</span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">{t.title}</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE BEFORE / AFTER COMPARISON SLIDER */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] shadow-lg max-w-4xl mx-auto space-y-6">
        <BeforeAfterSlider
          beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
          afterImage="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80"
          beforeLabel="Digital Reference Photo"
          afterLabel="Hand-Drawn Charcoal Masterpiece"
          title="From Photograph to Timeless Masterpiece"
        />

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/custom-order?service=Sketch')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1917] text-white text-xs font-bold shadow-md hover:bg-[#C85A32] transition-colors"
          >
            <span>Turn Your Photo Into a Sketch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SKETCH GALLERY GRID */}
      <section className="space-y-8">
        <SectionHeader
          badge="Studio Collection"
          title="Pencil & Charcoal Portfolio"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sketchArtworks.map(art => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

    </div>
  );
};
