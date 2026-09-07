import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const RangoliPage: React.FC = () => {
  const { artworks } = useApp();
  const navigate = useNavigate();

  const rangoliArtworks = artworks.filter(art => art.category === 'Rangoli');

  const rangoliCategories = [
    { title: 'Diwali', desc: 'Grand illumination mandalas & diya patterns', icon: '🪔' },
    { title: 'Festival', desc: 'Ganesh Chaturthi, Pongal, Holi & Navratri art', icon: '🎉' },
    { title: 'Flower (Pookalam)', desc: 'Eco-friendly fresh rose & marigold petals', icon: '🌸' },
    { title: 'Peacock', desc: 'Majestic feather gradients & rich pigments', icon: '🦚' },
    { title: 'Mandala', desc: 'Concentric geometry for courtyard entrances', icon: '☸️' },
    { title: 'Competition', desc: 'Hyper-detailed award winning freehand art', icon: '🏆' },
    { title: 'Simple Daily', desc: 'Charming morning door threshold Kolams', icon: '☀️' },
    { title: 'Modern', desc: 'Terracotta dual-tone abstract fusion strokes', icon: '🎨' },
  ];

  const servicesList = [
    { title: 'Custom Rangoli Design', desc: 'Customized floor art sketches designed for your venue space.' },
    { title: 'Festival Decor Setup', desc: 'On-location creation for Diwali, Ganeshotsav, and weddings.' },
    { title: 'Corporate & Event Decor', desc: 'Grand entrance rangolis for hotel lobbies & corporate functions.' },
    { title: 'Rangoli Competition Mentorship', desc: 'Technique guidance on powder shading and freehand speed.' },
    { title: 'Digital Rangoli Vectors', desc: 'High-res scalable vector prints for greeting cards & banners.' },
    { title: 'Fresh Flower Pookalam', desc: 'Curated organic fresh petal artwork for eco-friendly celebrations.' },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* RANGOLI HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#9A3412] text-white p-8 sm:p-14 overflow-hidden border border-[#D97706]/40 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Traditional Indian Floor Art</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Tradition Drawn Into Every Line.
          </h1>
          <p className="text-base text-amber-100 leading-relaxed">
            From Diwali illumination mandalas to grand wedding fresh flower Pookalams, we bring vibrant colors, sacred symmetry, and festive warmth to your space.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/custom-order?service=Rangoli')}
              className="px-7 py-3.5 rounded-full bg-white text-[#9A3412] font-bold text-sm shadow-xl hover:bg-amber-50 transition-all flex items-center gap-2"
            >
              <span>Request Custom Rangoli</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* RANGOLI CATEGORIES */}
      <section className="space-y-8">
        <SectionHeader
          badge="Festive Patterns"
          title="Rangoli Styles & Themes"
          subtitle="Discover traditional powder shading, fresh petal mandalas, and contemporary modern fusion designs."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {rangoliCategories.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate(`/custom-order?service=Rangoli&style=${encodeURIComponent(c.title)}`)}
              className="p-5 rounded-2xl bg-white border border-[#E7E0D8] hover:border-[#D97706] hover:shadow-lg transition-all cursor-pointer space-y-2"
            >
              <span className="text-2xl">{c.icon}</span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">{c.title}</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RANGOLI SERVICES LIST */}
      <section className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] space-y-8">
        <SectionHeader
          badge="What We Provide"
          title="Rangoli Art Services"
          subtitle="Professional on-location floor decoration and digital rangoli design solutions."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s) => (
            <div key={s.title} className="p-6 rounded-2xl bg-white border border-[#E7E0D8] space-y-2 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-[#D97706]" />
              <h4 className="font-serif text-lg font-bold text-[#1C1917]">{s.title}</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RANGOLI GALLERY GRID */}
      <section className="space-y-8">
        <SectionHeader
          badge="Masterpieces"
          title="Rangoli Portfolio Gallery"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rangoliArtworks.map(art => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="rounded-3xl bg-[#1C1917] text-white p-8 sm:p-12 text-center space-y-4 border border-[#292524]">
        <h3 className="font-serif text-3xl font-bold">Planning a Festival or Grand Celebration?</h3>
        <p className="text-sm text-stone-300 max-w-xl mx-auto">Book our team to create an unforgettable floor rangoli masterpiece live at your event venue.</p>
        <button
          onClick={() => navigate('/custom-order?service=Rangoli')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl"
        >
          <span>Request a Custom Rangoli</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
