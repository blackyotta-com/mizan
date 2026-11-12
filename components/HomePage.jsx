'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Comprehensive Bilingual Content Dictionary
const CONTENT = {
  en: {
    emergencyBanner: 'Active Cyber Attack or Blackmail Extortion? Our forensic defense team responds 24/7.',
    emergencyHotline: 'Emergency Hotline: +964 750 449 0696',
    brandTagline: 'Legal Strategy & Cyber Forensics',
    nav: {
      home: 'Home',
      about: 'Why Mizan',
      services: 'Practice Areas',
      methodology: 'Methodology',
      cases: 'Track Record',
      faq: 'FAQ',
      contact: 'Consultation',
      urgentCall: '24/7 Incident Hotline',
    },
    hero: {
      tag: 'Premier Legal Counsel & Digital Forensics',
      titleStart: 'Defending Your Rights.',
      titleGradient: 'Shielding Your Digital Frontier.',
      lead: 'Mizan unites aggressive courtroom litigation with accredited digital forensic engineering. We represent individuals, executives, and enterprises against high-stakes lawsuits, cyber extortion, data breaches, and IP infringement.',
      pills: [
        { icon: 'fa-scale-balanced', text: 'Litigation & Arbitration' },
        { icon: 'fa-shield-halved', text: 'Cybercrime & Anti-Extortion' },
        { icon: 'fa-microscope', text: 'Digital Forensics & Chain-of-Custody' },
        { icon: 'fa-copyright', text: 'IP & Online Rights' },
      ],
      ctaPrimary: 'Book Confidential Consultation',
      ctaSecondary: 'Emergency Cyber Triage',
      terminal: {
        badge: 'CYBER-LEGAL DEFENSE GRID',
        status: 'ACTIVE ON-CALL',
        stat1Value: '250+',
        stat1Label: 'Resolved Cases',
        stat2Value: '98.4%',
        stat2Label: 'Favorable Resolution',
        stat3Value: '< 30m',
        stat3Label: 'Incident Triage Time',
        stat4Value: '100%',
        stat4Label: 'Evidence Admissibility',
        feed1: 'Incident triage protocol ready for deployment',
        feed2: 'Chain-of-custody cryptographic hashing active',
        feed3: 'Bilingual legal counsel standing by in Erbil & Baghdad',
      },
    },
    whyMizan: {
      tag: 'The Hybrid Advantage',
      title: 'Why Traditional Law & Pure IT Both Fall Short',
      subtitle: 'Modern cyber incidents require a rare synthesis: certified forensic technologists who extract courtroom-grade evidence, paired with licensed attorneys who command the bench.',
      cards: [
        {
          icon: 'fa-shield-virus',
          title: 'Court-Admissible Evidence',
          desc: 'IT vendors provide log files that get dismissed in court. Mizan secures strict chain-of-custody evidence complying with Iraqi procedural laws and international ISO/IEC 27037 standards.',
        },
        {
          icon: 'fa-gavel',
          title: 'Aggressive Courtroom Strategy',
          desc: 'We translate complex memory forensics, network packets, and malware payloads into unassailable legal arguments before judges, prosecutors, and arbitration panels.',
        },
        {
          icon: 'fa-clock-rotate-left',
          title: 'Rapid Incident Containment',
          desc: 'When ransomware hits or extortionists demand immediate payment, our first 60 minutes neutralize leverage, prevent data leak publication, and preserve critical forensic traces.',
        },
        {
          icon: 'fa-user-shield',
          title: 'Privilege & Total Discretion',
          desc: 'Every communication with Mizan is protected by strict legal professional privilege. Unlike third-party IT contractors, our investigations cannot be subpoenaed against you.',
        },
      ],
      comparisonTag: 'Defensive Architecture',
      comparisonTitle: 'Why Mizan Delivers Decisive Results',
      compTradTitle: 'Traditional Law Firms',
      compTradList: [
        'Lack in-house technical forensic capabilities',
        'Cannot independently verify digital logs or payload origin',
        'Dependent on slow, unvetted external IT contractors',
        'Struggle to cross-examine technical forensic witnesses',
      ],
      compITTitle: 'IT Security Vendors',
      compITList: [
        'Zero legal standing or right of audience in court',
        'Communications are NOT protected by attorney-client privilege',
        'Cannot file emergency restraining orders or search warrants',
        'Focus only on patch management, ignoring legal liability',
      ],
      compMizanTitle: 'MIZAN Hybrid Defense',
      compMizanList: [
        'Licensed courtroom advocates + forensic reverse engineers',
        'Full attorney-client privilege shields your entire investigation',
        'Immediate emergency injunctions, police reporting & defense',
        'Litigation-ready forensic reports proven in federal courts',
      ],
    },
    services: {
      tag: 'Core Practice Areas',
      title: 'Strategic Legal & Digital Solutions',
      subtitle: 'End-to-end representation spanning high-stakes courtroom litigation and cutting-edge cyber threat defense.',
      items: [
        {
          num: '01',
          slug: 'cybercrime-defense',
          icon: 'fa-shield-halved',
          title: 'Cybercrime Defense & Anti-Extortion',
          desc: 'Immediate emergency defense against ransomware extortion, account hijackings, wire fraud, data exfiltration, and online blackmail.',
          capabilities: [
            'Ransomware Negotiation & Triage',
            'Blackmail & Extortion Neutralization',
            'Financial Cyberfraud & BEC',
            'Defamation & Character Assassination',
          ],
          linkText: 'Explore Cybercrime Practice',
        },
        {
          num: '02',
          slug: 'digital-forensics',
          icon: 'fa-magnifying-glass-chart',
          title: 'Digital Forensics & Chain-of-Custody',
          desc: 'Forensic acquisition and scientific analysis of phones, laptops, servers, cloud instances, and messaging artifacts for courtroom scrutiny.',
          capabilities: [
            'Forensic Disk & Memory Imaging',
            'Deleted Artifact & Chat Recovery',
            'Cryptocurrency Asset Tracing',
            'Court-Ready Expert Witness Testimony',
          ],
          linkText: 'Explore Forensics Practice',
        },
        {
          num: '03',
          slug: 'general-law',
          icon: 'fa-scale-balanced',
          title: 'General Litigation & Corporate Law',
          desc: 'Formidable representation in criminal investigations, high-value commercial disputes, contract breaches, family estates, and corporate defense.',
          capabilities: [
            'Commercial Litigation & Arbitration',
            'Criminal Defense & Cross-Examination',
            'Real Estate & Property Conflicts',
            'Employment Disputes & NDA Enforcement',
          ],
          linkText: 'Explore Litigation Practice',
        },
        {
          num: '04',
          slug: 'ip-rights',
          icon: 'fa-copyright',
          title: 'Intellectual Property & Digital Rights',
          desc: 'Aggressive brand protection, trademark safeguarding, copyright enforcement, and swift anti-piracy takedown actions across digital platforms.',
          capabilities: [
            'Trademark & Brand Enforcement',
            'Anti-Piracy & Counterfeit Takedowns',
            'Trade Secret Misappropriation',
            'Software & SaaS Licensing Conflicts',
          ],
          linkText: 'Explore IP & Rights Practice',
        },
      ],
    },
    methodology: {
      tag: 'Proven Protocol',
      title: 'Our 4-Phase Defense Methodology',
      subtitle: 'From initial emergency containment to final judicial dismissal, our protocol is engineered for speed, discretion, and evidentiary dominance.',
      steps: [
        {
          num: 'PHASE 01',
          title: 'Immediate Triage & Evidence Locking',
          desc: 'Rapid isolation of affected systems, cryptographic hashing of digital traces, and preservation of ephemeral network logs before evidence is altered or wiped.',
        },
        {
          num: 'PHASE 02',
          title: 'Forensic Correlation & Threat Mapping',
          desc: 'Deep-dive memory analysis, malware reverse engineering, and attacker attribution to construct an unassailable factual timeline of events.',
        },
        {
          num: 'PHASE 03',
          title: 'Judicial Action & Courtroom Filing',
          desc: 'Drafting litigation-grade pleadings, lodging emergency criminal complaints, or deploying procedural defense motions to strike down baseless charges.',
        },
        {
          num: 'PHASE 04',
          title: 'Resolution, Recovery & Shielding',
          desc: 'Finalizing court judgments, executing asset recovery orders, cleaning defamatory digital footprints, and hardening technical posture against recurrence.',
        },
      ],
    },
    clients: {
      tag: 'Trusted Representation',
      title: 'Selected Clients & Strategic Partners',
      subtitle: 'Trusted by leading enterprises, high-profile individuals, and regional institutions across Iraq and the Middle East.',
    },
    cases: {
      tag: 'Representative Matters',
      title: 'Decisive Legal & Technical Outcomes',
      subtitle: 'A selection of anonymized matters demonstrating our hybrid defense capabilities.',
      items: [
        {
          tag: 'Cyber Extortion & Ransomware',
          title: 'Multi-Enterprise Logistics Breach',
          desc: 'Extortionists demanded $350,000 following an internal network compromise. Our forensic team traced the penetration vector, neutralized the persistence backdoor, and contained the leak with zero ransom paid.',
          outcome: 'Zero Ransom Paid • Perpetrator Traced • Full Continuity',
        },
        {
          tag: 'Digital Defamation & Blackmail',
          title: 'Executive Character Assassination',
          desc: 'Targeted smear campaign utilizing forged digital correspondence. Mizan proved fabrication through DKIM/SPF header forensics and secured an emergency court order removing all content within 48 hours.',
          outcome: '100% Content Removed • Forensic Exoneration • Criminal Charges Filed',
        },
        {
          tag: 'Commercial IP Litigation',
          title: 'Proprietary Software Exfiltration',
          desc: 'Departing co-founder stole proprietary database and source code to launch competing entity. Obtained emergency forensic search orders, seized offending devices, and won substantial damages.',
          outcome: 'Court Injunction Granted • Code Retrievable • Damages Awarded',
        },
      ],
    },
    faq: {
      tag: 'Frequently Asked Questions',
      title: 'Clarity on Critical Legal & Cyber Matters',
      subtitle: 'Immediate answers to common questions about our practices, confidentiality, and jurisdiction.',
      items: [
        {
          q: 'What should I do immediately if my company or personal account is extorted or hacked?',
          a: 'Do NOT power down or wipe devices, as crucial evidence lives in volatile memory (RAM). Do NOT communicate with the attacker or pay ransom without legal counsel. Immediately contact Mizan’s 24/7 hotline at +964 750 449 0696. We will safely preserve the forensic state, initiate chain-of-custody, and handle all communications under legal privilege.',
        },
        {
          q: 'How does digital evidence hold up in Iraqi and regional courts?',
          a: 'Under Iraqi Law of Evidence and Cybercrime directives, digital evidence must demonstrate unbroken chain-of-custody, cryptographic integrity (SHA-256/MD5 hashing), and be presented by certified forensic experts. Mizan’s reports are structured specifically to satisfy judicial standards and overcome evidentiary objections.',
        },
        {
          q: 'Is my initial consultation confidential and protected by attorney-client privilege?',
          a: 'Yes, absolutely. All communications, consultation inquiries, and submitted documents are protected under strict attorney-client privilege and confidentiality rules. Nothing you share with our legal team can be disclosed to opposing parties or authorities without your explicit authorization.',
        },
        {
          q: 'Does Mizan handle cases outside of Erbil?',
          a: 'Yes. While our headquarters is in Erbil, our legal team regularly litigates before federal courts in Baghdad, the Kurdistan Region, and across Iraq. We also coordinate cross-border forensic investigations involving regional and international jurisdictions.',
        },
        {
          q: 'Can Mizan represent both criminal defense and civil dispute cases?',
          a: 'Yes. Our general law department handles criminal defense, civil lawsuits, commercial contracts, employment arbitration, real estate disputes, and family wealth succession with equal rigor and dedicated courtroom advocates.',
        },
      ],
    },
    contact: {
      tag: 'Get In Touch',
      title: 'Request a Confidential Consultation',
      subtitle: 'Speak directly with our bilingual legal counsel and forensic specialists. All inquiries are treated with strict confidentiality.',
      formTitle: 'Confidential Case Intake',
      formLead: 'Fill out the form below or contact our Erbil office directly. For active cyber breaches, select the emergency priority flag.',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g. John Doe / زيد أحمد',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'Direct Phone / WhatsApp',
      phonePlaceholder: '+964 750 ...',
      serviceLabel: 'Practice Area of Interest',
      serviceOptions: [
        'Cybercrime Defense & Anti-Extortion',
        'Digital Forensics & Investigation',
        'General Law & Litigation',
        'Intellectual Property & Rights',
        'Other / General Legal Inquiry',
      ],
      messageLabel: 'Case Summary / Inquiries',
      messagePlaceholder: 'Please provide a brief overview of your case, key timelines, and any urgent deadlines...',
      priorityCheckbox: 'This is an urgent ongoing cyber incident or active extortion attack',
      submitBtn: 'Submit Confidential Inquiry',
      submittingBtn: 'Encrypting & Sending...',
      successMsg: 'Your inquiry has been securely delivered. Our legal counsel will review your matter and contact you shortly.',
      errorMsg: 'Unable to send message. Please call our direct hotline at +964 750 449 0696.',
      infoTitle: 'Direct Office & Emergency Response',
      locationLabel: 'Headquarters',
      locationValue: 'Erbil, Kurdistan Region, Iraq',
      phoneLabel2: '24/7 Hotline',
      phoneValue: '+964 750 449 0696',
      emailLabel2: 'Official Correspondence',
      emailValue: 'Contact@The-Mizan.net',
      whatsappBtn: 'Quick Consultation via WhatsApp',
      securityNotice: 'Protected by Attorney-Client Privilege. All forensic data is handled under strict non-disclosure and ISO-grade security protocols.',
    },
    footer: {
      desc: 'Mizan Law Firm is a premier bilingual legal consultancy and digital forensics practice based in Erbil, Iraq, protecting clients offline and online.',
      navTitle: 'Navigation',
      practiceTitle: 'Practice Areas',
      contactTitle: 'Headquarters',
      disclaimer: 'Legal Disclaimer: The information on this website is for general informational purposes and does not constitute formal legal advice. Contacting Mizan Law Firm does not establish an attorney-client relationship until an engagement agreement is signed.',
      copyright: '© 2026 Mizan Law Firm. All rights reserved.',
    },
  },
  ar: {
    emergencyBanner: 'هل تتعرض لهجوم سيبراني نشط أو ابتزاز إلكتروني؟ فريق الدفاع الجنائي لدينا متاح 24/7.',
    emergencyHotline: 'الخط الساخن للطوارئ: ‎+964 750 449 0696',
    brandTagline: 'استراتيجية قانونية وأدلة رقمية',
    nav: {
      home: 'الرئيسية',
      about: 'لماذا ميزان',
      services: 'خدماتنا',
      methodology: 'منهجيتنا',
      cases: 'سجل القضايا',
      faq: 'الأسئلة الشائعة',
      contact: 'استشارة',
      urgentCall: 'طوارئ 24/7',
    },
    hero: {
      tag: 'استشارات قانونية وتحقيقات رقمية متقدمة • أربيل وبغداد ودولياً',
      titleStart: 'ندافع عن حقوقك.',
      titleGradient: 'ونحمي أمانك في العالم الرقمي.',
      lead: 'تمزج شركة ميزان بين الدفاع القضائي الحاسم والتحقيقات الجنائية الرقمية المعتمدة، وتمثل الأفراد ورجال الأعمال والشركات في النزاعات القضائية، والابتزاز الإلكتروني، واختراق البيانات، وانتهاك الملكية الفكرية. كما تتخصص في تقديم الخدمات والاستشارات القانونية والتنظيمية لقطاعات الاتصالات وتكنولوجيا المعلومات والتحول الرقمي والذكاء الاصطناعي، بما يشمل تنظيم عقود الاتصالات والتكنولوجيا، وتمثيل الشركات أمام الجهات التنظيمية والقضائية.',
      pills: [
        { icon: 'fa-scale-balanced', text: 'التقاضي والتحكيم التجاري' },
        { icon: 'fa-shield-halved', text: 'الدفاع السيبراني ومكافحة الابتزاز' },
        { icon: 'fa-microscope', text: 'الأدلة الرقمية وسلسلة الحيازة' },
        { icon: 'fa-copyright', text: 'الملكية الفكرية وحماية العلامات' },
      ],
      ctaPrimary: 'اطلب استشارة قانونية سرية',
      ctaSecondary: 'استجابة سريعة للاختراق',
      terminal: {
        badge: 'منظومة الدفاع القانوني والسيبراني',
        status: 'جاهزية على مدار الساعة',
        stat1Value: '+250',
        stat1Label: 'قضية محلولة بنجاح',
        stat2Value: '98.4%',
        stat2Label: 'نسبة النتائج الإيجابية',
        stat3Value: '< 30 د',
        stat3Label: 'سرعة الاستجابة الأولية',
        stat4Value: '100%',
        stat4Label: 'قبول الأدلة بالمحكمة',
        feed1: 'بروتوكول التعامل مع الحوادث الرقمية قيد الجاهزية',
        feed2: 'التشفير الرقمي والتوثيق الجنائي لسلسلة الأدلة نشط',
        feed3: 'محامون معتمدون في أربيل وبغداد جاهزون للتمثيل الفوري',
      },
    },
    whyMizan: {
      tag: 'ميزتنا الاستراتيجية',
      title: 'لماذا يعجز المحامي التقليدي وشركة تقنية المعلومات بمفردهما؟',
      subtitle: 'النزاعات الحديثة تتطلب معادلة نادرة: خبراء أدلة رقمية قادرون على استخراج القرائن المقبولة قضائياً، مع محامين متمرسين يفرضون الحجة أمام القضاة.',
      cards: [
        {
          icon: 'fa-shield-virus',
          title: 'أدلة مقبولة قضائياً',
          desc: 'شركات البرمجة تقدم سجلات تُرفض بالمحكمة لعدم سلامة الحيازة. نحن نوثق الأدلة وفق المعايير الدولية ISO/IEC 27037 وقانون الإثبات العراقي لضمان قبولها الكامل.',
        },
        {
          icon: 'fa-gavel',
          title: 'استراتيجية مرافعة حاسمة',
          desc: 'نحول السجلات التقنية المعقدة وتحليلات الذاكرة والهندسة العكسية إلى حجج قانونية دامغة أمام هيئات المحاكم والادعاء العام ولجان التحكيم.',
        },
        {
          icon: 'fa-clock-rotate-left',
          title: 'احتواء فوري للتهديد',
          desc: 'في حالات برمجيات الفدية والابتزاز بالبيانات الحساسة، نتدخل خلال الدقائق الأولى لتعطيل ابتزاز المهاجم ومنع نشر التسريبات وتأمين مسرح الجريمة الرقمي.',
        },
        {
          icon: 'fa-user-shield',
          title: 'سرية وحصانة قانونية كاملة',
          desc: 'كافة اتصالاتك مع ميزان محمية بالحصانة المهنية وسرية المحاماة. على عكس شركات تقنية المعلومات، لا يمكن إجبارنا على إفشاء بياناتك أو استخدامها ضدك.',
        },
      ],
      comparisonTag: 'مقارنة احترافية',
      comparisonTitle: 'لماذا تحقق ميزان نتائج استثنائية؟',
      compTradTitle: 'مكاتب المحاماة التقليدية',
      compTradList: [
        'تفتقر للخبرة التقنية والتحليل الجنائي للأنظمة',
        'عاجزة عن فحص صحة الأدلة الرقمية وسجلات الخوادم',
        'تعتمد على وسطاء تقنيين غير مؤهلين قضائياً',
        'صعوبة استجواب ومناقشة خبراء التقنية المعارضين',
      ],
      compITTitle: 'شركات أمن المعلومات',
      compITList: [
        'لا تملك حق الترافع أو الصفة القانونية في المحاكم',
        'محادثاتها معك غير محمية بسرية مهنة المحاماة',
        'عاجزة عن استصدار أوامر قضائية مستعجلة أو منع سفر',
        'تركز على سد الثغرات وتتجاهل المسؤولية والمساءلة القانونية',
      ],
      compMizanTitle: 'منظومة ميزان المتكاملة',
      compMizanList: [
        'محامون مرخصون + خبراء جنائيون في الأمن السيبراني',
        'حصانة وسرية مطلقة تحمي كامل التحقيقات والملفات',
        'تحرك قضائي فوري: أوامر حجز مستعجلة، ملاحقة جنائية ودفاع',
        'تقارير خبرة فنية معتمدة تنتصر في المحاكم العليا والاتحادية',
      ],
    },
    services: {
      tag: 'مجالات الممارسة',
      title: 'حلول قانونية ورقمية استراتيجية',
      subtitle: 'تمثيل شامل يجمع بين قوة التقاضي في المحاكم وأحدث أساليب الردع والدفاع السيبراني.',
      items: [
        {
          num: '01',
          slug: 'cybercrime-defense',
          icon: 'fa-shield-halved',
          title: 'الدفاع عن الجرائم الإلكترونية ومكافحة الابتزاز',
          desc: 'تدخل عاجل ودفاع متخصص في قضايا برمجيات الفدية، الاحتيال المالي، سرقة الحسابات، تسريب البيانات، والابتزاز الرقمي.',
          capabilities: [
            'إدارة حوادث الفدية والابتزاز',
            'التصدي للتشهير وتشويه السمعة',
            'الاحتيال المالي واختراق التحويلات',
            'تتبع العملات الرقمية المستولى عليها',
          ],
          linkText: 'تفاصيل قضايا الجرائم الإلكترونية',
        },
        {
          num: '02',
          slug: 'digital-forensics',
          icon: 'fa-magnifying-glass-chart',
          title: 'الأدلة الجنائية الرقمية وسلسلة الحيازة',
          desc: 'استحواذ وتحليل تقني علمي للهواتف والحواسيب والخوادم والأنظمة السحابية لاستخراج القرائن القاطعة أمام القضاء.',
          capabilities: [
            'النسخ الجنائي للأقراص والذاكرة',
            'استعادة المحادثات والملفات المحذوفة',
            'إثبات تزييف الأدلة والمستندات',
            'شهادة وتقرير الخبير المعتمد بالمحكمة',
          ],
          linkText: 'تفاصيل التحقيقات الجنائية الرقمية',
        },
        {
          num: '03',
          slug: 'general-law',
          icon: 'fa-scale-balanced',
          title: 'القانون العام والتقاضي والشركات',
          desc: 'تمثيل قضائي رفيع المستوى في القضايا الجنائية، المنازعات التجارية، صياغة العقود، قضايا العمل والتركات والعقارات.',
          capabilities: [
            'الدعاوى التجارية والتحكيم',
            'الدفاع الجنائي واستجواب الشهود',
            'النزاعات العقارية وتوثيق الأملاك',
            'قضايا العمل ومنازعات الشركاء',
          ],
          linkText: 'تفاصيل قضايا القانون العام',
        },
        {
          num: '04',
          slug: 'ip-rights',
          icon: 'fa-copyright',
          title: 'الملكية الفكرية وحماية العلامات الرقمية',
          desc: 'حماية العلامات التجارية، براءات الاختراع، حقوق المؤلف، وملاحقة القرصنة والمنتجات المقلدة عبر المنصات الرقمية.',
          capabilities: [
            'تسجيل وحماية العلامات التجارية',
            'إغلاق المنصات المقرصنة والمقلدة',
            'حماية الأسرار التجارية والأكواد',
            'نزاعات تراخيص البرمجيات والتطبيقات',
          ],
          linkText: 'تفاصيل الملكية الفكرية',
        },
      ],
    },
    methodology: {
      tag: 'منهجية العمل',
      title: 'خريطة الدفاع في 4 مراحل',
      subtitle: 'من لحظة احتواء التهديد الأولى حتى صدور الحكم القضائي النهائي، صُممت منهجيتنا لضمان السرعة والسرية والتفوق الإثباتي.',
      steps: [
        {
          num: 'المرحلة 01',
          title: 'الاحتواء الفوري وتجميد الأدلة',
          desc: 'عزل الأجهزة المخترقة، وأخذ بصمات التشفير الرقمية (Hash)، وتأمين سجلات الشبكة المؤقتة قبل أي تلاعب أو مسح للبيانات.',
        },
        {
          num: 'المرحلة 02',
          title: 'التحليل الجنائي وتحديد الفاعل',
          desc: 'فحص الذاكرة العشوائية، وتحليل البرمجيات الخبيثة، وتتبع البصمات الرقمية لبناء تسلسل زمني قاطع يكشف هوية ومسؤولية المتسبب.',
        },
        {
          num: 'المرحلة 03',
          title: 'التحرك القضائي والمرافعة',
          desc: 'صياغة اللوائح القانونية المدعمة بالأدلة الفنية، استصدار أوامر الضبط القضائية العاجلة، والترافع بثبات أمام هيئة المحكمة.',
        },
        {
          num: 'المرحلة 04',
          title: 'إنفاذ الأحكام واسترداد الحقوق',
          desc: 'تنفيذ القرارات القضائية، تتبع واسترداد الأموال المنهوبة، مسح المحتوى المسيء من الإنترنت، وتحصين الأنظمة مستقبلاً.',
        },
      ],
    },
    clients: {
      tag: 'ثقة نعتز بها',
      title: 'عملاء وشركاء نجاح مختارون',
      subtitle: 'نحظى بثقة كبرى الشركات والمؤسسات والشخصيات في إقليم كوردستان وعموم العراق والشرق الأوسط.',
    },
    cases: {
      tag: 'سجل النجاحات',
      title: 'نتائج قضائية وتقنية حاسمة',
      subtitle: 'نماذج واقعية ومجهّلة توضح قدرتنا على حسم القضايا المعقدة.',
      items: [
        {
          tag: 'جرائم الفدية والابتزاز',
          title: 'اختراق منظومة لوجستية كبرى',
          desc: 'طالب المخترقون بفدية قدرها 350 ألف دولار بعد اختراق قواعد بيانات الشركة. تمكن فريقنا من تتبع مسار الدخول، وتعطيل التهديد، وحماية البيانات دون دفع أي فدية.',
          outcome: 'صفر فدية مدفوعة • كشف هوية المهاجم • استعادة كاملة',
        },
        {
          tag: 'التشهير والابتزاز الإلكتروني',
          title: 'حملة تشهير موجهة ضد رجل أعمال',
          desc: 'حملة ابتزاز وتشويه منظمة عبر رسائل بريد ومراسلات مزورة. أثبتت ميزان التزوير عبر التحليل الجنائي للترويسات الرقمية، وصدر أمر قضائي عاجل بحذف المحتوى خلال 48 ساعة.',
          outcome: 'حذف المحتوى بنسبة 100% • إثبات البراءة • ملاحقة الجناة',
        },
        {
          tag: 'الملكية الفكرية والشركات',
          title: 'سرقة كود برمجي وقاعدة بيانات تجارية',
          desc: 'قام شريك منسحب بسرقة الشيفرة المصدرية وقاعدة عملاء وأطلق منصة منافسة. حصلنا على أمر ضبط وتفتيش جنائي عاجل، وحجزنا الأجهزة، واستصدرنا تعويضات مالية كبرى.',
          outcome: 'صدور أمر قضائي بالحجز • استرداد الأصول • فرض تعويضات',
        },
      ],
    },
    faq: {
      tag: 'الأسئلة الشائعة',
      title: 'إجابات واضحة لاستفساراتك القانونية',
      subtitle: 'كل ما تحتاج معرفته عن خدماتنا، السرية، والتعامل مع الطوارئ.',
      items: [
        {
          q: 'ما الذي يجب عليّ فعله فور تعرض شركتي أو حسابي للاختراق أو الابتزاز؟',
          a: 'لا تقم بإيقاف تشغيل الجهاز أو فورمات النظام لأن أهم الأدلة تكمن في الذاكرة الحية المؤقتة (RAM). لا تتواصل مع المبتز أو تدفع أي مبالغ قبل الرجوع لمحامٍ. اتصل فوراً بخط طوارئ ميزان على الرقم ‎+964 750 449 0696. سنتولى التحفظ على مسرح الجريمة الرقمي وتأمينك فوراً تحت المظلة القانونية.',
        },
        {
          q: 'هل الأدلة والتقارير الرقمية مقبولة رسمياً أمام المحاكم العراقية؟',
          a: 'نعم، طبقاً لقانون الإثبات العراقي وتشريعات مكافحة الجرائم السيبرانية، تُقبل الأدلة الرقمية بشرط سلامة "سلسلة الحيازة" وتطابق البصمات التشفيرية، وتقديمها من جهة خبرة فنية معتمدة. تقارير ميزان تُصاغ تحديداً لتلبي كافة الاشتراطات القضائية وتمنع الطعن فيها.',
        },
        {
          q: 'هل الاستشارة الأولى والمعلومات التي أقدمها مشمولة بالسرية؟',
          a: 'نعم بكل تأكيد. كافة البيانات والمراسلات والوثائق التي تشاركها مع ميزان محمية بحصانة وسرية مهنة المحاماة بموجب القانون. لا يمكن قانوناً إفشاؤها لأي طرف أو جهة دون إذنك وموافقتك الكتابية الصريحة.',
        },
        {
          q: 'هل تقدم ميزان خدماتها وتترافع في قضايا خارج مدينة أربيل؟',
          a: 'نعم، رغم أن مقرنا الرئيسي يقع في أربيل، إلا أن فريقنا يترافع بانتظام في محاكم بغداد ومختلف محافظات العراق وإقليم كوردستان، بالإضافة للتعاون القضائي في القضايا العابرة للحدود.',
        },
        {
          q: 'هل تتعامل ميزان مع القضايا المدنية والتجارية أم الجنائية فقط؟',
          a: 'نتعامل مع الاثنين معاً بكفاءة متساوية. يضم قسم القانون العام لدينا نخبة من المترافعين في القضايا المدنية، النزاعات التجارية، صياغة ومراجعة العقود، قضايا العمل والشركات، وتصفية التركات والنزاعات العقارية.',
        },
      ],
    },
    contact: {
      tag: 'تواصل معنا',
      title: 'اطلب استشارة قانونية سرية',
      subtitle: 'تحدث مباشرة مع مستشارينا القانونيين وخبراء الأدلة الجنائية. كافة الطلبات تخضع للسرية التامة.',
      formTitle: 'نموذج تسجيل القضية',
      formLead: 'املأ النموذج أدناه أو تواصل مع مكتبنا بأربيل مباشرة. في حال الطوارئ أو الابتزاز المستمر، فعّل خيار الأولوية العاجلة.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'مثال: أحمد عبد الله',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'رقم الهاتف / واتساب',
      phonePlaceholder: '+964 750 ...',
      serviceLabel: 'مجال الاستشارة المطلوب',
      serviceOptions: [
        'الدفاع عن الجرائم الإلكترونية ومكافحة الابتزاز',
        'الأدلة الجنائية الرقمية وفحص الأجهزة',
        'قضايا القانون العام والتقاضي والشركات',
        'الملكية الفكرية وحماية العلامات',
        'استشارة عامة / موضوع آخر',
      ],
      messageLabel: 'وصف مختصر للقضية أو الاستفسار',
      messagePlaceholder: 'يرجى تقديم نبذة عن طبيعة القضية، التوقيت، وأي مهل زمنية عاجلة...',
      priorityCheckbox: 'هذه حالة طارئة نشطة أو ابتزاز إلكتروني جارٍ حالياً',
      submitBtn: 'إرسال الاستشارة بسرية',
      submittingBtn: 'جارٍ التشفير والإرسال...',
      successMsg: 'تم إرسال استشارتك بأمان وسرية تامة. سيراجع فريقنا القانوني تفاصيل الحالة ويتواصل معك في أقرب وقت.',
      errorMsg: 'تعذر إرسال النموذج. يرجى الاتصال المباشر على الخط الساخن: ‎+964 750 449 0696',
      infoTitle: 'المكتب الرئيسي والطوارئ',
      locationLabel: 'الموقع الرئيسي',
      locationValue: 'أربيل، إقليم كوردستان، العراق',
      phoneLabel2: 'الخط المباشر 24/7',
      phoneValue: '‎+964 750 449 0696',
      emailLabel2: 'المراسلات الرسمية',
      emailValue: 'Contact@The-Mizan.net',
      whatsappBtn: 'محادثة سريعة عبر واتساب',
      securityNotice: 'محمي بحصانة وسرية المحاماة. كافة الفحوصات والبيانات تُدار وفق أعلى معايير الحماية الرقمية وعدم الإفصاح.',
    },
    footer: {
      desc: 'شركة ميزان للمحاماة والاستشارات القانونية والأدلة الرقمية، تحمي حقوقك وتدافع عن مصالحك في الواقع والعالم الرقمي.',
      navTitle: 'خريطة الموقع',
      practiceTitle: 'مجالات الممارسة',
      contactTitle: 'المقر الرئيسي',
      disclaimer: 'إخلاء مسؤولية: المواد المنشورة على هذا الموقع هي لأغراض إعلامية عامة ولا تعد استشارة قانونية رسمية. التواصل مع الشركة لا يُنشئ علاقة توكيل رسمية إلا بعد توقيع عقد اتفاق رسمي.',
      copyright: '© 2026 شركة ميزان للمحاماة. جميع الحقوق محفوظة.',
    },
  },
};

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openFaq, setOpenFaq] = useState(0);
  const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success | error
  const [isPriority, setIsPriority] = useState(false);

  // Initialize Language from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('mizan-lang');
    if (saved === 'ar' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  // Update DOM direction when language changes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mizan-lang', language);
  }, [language, mounted]);

  // Sticky header: raise on scroll
  useEffect(() => {
    if (!mounted) return;
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mounted]);

  // Scroll-reveal animations (SSR-safe, gated by .js-anim)
  // Elements are "revealed" exactly once and never re-hidden, so
  // interactive content (FAQ answers, tabs, etc.) can't flicker.
  const revealRef = useRef(null);
  useEffect(() => {
    if (!mounted) return;
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.classList.add('js-anim');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => io.observe(el));
    revealRef.current = io;

    // Keep newly mounted elements (e.g. FAQ answers) revealed automatically.
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const fresh =
            node.matches?.('[data-reveal]')
              ? [node]
              : Array.from(node.querySelectorAll?.('[data-reveal]') || []);
          fresh.forEach((el) => {
            if (revealRef.current) revealRef.current.unobserve(el);
            el.classList.add('in');
          });
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      revealRef.current = null;
      document.body.classList.remove('js-anim');
    };
  }, [mounted]);

  const t = CONTENT[language] || CONTENT.en;

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setIsNavOpen(false);
    const elem = document.querySelector(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setFormStatus('loading');

    try {
      const formData = new FormData(form);
      if (isPriority) {
        formData.set('_subject', '🚨 [URGENT CYBER INCIDENT] Priority Intake - Mizan Law');
      } else {
        formData.set('_subject', 'New Confidential Intake - Mizan Law Firm');
      }

      const res = await fetch('https://formspree.io/f/xzzjzbbk', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (res.ok) {
        setFormStatus('success');
        form.reset();
        setIsPriority(false);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* Top Emergency Incident Banner */}
      <div className="emergency-bar" role="region" aria-label="Emergency Announcement">
        <div className="container">
          <div className="emergency-inner">
            <span className="emergency-pulse" aria-hidden="true"></span>
            <span>{t.emergencyBanner}</span>
            <a href="tel:+9647504490696" className="emergency-link">
              <i className="fas fa-phone-volume"></i> {t.emergencyHotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header" role="banner">
        <div className="container navbar">
          {/* Brand */}
          <a href="#home" className="brand" onClick={(e) => handleSmoothScroll(e, '#home')} aria-label="Mizan Law Firm">
            <img
              src="/images/mizan-logo-transparent.png"
              alt="Mizan Law Firm Logo"
              className="brand-logo-img"
              width="54"
              height="44"
              loading="eager"
            />
            <div className="brand-text">
              <span className="brand-title">
                MIZAN 
              </span>
              <span className="brand-sub">{t.brandTagline}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="nav-links">
              <li>
                <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleSmoothScroll(e, '#home')}>
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#why-mizan" onClick={(e) => handleSmoothScroll(e, '#why-mizan')}>
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#methodology" onClick={(e) => handleSmoothScroll(e, '#methodology')}>
                  {t.nav.methodology}
                </a>
              </li>
              <li>
                <a href="#cases" onClick={(e) => handleSmoothScroll(e, '#cases')}>
                  {t.nav.cases}
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')}>
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </nav>

          {/* Header Action Tools */}
          <div className="header-actions">
            {/* Language Switcher Pill */}
            <div className="lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => toggleLanguage('en')}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
                onClick={() => toggleLanguage('ar')}
                aria-pressed={language === 'ar'}
              >
                عربي
              </button>
            </div>

            {/* Quick Action Hotline Button */}
            <a href="tel:+9647504490696" className="btn btn-emergency btn-sm" style={{ display: 'none' }}>
              <i className="fas fa-bolt"></i> {t.nav.urgentCall}
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <i className={isNavOpen ? 'fas fa-xmark' : 'fas fa-bars'}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Drawer */}
      <div className={`mobile-drawer-overlay ${isNavOpen ? 'open' : ''}`} onClick={() => setIsNavOpen(false)}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <span className="brand-title">
              MIZAN 
            </span>
            <button type="button" className="mobile-close-btn" onClick={() => setIsNavOpen(false)} aria-label="Close menu">
              <i className="fas fa-xmark"></i>
            </button>
          </div>

          <ul className="mobile-nav-links">
            <li>
              <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
                <span>{t.nav.home}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#why-mizan" onClick={(e) => handleSmoothScroll(e, '#why-mizan')}>
                <span>{t.nav.about}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                <span>{t.nav.services}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#methodology" onClick={(e) => handleSmoothScroll(e, '#methodology')}>
                <span>{t.nav.methodology}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#cases" onClick={(e) => handleSmoothScroll(e, '#cases')}>
                <span>{t.nav.cases}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')}>
                <span>{t.nav.faq}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                <span>{t.nav.contact}</span>
                <i className="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="tel:+9647504490696" className="btn btn-emergency">
              <i className="fas fa-phone-volume"></i> {t.emergencyHotline}
            </a>
            <a
              href="https://wa.me/9647504490696"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fab fa-whatsapp"></i> {t.contact.whatsappBtn}
            </a>
          </div>
        </div>
      </div>

      <main id="main">
        {/* ==========================================================================
            HERO SECTION
            ========================================================================== */}
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            {/* Left: Content */}
            <div className="hero-content">
              <h1 id="hero-title" className="hero-title">
                {t.hero.titleStart} <span className="gradient-text">{t.hero.titleGradient}</span>
              </h1>
              <p className="hero-lead">{t.hero.lead}</p>

              {/* Specialization Pills */}
              <div className="hero-pills">
                {t.hero.pills.map((pill, idx) => (
                  <span key={idx} className="hero-pill">
                    <i className={`fas ${pill.icon}`}></i> {pill.text}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="hero-cta">
                <a href="#contact" className="btn btn-gold" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                  <i className="fas fa-calendar-check"></i> {t.hero.ctaPrimary}
                </a>
                <a href="tel:+9647504490696" className="btn btn-emergency">
                  <i className="fas fa-bolt"></i> {t.hero.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Right: Centerpiece Image */}
            <div className="hero-visual">
              <div className="hero-image-frame">
                <div className="hero-image-inner">
                  <img
                    src="/images/mizan-image-transparent.png"
                    alt="Mizan Law Firm — scales of justice"
                    className="hero-image"
                    loading="eager"
                  />
                </div>
                <div className="hero-image-seal">
                  <i className="fas fa-shield-halved"></i>
                  <span>MIZAN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            WHY MIZAN (THE HYBRID ADVANTAGE)
            ========================================================================== */}
        <section id="why-mizan" className="section section--alt" aria-labelledby="why-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.whyMizan.tag}</span>
              <h2 id="why-title" className="section-title">
                {t.whyMizan.title}
              </h2>
              <p className="section-subtitle">{t.whyMizan.subtitle}</p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="hybrid-grid">
              {t.whyMizan.cards.map((c, i) => (
                <div key={i} className="hybrid-card" data-reveal style={{ '--d': i }}>
                  <div className="hybrid-icon-wrap">
                    <i className={`fas ${c.icon}`}></i>
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Comparison Matrix */}
            <div className="comparison-box">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span className="section-tag">{t.whyMizan.comparisonTag}</span>
                <h3 style={{ fontSize: '1.5rem', color: '#F8F4EC' }}>{t.whyMizan.comparisonTitle}</h3>
              </div>
              <div className="comparison-grid">
                <div className="comparison-col">
                  <div className="col-tag">Conventional</div>
                  <div className="col-title">{t.whyMizan.compTradTitle}</div>
                  <ul>
                    {t.whyMizan.compTradList.map((item, idx) => (
                      <li key={idx}>
                        <i className="fas fa-xmark" style={{ color: '#ef4444' }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="comparison-col">
                  <div className="col-tag">Technical Only</div>
                  <div className="col-title">{t.whyMizan.compITTitle}</div>
                  <ul>
                    {t.whyMizan.compITList.map((item, idx) => (
                      <li key={idx}>
                        <i className="fas fa-triangle-exclamation" style={{ color: '#f59e0b' }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="comparison-col highlight">
                  <div className="col-tag">Unrivaled Protection</div>
                  <div className="col-title">{t.whyMizan.compMizanTitle}</div>
                  <ul>
                    {t.whyMizan.compMizanList.map((item, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check" style={{ color: '#B89445' }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            PRACTICE AREAS (SERVICES)
            ========================================================================== */}
        <section id="services" className="section" aria-labelledby="services-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.services.tag}</span>
              <h2 id="services-title" className="section-title">
                {t.services.title}
              </h2>
              <p className="section-subtitle">{t.services.subtitle}</p>
            </div>

            <div className="services-grid">
              {t.services.items.map((svc) => (
                <div key={svc.slug} className="service-card" data-reveal>
                  <div>
                    <div className="service-card-top">
                      <div className="service-icon-box">
                        <i className={`fas ${svc.icon}`}></i>
                      </div>
                      <span className="service-num">{svc.num}</span>
                    </div>

                    <h3>{svc.title}</h3>
                    <p>{svc.desc}</p>

                    <ul className="service-capabilities">
                      {svc.capabilities.map((cap, i) => (
                        <li key={i}>
                          <i className="fas fa-chevron-right"></i>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-card-action">
                    <Link href={`/services/${svc.slug}`} className="service-link">
                      <span>{svc.linkText}</span>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                    <a
                      href="#contact"
                      className="btn btn-ink btn-sm"
                      onClick={(e) => handleSmoothScroll(e, '#contact')}
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            4-PHASE DEFENSE METHODOLOGY
            ========================================================================== */}
        <section id="methodology" className="section section--dark" aria-labelledby="method-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.methodology.tag}</span>
              <h2 id="method-title" className="section-title">
                {t.methodology.title}
              </h2>
              <p className="section-subtitle">{t.methodology.subtitle}</p>
            </div>

            <div className="workflow-track">
              {t.methodology.steps.map((st, i) => (
                <div key={i} className="workflow-step" data-reveal style={{ '--d': i }}>
                  <div className="step-medallion">{i + 1}</div>
                  <span className="step-number">{st.num}</span>
                  <h3>{st.title}</h3>
                  <p>{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            SELECTED CLIENTS & PARTNERS
            ========================================================================== */}
        <section className="section" style={{ padding: '40px 0' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '30px' }} data-reveal>
              <span className="section-tag">{t.clients.tag}</span>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>
                {t.clients.title}
              </h2>
              <p className="section-subtitle">{t.clients.subtitle}</p>
            </div>

            <div className="clients-strip">
              <div className="client-card">
                <img src="/images/alhusun.jpeg" alt="Alhusun" loading="lazy" />
              </div>
              <div className="client-card">
                <img src="/images/sinjari.jpeg" alt="Sinjari" loading="lazy" />
              </div>
              <div className="client-card">
                <img src="/images/getfit.jpeg" alt="GetFit" loading="lazy" />
              </div>
              <div className="client-card">
                <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-emerald)', opacity: 0.85 }}>
                  +
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            CASE STUDIES / TRACK RECORD
            ========================================================================== */}
        <section id="cases" className="section section--alt" aria-labelledby="cases-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.cases.tag}</span>
              <h2 id="cases-title" className="section-title">
                {t.cases.title}
              </h2>
              <p className="section-subtitle">{t.cases.subtitle}</p>
            </div>

            <div className="cases-grid">
              {t.cases.items.map((item, i) => (
                <div key={i} className="case-card" data-reveal style={{ '--d': i }}>
                  <div className="case-tag">{item.tag}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="case-outcome">
                    <i className="fas fa-circle-check"></i>
                    <span>{item.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            INTERACTIVE FAQ ACCORDION
            ========================================================================== */}
        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.faq.tag}</span>
              <h2 id="faq-title" className="section-title">
                {t.faq.title}
              </h2>
              <p className="section-subtitle">{t.faq.subtitle}</p>
            </div>

            <div className="faq-list">
              {t.faq.items.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </button>
                    {isOpen && <div className="faq-answer">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            CONFIDENTIAL INTAKE & CONTACT HUB
            ========================================================================== */}
        <section id="contact" className="section section--dark" aria-labelledby="contact-title">
          <div className="container">
            <div className="section-header" data-reveal>
              <span className="section-tag">{t.contact.tag}</span>
              <h2 id="contact-title" className="section-title">
                {t.contact.title}
              </h2>
              <p className="section-subtitle">{t.contact.subtitle}</p>
            </div>

            <div className="contact-hub-grid">
              {/* Left: Interactive Intake Form */}
              <div className="contact-card-glass">
                <h3>{t.contact.formTitle}</h3>
                <p className="lead-text">{t.contact.formLead}</p>

                <form className="intake-form" onSubmit={handleFormSubmit}>
                  {/* Priority Incident Toggle */}
                  <label className="priority-checkbox">
                    <input
                      type="checkbox"
                      checked={isPriority}
                      onChange={(e) => setIsPriority(e.target.checked)}
                    />
                    <span>
                      <i className="fas fa-triangle-exclamation"></i> {t.contact.priorityCheckbox}
                    </span>
                  </label>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="client-name">
                        {t.contact.nameLabel} *
                      </label>
                      <input
                        id="client-name"
                        name="name"
                        type="text"
                        required
                        className="form-input"
                        placeholder={t.contact.namePlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="client-email">
                        {t.contact.emailLabel} *
                      </label>
                      <input
                        id="client-email"
                        name="email"
                        type="email"
                        required
                        className="form-input"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label" htmlFor="client-phone">
                        {t.contact.phoneLabel} *
                      </label>
                      <input
                        id="client-phone"
                        name="phone"
                        type="tel"
                        required
                        className="form-input"
                        placeholder={t.contact.phonePlaceholder}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="client-service">
                        {t.contact.serviceLabel}
                      </label>
                      <select
                        id="client-service"
                        name="service_requested"
                        className="form-input"
                        style={{ appearance: 'auto' }}
                      >
                        {t.contact.serviceOptions.map((opt, i) => (
                          <option key={i} value={opt} style={{ background: '#4A0008', color: '#F8F4EC' }}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="client-message">
                      {t.contact.messageLabel} *
                    </label>
                    <textarea
                      id="client-message"
                      name="message"
                      required
                      className="form-textarea"
                      placeholder={t.contact.messagePlaceholder}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`btn ${isPriority ? 'btn-emergency' : 'btn-gold'}`}
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> {t.contact.submittingBtn}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> {t.contact.submitBtn}
                      </>
                    )}
                  </button>

                  {formStatus === 'success' && (
                    <div className="form-status success">
                      <i className="fas fa-circle-check"></i> {t.contact.successMsg}
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="form-status error">
                      <i className="fas fa-circle-xmark"></i> {t.contact.errorMsg}
                    </div>
                  )}
                </form>
              </div>

              {/* Right: Office & Direct Emergency Hotline */}
              <div className="contact-card-glass">
                <h3>{t.contact.infoTitle}</h3>
                <p className="lead-text">
                  {language === 'en'
                    ? 'Immediate access to licensed legal advocates and digital forensic investigators.'
                    : 'وصول مباشر وفوري لمحامين مرخصين وخبراء معتمدين في الأدلة الجنائية.'}
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="info-icon">
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div className="info-body">
                      <h4>{t.contact.locationLabel}</h4>
                      <p>{t.contact.locationValue}</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}>
                      <i className="fas fa-phone-volume"></i>
                    </div>
                    <div className="info-body">
                      <h4>{t.contact.phoneLabel2}</h4>
                      <p>
                        <a href="tel:+9647504490696">{t.contact.phoneValue}</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="info-icon">
                      <i className="fas fa-envelope-open-text"></i>
                    </div>
                    <div className="info-body">
                      <h4>{t.contact.emailLabel2}</h4>
                      <p>
                        <a href="mailto:Contact@The-Mizan.net">{t.contact.emailValue}</a>
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/9647504490696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fab fa-whatsapp"></i> {t.contact.whatsappBtn}
                </a>

                <div className="security-badge-box">
                  <i className="fas fa-user-lock"></i>
                  <p>{t.contact.securityNotice}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
          GLOBAL FOOTER
          ========================================================================== */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-top">
            {/* Brand column */}
            <div className="footer-brand">
              <span className="brand-title">
                MIZAN 
              </span>
              <p>{t.footer.desc}</p>
              <div style={{ marginTop: '18px', display: 'flex', gap: '12px' }}>
                <a
                  href="https://wa.me/9647504490696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-icon"
                  style={{ width: '38px', height: '38px', fontSize: '1rem' }}
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="tel:+9647504490696"
                  className="info-icon"
                  style={{ width: '38px', height: '38px', fontSize: '1rem' }}
                  aria-label="Phone"
                >
                  <i className="fas fa-phone"></i>
                </a>
                <a
                  href="mailto:Contact@The-Mizan.net"
                  className="info-icon"
                  style={{ width: '38px', height: '38px', fontSize: '1rem' }}
                  aria-label="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>

            {/* Navigation links */}
            <div className="footer-col">
              <h4>{t.footer.navTitle}</h4>
              <ul className="footer-links">
                <li>
                  <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#why-mizan" onClick={(e) => handleSmoothScroll(e, '#why-mizan')}>
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#methodology" onClick={(e) => handleSmoothScroll(e, '#methodology')}>
                    {t.nav.methodology}
                  </a>
                </li>
                <li>
                  <a href="#cases" onClick={(e) => handleSmoothScroll(e, '#cases')}>
                    {t.nav.cases}
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => handleSmoothScroll(e, '#faq')}>
                    {t.nav.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Practice Areas */}
            <div className="footer-col">
              <h4>{t.footer.practiceTitle}</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/services/cybercrime-defense">
                    {language === 'en' ? 'Cybercrime Defense' : 'الدفاع السيبراني'}
                  </Link>
                </li>
                <li>
                  <Link href="/services/digital-forensics">
                    {language === 'en' ? 'Digital Forensics' : 'الأدلة الرقمية'}
                  </Link>
                </li>
                <li>
                  <Link href="/services/general-law">
                    {language === 'en' ? 'General Litigation' : 'القانون العام والتقاضي'}
                  </Link>
                </li>
                <li>
                  <Link href="/services/ip-rights">
                    {language === 'en' ? 'IP & Online Rights' : 'الملكية الفكرية'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Headquarters details */}
            <div className="footer-col">
              <h4>{t.footer.contactTitle}</h4>
              <ul className="footer-links" style={{ gap: '14px' }}>
                <li style={{ color: '#C4A98F' }}>
                  <i className="fas fa-location-dot" style={{ color: '#B89445', marginRight: '8px' }}></i>
                  {t.contact.locationValue}
                </li>
                <li>
                  <i className="fas fa-phone" style={{ color: '#B89445', marginRight: '8px' }}></i>
                  <a href="tel:+9647504490696">+964 750 449 0696</a>
                </li>
                <li>
                  <i className="fas fa-envelope" style={{ color: '#B89445', marginRight: '8px' }}></i>
                  <a href="mailto:Contact@The-Mizan.net">Contact@The-Mizan.net</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-disclaimer">{t.footer.disclaimer}</p>
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
