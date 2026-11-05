import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, MapPin, Clock } from 'lucide-react';
import { getISTStatus } from '../utils/istTime';

interface HeroProps {
  onOpenConsultation: () => void;
}

interface HeroSlide {
  id: string;
  greenHeading: string;
  blueHeading: string;
  bullets?: string;
  subTitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    greenHeading: 'Leading Tax and',
    blueHeading: 'Advisory Firm in Mumbai',
    subTitle: 'Unparalleled Excellence in Tax and Advisory Services',
    bullets: '• Quality Services • Best Solutions • Best Results',
    description:
      'Comprehensive tax consulting, GST compliance, business registration, and corporate advisory services designed to simplify regulatory requirements.',
    imageSrc: '/assets/images/hero-tax-illustration.webp',
    imageAlt: 'Leading Tax and Advisory Firm in Mumbai — Sajid Tax Consultant',
    width: 860,
    height: 740,
  },
  {
    id: 'slide-2',
    greenHeading: 'Partnering for Your',
    blueHeading: 'Financial Success',
    bullets: '• Direct Tax • GST Returns • MCA Corporate Governance',
    description:
      'We are committed to delivering high-quality services to meet all your possible needs to empower your financial journey.',
    imageSrc: '/assets/aistudio/hero_slide_2_clean.webp',
    imageAlt: 'Partnering for Your Financial Success — Sajid Tax Consultant Mumbai',
    width: 970,
    height: 700,
  },
  {
    id: 'slide-3',
    greenHeading: 'Committed to',
    blueHeading: 'Excellence & Compliance',
    bullets: '• Statutory Rigor • Seamless Audit • Complete Confidentiality',
    description:
      'One stop destination to provide unified and agile statutory solutions to manage all your business complexities and regulatory compliances.',
    imageSrc: '/assets/images/consultation_desk_1792759875356.webp',
    imageAlt: 'Sajid Tax Consultant Executive Consultation Desk Opera House Mumbai',
    width: 1200,
    height: 896,
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const istStatus = getISTStatus();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-change image every 3 seconds (2.5 - 3 sec requirement)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const active = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative bg-gradient-to-r from-white via-[#fcfdfd] to-[#f4f7f9] border-b border-slate-200 overflow-hidden font-poppins select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge Slide Navigation Arrows with accessible 48px touch targets */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-14 bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors cursor-pointer rounded-r min-w-[48px] min-h-[48px]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-14 bg-black/25 hover:bg-black/45 text-white flex items-center justify-center transition-colors cursor-pointer rounded-l min-w-[48px] min-h-[48px]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Left Column: Typography, Bullets, Subtitle & Action Buttons (Instant paint, no animation delay) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 z-10">
            
            {/* Tag / Eyebrow with WCAG 2.1 AA compliant #111827 text */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#f1f5f9] border border-slate-300 text-[11px] sm:text-xs font-bold text-[#111827]">
              <span className="w-2 h-2 rounded-full bg-[#15803d]" />
              <span>Chartered Tax &amp; Corporate Advisory Desk</span>
            </div>

            {/* Main Headline */}
            <h1 className="space-y-0.5">
              <span className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#15803d] leading-[1.15] block tracking-tight">
                {active.greenHeading}
              </span>
              <span className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#023e60] leading-[1.15] block tracking-tight">
                {active.blueHeading}
              </span>
            </h1>

            {/* Bullets (e.g. • Quality Services • Best Solutions • Best Results) */}
            {active.bullets && (
              <div className="text-xs sm:text-sm font-semibold text-[#111827] tracking-wide flex flex-wrap gap-x-2 gap-y-1">
                {active.bullets}
              </div>
            )}

            {/* Optional Subtitle */}
            {active.subTitle && (
              <div className="text-sm sm:text-base font-bold text-[#023e60]">
                {active.subTitle}
              </div>
            )}

            {/* Description with high contrast #1f2937 text */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-[#1f2937] font-normal leading-relaxed max-w-xl">
              {active.description}
            </p>

            {/* CTAs with WCAG 2.1 AA 4.5:1 Compliant Contrast (White on #15803d dark green / #023e60) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#023e60] hover:bg-[#0c5369] rounded transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[48px] min-w-[48px]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#15803d] hover:bg-[#166534] rounded transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[48px] min-w-[48px]"
              >
                <span>Our Services</span>
              </a>

              <a
                href="tel:+917782067143"
                aria-label="Call +91 77820 67143"
                className="px-4 py-3 text-xs sm:text-sm font-bold text-[#111827] hover:text-[#023e60] bg-white border border-slate-300 rounded transition-colors flex items-center justify-center gap-2 min-h-[48px] min-w-[48px]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#15803d]" />
                <span>+91 77820 67143</span>
              </a>
            </div>

            {/* Office Status strip with high contrast Closed/Open pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#1f2937]">
              <div className="flex items-center gap-1.5 font-medium text-[#111827]">
                <Clock className="w-3.5 h-3.5 text-[#023e60] shrink-0" />
                <span>Mon–Sat: 11:00 AM – 7:00 PM IST</span>
              </div>
              <span className="text-slate-400">·</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`w-2 h-2 rounded-full ${istStatus.isOpen ? 'bg-[#15803d] animate-pulse' : 'bg-red-600'}`} />
                <span className={istStatus.isOpen ? 'text-[#15803d]' : 'text-[#991b1b]'}>
                  {istStatus.statusText}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Illustration / Graphic with WebP, explicit width/height, fetchpriority (No animation delay) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none h-[280px] sm:h-[380px] lg:h-[460px] flex items-center justify-center">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center ${
                    idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {idx === 0 ? (
                    <img
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-full object-contain max-h-[440px] drop-shadow-sm"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  ) : (
                    <img
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      width={slide.width}
                      height={slide.height}
                      className="w-full h-full object-contain max-h-[440px] drop-shadow-sm"
                      loading="lazy"
                      fetchPriority="auto"
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Indicator Dots with accessible 48px touch targets */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1" role="tablist" aria-label="Hero carousel pagination">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className="p-3 cursor-pointer flex items-center justify-center min-w-[48px] min-h-[48px]"
            aria-label={`Slide ${idx + 1}: ${slide.blueHeading}`}
            aria-selected={idx === currentSlide}
            role="tab"
          >
            <span
              className={`block transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-7 h-2.5 bg-[#023e60]'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
