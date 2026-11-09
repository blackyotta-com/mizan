'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IPRights() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('mizan-lang') || 'en';
    setLanguage(saved);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.title =
      language === 'en'
        ? 'Intellectual Property & Digital Rights | Mizan Law Firm'
        : 'الملكية الفكرية والحقوق الرقمية | شركة ميزان للمحاماة';
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mizan-lang', language);
  }, [language, mounted]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  const isAr = language === 'ar';

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container navbar">
          <Link href="/" className="brand">
            <img
              src="/images/mizan-logo.png"
              alt="Mizan Logo"
              className="brand-logo-img"
              width="48"
              height="40"
            />
            <div className="brand-text">
              <span className="brand-title">
                MIZAN <span className="brand-badge">LAW</span>
              </span>
              <span className="brand-sub">
                {isAr ? 'الملكية الفكرية والعلامات' : 'Intellectual Property & Brand Defense'}
              </span>
            </div>
          </Link>

          <div className="header-actions">
            <div className="lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-btn ${!isAr ? 'active' : ''}`}
                onClick={() => toggleLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${isAr ? 'active' : ''}`}
                onClick={() => toggleLanguage('ar')}
              >
                عربي
              </button>
            </div>
            <Link href="/#services" className="btn btn-outline btn-sm">
              <i className={`fas ${isAr ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Services'}</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" className="service-subpage">
        <div className="container">
          <nav className="service-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <i className={`fas ${isAr ? 'fa-chevron-left' : 'fa-chevron-right'}`} style={{ fontSize: '0.7rem' }}></i>
            <Link href="/#services">{isAr ? 'مجالات الممارسة' : 'Practice Areas'}</Link>
            <i className={`fas ${isAr ? 'fa-chevron-left' : 'fa-chevron-right'}`} style={{ fontSize: '0.7rem' }}></i>
            <span style={{ color: '#00f29d' }}>
              {isAr ? 'الملكية الفكرية' : 'IP & Rights'}
            </span>
          </nav>

          <div className="subpage-hero">
            <span className="section-tag">
              <i className="fas fa-copyright"></i> {isAr ? 'حماية الأصول غير الملموسة' : 'Intangible Asset Protection'}
            </span>
            <h1 className="subpage-hero-title">
              {isAr ? 'الملكية الفكرية والعلامات التجارية والحقوق الرقمية' : 'Intellectual Property, Brand Enforcement & Anti-Piracy'}
            </h1>
            <p className="subpage-hero-desc">
              {isAr
                ? 'حماية متكاملة للأصول الفكرية والعلامات التجارية وبراءات الاختراع والبرمجيات، مع إجراءات رادعة وسريعة لإغلاق منصات القرصنة ومصادرة السلع المقلدة.'
                : 'Comprehensive legal and technical safeguarding of trademarks, proprietary software, copyright assets, and trade secrets—paired with swift cross-border anti-piracy enforcement and DMCA takedowns.'}
            </p>
            <div className="subpage-pills">
              {(isAr
                ? ['تسجيل العلامات', 'مكافحة القرصنة', 'حماية الأكواد البرمجية', 'براءات الاختراع', 'الأسرار التجارية', 'مصادرة المقلدات']
                : ['Trademark Registration', 'Anti-Piracy Enforcement', 'Source Code Protection', 'Patent Strategy', 'Trade Secrets', 'Counterfeit Seizures']
              ).map((pill, i) => (
                <span key={i} className="subpage-pill">
                  <i className="fas fa-check" style={{ marginRight: '6px' }}></i> {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="service-content-grid">
            <div className="service-main-text">
              <h2>{isAr ? 'حماية الهوية والأصول الرقمية' : 'Strategic Brand Enforcement & Digital Rights'}</h2>
              <p>
                {isAr
                  ? 'تمثل الأصول الفكرية والهوية التجارية القيمة الأكبر لأي مشروع ناجح. في عالم تتسارع فيه عمليات النسخ الرقمي وانتحال العلامات عبر وسائل التواصل والمتاجر الإلكترونية، تتدخل ميزان بحلول قانونية وتقنية لحفظ أسبقيتك ومصادرة التعديات.'
                  : 'In today’s hyper-connected marketplace, intellectual property represents an organization’s most valuable balance-sheet asset. When rogue competitors clone software, infringe on registered trademarks, or distribute counterfeit goods, Mizan executes swift enforcement.'}
              </p>

              <h2>{isAr ? 'خدمات حماية الملكية الفكرية' : 'Core IP Services & Enforcements'}</h2>
              <ul className="service-list-block">
                <li>
                  <i className="fas fa-trademark"></i>
                  <div>
                    <strong>{isAr ? 'تسجيل وحماية العلامات التجارية:' : 'Trademark Portfolio & Brand Governance:'}</strong>{' '}
                    {isAr
                      ? 'إجراءات التسجيل الرسمي لدى مديرية الملكية الصناعية، مراقبة المنصات التجارية لمنع تسجيل علامات مشابهة، وملاحقة الانتحال.'
                      : 'Filing, opposition, and trademark portfolio management before regional trademark registries, ensuring robust brand exclusivity.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-ban"></i>
                  <div>
                    <strong>{isAr ? 'إجراءات مكافحة القرصنة والإغلاق الفوري:' : 'Digital Anti-Piracy & Content Takedowns:'}</strong>{' '}
                    {isAr
                      ? 'إرسال إخطارات الإزالة الرسمية (DMCA) إلى خوادم الاستضافة ومتاجر التطبيقات لحذف المحتوى المقرصن والروابط غير المشروعة فوراً.'
                      : 'Aggressive takedown notices issued directly to hosting providers, social media platforms, app stores, and domain registrars.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-file-code"></i>
                  <div>
                    <strong>{isAr ? 'حماية الأكواد البرمجية والأسرار التجارية:' : 'Source Code & Trade Secret Defense:'}</strong>{' '}
                    {isAr
                      ? 'صياغة اتفاقيات عدم الإفصاح (NDA) المحكمة، وإقامة الدعاوى العاجلة ضد الموظفين أو الشركاء الذين ينتهكون حقوق البرمجيات المصدرية.'
                      : 'Enforcing strict restrictive covenants, non-compete clauses, and litigating against software source code theft or proprietary database leaks.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-boxes-packing"></i>
                  <div>
                    <strong>{isAr ? 'مصادرة السلع المقلدة والمنافسة غير المشروعة:' : 'Anti-Counterfeiting & Customs Seizures:'}</strong>{' '}
                    {isAr
                      ? 'التعاون مع السلطات الجمركية لضبط البضائع المقلدة عند المنافذ الحدودية، واستصدار أحكام قضائية بمصادرتها وإتلافها والمطالبة بالتعويض.'
                      : 'Coordinating with border customs and judicial authorities to intercept counterfeit imports, conduct physical market raids, and claim statutory damages.'}
                  </div>
                </li>
              </ul>
            </div>

            <aside className="service-sidebar">
              <div className="sidebar-cta-card">
                <span className="section-tag" style={{ marginBottom: '14px' }}>
                  {isAr ? 'حماية العلامة التجارية' : 'Brand Protection'}
                </span>
                <h3>{isAr ? 'هل تتعرض علامتك للقرصنة أو التقليد؟' : 'Brand Cloned or Content Infringed?'}</h3>
                <p>
                  {isAr
                    ? 'اتخذ إجراءات الردع القانونية فوراً لوقف التعدي وحفظ حقوقك المالية والمعنوية.'
                    : 'Stop IP dilution and rogue counterfeiters today. Initiate rapid enforcement.'}
                </p>
                <Link href="/#contact" className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }}>
                  <i className="fas fa-shield"></i> {isAr ? 'طلب حماية فكرية' : 'Initiate Enforcement'}
                </Link>
                <a href="tel:+9647504490696" className="btn btn-outline" style={{ width: '100%' }}>
                  <i className="fas fa-phone"></i> +964 750 449 0696
                </a>
              </div>

              <div className="contact-card-glass" style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '16px' }}>
                  {isAr ? 'مجالات ممارسة أخرى' : 'Other Practice Areas'}
                </h4>
                <ul className="footer-links" style={{ gap: '12px' }}>
                  <li>
                    <Link href="/services/cybercrime-defense">
                      <i className="fas fa-shield-halved" style={{ color: '#00f29d', marginRight: '8px' }}></i>
                      {isAr ? 'الدفاع عن الجرائم الإلكترونية' : 'Cybercrime Defense'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/digital-forensics">
                      <i className="fas fa-magnifying-glass-chart" style={{ color: '#00f29d', marginRight: '8px' }}></i>
                      {isAr ? 'الأدلة الجنائية الرقمية' : 'Digital Forensics'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/general-law">
                      <i className="fas fa-scale-balanced" style={{ color: '#00f29d', marginRight: '8px' }}></i>
                      {isAr ? 'القانون العام والتقاضي' : 'General Litigation'}
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
            {isAr
              ? '© 2026 شركة ميزان للمحاماة والاستشارات القانونية والأدلة الرقمية. جميع الحقوق محفوظة.'
              : '© 2026 Mizan Law Firm. Legal Services & Cyber Defense. All rights reserved.'}
          </p>
        </div>
      </footer>
    </>
  );
}
