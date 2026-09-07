import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/SectionHeader';
import type { BookingSlot, CategoryType } from '../types';

export const BookingPage: React.FC = () => {
  const { addBooking, isSlotBooked } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    service: 'Tattoo' as CategoryType | 'General Consultation',
    date: todayStr,
    timeSlot: '10:00 AM' as BookingSlot,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const availableTimeSlots: BookingSlot[] = [
    '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) errors.customerName = 'Name is required';
    if (!formData.customerEmail.trim() || !/\S+@\S+\.\S+/.test(formData.customerEmail)) errors.customerEmail = 'Valid email required';
    if (!formData.customerPhone.trim() || formData.customerPhone.length < 10) errors.customerPhone = 'Valid phone required';
    if (!formData.date) errors.date = 'Please select an appointment date';

    // Check if slot is already booked
    if (isSlotBooked(formData.date, formData.timeSlot)) {
      errors.timeSlot = 'This time slot is already booked for the selected date. Please choose another slot.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refId = addBooking({
      service: formData.service,
      date: formData.date,
      timeSlot: formData.timeSlot,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      notes: formData.notes,
    });

    setSubmittedRefId(refId);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      <SectionHeader 
        badge="Studio Appointment"
        title="Book Studio Consultation"
        subtitle="Schedule an in-person consultation or live ink session at Gayatri Art Studio, Deccan Gymkhana, Pune."
      />

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E7E0D8] shadow-2xl max-w-3xl mx-auto">
        {submittedRefId ? (
          <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-wider">Booking Reserved</span>
              <h3 className="font-serif text-3xl font-bold text-[#1C1917]">Appointment Reserved!</h3>
              <p className="text-sm text-[#78716C]">Your Booking Reference ID is:</p>
              <div className="inline-block px-6 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] font-mono text-2xl font-extrabold text-[#C85A32]">
                {submittedRefId}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D8] text-xs text-[#44403C] space-y-2 max-w-md mx-auto text-left">
              <p className="font-bold text-[#1C1917]">Appointment Summary:</p>
              <p>• <strong>Service:</strong> {formData.service}</p>
              <p>• <strong>Date & Time:</strong> {formData.date} at {formData.timeSlot}</p>
              <p>• <strong>Client Name:</strong> {formData.customerName}</p>
              <p>• <strong>Location:</strong> Gayatri Art Studio, Deccan Gymkhana, Pune</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/918788225420?text=Hi!%20I%20have%20booked%20a%20studio%20appointment%20with%20Ref%20ID%20${submittedRefId}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-md"
              >
                Confirm Booking on WhatsApp
              </a>

              <button
                onClick={() => setSubmittedRefId(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF8F5] border border-[#E7E0D8] text-[#1C1917] font-semibold text-xs"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917] border-b border-[#E7E0D8] pb-4">
              Appointment Booking Form
            </h3>

            {/* Step 1: Service Selection */}
            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">1. Select Service *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {['Tattoo', 'Blood Painting', 'Rangoli', 'Sketch', 'Portrait', 'General Consultation'].map(srv => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: srv as any })}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.service === srv
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white border-transparent shadow-md'
                        : 'bg-[#FAF8F5] border-[#E7E0D8] text-[#44403C] hover:border-[#C85A32]'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">2. Preferred Date *</label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                />
                {formErrors.date && <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">3. Preferred Time Slot *</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => {
                    const booked = isSlotBooked(formData.date, slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                          booked
                            ? 'bg-stone-200 text-stone-400 border-stone-300 cursor-not-allowed line-through'
                            : formData.timeSlot === slot
                            ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm'
                            : 'bg-white border-[#E7E0D8] text-[#44403C] hover:border-[#1C1917]'
                        }`}
                      >
                        {slot} {booked ? '(Full)' : ''}
                      </button>
                    );
                  })}
                </div>
                {formErrors.timeSlot && <p className="text-xs text-red-500 mt-1">{formErrors.timeSlot}</p>}
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="pt-2 border-t border-[#E7E0D8] space-y-4">
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider">4. Contact Information</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                  />
                  {formErrors.customerName && <p className="text-xs text-red-500 mt-1">{formErrors.customerName}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                  />
                  {formErrors.customerPhone && <p className="text-xs text-red-500 mt-1">{formErrors.customerPhone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="Email Address *"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
                  />
                  {formErrors.customerEmail && <p className="text-xs text-red-500 mt-1">{formErrors.customerEmail}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">Notes / Consultation Topics (Optional)</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any specific tattoo placement ideas, size expectations or reference photos..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E0D8] text-sm text-[#1C1917] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D97706] to-[#C85A32] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              Confirm Studio Appointment
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
