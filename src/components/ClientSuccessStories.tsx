import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck, Building2, MapPin, Award } from 'lucide-react';

interface SuccessStory {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  category: string;
  headline: string;
  testimonial: string;
  metric: string;
  metricLabel: string;
  yearEstablished: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'zaveri-gems',
    clientName: 'Rajesh K. Mehta',
    role: 'Managing Director',
    company: 'Mehta Jewels & Exports Pvt Ltd',
    location: 'Zaveri Bazaar, Kalbadevi, Mumbai',
    category: 'GST Scrutiny & Export Refunds',
    headline: 'Unlocked ₹48 Lakhs in Delayed GST Export Refunds in 21 Days',
    testimonial:
      'Our export refund claims were stalled under multi-jurisdiction scrutiny notices for over a year. The advisory desk methodically re-filed our reconciliation statements, represented us before the tax commissionerate, and secured our entire capital without a single litigation hurdle.',
    metric: '₹48.2 Lakhs',
    metricLabel: 'Capital Unlocked',
    yearEstablished: 'Client since 2018',
  },
  {
    id: 'bkc-fintech',
    clientName: 'Ayesha V. Singhania',
    role: 'Co-Founder & Chief Financial Officer',
    company: 'FinStack Technologies LLP',
    location: 'Bandra-Kurla Complex (BKC), Mumbai',
    category: 'Corporate Structuring & ROC',
    headline: 'Flawless Fast-Track Private Ltd Conversion & ESOP Structuring',
    testimonial:
      'When preparing for our institutional institutional funding round, we needed seamless LLP-to-Pvt Ltd corporate restructuring and FDI/FEMA filings. Sajid Tax Consultant completed the entire statutory transition in record time with zero compliance queries from investors.',
    metric: '100% On-Time',
    metricLabel: 'Statutory Clearance',
    yearEstablished: 'Client since 2021',
  },
  {
    id: 'lower-parel-hospitality',
    clientName: 'Farhan S. Merchant',
    role: 'Executive Director',
    company: 'Urban Fork Hospitality Group',
    location: 'Lower Parel / Worli, Mumbai',
    category: 'Multi-Unit GST & Tax Audit',
    headline: 'Consolidated Compliance Across 8 Outlets with Zero Penalties',
    testimonial:
      'Managing vendor input tax credits and monthly GST filings across multiple restaurant kitchens in Mumbai used to be an administrative nightmare. Their centralized monthly review system eliminated mismatch notices and delivered complete peace of mind.',
    metric: 'Zero Notices',
    metricLabel: 'Over 4 Consecutive Years',
    yearEstablished: 'Client since 2019',
  },
  {
    id: 'fort-logistics',
    clientName: 'Vikramaditya Rao',
    role: 'Head of Accounts & International Trade',
    company: 'Orient Gateway Logistics Corp',
    location: 'Fort Commercial Hub, Mumbai',
    category: 'International Tax & Transfer Pricing',
    headline: 'Cross-Border TDS & Transfer Pricing Handled with Supreme Precision',
    testimonial:
      'Handling freight-forwarding taxation and 15CA/15CB foreign remittance certifications requires razor-sharp regulatory expertise. Their partners provide proactive, dependable guidance before each overseas audit milestone.',
    metric: '15CA/CB Fast Desk',
    metricLabel: 'Same-Day Dispatch',
    yearEstablished: 'Client since 2016',
  },
  {
    id: 'andheri-manufacturing',
    clientName: 'Pradeep J. Chawla',
    role: 'Proprietor',
    company: 'Precision Tooling & Components',
    location: 'MIDC Andheri East, Mumbai',
    category: 'Income Tax Scrutiny & Assessment',
    headline: 'Notice Resolved Under Section 148A with Complete Tax Dismissal',
    testimonial:
      'Receiving a high-value reassessment notice from the IT department was daunting. The desk prepared comprehensive forensic cash-flow trails and legal responses that resulted in an unconditional closure of the scrutiny order.',
    metric: '100% Dismissal',
    metricLabel: 'Unconditional Closure',
    yearEstablished: 'Client since 2020',
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.35, ease: 'easeOut' },
      scale: { duration: 0.35, ease: 'easeOut' },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.98,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25, ease: 'easeIn' },
    },
  }),
};

