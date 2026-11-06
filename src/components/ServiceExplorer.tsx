import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowUpRight, MessageSquare, X } from 'lucide-react';
import { SERVICES_DATA, SERVICE_CATEGORIES } from '../data/servicesData';
import { ServiceCategoryId, ServiceItem } from '../types';

interface ServiceExplorerProps {
  onSelectService: (service: ServiceItem) => void;
  selectedCategoryFilter: ServiceCategoryId | 'all';
  onFilterChange: (cat: ServiceCategoryId | 'all') => void;
}

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({
  onSelectService,
  selectedCategoryFilter,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategoryFilter === 'all' || service.categoryId === selectedCategoryFilter;
      const matchesSearch =
        searchQuery === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.documentChecklist.some((doc) =>
          doc.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryFilter, searchQuery]);

  return (
    <section id="service-explorer" className="py-20 lg:py-28 bg-[#f8f9fa] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-Triggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 font-sans-ui">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Full Directory of Practice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-slate-900 tracking-tight mt-1">
              Service Directory & Requirements
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md font-light">
            Filter all 17 direct statutory services offered by Sajid Tax Consultant in Mumbai. Click any service to inspect verified checklists and procedures.
          </p>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="pt-8 pb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategoryFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterChange(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services or documents..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Services Grid with Staggered Scroll-Triggered Animation */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 bg-white space-y-3">
            <p className="text-sm text-slate-500">No services match your search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onFilterChange('all');
              }}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredServices.map((service, idx) => {
              const category = SERVICE_CATEGORIES.find((c) => c.id === service.categoryId);
              const whatsappUrl = `https://wa.me/917762067143?text=${encodeURIComponent(
                `Hello Sajid Tax Consultant, I would like to consult regarding: ${service.title}.`
              )}`;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-950/5 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Unboxed metadata line with typographic separator */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-sans-ui">
                      <span className="text-emerald-800 font-semibold">{category?.title}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono tabular-nums">{service.processSteps.length} Steps</span>
                    </div>

                    <h3
                      onClick={() => onSelectService(service)}
                      className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
                    >
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {service.tagline}
                    </p>

                    {/* Quick Document preview */}
                    <div className="pt-2">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Key Documentation
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-2">
                        {service.documentChecklist.slice(0, 3).join(', ')}...
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-xs font-bold text-emerald-800 group-hover:text-emerald-900 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Checklist & Guide</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
