import React from 'react';
import { Check, ShieldCheck, MapPin } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Individualized Professional Review',
      desc: 'No generic automated bulk shortcuts. Every computation is scrutinized against source documents, Form 26AS, AIS, and GSTR-2B data.',
    },
    {
      title: 'Deep Regulatory Expertise',
      desc: 'Extensive hands-on knowledge of Mumbai commercial trade practices, MCGM Gumasta bylaws, MCA SPICe+ protocols, and state tax rules.',
    },
    {
      title: 'Preventive Compliance Orientation',
      desc: 'We resolve input tax credit gaps and TDS deduction mismatches well before deadlines, safeguarding you against late fees and tax notices.',
    },
    {
      title: 'Strict Confidentiality Protocols',
      desc: 'Your PAN, financial ledgers, bank transactions, and corporate documents are protected with high-security handling and absolute confidentiality.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#f8fafc] border-b border-slate-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Mumbai Commercial District Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md group">
              <img
                src="/src/assets/images/mumbai_business_district_1792759875538.jpg"
                alt="Mumbai business and financial commercial district Opera House"
                className="w-full h-[260px] sm:h-[360px] lg:h-[460px] object-cover transition-transform duration-300 group-hover:scale-102"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#023e60]/90 via-[#023e60]/30 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-4 rounded bg-white/95 backdrop-blur-xs border border-slate-200 shadow text-xs">
                <div className="flex items-center gap-2 text-[#023e60] font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#63ac4c]" />
                  <span>Statutory Advisory Standards</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Ensuring verified filings, clean reconciliations, and timely corporate governance without compliance penalties.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Explanations (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block">
                Why Choose Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Precision Over Promises.{' '}
                <span className="text-[#023e60]">Clarity Over Complexity.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                In statutory tax, GST, and corporate governance, attention to detail prevents unforeseen interest, blocked input tax credits, or regulatory notices. We emphasize verified documentation and transparent communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {points.map((pt, idx) => (
                <div key={idx} className="p-4 rounded bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#f0f7f2] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#63ac4c]" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#023e60]">
                      {pt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-600 shadow-2xs">
              <span className="flex items-center gap-2 text-slate-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#63ac4c]" />
                <span>Statutory Compliance Advisory</span>
              </span>
              <span className="text-[#023e60] font-semibold">
                Mumbai · Maharashtra
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
