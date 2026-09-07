import React, { useState } from 'react';
import { Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ArtworkCard } from '../components/common/ArtworkCard';

export const PortraitPage: React.FC = () => {
  const { artworks, pricingTiers, addOrder } = useApp();

  const portraitArtworks = artworks.filter(art => art.category === 'Portrait');

  // Portrait Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    peopleCount: 1,
    style: 'Detailed Pencil',
    paperSize: 'A3 (11.7 x 16.5 in)',
    deadline: '',
    referencePhoto: '',
    instructions: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const styles = [
    { title: 'Pencil', desc: 'Monochrome 2B - 8B graphite portrait', icon: '✏️' },
    { title: 'Charcoal', desc: 'Dramatic shadows & deep black contrast', icon: '🖤' },
    { title: 'Digital', desc: 'Canvas oil paint print finish', icon: '💻' },
    { title: 'Couple', desc: 'Anniversary & bridal double portraits', icon: '💍' },
    { title: 'Family', desc: 'Multi-person heritage family portraits', icon: '👨‍👩‍👧' },
    { title: 'Pet', desc: 'Detailed fur texture pet portrait', icon: '🐾' },
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
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
      serviceType: 'Portrait',
      description: `Portrait Request for ${formData.peopleCount} person(s). ${formData.instructions}`,
      style: formData.style,
      peopleCount: formData.peopleCount,
      paperSize: formData.paperSize,
      deadline: formData.deadline,
      referenceImage: formData.referencePhoto,
    });

    setSubmittedRefId(refId);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      {/* PORTRAIT HERO */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#9A3412] via-[#C85A32] to-[#7C2D12] text-white p-8 sm:p-14 overflow-hidden border border-[#9A3412]/40 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cherished Gift & Memory</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-tight leading-none">
            Turn Memories Into Art.
          </h1>
          <p className="text-base text-amber-100 leading-relaxed">
            Hand-drawn realistic portraits crafted from your favorite photographs. Perfect for birthdays, weddings, anniversaries, family heirlooms, and pet tributes.
          </p>
          <div className="pt-4">
            <a
              href="#portrait-order-form"
              className="px-7 py-3.5 rounded-full bg-white text-[#9A3412] font-bold text-sm shadow-xl hover:bg-amber-50 transition-all inline-block"
            >
              Order Your Portrait
            </a>
          </div>
        </div>
      </section>

      {/* PORTRAIT STYLES GRID */}
      <section className="space-y-8">
        <SectionHeader
          badge="Portrait Options"
          title="Explore Portrait Styles"
          subtitle="Select single, couple, multi-person family, or pet portrait options."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {styles.map(s => (
            <div
              key={s.title}
              onClick={() => setFormData({ ...formData, style: s.title })}
              className={`p-5 rounded-2xl border transition-all cursor-pointer text-center space-y-2 ${
                formData.style.includes(s.title)
                  ? 'bg-white border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20'
                  : 'bg-white border-[#E7E0D8] hover:border-[#C85A32]/50'
              }`}
            >
              <span className="text-3xl block">{s.icon}</span>
              <h3 className="font-serif text-base font-bold text-[#1C1917]">{s.title}</h3>
              <p className="text-[11px] text-[#78716C] leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TIERS SECTION */}
      <section className="space-y-8">
        <SectionHeader
          badge="Transparent Pricing"
          title="Portrait Pricing Packages"
          subtitle="Fixed prices starting at just ₹499 with no hidden fees."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 bg-white border transition-all relative flex flex-col justify-between ${
                tier.popular
                  ? 'border-[#C85A32] shadow-2xl ring-2 ring-[#C85A32]/20 scale-105 z-10'
                  : 'border-[#E7E0D8] shadow-sm hover:shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular Gift Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917]">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-[#78716C]">Starts at</span>
                    <span className="font-serif text-4xl font-extrabold text-[#C85A32]">₹{tier.price}</span>
                    <span className="text-xs text-[#78716C]">+</span>
                  </div>
                </div>

                <ul className="space-y-3 border-t border-[#E7E0D8] pt-6">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-[#44403C]">
                      <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="#portrait-order-form"
                  onClick={() => setFormData({ ...formData, style: tier.name })}
                  className={`w-full py-3.5 rounded-full font-bold text-xs text-center transition-all block ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white shadow-md'
                      : 'bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] hover:bg-[#C85A32] hover:text-white'
                  }`}
                >
                  Select Package
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="space-y-8">
        <SectionHeader
          badge="Completed Works"
          title="Portrait Gallery Showcase"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portraitArtworks.map(art => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* PORTRAIT ORDER FORM */}
      <section id="portrait-order-form" className="scroll-mt-28 bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] shadow-xl max-w-3xl mx-auto">
        <SectionHeader
          badge="Order Form"
          title="Order My Portrait"
          subtitle="Provide your contact info and upload your reference photo details."
        />

        {submittedRefId ? (
          <div className="text-center py-10 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">Portrait Order Placed!</h3>
            <p className="text-sm text-[#78716C]">Your Reference ID is <strong className="text-[#C85A32] font-mono">{submittedRefId}</strong></p>
            <p className="text-xs text-[#78716C] max-w-md mx-auto">We will contact you via WhatsApp/Email to verify reference photo clarity and confirm estimated delivery.</p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <a
                href={`https://wa.me/918788225420?text=Hi!%20I%20placed%20a%20portrait%20order%20with%20Ref%20ID%20${submittedRefId}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-medium text-xs shadow-md"
              >
                Share Reference Photo on WhatsApp
              </a>
              <button
                onClick={() => setSubmittedRefId(null)}
                className="px-6 py-3 rounded-full bg-[#E7E0D8] text-[#1C1917] font-medium text-xs"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Deshmukh"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
              </div>

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
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Number of People / Subjects</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.peopleCount}
                  onChange={(e) => setFormData({ ...formData, peopleCount: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Portrait Style</label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="Basic Pencil (₹499+)">Basic Pencil (₹499+)</option>
                  <option value="Detailed Charcoal (₹899+)">Detailed Charcoal (₹899+)</option>
                  <option value="Premium Family Canvas (₹1499+)">Premium Family Canvas (₹1499+)</option>
                  <option value="Pet Portrait">Pet Portrait</option>
                  <option value="Digital Oil Painting">Digital Oil Painting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Paper Dimensions</label>
                <select
                  value={formData.paperSize}
                  onChange={(e) => setFormData({ ...formData, paperSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="A4 (8.3 x 11.7 in)">A4 (8.3 x 11.7 in)</option>
                  <option value="A3 (11.7 x 16.5 in)">A3 (11.7 x 16.5 in) — Recommended</option>
                  <option value="A2 (16.5 x 23.4 in)">A2 (16.5 x 23.4 in) — Large Frame</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Target Delivery Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Reference Photo Link (Optional)</label>
                <input
                  type="text"
                  value={formData.referencePhoto}
                  onChange={(e) => setFormData({ ...formData, referencePhoto: e.target.value })}
                  placeholder="Paste Google Drive or photo link..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Special Instructions / Framing Notes</label>
              <textarea
                rows={3}
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Specify if this is an anniversary gift, or any background customization details..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              Order My Portrait
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
