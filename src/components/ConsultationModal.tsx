import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { InquiryFormData } from '../types';
import { SuccessCelebration } from './SuccessCelebration';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultServiceTitle = '',
}) => {
  const initialService =
    SERVICES_DATA.find((s) => s.title.toLowerCase() === defaultServiceTitle.toLowerCase())?.id ||
    SERVICES_DATA[0].id;

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: initialService,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultServiceTitle) {
      const match = SERVICES_DATA.find(
        (s) => s.title.toLowerCase() === defaultServiceTitle.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, serviceId: match.id }));
      }
    }
  }, [defaultServiceTitle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
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
      setSubmitted(true);
    }, 500);
  };

  const selectedServiceObj = SERVICES_DATA.find((s) => s.id === formData.serviceId);

  const whatsappMessage = `Hello Sajid Tax Consultant,\n\nI would like to consult regarding:\n- Service: ${selectedServiceObj?.title || formData.serviceId}\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}${formData.email ? `\n- Email: ${formData.email}` : ''}${formData.notes ? `\n- Notes: ${formData.notes}` : ''}`;
  const whatsappUrl = `https://wa.me/917762067143?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto font-poppins"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden my-8 animate-modalFastIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#023e60] text-white">
          <div>
            <h3 className="text-base font-bold">
              Consultation Advisory Request
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              Sajid Tax Consultant · Tax &amp; Corporate Advisory Desk
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-200 hover:text-white rounded cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="space-y-4">
              {/* Luxury Success Animation with Confetti & Animated Checkmark Seal */}
              <SuccessCelebration
                title="Inquiry Brief Prepared"
                subtitle={`Thank you, ${formData.fullName}. Your advisory file has been initialized. Connect directly with our partners via WhatsApp or expect a callback during active office hours.`}
              />

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Practice Service:</span>
                  <span className="font-bold text-[#023e60]">{selectedServiceObj?.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Contact Number:</span>
                  <span className="font-semibold text-slate-800">{formData.phone}</span>
                </div>
                {formData.notes && (
                  <div className="pt-1 border-t border-slate-200/60 text-slate-600">
                    <span className="font-medium text-slate-500">Brief Notes:</span> {formData.notes}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp (+91 77620 67143)</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-900 transition-colors text-center cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#023e60]"
                />
                {errors.fullName && <p className="text-[10px] text-rose-500 font-medium">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#023e60]"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email <span className="text-slate-400 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#023e60]"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Service of Interest <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#023e60]"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Brief Requirement Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details (e.g. pending ITR, new firm registration)..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-[#023e60] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] disabled:bg-slate-400 rounded transition-colors flex items-center justify-center gap-2 mt-2 shadow-xs cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
              </button>

              <div className="text-[10.5px] text-slate-500 text-center">
                Office Hours: Mon–Sat 11:00 AM – 7:00 PM IST (Sun Closed)
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
