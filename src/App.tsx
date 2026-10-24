import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroTicker } from './components/HeroTicker';
import { AboutFirm } from './components/AboutFirm';
import { TrustApproach } from './components/TrustApproach';
import { QuickTaxPlanner } from './components/QuickTaxPlanner';
import { ServiceHub } from './components/ServiceHub';
import { HowItWorks } from './components/HowItWorks';
import { WhoWeAssist } from './components/WhoWeAssist';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ClientSuccessStories } from './components/ClientSuccessStories';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalModals } from './components/LegalModals';
import { ScrollReveal } from './components/ScrollReveal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { TaxRegimeCalculator } from './components/TaxRegimeCalculator';
import { ComplianceCalendar } from './components/ComplianceCalendar';
import { PageContainer } from './components/PageContainer';
import { AboutPage, type AboutSubTab } from './components/AboutPage';
import { PortalNavigationHub } from './components/PortalNavigationHub';
import { SERVICES_DATA } from './data/servicesData';
import { ServiceCategoryId, ServiceItem } from './types';
import { updatePageSEO } from './utils/seoManager';

type ActivePage =
  | 'home'
  | 'about'
  | 'tax-calculator'
  | 'compliance-calendar'
  | 'diagnostic'
  | 'testimonials'
  | 'faq'
  | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [aboutSubTab, setAboutSubTab] = useState<AboutSubTab>('overview');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationServiceTitle, setConsultationServiceTitle] = useState('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'disclaimer' | null>(null);

  // Sync with URL Hash for multi-level drill-down pages and service deep-links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;

      // 1. Service detail modal deep-linking
      if (hash.startsWith('#/service/')) {
        const serviceId = hash.replace('#/service/', '');
        const matched = SERVICES_DATA.find((s) => s.id === serviceId);
        if (matched) {
          setSelectedService(matched);
        } else {
          setSelectedService(null);
        }
        return;
      } else {
        setSelectedService(null);
      }

      // 2. Multi-level drill-down page navigation
      if (hash === '#/about' || hash === '#about') {
        setActivePage('about');
        setAboutSubTab('overview');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/about/overview') {
        setActivePage('about');
        setAboutSubTab('overview');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/about/core-values' || hash === '#core-values') {
        setActivePage('about');
        setAboutSubTab('values');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/about/clients' || hash === '#industries') {
        setActivePage('about');
        setAboutSubTab('clients');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/about/why-us' || hash === '#why-us') {
        setActivePage('about');
        setAboutSubTab('why-us');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/tax-calculator' || hash === '#tax-calculator') {
        setActivePage('tax-calculator');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/compliance-calendar' || hash === '#compliance-calendar') {
        setActivePage('compliance-calendar');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/diagnostic' || hash === '#diagnostic') {
        setActivePage('diagnostic');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/testimonials' || hash === '#testimonials') {
        setActivePage('testimonials');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/faq' || hash === '#faq') {
        setActivePage('faq');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/contact' || hash === '#contact') {
        setActivePage('contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#services' || hash === '#/services') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.querySelector('#services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        setActivePage('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update dynamic SEO & Open Graph meta tags whenever active service changes
  useEffect(() => {
    updatePageSEO(selectedService);
  }, [selectedService]);

  const openServiceModal = (service: ServiceItem) => {
    setSelectedService(service);
    window.location.hash = `#/service/${service.id}`;
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    if (window.location.hash.startsWith('#/service/')) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleOpenConsultation = (serviceTitle?: string) => {
    setConsultationServiceTitle(serviceTitle || '');
    setConsultationOpen(true);
  };

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  const navigateHome = () => {
    setSelectedService(null);
    setActivePage('home');
    if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#/') {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromFooter = (catId: ServiceCategoryId) => {
    setActivePage('home');
    setTimeout(() => {
      const el = document.querySelector('#services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-poppins selection:bg-[#023e60]/20 selection:text-[#023e60] relative">
      {/* Luxury Thin Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Header & Navigation with Top Utility Contact Bar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onNavigateHome={() => {
          setSelectedService(null);
          if (window.location.hash.startsWith('#/service/')) {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
        onSelectService={openServiceModal}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* View 1: Clean, Focused Homepage (AboutFirm removed as requested, replaced by drill-down portal) */}
        {activePage === 'home' && (
          <>
            {/* Section 1: Hero Banner (Always instant paint above fold) */}
            <Hero onOpenConsultation={() => handleOpenConsultation()} />

            {/* Scrolling Statutory Ribbon */}
            <HeroTicker />

            {/* Section 2: Committed to Excellence - 12 Clean Practice Area Cards */}
            <ScrollReveal delay={40}>
              <ServiceHub onSelectService={openServiceModal} />
            </ScrollReveal>

            {/* Section 3: Multi-Level Portal Navigation Hub */}
            <ScrollReveal delay={40}>
              <PortalNavigationHub onNavigate={navigateTo} />
            </ScrollReveal>

            {/* Section 4: Our Working Process */}
            <ScrollReveal delay={40}>
              <HowItWorks />
            </ScrollReveal>

            {/* Section 5: Why Choose Us Summary */}
            <div id="why-us">
              <ScrollReveal delay={40}>
                <WhyChooseUs />
              </ScrollReveal>
            </div>

            {/* Section 6: Consultation Fast Action Banner */}
            <div className="bg-[#023e60] text-white py-12 px-4 sm:px-6 lg:px-8 text-center font-poppins">
              <div className="max-w-4xl mx-auto space-y-4">
                <span className="text-xs uppercase font-bold tracking-widest text-[#63ac4c]">
                  Direct Senior Counsel • Opera House, Mumbai
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Need Personalized Tax Planning or Scrutiny Notice Resolution?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                  Our chartered tax practice provides confidential consultation and representation before direct &amp; indirect tax commissionerates.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenConsultation('Executive Tax Advisory')}
                    className="btn-luxury-tab px-6 py-3 rounded-xl bg-[#63ac4c] hover:bg-[#52993d] text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    Schedule Direct Consultation
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('#/contact')}
                    className="btn-luxury-tab px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 cursor-pointer"
                  >
                    View Office Location &amp; Hours
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* View 2: Dedicated About Page with Multi-Level Drill-Down Tabs */}
        {activePage === 'about' && (
          <AboutPage
            activeSubTab={aboutSubTab}
            onSelectSubTab={(tab) => {
              setAboutSubTab(tab);
              window.location.hash = `#/about/${tab === 'overview' ? 'overview' : tab === 'values' ? 'core-values' : tab === 'clients' ? 'clients' : 'why-us'}`;
            }}
            onNavigateHome={navigateHome}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {/* View 3: Dedicated Tax Regime Calculator Page */}
        {activePage === 'tax-calculator' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Statutory Tools', onClick: () => navigateTo('#/tax-calculator') },
              { label: 'FY 2025-26 Tax Calculator' },
            ]}
            badge="Interactive Tax Tool"
            title="FY 2025-26 New vs Old Tax Regime Calculator"
            subtitle="Compare your personal or business tax liabilities under Section 115BAC versus the traditional deduction regime. Analyze exact savings before filing."
            onNavigateHome={navigateHome}
          >
            <TaxRegimeCalculator onOpenConsultation={handleOpenConsultation} />
          </PageContainer>
        )}

        {/* View 4: Dedicated Compliance Calendar Page */}
        {activePage === 'compliance-calendar' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Knowledge Base', onClick: () => navigateTo('#/compliance-calendar') },
              { label: 'Due Date Calendar' },
            ]}
            badge="Statutory Calendar"
            title="India Tax &amp; ROC Compliance Due-Date Tracker"
            subtitle="Monitor upcoming monthly, quarterly, and annual deadlines for GSTR-1, GSTR-3B, TDS payments, Advance Tax, ITR, and MCA annual returns."
            onNavigateHome={navigateHome}
          >
            <ComplianceCalendar onOpenConsultation={handleOpenConsultation} />
          </PageContainer>
        )}

        {/* View 5: Dedicated Diagnostic & Document Checklist Page */}
        {activePage === 'diagnostic' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Diagnostics', onClick: () => navigateTo('#/diagnostic') },
              { label: 'Document Checklist' },
            ]}
            badge="Filing Preparations"
            title="Statutory Document Checklist &amp; Scenario Diagnostics"
            subtitle="Identify exactly which statutory filings apply to your profile and generate verified documentation checklists before proceeding."
            onNavigateHome={navigateHome}
          >
            <QuickTaxPlanner onOpenConsultation={handleOpenConsultation} />
          </PageContainer>
        )}

        {/* View 6: Dedicated Client Success Stories Page */}
        {activePage === 'testimonials' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Track Record', onClick: () => navigateTo('#/testimonials') },
              { label: 'Client Success Stories' },
            ]}
            badge="Mumbai Business Outcomes"
            title="Client Success Stories &amp; Enterprise Case Studies"
            subtitle="Discover verified outcomes delivered for jewelers, fintech startups, hospitality networks, and logistics corporations across Mumbai."
            onNavigateHome={navigateHome}
          >
            <ClientSuccessStories />
          </PageContainer>
        )}

        {/* View 7: Dedicated FAQ Page */}
        {activePage === 'faq' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Support', onClick: () => navigateTo('#/faq') },
              { label: 'Frequently Asked Questions' },
            ]}
            badge="Knowledge Base"
            title="Frequently Asked Questions &amp; Advisory Guidance"
            subtitle="Find statutory clarity on GST reconciliation notices, section 148A scrutiny, Advance Tax penalties, and corporate secretarial compliances."
            onNavigateHome={navigateHome}
          >
            <FaqSection />
          </PageContainer>
        )}

        {/* View 8: Dedicated Contact Page */}
        {activePage === 'contact' && (
          <PageContainer
            breadcrumbs={[
              { label: 'Connect', onClick: () => navigateTo('#/contact') },
              { label: 'Office & Contact Desk' },
            ]}
            badge="South Mumbai Office"
            title="Consult Our Advisory Desk at Opera House, Mumbai"
            subtitle="Visit our physical office during working hours or send a consultation brief for prompt chartered tax assistance."
            onNavigateHome={navigateHome}
          >
            <ContactSection preselectedService={selectedService?.id} />
          </PageContainer>
        )}
      </main>

      {/* Section 11: Luxury Corporate Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryFromFooter}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenDisclaimer={() => setLegalModalType('disclaimer')}
      />

      {/* Persistent Floating Quick WhatsApp & Phone Connect Widget */}
      <FloatingWhatsApp />

      {/* Service Detail Modal with dynamic SEO injection */}
      <ServiceDetailModal
        service={selectedService}
        onClose={closeServiceModal}
        onSelectRelated={(relService) => openServiceModal(relService)}
        onConsult={(title) => handleOpenConsultation(title)}
      />

      {/* Consultation Request Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultServiceTitle={consultationServiceTitle}
      />

      {/* Privacy & Statutory Disclaimer Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
