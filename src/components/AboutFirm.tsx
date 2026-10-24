import React from 'react';
import { Shield, CheckCircle2, Building, ArrowRight } from 'lucide-react';

interface AboutFirmProps {
  onOpenConsultation: () => void;
}

export const AboutFirm: React.FC<AboutFirmProps> = ({ onOpenConsultation }) => {
  return (
    <>
      {/* 1. About Firm Detailed Overview */}
      <section id="about" className="py-12 sm:py-16 lg:py-24 bg-white border-b border-slate-200 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Image with Clean Executive Frame (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md group">
                <img
                  src="/assets/images/consultation_desk_1792759875356.jpg"
                  alt="Sajid Tax Consultant Executive Office Desk Opera House Mumbai"
                  className="w-full h-[260px] sm:h-[360px] lg:h-[440px] object-cover transition-transform duration-300 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#023e60]/85 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-4 rounded bg-white/95 backdrop-blur-xs border border-slate-200 shadow">
                  <div className="flex items-center gap-2 text-[#023e60] font-bold text-xs uppercase tracking-wider">
                    <Building className="w-4 h-4 text-[#63ac4c]" />
                    <span>Dedicated Advisory Practice</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    Serving individual taxpayers, MSMEs, and corporate enterprises across South Mumbai and Greater Maharashtra.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Overview */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block">
                  About Our Firm
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Trusted Financial & Tax Advisory{' '}
                  <span className="text-[#023e60]">in Mumbai</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
                  At <strong>Sajid Tax Consultant</strong>, our mission is to deliver transparent, compliant, and accurate tax and regulatory solutions. Based in Mumbai, we serve individual taxpayers, startups, professionals, and corporate enterprises across Maharashtra and India.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Our practice spans direct taxation (Income Tax Returns, TDS/TCS), indirect taxation (GST registration, returns, reconciliation), corporate business setup (Pvt Ltd, LLP, Partnership firms), and mandatory compliance filings with the Ministry of Corporate Affairs (ROC).
                </p>
              </div>

              {/* Pillars styled exactly like reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded bg-[#f8fafc] border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-[#023e60] font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#63ac4c]" />
                    <span>Statutory Rigor</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Precise voucher reconciliation against Form 26AS, AIS, and GSTR-2B to prevent mismatches or statutory notices.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#f8fafc] border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-[#023e60] font-semibold text-sm">
                    <Shield className="w-4 h-4 text-[#63ac4c]" />
                    <span>Complete Confidentiality</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enterprise-grade privacy standards protecting personal financial data and proprietary company records.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  Office Schedule: <span className="text-slate-800 font-semibold">Mon–Sat 11:00 AM – 7:00 PM IST</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Welcome Banner Section with gradient like jainanuragassociates.com */}
      <section className="bg-gradient-to-r from-[#10255a] to-[#0c5369] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#023e60] font-poppins text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Welcome to a Leading Tax Advisory & Compliance Firm in Mumbai
          </h2>
          <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto">
            Providing structured guidance across Income Tax, GST, Company Registration, and ROC Compliance. We combine statutory precision with personalized attention to ensure your business remains legally compliant and tax-optimized.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#023e60] bg-white hover:bg-slate-100 rounded transition-all shadow cursor-pointer"
            >
              Contact Our Advisors
            </button>
            <a
              href="tel:+917762067143"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded transition-all shadow"
            >
              Call +91 77620 67143
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
