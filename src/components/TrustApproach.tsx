import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, HeartHandshake, Award, Clock, Users } from 'lucide-react';

export const TrustApproach: React.FC = () => {
  const values = [
    {
      title: 'Commitment',
      description: 'Dedicated to upholding statutory compliance, deadlines, and client interests with unwavering diligence.',
      icon: Target,
    },
    {
      title: 'Integrity',
      description: 'Maintaining uncompromising honesty, ethical practices, and strict confidentiality in every advisory engagement.',
      icon: ShieldCheck,
    },
    {
      title: 'Accountability',
      description: 'Taking full ownership of filing accuracy, source voucher reconciliations, and timely follow-ups.',
      icon: HeartHandshake,
    },
    {
      title: 'Quality',
      description: 'Zero tolerance for document discrepancies. Every return and submission is thoroughly cross-audited.',
      icon: Award,
    },
    {
      title: 'Respect',
      description: 'Treating every taxpayer, entrepreneur, and business owner with equal dignity, empathy, and professional attention.',
      icon: Users,
    },
    {
      title: 'Time Value',
      description: 'Ensuring proactive calendar management so that advance tax, GST, and ROC filings are completed well before due dates.',
      icon: Clock,
    },
  ];

  return (
    <section id="core-values" className="py-16 lg:py-24 bg-[#f8fafc] border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header styled exactly like reference: text-center blue */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block mb-2">
            Principles We Stand By
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            Our Core Values
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
            Our professional services are built on ethical advisory, deep statutory competence, and dependable client relationships.
          </p>
        </div>

        {/* 6 Core Values Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200/90 hover:border-[#63ac4c] card-luxury-hover shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-full bg-[#eef5fa] text-[#023e60] group-hover:bg-[#023e60] group-hover:text-white flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-5 h-5 text-[#63ac4c] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#023e60] mb-1.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#63ac4c]">
                  <span>Pillar {idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#63ac4c]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
