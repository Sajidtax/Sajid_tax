import React from 'react';

export const HeroTicker: React.FC = () => {
  const items = [
    'INCOME TAX RETURN (ITR)',
    'GST REGISTRATION & RETURNS',
    'PAN SERVICES',
    'PRIVATE LIMITED INCORPORATION',
    'LLP FORMATION',
    'UDYAM MSME',
    'MUMBAI GUMASTA LICENSE',
    'ACCOUNTING & BOOKKEEPING',
    'ROC ANNUAL COMPLIANCE',
    'TDS & TCS FILINGS',
    'FSSAI FOOD SAFETY',
    'CLASS 3 DIGITAL SIGNATURE (DSC)',
    'TRADEMARK ASSISTANCE',
    'IMPORT EXPORT CODE (IEC)',
  ];

  return (
    <div className="relative z-20 overflow-hidden bg-gradient-to-r from-[#10255a] via-[#023e60] to-[#0c5369] text-white py-3 border-y border-[#023e60] shadow-inner font-poppins">
      {/* Decorative gradient masks for soft edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#10255a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0c5369] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {/* Sequence 1 */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide text-white/90">
          {items.map((item, idx) => (
            <React.Fragment key={`ticker-1-${idx}`}>
              <span className="hover:text-[#63ac4c] transition-colors">{item}</span>
              <span className="text-[#63ac4c] font-bold">·</span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate sequence for seamless loop */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide text-white/90 pl-6">
          {items.map((item, idx) => (
            <React.Fragment key={`ticker-2-${idx}`}>
              <span className="hover:text-[#63ac4c] transition-colors">{item}</span>
              <span className="text-[#63ac4c] font-bold">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