export const ClientSuccessStories: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const activeIndex = ((page % SUCCESS_STORIES.length) + SUCCESS_STORIES.length) % SUCCESS_STORIES.length;
  const currentStory = SUCCESS_STORIES[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const goToSlide = (index: number) => {
    const diff = index - activeIndex;
    if (diff !== 0) {
      setPage(([prevPage]) => [prevPage + diff, diff > 0 ? 1 : -1]);
    }
  };

  // Auto advance every 6 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Client Testimonials and Success Stories"
    >
      {/* Decorative luxury architectural background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#023e60]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#023e60]/10 border border-[#023e60]/20 text-[#023e60] text-xs font-semibold tracking-wide uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-[#023e60]" />
            <span>Proven Track Record • Mumbai Commercial Hubs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Trusted by Enterprises Across Mumbai
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Real outcomes delivered for exporters, high-growth startups, hospitality chains, and industrial businesses navigating Indian tax, GST, and corporate laws.
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Framer Motion Carousel Stage */}
          <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/90 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Luxury Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#023e60] via-emerald-600 to-[#023e60]" />

                {/* Background Watermark Quote */}
                <Quote
                  className="absolute right-4 bottom-4 w-32 h-32 text-slate-100/70 pointer-events-none -rotate-6"
                  aria-hidden="true"
                />

                {/* Top Meta: Category & Rating & Metric */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {currentStory.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                      {currentStory.yearEstablished}
                    </span>
                  </div>

                  {/* Highlight Metric Badge */}
                  <div className="flex items-baseline gap-1.5 bg-[#023e60]/5 border border-[#023e60]/15 px-3 py-1.5 rounded-lg">
                    <span className="text-xs text-slate-600 font-medium">{currentStory.metricLabel}:</span>
                    <span className="text-sm font-bold text-[#023e60]">{currentStory.metric}</span>
                  </div>
                </div>

                {/* Headline & Testimonial Quote */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-700 ml-1.5">5.0 Verified Outcome</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3">
                    &ldquo;{currentStory.headline}&rdquo;
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {currentStory.testimonial}
                  </p>
                </div>

                {/* Author & Business Identification */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#023e60] to-emerald-700 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#023e60]/20">
                      {currentStory.clientName
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                        {currentStory.clientName}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                          {currentStory.role}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{currentStory.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200/80">
                    <MapPin className="w-3.5 h-3.5 text-[#023e60] shrink-0" />
                    <span>{currentStory.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Bar */}
          <div className="mt-8 flex items-center justify-between px-2">
            {/* Dots Pagination */}
            <div className="flex items-center gap-2">
              {SUCCESS_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full h-2.5 focus:outline-none focus:ring-2 focus:ring-[#023e60] focus:ring-offset-2 ${
                    idx === activeIndex
                      ? 'w-8 bg-[#023e60]'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1} of ${SUCCESS_STORIES.length}: ${story.company}`}
                  aria-current={idx === activeIndex ? 'true' : undefined}
                />
              ))}
              <span className="text-xs text-slate-600 ml-2 font-medium">
                {activeIndex + 1} / {SUCCESS_STORIES.length}
              </span>
            </div>

            {/* Left / Right Luxury Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="btn-luxury-tab w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#023e60] hover:border-[#023e60]/50 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#023e60]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="btn-luxury-tab w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#023e60] hover:border-[#023e60]/50 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#023e60]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Trust Stat Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-lg sm:text-xl font-bold text-[#023e60]">10+ Years</div>
              <div className="text-xs text-slate-500 font-medium">Mumbai Presence</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-lg sm:text-xl font-bold text-[#023e60]">₹10Cr+</div>
              <div className="text-xs text-slate-500 font-medium">Refunds & Filing Value</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-lg sm:text-xl font-bold text-[#023e60]">99.8%</div>
              <div className="text-xs text-slate-500 font-medium">Statutory Adherence</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="text-lg sm:text-xl font-bold text-[#023e60]">500+</div>
              <div className="text-xs text-slate-500 font-medium">Active Corporate Files</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
