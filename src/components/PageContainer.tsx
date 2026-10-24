import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  hash?: string;
  onClick?: () => void;
}

interface PageContainerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  badge?: string;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  breadcrumbs,
  title,
  subtitle,
  badge,
  onNavigateHome,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 animate-fastFadeIn font-poppins">
      {/* Top Breadcrumb & Page Header Bar */}
      <div className="bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          
          {/* Breadcrumbs Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#023e60] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#63ac4c]" />
                <span>Home</span>
              </button>

              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {crumb.onClick || crumb.hash ? (
                    <button
                      type="button"
                      onClick={crumb.onClick}
                      className="hover:text-[#023e60] transition-colors cursor-pointer"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-[#023e60] font-semibold">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Back to Home Button */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="btn-luxury-tab inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#023e60] text-slate-700 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Page Heading Lockup */}
          <div className="max-w-3xl">
            {badge && (
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#63ac4c] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60 mb-2">
                {badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Main Page Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {children}
      </div>
    </div>
  );
};
