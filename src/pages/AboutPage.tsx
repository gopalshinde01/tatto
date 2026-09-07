import React from 'react';
import { Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';

export const AboutPage: React.FC = () => {
  const timelineMilestones = [
    { year: '2022', title: 'Studio Inception', desc: 'Began custom pencil sketch and tattoo stencil practice in Pune, Maharashtra.' },
    { year: '2023', title: 'First Regional Exhibition', desc: 'Showcased traditional rangoli mandalas and award-winning portrait art.' },
    { year: '2024', title: 'Commission Studio', desc: 'Expanded into corporate event floor rangolis and custom fine line ink tattoos.' },
    { year: '2025', title: 'Digital Portfolio Launch', desc: 'Reached 400+ custom commissions across India with verified 4.9/5 client ratings.' },
    { year: '2026', title: 'Gayatri Art Studio', desc: 'Established Gayatri Art Studio as a premier Indian creative art house.' },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* ABOUT HERO */}
      <SectionHeader
        badge="Our Craft & Philosophy"
        title="Behind Every Artwork Is a Story."
        subtitle="At Gayatri Art Studio, we believe true art is built on patience, deep observation, and sacred precision. We bridge heritage Indian artistic traditions with modern aesthetics."
      />

      {/* ARTIST PROFILE SECTION */}
      <section className="bg-white p-8 sm:p-14 rounded-3xl border border-[#E7E0D8] shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Artist Photo */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Lead Artist - Gayatri Art Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 p-5 rounded-2xl bg-[#1C1917] text-white shadow-xl max-w-xs space-y-1">
              <p className="font-serif text-lg font-bold text-[#D97706]">Master Artist</p>
              <p className="text-xs text-stone-300">4+ Years of Professional Craftsmanship in Fine Line Tattoos, Rangoli & Charcoal</p>
            </div>
          </div>

          {/* Artist Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
              "Art is not just a drawing; it is a memory preserved in ink and graphite."
            </h2>

            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              Founded in Pune, Gayatri Art Studio was created with a single passion — turning human emotions, festive rituals, and personal stories into permanent visual art. From delicate micro tattoos and spiritual mandalas to grand Diwali rangolis and detailed wedding portraits, we pour meticulous detail into every stroke.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8]">
                <h4 className="font-serif font-bold text-base text-[#1C1917]">Specializations</h4>
                <p className="text-xs text-[#78716C] mt-1">Custom Tattoos, Rangoli, Charcoal Portraits & Sketches</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8]">
                <h4 className="font-serif font-bold text-base text-[#1C1917]">Quality Promise</h4>
                <p className="text-xs text-[#78716C] mt-1">Archival cartridge papers, sterile hygiene & organic inks</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-1">
          <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#D97706]">500+</p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Artworks Created</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-1">
          <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#C85A32]">100+</p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Happy Clients</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-1">
          <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#1E293B]">4+ Years</p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Experience</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-1">
          <p className="font-serif text-4xl sm:text-5xl font-extrabold text-[#9A3412]">4.9 / 5</p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Rating</p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="space-y-10">
        <SectionHeader
          badge="Our Journey"
          title="Studio Evolution Timeline"
          subtitle="Key milestones shaping Gayatri Art Studio from 2022 to 2026."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {timelineMilestones.map((m) => (
            <div key={m.year} className="flex flex-col sm:flex-row gap-4 p-6 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm items-start">
              <span className="font-serif text-3xl font-extrabold text-[#C85A32] sm:w-28 shrink-0">{m.year}</span>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-[#1C1917]">{m.title}</h4>
                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
