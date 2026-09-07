import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const TattooPage: React.FC = () => {
  const { artworks, addOrder } = useApp();

  const tattooArtworks = artworks.filter(art => art.category === 'Tattoo');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tattooIdea: '',
    style: 'Minimal',
    placement: 'Forearm',
    size: '3x3 inches',
    budget: '₹3,000 - ₹5,000',
    preferredDate: '',
    referenceImage: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const styleCards = [
    { title: 'Minimal', desc: 'Subtle micro-tattoos with clean aesthetic lines', icon: '✨' },
    { title: 'Fine Line', desc: 'Ultra precise single-needle detailed artwork', icon: '✍️' },
    { title: 'Realistic', desc: 'Photorealistic black & grey portrait shading', icon: '👁️' },
    { title: 'Tribal', desc: 'Powerful indigenous patterns & sacred Indian symbols', icon: '🔱' },
    { title: 'Mandala', desc: 'Symmetrical sacred geometry back & arm pieces', icon: '☸️' },
    { title: 'Floral', desc: 'Flowing lotus, wild botanical & leaf bands', icon: '🌸' },
    { title: 'Typography', desc: 'Custom Sanskrit shlokas & calligraphic script', icon: '📜' },
    { title: 'Geometric', desc: 'Modern abstract shapes & dotwork gradients', icon: '📐' },
  ];

  const processSteps = [
    { step: '01', title: 'Share Your Idea', desc: 'Fill out our inquiry form or send reference photos of your tattoo vision.' },
    { step: '02', title: 'Discuss Design', desc: 'Consultation with our senior tattoo artist to customize placement & size.' },
    { step: '03', title: 'Finalize Concept', desc: 'Review & refine your custom stencil preview before ink day.' },
    { step: '04', title: 'Tattoo Session', desc: 'Clean, hygienic, sterile session performed with EU-certified organic inks.' },
    { step: '05', title: 'Aftercare Guidance', desc: 'Receive complimentary soothing balm & detailed healing instructions.' },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number required';
    if (!formData.tattooIdea.trim()) errors.tattooIdea = 'Please describe your tattoo idea';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refId = addOrder({
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      serviceType: 'Tattoo',
      description: formData.tattooIdea,
      style: formData.style,
      placement: formData.placement,
      tattooSize: formData.size,
      budget: formData.budget,
      deadline: formData.preferredDate,
      referenceImage: formData.referenceImage,
    });

    setSubmittedRefId(refId);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* TATTOO HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white p-8 sm:p-14 overflow-hidden border border-[#44403C] shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#C85A32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Ink Artistry</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
            Ink Your Story.
          </h1>
          <p className="text-base text-stone-300 leading-relaxed">
            Permanent art crafted with medical hygiene standards, organic skin-friendly inks, and meticulous attention to line weight, contrast, and longevity.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="#custom-tattoo-form"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Request Tattoo Consultation
            </a>
          </div>
        </div>
      </section>

      {/* STYLES GRID SECTION */}
      <section className="space-y-8">
        <SectionHeader
          badge="Design Aesthetics"
          title="Explore Tattoo Styles"
          subtitle="From minimal wrist bands to intricate sacred mandalas, pick your favorite aesthetic style."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {styleCards.map((st) => (
            <div
              key={st.title}
              onClick={() => setFormData({ ...formData, style: st.title })}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                formData.style === st.title
                  ? 'bg-white border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20'
                  : 'bg-white border-[#E7E0D8] hover:border-[#C85A32]/50'
              }`}
            >
              <span className="text-2xl">{st.icon}</span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">{st.title}</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TATTOO PROCESS STEPS */}
      <section className="bg-[#F4EFEA] p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] space-y-8">
        <SectionHeader
          badge="Seamless Experience"
          title="Tattoo Process Workflow"
          subtitle="Step-by-step guidance from your initial idea to full tattoo aftercare."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((p) => (
            <div key={p.step} className="space-y-2 p-5 rounded-2xl bg-white border border-[#E7E0D8] relative">
              <span className="text-2xl font-serif font-extrabold text-[#C85A32] block">{p.step}</span>
              <h4 className="font-serif text-base font-bold text-[#1C1917]">{p.title}</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TATTOO PORTFOLIO EXAMPLES */}
      <section className="space-y-8">
        <SectionHeader
          badge="Recent Tattoo Works"
          title="Tattoo Portfolio Gallery"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tattooArtworks.map(art => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* CUSTOM TATTOO FORM SECTION */}
      <section id="custom-tattoo-form" className="scroll-mt-28 bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] shadow-xl max-w-3xl mx-auto">
        <SectionHeader
          badge="Custom Ink"
          title="Request a Custom Tattoo Design"
          subtitle="Fill in your tattoo specifications below. Our studio artist will contact you within 24 hours."
        />

        {submittedRefId ? (
          <div className="text-center py-10 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Tattoo Request Submitted!</h3>
            <p className="text-sm text-[#78716C]">Your Reference ID is <strong className="text-[#C85A32] font-mono">{submittedRefId}</strong></p>
            <p className="text-xs text-[#78716C] max-w-md mx-auto">Our artist will review your placement and style preferences and respond with custom stencil drafts.</p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <a
                href={`https://wa.me/918788225420?text=Hi!%20I%20submitted%20a%20tattoo%20request%20with%20Ref%20ID%20${submittedRefId}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-medium text-xs shadow-md"
              >
                Chat on WhatsApp with Ref ID
              </a>
              <button
                onClick={() => setSubmittedRefId(null)}
                className="px-6 py-3 rounded-full bg-[#E7E0D8] text-[#1C1917] font-medium text-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. aarav@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 87882 25420"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Preferred Style</label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  {styleCards.map(st => (
                    <option key={st.title} value={st.title}>{st.title} Tattoo</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Tattoo Idea Description *</label>
              <textarea
                rows={4}
                value={formData.tattooIdea}
                onChange={(e) => setFormData({ ...formData, tattooIdea: e.target.value })}
                placeholder="Describe your tattoo vision, symbols, elements, or meaning..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
              {formErrors.tattooIdea && <p className="text-xs text-red-500 mt-1">{formErrors.tattooIdea}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Body Placement</label>
                <input
                  type="text"
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  placeholder="e.g. Forearm, Back, Wrist"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Estimated Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g. 4x3 inches, Half Sleeve"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Estimated Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="₹2,000 - ₹3,500">₹2,000 - ₹3,500</option>
                  <option value="₹3,500 - ₹6,000">₹3,500 - ₹6,000</option>
                  <option value="₹6,000 - ₹10,000">₹6,000 - ₹10,000</option>
                  <option value="₹10,000+">₹10,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Reference Image URL (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.referenceImage}
                  onChange={(e) => setFormData({ ...formData, referenceImage: e.target.value })}
                  placeholder="Paste image link or drive URL..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              Submit Tattoo Request
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
