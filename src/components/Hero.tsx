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
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    greenHeading: 'Partnering for Your',
    blueHeading: 'Financial Success',
    bullets: '• Quality Services • Best Solutions • Best Results',
    description:
      'We are committed to delivering high-quality services to meet all your possible needs to empower your financial journey.',
    imageSrc: '/assets/aistudio/hero_slide_1_clean.png',
    imageAlt: 'Partnering for Your Financial Success — Sajid Tax Consultant Mumbai',
  },
  {
    id: 'slide-2',
    greenHeading: 'Leading Tax and',
    blueHeading: 'Advisory Firm in Mumbai',
    subTitle: 'Unparalleled Excellence in Tax and Advisory Services',
    description:
      'Comprehensive tax consulting, GST compliance, business registration, and corporate advisory services designed to simplify regulatory requirements.',
    imageSrc: '/assets/aistudio/hero_slide_2_clean.png',
    imageAlt: 'Leading Tax and Advisory Firm in Mumbai — Sajid Tax Consultant',
  },
  {
    id: 'slide-3',
    greenHeading: 'Committed to',
    blueHeading: 'Excellence & Compliance',
    bullets: '• Direct Tax • GST Returns • MCA Corporate Governance',
    description:
      'One stop destination to provide unified and agile statutory solutions to manage all your business complexities and regulatory compliances.',
    imageSrc: '/src/assets/images/consultation_desk_1792759875356.jpg',
    imageAlt: 'Sajid Tax Consultant Executive Consultation Desk Opera House Mumbai',
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
      {/* Edge Slide Navigation Arrows (Matches reference screenshots) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-12 sm:w-10 sm:h-14 bg-black/15 hover:bg-black/35 text-white flex items-center justify-center transition-colors cursor-pointer rounded-r"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-12 sm:w-10 sm:h-14 bg-black/15 hover:bg-black/35 text-white flex items-center justify-center transition-colors cursor-pointer rounded-l"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Left Column: Typography, Bullets, Subtitle & Action Buttons */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 z-10 transition-all duration-500">
            
            {/* Tag / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#eef5fa] border border-[#cadbe8] text-[11px] sm:text-xs font-semibold text-[#023e60]">
              <span className="w-2 h-2 rounded-full bg-[#63ac4c]" />
              <span>Chartered Tax &amp; Corporate Advisory Desk</span>
            </div>

            {/* Main Headline matching jainanuragassociates reference */}
            <div className="space-y-0.5">
              <span className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#63ac4c] leading-[1.15] block tracking-tight">
                {active.greenHeading}
              </span>
              <span className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#023e60] leading-[1.15] block tracking-tight">
                {active.blueHeading}
              </span>
            </div>

            {/* Bullets (e.g. • Quality Services • Best Solutions • Best Results) */}
            {active.bullets && (
              <div className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide flex flex-wrap gap-x-2 gap-y-1">
                {active.bullets}
              </div>
            )}

            {/* Optional Subtitle */}
            {active.subTitle && (
              <div className="text-sm sm:text-base font-semibold text-[#023e60]">
                {active.subTitle}
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-slate-600 font-normal leading-relaxed max-w-xl">
              {active.description}
            </p>

            {/* CTAs matching reference: Get Started button */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#023e60] hover:bg-[#0c5369] rounded transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#63ac4c] hover:bg-[#52993d] rounded transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Our Services</span>
              </a>

              <a
                href="tel:+917762067143"
                className="px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#023e60] bg-white border border-slate-300 rounded transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#63ac4c]" />
                <span>+91 77620 67143</span>
              </a>
            </div>

            {/* Office Status strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Clock className="w-3.5 h-3.5 text-[#023e60] shrink-0" />
                <span>Mon–Sat: 11:00 AM – 7:00 PM IST</span>
              </div>
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5 font-semibold text-[#023e60]">
                <span className={`w-2 h-2 rounded-full ${istStatus.isOpen ? 'bg-[#63ac4c] animate-pulse' : 'bg-slate-400'}`} />
                <span>{istStatus.statusText}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Illustration / Graphic that changes every 3s */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none h-[280px] sm:h-[380px] lg:h-[460px] flex items-center justify-center transition-all duration-700">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="w-full h-full object-contain max-h-[440px] drop-shadow-sm"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Indicator Dots (Matching reference screenshot bottom bar) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-7 h-2.5 bg-[#023e60]'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
