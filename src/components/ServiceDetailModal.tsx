import React, { useEffect } from 'react';
import { X, CheckCircle2, FileCheck, HelpCircle, MessageSquare, ArrowLeft, Globe } from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectRelated: (service: ServiceItem) => void;
  onConsult: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectRelated,
  onConsult,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const category = SERVICE_CATEGORIES.find((c) => c.id === service.categoryId);
  const relatedServices = SERVICES_DATA.filter((s) => service.relatedServiceIds.includes(s.id));

  // WhatsApp pre-filled link
  const whatsappText = encodeURIComponent(
    `Hello Sajid Tax Consultant, I would like to enquire about your services regarding: ${service.title}.`
  );
  const whatsappUrl = `https://wa.me/917762067143?text=${whatsappText}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto font-poppins"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-lg shadow-2xl overflow-hidden my-6 animate-modalFastIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#023e60] via-[#63ac4c] to-[#0c5369]" />

        {/* Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-[#023e60] hover:text-[#0c5369] font-semibold transition-colors mr-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="hidden sm:inline">Category:</span>
            <span className="text-[#023e60] font-bold">{category?.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6 bg-[#f8fafc]">
          
          {/* Service Hero with OpenGraph Visual Banner */}
          <div className="relative rounded overflow-hidden border border-slate-200 bg-white shadow-xs">
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <img
                src={service.ogImage}
                alt={service.seoTitle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#023e60] via-[#023e60]/60 to-transparent" />
            </div>

            <div className="p-6 -mt-16 relative z-10 space-y-3 bg-white border-t border-slate-100">
              {/* Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span className="text-[#023e60] font-bold">{category?.title}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-[#63ac4c] flex items-center gap-1 font-semibold">
                  <Globe className="w-3 h-3" />
                  <span>Statutory Advisory Profile</span>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-500">Corporate Advisory Desk</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#023e60] tracking-tight">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-[#63ac4c] font-semibold leading-relaxed">
                {service.tagline}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {service.description}
              </p>

              {/* Indexed Search Keywords */}
              <div className="pt-2 flex flex-wrap gap-1.5 items-center text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Keywords:</span>
                {service.keywords.map((kw, i) => (
                  <span key={i} className="text-slate-600">
                    {kw}{i < service.keywords.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Consultation Strip */}
          <div className="p-4 sm:p-5 rounded bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="text-xs font-bold text-[#023e60]">Need professional assistance with this filing?</div>
              <div className="text-xs text-slate-500 mt-0.5">Office hours: Mon–Sat 11:00 AM – 7:00 PM IST · Direct Advisory Support</div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  onConsult(service.title);
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#023e60] bg-slate-100 hover:bg-slate-200 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Enquire Now</span>
              </button>
            </div>
          </div>

          {/* Who Needs It */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#023e60]">
              Who This Service Is For
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {service.whoNeedsIt.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#63ac4c] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Practical Process */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#023e60]">
              Filing Workflow & Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#023e60] font-semibold">
                    <span>Step {idx + 1}</span>
                    <span className="text-[10px] text-slate-400 uppercase">Verification</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accurate Document Checklist */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#023e60]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#023e60]">
                Required Document Checklist
              </h3>
            </div>
            <div className="p-4 rounded bg-white border border-slate-200 shadow-2xs">
              <ul className="space-y-2 text-xs text-slate-700">
                {service.documentChecklist.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#63ac4c] shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relevant FAQs */}
          {service.faqs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#023e60]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#023e60]">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="space-y-2.5">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded bg-white border border-slate-200 shadow-2xs space-y-1 text-xs">
                    <div className="font-bold text-[#023e60]">{faq.question}</div>
                    <div className="text-slate-600 leading-relaxed font-normal">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Related Advisory Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedServices.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 text-left rounded bg-white hover:bg-[#eef5fa] border border-slate-200 hover:border-[#023e60] transition-colors group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-[#023e60] group-hover:text-[#0c5369] transition-colors truncate">
                      {rel.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-normal">
                      {rel.tagline}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Sajid Tax Consultant · Statutory Compliance &amp; Advisory Desk
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onConsult(service.title);
              }}
              className="w-full sm:w-auto px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded transition-colors shadow-xs cursor-pointer"
            >
              Consult On This Service
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
