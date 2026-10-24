import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { GENERAL_FAQS } from '../data/faqData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Consultation & Office', 'Income Tax & GST', 'Business Setup', 'Licenses & Compliance'];

  const filteredFaqs = GENERAL_FAQS.filter((faq) => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200 font-poppins">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#63ac4c] block">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#023e60] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#63ac4c] mx-auto mt-3 rounded-full" />
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed mt-3">
            Clear statutory answers on Income Tax filing, GST returns, company registration, and business compliance advisory in Mumbai.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded btn-luxury-tab whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#023e60] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-[#023e60] hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-lg border transition-all ${
                  isOpen ? 'border-[#023e60] bg-[#eef5fa]/40 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-slate-900 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#023e60] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#023e60] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legal Advisory Disclaimer */}
        <div className="mt-12 p-4 rounded-xl border border-slate-200 bg-[#fbfbf9] text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Statutory Disclaimer: Information provided on this website is for general educational purposes only and does not constitute formal legal or tax counsel. Regulatory provisions and deadlines are subject to amendments by the Government of India.
        </div>

      </div>
    </section>
  );
};
