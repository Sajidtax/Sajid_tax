export type ServiceCategoryId = 'income-tax-gst' | 'business-registration' | 'accounting-compliance' | 'other-services';

export interface ServiceCategory {
  id: ServiceCategoryId;
  title: string;
  shortDesc: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  categoryId: ServiceCategoryId;
  title: string;
  tagline: string;
  description: string;
  whoNeedsIt: string[];
  processSteps: { title: string; detail: string }[];
  documentChecklist: string[];
  keyHighlights: string[];
  faqs: { question: string; answer: string }[];
  relatedServiceIds: string[];
  // Specific SEO & Open Graph Metadata
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string[];
}

export interface ISTStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
  formattedTimeIST: string;
  currentDayName: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  notes: string;
}
