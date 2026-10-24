import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { OfficeHoursCard } from './OfficeHoursCard';
import { SuccessCelebration } from './SuccessCelebration';
import { SERVICES_DATA } from '../data/servicesData';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: preselectedService || 'income-tax-itr',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryFormData | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format, or leave empty.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
    }, 600);
  };

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === (submittedData?.serviceId || formData.serviceId));

  const buildWhatsAppUrl = (data: InquiryFormData) => {
    const sName = SERVICES_DATA.find((s) => s.id === data.serviceId)?.title || data.serviceId;
    const msg = `Hello Sajid Tax Consultant,\n\nI would like to consult regarding:\n- Service: ${sName}\n- Name: ${data.fullName}\n- Phone: ${data.phone}${data.email ? `\n- Email: ${data.email}` : ''}${data.notes ? `\n- Requirement: ${data.notes}` : ''}`;
    return `https://wa.me/917762067143?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching jainanuragassociates.com: Do You Have Any Queries To Discuss? Let's Talk */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block mb-2">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            Do You Have Any Queries To Discuss? <span className="text-[#63ac4c]">Let’s Talk.</span>
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
            Visit our physical office at Opera House, Mumbai during working hours, or send your consultation request below for direct professional assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office Details & Live Opening Hours Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Opening Hours Card Component (IST) */}
            <OfficeHoursCard variant="detailed" />

            {/* Address & Communication Card */}
            <div className="rounded-lg border border-slate-200 bg-[#f8fafc] p-6 space-y-5 shadow-xs">
              
              {/* Physical Office Address */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#023e60]">
                  <MapPin className="w-4 h-4 shrink-0 text-[#63ac4c]" />
                  <span>Physical Office Address</span>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed pl-6">
                  Office No. 114A, 2nd Floor, Paras Juice Building, Tata Road No. 2, Near Prasad Chamber, Opera House, Mumbai – 400004, Maharashtra, India.
                </div>
                <div className="pl-6 pt-1">
                  <a
                    href="https://maps.google.com/?q=Paras+Juice+Building+Tata+Road+No+2+Opera+House+Mumbai+400004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#023e60] hover:text-[#63ac4c] font-semibold transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Communication Points */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#023e60] flex items-center justify-center shrink-0 border border-slate-200">
                    <Phone className="w-4 h-4 text-[#63ac4c]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Telephone / Direct Mobile</div>
                    <a
                      href="tel:+917762067143"
                      className="text-xs font-semibold text-[#023e60] hover:text-[#63ac4c] transition-colors"
                    >
                      +91 77620 67143
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#023e60] flex items-center justify-center shrink-0 border border-slate-200">
                    <Mail className="w-4 h-4 text-[#63ac4c]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Official Correspondence</div>
                    <a
                      href="mailto:workwithsajid@zohomail.in"
                      className="text-xs font-semibold text-[#023e60] hover:text-[#63ac4c] transition-colors"
                    >
                      workwithsajid@zohomail.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f7f2] text-[#63ac4c] flex items-center justify-center shrink-0 border border-emerald-200">
                    <MessageSquare className="w-4 h-4 text-[#63ac4c]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Instant Consultation Desk</div>
                    <a
                      href="https://wa.me/917762067143?text=Hello%20Sajid%20Tax%20Consultant,%20I%20would%20like%20to%20consult%20regarding%20tax%20and%20compliance%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#63ac4c] hover:underline"
                    >
                      WhatsApp Message (+91 77620 67143)
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Clean Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-5 mb-6">
                <h3 className="text-xl font-bold text-[#023e60]">
                  Send Your Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below. Our senior tax consultant will review and respond with statutory guidance.
                </p>
              </div>

              {submittedData ? (
                <div className="py-4 space-y-5 text-center">
                  {/* Luxury Success Animation with Confetti & Animated Checkmark Seal */}
                  <SuccessCelebration
                    title="Inquiry Received Successfully"
                    subtitle={`Thank you, ${submittedData.fullName}. Our senior desk has registered your brief regarding ${selectedServiceObj?.title || submittedData.serviceId}.`}
                  />

                  <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 text-left text-xs space-y-1.5 max-w-md mx-auto shadow-2xs">
                    <div><span className="text-slate-500">Contact Number:</span> <span className="font-semibold">{submittedData.phone}</span></div>
                    {submittedData.email && <div><span className="text-slate-500">Email:</span> <span className="font-semibold">{submittedData.email}</span></div>}
                    <div><span className="text-slate-500">Practice Area:</span> <span className="font-semibold text-[#023e60]">{selectedServiceObj?.title}</span></div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppUrl(submittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmittedData(null)}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-[#023e60] bg-slate-100 hover:bg-slate-200 rounded"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-[#023e60]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98200 12345"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-[#023e60]'
                        }`}
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@company.in"
                        className={`w-full px-3.5 py-2.5 text-xs bg-white border rounded text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 focus:border-[#023e60]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Service of Interest <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-[#023e60]"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.id}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Query or Business Profile <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Mention turnover, number of directors, or specific filing questions..."
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#023e60] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-500">
                      Your information is protected under strict confidentiality.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
