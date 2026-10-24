import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Building2, Calculator, ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICES_DATA } from '../data/servicesData';
import { ServiceCategoryId, ServiceItem } from '../types';

interface SignatureServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onExploreCategory: (catId: ServiceCategoryId) => void;
}

export const SignatureServices: React.FC<SignatureServicesProps> = ({
  onSelectService,
  onExploreCategory,
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategoryId>('income-tax-gst');

  const categoryIcons: Record<ServiceCategoryId, React.ComponentType<{ className?: string }>> = {
    'income-tax-gst': FileText,
    'business-registration': Building2,
    'accounting-compliance': Calculator,
    'other-services': ShieldCheck,
  };

  const activeCategory = SERVICE_CATEGORIES.find((c) => c.id === activeTab) || SERVICE_CATEGORIES[0];
  const activeCategoryServices = SERVICES_DATA.filter((s) => s.categoryId === activeTab);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#022c22] text-white border-b border-emerald-900/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300 font-sans-ui">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            <span>Core Practice Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold text-white tracking-tight">
            Comprehensive Statutory & Advisory Services
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 font-light leading-relaxed">
            Delivering thorough statutory support across corporate setup, ongoing direct and indirect taxation, bookkeeping, and municipal licensing.
          </p>
        </motion.div>

        {/* Category Navigation Tabs (Segmented Control) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-1.5 bg-emerald-950/80 border border-emerald-800/80 rounded-2xl mb-12 backdrop-blur-md"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center justify-center lg:justify-start gap-2.5 px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md border border-emerald-600/80'
                    : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-lime-300' : 'text-emerald-400'}`} />
                <span className="whitespace-nowrap">{cat.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Selected Category Feature Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 lg:p-8 rounded-3xl bg-[#03362a]/90 border border-emerald-800/80 shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800/60">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-teal-300 font-mono font-medium">
                PRACTICE DISCIPLINE
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mt-1">
                {activeCategory.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-2xl leading-relaxed font-light">
                {activeCategory.shortDesc}
              </p>
            </div>
            <button
              onClick={() => onExploreCategory(activeTab)}
              className="text-xs font-semibold uppercase tracking-wider text-lime-300 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>Explore All in Directory</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Service Cards for this Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {activeCategoryServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => onSelectService(service)}
                className="group relative p-6 rounded-2xl bg-emerald-950/70 border border-emerald-800/80 hover:border-teal-400 hover:bg-emerald-950/90 cursor-pointer transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-white group-hover:text-teal-200 transition-colors leading-snug">
                      {service.title}
                    </h4>
                    <div className="w-8 h-8 rounded-lg bg-emerald-900 group-hover:bg-teal-400 text-teal-300 group-hover:text-emerald-950 flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-emerald-200/70 line-clamp-2 leading-relaxed font-light">
                    {service.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-900/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-emerald-300/80">
                    {service.processSteps.length} Steps · Detailed Guidance
                  </span>
                  <span className="text-lime-300 font-semibold group-hover:underline">
                    View Guide & Checklist →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
