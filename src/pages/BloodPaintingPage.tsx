import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Heart, Droplet, 
  CheckCircle2, HelpCircle, MessageSquare, Clock, ArrowRight, Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const BloodPaintingPage: React.FC = () => {
  const { artworks, addOrder } = useApp();

  const bloodArtworks = artworks.filter(art => art.category === 'Blood Painting');

  // Blood Painting Order Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    style: 'Memorial Keepsake',
    canvasSize: 'A3 (12x16 inch)',
    framing: 'Museum Glass Antique Black Frame',
    mediumType: 'Symbolic Sealed Medium with UV Resin',
    deadline: '',
    referencePhoto: '',
    instructions: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const styles = [
    { 
      title: 'Memorial Keepsake', 
      desc: 'Tribute to loved ones or lost pets, infused with sentimental calligraphy & gold-leaf trim', 
      icon: '🕊️' 
    },
    { 
      title: 'Couple Vow Monogram', 
      desc: 'Intertwined initials, eternal knot geometry & anniversary vows for soulful unions', 
      icon: '💍' 
    },
    { 
      title: 'Gothic & Dark Romance', 
      desc: 'Classical chiaroscuro realism, vampiric Renaissance aesthetics & deep crimson glazes', 
      icon: '🥀' 
    },
    { 
      title: 'Ancestral Bloodline Crest', 
      desc: 'Family heritage emblems, sacred warrior motifs, protective runes & heraldic shields', 
      icon: '⚔️' 
    },
  ];

  const safetyFeatures = [
    {
      title: 'Certified Preservation',
      desc: 'Specialized bio-safe chemical stabilization prevents oxidation, browning, and bacterial breakdown.',
      icon: ShieldCheck
    },
    {
      title: 'Museum UV Glass & Epoxy',
      desc: 'Encapsulated beneath archival non-yellowing UV resin and conservation glass for lifetime permanence.',
      icon: Award
    },
    {
      title: 'Ethical & Sterile Process',
      desc: 'Clear guidance protocols or optional hypoallergenic vegan crimson iron-oxide pigment alternative.',
      icon: Droplet
    },
    {
      title: 'Strict Confidentiality',
      desc: 'Discreet, respectful commissions treated with dignity, privacy, and artistic integrity.',
      icon: Heart
    }
  ];

  const faqs = [
    {
      q: 'Will the artwork fade or turn brown over time?',
      a: 'No. Raw biological media oxidizes quickly when exposed to air. We use a proprietary stabilization and fixation treatment combined with non-yellowing archival UV resin encapsulation. This locks in the vibrant deep crimson hue for decades.'
    },
    {
      q: 'Can I choose an archival crimson synthetic pigment alternative?',
      a: 'Yes, absolutely! We offer identical visual fidelity using traditional Florentine mineral crimson and iron-oxide oil glazes for clients who prefer a symbolic gothic aesthetic without biological medium.'
    },
    {
      q: 'How do I provide reference materials or discuss my idea privately?',
      a: 'Fill out the confidential commission form below or reach out directly on WhatsApp. We offer one-on-one private design sessions to ensure your sentimental vision is honored.'
    },
    {
      q: 'What kind of framing is included?',
      a: 'Every piece is mounted with acid-free museum matboards and fitted inside handcrafted shadowbox floating frames protected by 99% UV-blocking conservation acrylic.'
    }
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
    if (!formData.instructions.trim()) errors.instructions = 'Please describe the theme, name, or symbol desired';
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
      serviceType: 'Blood Painting',
      description: `Blood Painting Request (${formData.style} - ${formData.canvasSize}, ${formData.framing}). Medium: ${formData.mediumType}. Notes: ${formData.instructions}`,
      style: formData.style,
      paperSize: formData.canvasSize,
      deadline: formData.deadline,
      referenceImage: formData.referencePhoto,
    });

    setSubmittedRefId(refId);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#2D0A0E] via-[#4A0E17] to-[#1C0609] text-white p-8 sm:p-14 overflow-hidden border border-[#881337]/30 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#BE123C]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#E11D48]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/60 border border-[#BE123C]/40 text-[#FDA4AF] text-xs font-bold uppercase tracking-wider">
            <Droplet className="w-3.5 h-3.5 text-[#F43F5E]" />
            <span>Sacred Sentiments & Archival Fine Art</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Blood Painting & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#E11D48] bg-clip-text text-transparent">
              Memorial Crimson Keepsakes.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed font-light max-w-2xl">
            A deeply intimate fine-art specialization uniting heartfelt devotion, soulmate vows, and gothic romance. Treated with museum-grade preservation for generational permanence.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#blood-painting-order-form"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white font-bold text-sm shadow-xl shadow-[#BE123C]/30 hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>Commission a Piece</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/918788225420?text=Hi!%20I%20would%20like%20to%20discuss%20a%20confidential%20Blood%20Painting%20artwork."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Discreet Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* SAFETY & PRESERVATION HIGHLIGHTS */}
      <section className="space-y-8">
        <SectionHeader
          badge="Archival Standards"
          title="Ethical, Preserved & Museum Quality"
          subtitle="How we ensure total bio-safety, lifetime color permanence, and artistic discretion."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.title}
                className="p-6 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#BE123C]">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1C1917]">{feat.title}</h4>
                <p className="text-xs text-[#78716C] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* STYLES & CONCEPTS */}
      <section className="space-y-8">
        <SectionHeader
          badge="Bespoke Styles"
          title="Explore Artistic Concepts"
          subtitle="From sacred memorial dedications to couple vows and dark romantic chiaroscuro."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((st) => (
            <div 
              key={st.title} 
              className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D8] space-y-3 hover:border-[#BE123C]/50 transition-colors shadow-sm"
            >
              <span className="text-3xl">{st.icon}</span>
              <h4 className="font-serif text-lg font-bold text-[#1C1917]">{st.title}</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE GALLERY */}
      {bloodArtworks.length > 0 && (
        <section className="space-y-8">
          <SectionHeader
            badge="Studio Portfolio"
            title="Recent Crimson Works"
            subtitle="Browse our recent memorial keepsakes, monograms, and dark fine-art commissions."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodArtworks.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>
      )}

      {/* COMMISSION FORM */}
      <section id="blood-painting-order-form" className="scroll-mt-28">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#E7E0D8] shadow-2xl">
          {submittedRefId ? (
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#BE123C] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-[#BE123C] text-xs font-bold uppercase tracking-wider">
                  Commission Confirmed
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1C1917] mt-2">
                  Request Received in Confidence
                </h3>
                <p className="text-sm text-[#78716C] mt-1">Your unique commission reference is:</p>
                <div className="mt-3 inline-block px-6 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] font-mono text-2xl font-bold text-[#BE123C]">
                  {submittedRefId}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/60 text-xs text-[#44403C] space-y-2 text-left max-w-lg mx-auto">
                <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                  <Clock className="w-4 h-4 text-[#BE123C]" />
                  <span>Next Step: Confidential Design Preview</span>
                </div>
                <p>
                  Our lead artist will connect with you via email or WhatsApp within 24 hours to discuss your draft symbolism, custom preservation packaging, and scheduling.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/918788225420?text=Hi!%20I%20have%20submitted%20a%20Blood%20Painting%20commission%20with%20Ref%20ID%20${submittedRefId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow hover:bg-[#20ba59] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Handoff</span>
                </a>

                <button
                  onClick={() => setSubmittedRefId(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] font-semibold text-xs hover:bg-[#E7E0D8]"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#E7E0D8] pb-4">
                <span className="text-xs font-bold text-[#BE123C] uppercase tracking-wider">Confidential Studio Order</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                  Commission Your Custom Artwork
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  All commissions are treated with utmost privacy, dignified care, and artistic excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samarth Jadhav"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  />
                  {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="samarth@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  />
                  {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 87882 25420"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  />
                  {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Artistic Concept *</label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  >
                    <option value="Memorial Keepsake">Memorial Keepsake</option>
                    <option value="Couple Vow Monogram">Couple Vow Monogram</option>
                    <option value="Gothic & Dark Romance">Gothic & Dark Romance</option>
                    <option value="Ancestral Bloodline Crest">Ancestral Bloodline Crest</option>
                    <option value="Custom Symbolic Sigil">Custom Symbolic Sigil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Canvas Size *</label>
                  <select
                    value={formData.canvasSize}
                    onChange={(e) => setFormData({ ...formData, canvasSize: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  >
                    <option value="A4 (8.3 x 11.7 in)">A4 (8.3 x 11.7 in) - ₹4,200</option>
                    <option value="A3 (11.7 x 16.5 in)">A3 (11.7 x 16.5 in) - ₹5,499</option>
                    <option value="16 x 20 in Canvas">16 x 20 in Stretched Canvas - ₹7,499</option>
                    <option value="Custom Grand Scale">Custom Grand Scale (On Quote)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Medium Preference</label>
                  <select
                    value={formData.mediumType}
                    onChange={(e) => setFormData({ ...formData, mediumType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                  >
                    <option value="Symbolic Sealed Medium with UV Resin">Archival Preserved Medium with UV Sealant</option>
                    <option value="Florentine Archival Crimson Oil (Synthetic)">Florentine Mineral Crimson Oil (Synthetic Alternative)</option>
                    <option value="Open to Artist Recommendation">Open to Artist Recommendation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                  Framing & Encapsulation
                </label>
                <select
                  value={formData.framing}
                  onChange={(e) => setFormData({ ...formData, framing: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                >
                  <option value="Museum Glass Antique Black Frame">Museum Glass Antique Black Shadowbox Frame (Recommended)</option>
                  <option value="Gold-Leaf Ornate Floating Frame">Gold-Leaf Ornate Vintage Floating Frame</option>
                  <option value="Minimalist Deep Walnut Frame">Minimalist Deep Walnut Wood Frame</option>
                  <option value="Unframed Encapsulated Canvas">Unframed Archival Encapsulated Canvas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                  Artwork Vision, Names, or Inscriptions *
                </label>
                <textarea
                  rows={4}
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="Describe your design concept, personal symbolism, names, significant dates, or emotions to be captured..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#BE123C]"
                />
                {formErrors.instructions && <p className="text-xs text-red-500 mt-1">{formErrors.instructions}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#BE123C] via-[#9F1239] to-[#881337] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Confidential Commission Request</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="space-y-8">
        <SectionHeader
          badge="Inquiries & Clarity"
          title="Frequently Asked Questions"
          subtitle="Transparent answers regarding longevity, materials, and process."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-[#E7E0D8] shadow-sm space-y-2">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#BE123C] shrink-0 mt-0.5" />
                <h4 className="font-serif text-base font-bold text-[#1C1917]">{faq.q}</h4>
              </div>
              <p className="text-xs text-[#78716C] leading-relaxed pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BloodPaintingPage;
