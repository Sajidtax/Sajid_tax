import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareText, Compass, FolderCheck, CheckSquare2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Consultation & Query Analysis',
      detail: 'Connect with our advisory desk via phone, WhatsApp, or direct consultation to outline your tax, GST, or corporate incorporation requirements.',
      icon: MessageSquareText,
    },
    {
      step: '02',
      title: 'Statutory Roadmap Definition',
      detail: 'We evaluate your exact turnover, entity structure, or income heads to determine applicable sections, exemptions, and required government forms.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Voucher & Document Audit',
      detail: 'We gather and cross-audit your PAN, bank statements, invoices, Form 26AS, and AIS to eliminate mismatches before official portal submission.',
      icon: FolderCheck,
    },
    {
      step: '04',
      title: 'Portal Filing & Official Acknowledgment',
      detail: 'Your filings are accurately completed on official portals (Income Tax, GST, MCA) with digital signatures, generating verified acknowledgment receipts.',
      icon: CheckSquare2,
    },
  ];

  return (
    <section id="workflow" className="py-16 lg:py-24 bg-white border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block">
            Structured Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            How We Work With You
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-3 rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3">
            A transparent four-stage process designed to ensure regulatory accuracy, timely submissions, and complete peace of mind.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#f8fafc] rounded-lg p-5 sm:p-6 border border-slate-200 hover:border-[#023e60] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <span className="text-2xl font-bold text-[#023e60]">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white text-[#023e60] group-hover:bg-[#023e60] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs border border-slate-200">
                      <Icon className="w-5 h-5 text-[#63ac4c] group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#023e60] mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-[#63ac4c] pt-4 border-t border-slate-200 mt-5">
                  {idx === 3 ? 'Final Filing & Receipt' : 'Compliance Check'}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
