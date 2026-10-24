export interface GeneralFaq {
  category: string;
  question: string;
  answer: string;
}

export const GENERAL_FAQS: GeneralFaq[] = [
  {
    category: 'Consultation & Office',
    question: 'Where is your physical office located and what are the office hours?',
    answer: 'Our office is at Office No. 114A, 2nd Floor, Paras Juice Building, Tata Road No. 2, Near Prasad Chamber, Opera House, Mumbai – 400004. We are open Monday through Saturday from 11:00 AM to 7:00 PM IST. We are closed on Sundays. Prior appointment via phone or WhatsApp is recommended to ensure focused time for your consultation.',
  },
  {
    category: 'Consultation & Office',
    question: 'Can consultations and document verification be handled remotely?',
    answer: 'Yes. While we welcome clients to our Opera House office, we also handle tax filings, GST returns, and registrations remotely via encrypted email, WhatsApp, and phone for clients located across Mumbai or other regions in India.',
  },
  {
    category: 'Income Tax & GST',
    question: 'How do I know whether I am required to file an Income Tax Return?',
    answer: 'Filing is mandatory if your gross total income before chapter VIA deductions exceeds the basic exemption limit (₹2.5 Lakhs in old regime, ₹3 Lakhs under new regime for individual taxpayers under 60). It is also mandatory if you hold foreign assets, have deposited >₹1 Crore in current accounts, incurred >₹2 Lakhs on foreign travel, or have business turnover exceeding prescribed statutory limits.',
  },
  {
    category: 'Income Tax & GST',
    question: 'What happens if a supplier fails to upload an invoice in GSTR-1?',
    answer: 'If your supplier does not file their GSTR-1, the invoice will not reflect in your GSTR-2B. Under current GST laws, you cannot claim Input Tax Credit (ITC) for that invoice in GSTR-3B until the vendor files and it appears in your GSTR-2B. We run monthly reconciliation to flag defaulting vendors before you file.',
  },
  {
    category: 'Business Setup',
    question: 'Should I register as a Proprietorship, LLP, or Private Limited Company?',
    answer: 'The choice depends on risk, scale, and capital requirements: a Proprietorship is quick with low compliance but has unlimited personal liability; an LLP provides limited liability and flexible profit distribution with modest compliance; a Private Limited Company is the global corporate gold standard required by venture investors and financial institutions. We assess your model during consultation before you file.',
  },
  {
    category: 'Business Setup',
    question: 'Why is Gumasta / Shop & Establishment essential for Mumbai businesses?',
    answer: 'The Maharashtra Shops and Establishments Act governs all commercial spaces, offices, and retail premises in Mumbai. Commercial banks require the Gumasta Intimation/Registration receipt as foundational KYC proof to open a current bank account in the business name.',
  },
  {
    category: 'Licenses & Compliance',
    question: 'How does an Udyam certificate benefit my business?',
    answer: 'Udyam registration formally designates your firm as a recognized MSME. Key advantages include 50% statutory discount on government trademark fees, statutory protection against delayed payments from commercial buyers under Section 15 of the MSMED Act, and priority sector lending criteria from commercial banks.',
  },
  {
    category: 'Licenses & Compliance',
    question: 'Do you guarantee approval of trademark applications or government licenses?',
    answer: 'No professional consultant can legitimately guarantee statutory approval, as approvals are solely at the legal discretion of the respective Government Registrar or statutory officer (such as the Registrar of Trade Marks or Food Safety Officer). Our role is to ensure accurate classification, thorough documentation, error-free filings, and timely replies to departmental inquiries.',
  },
];
