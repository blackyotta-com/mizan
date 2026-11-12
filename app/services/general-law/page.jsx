'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GeneralLaw() {
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
        ? 'General Law & Litigation | Mizan Law Firm'
        : 'القانون العام والتقاضي والشركات | شركة ميزان للمحاماة';
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
                {isAr ? 'القانون العام والمرافعة' : 'Litigation & Corporate Law'}
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
            <Link href="/#services" className="btn btn-ghost btn-sm">
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
            <span style={{ color: '#B89445' }}>
              {isAr ? 'القانون العام والتقاضي' : 'General Litigation'}
            </span>
          </nav>

          <div className="subpage-hero">
            <span className="section-tag">
              <i className="fas fa-scale-balanced"></i> {isAr ? 'خبرة قضائية راسخة' : 'Commanding Courtroom Advocacy'}
            </span>
            <h1 className="subpage-hero-title">
              {isAr ? 'القانون العام والتقاضي ومنازعات الشركات' : 'General Litigation, Corporate Disputes & Criminal Defense'}
            </h1>
            <p className="subpage-hero-desc">
              {isAr
                ? 'تمثيل قضائي رفيع المستوى أمام محاكم الجنايات والجنح والمحاكم المدنية والتجارية ولجان التحكيم في إقليم كوردستان وعموم العراق.'
                : 'Formidable trial advocacy across commercial contract disputes, criminal investigations, real estate transactions, corporate governance conflicts, and family asset governance.'}
            </p>
            <div className="subpage-pills">
              {(isAr
                ? ['الدفاع الجنائي', 'التحكيم التجاري', 'النزاعات العقارية', 'قضايا العمل', 'منازعات الشركاء', 'التركات والأسرة']
                : ['Criminal Defense', 'Commercial Arbitration', 'Real Estate Conflicts', 'Employment Law', 'Shareholder Disputes', 'Family Estates']
              ).map((pill, i) => (
                <span key={i} className="subpage-pill">
                  <i className="fas fa-check" style={{ marginRight: '6px' }}></i> {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="service-content-grid">
            <div className="service-main-text">
              <h2>{isAr ? 'استراتيجية تقاضٍ تركز على النتيجة' : 'Outcome-Driven Courtroom Strategy'}</h2>
              <p>
                {isAr
                  ? 'يضم قسم القانون العام في شركة ميزان محامين متمرسين يمتلكون فهماً عميقاً للقوانين العراقية وقوانين إقليم كوردستان، مع قدرة فائقة على صياغة اللوائح القانونية المحكمة وإدارة استجواب الشهود والترافع الشفهي المؤثر أمام القضاء.'
                  : 'Mizan’s general litigation practice brings seasoned trial advocates who possess profound mastery of Iraqi federal jurisprudence and Kurdistan Regional statutory frameworks. We combine meticulous case preparation with persuasive oral argument.'}
              </p>

              <h2>{isAr ? 'تخصصات ومجالات التمثيل' : 'Core Litigation Disciplines'}</h2>
              <ul className="service-list-block">
                <li>
                  <i className="fas fa-gavel"></i>
                  <div>
                    <strong>{isAr ? 'الدفاع الجنائي والتحقيقات القضائية:' : 'Criminal Defense & Special Inquiries:'}</strong>{' '}
                    {isAr
                      ? 'التمثيل أمام قضاة التحقيق ومحاكم الجنايات في قضايا الأموال العامة، الجرائم المالية، خيانة الأمانة، والاتهامات الجنائية المعقدة.'
                      : 'Representation during preliminary investigative hearings and before criminal felony courts for financial offenses, breach of trust, and complex defense matters.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-building-columns"></i>
                  <div>
                    <strong>{isAr ? 'النزاعات التجارية والتحكيم:' : 'Commercial Disputes & Contract Arbitration:'}</strong>{' '}
                    {isAr
                      ? 'فض منازعات الإخلال بالعقود، خلافات التوريد والشراكة، مطالبات التعويض المالي، والتحكيم التجاري المحلي والدولي.'
                      : 'Enforcing contract breach remedies, supply-chain litigation, partnership dissolutions, cross-border commercial arbitration, and monetary debt recovery.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-house-chimney"></i>
                  <div>
                    <strong>{isAr ? 'القضايا العقارية وتوثيق الملكيات:' : 'Real Estate Litigation & Title Disputes:'}</strong>{' '}
                    {isAr
                      ? 'حماية حقوق الملكية العقارية، إخلاء العقارات، فسخ عقود البيع والإيجار، وحل تداخلات التسجيل العقاري والتطوير.'
                      : 'Resolving land registry conflicts, commercial lease enforcement, real estate developer claims, and property title defense.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-users"></i>
                  <div>
                    <strong>{isAr ? 'قضايا الأحوال الشخصية والتركات:' : 'Family Law & Private Wealth Succession:'}</strong>{' '}
                    {isAr
                      ? 'إدارة وتقسيم التركات المعقدة للشركات العائلية، حصر الإرث، وقضايا الحضانة والنفقة بأسلوب يحفظ الخصوصية والكرامة.'
                      : 'Discreet resolution of high-net-worth estate distributions, corporate inheritance restructuring, and delicate family law advocacy.'}
                  </div>
                </li>
              </ul>
            </div>

            <aside className="service-sidebar">
              <div className="sidebar-cta-card">
                <span className="section-tag" style={{ marginBottom: '14px' }}>
                  {isAr ? 'استشارة قانونية' : 'Case Consultation'}
                </span>
                <h3>{isAr ? 'هل تواجه دعوى قضائية أو نزاعاً تجارياً؟' : 'Facing Litigation or Commercial Conflict?'}</h3>
                <p>
                  {isAr
                    ? 'احصل على تقييم قانوني دقيق لموقفك القضائي وتحديد أفضل استراتيجيات كسب الدعوى.'
                    : 'Gain strategic clarity and establish aggressive courtroom representation immediately.'}
                </p>
                <Link href="/#contact" className="btn btn-gold" style={{ width: '100%', marginBottom: '10px' }}>
                  <i className="fas fa-calendar-check"></i> {isAr ? 'طلب استشارة قضائية' : 'Schedule Consultation'}
                </Link>
                <a href="tel:+9647504490696" className="btn btn-ink" style={{ width: '100%' }}>
                  <i className="fas fa-phone"></i> +964 750 449 0696
                </a>
              </div>

              <div className="sidebar-links-card">
                <h4 style={{ fontSize: '1rem', color: '#F8F4EC', marginBottom: '16px' }}>
                  {isAr ? 'مجالات ممارسة أخرى' : 'Other Practice Areas'}
                </h4>
                <ul className="sidebar-links-list">
                  <li>
                    <Link href="/services/cybercrime-defense">
                      <i className="fas fa-shield-halved" style={{ color: '#B89445', marginRight: '8px' }}></i>
                      {isAr ? 'الدفاع عن الجرائم الإلكترونية' : 'Cybercrime Defense'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/digital-forensics">
                      <i className="fas fa-magnifying-glass-chart" style={{ color: '#B89445', marginRight: '8px' }}></i>
                      {isAr ? 'الأدلة الجنائية الرقمية' : 'Digital Forensics'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/ip-rights">
                      <i className="fas fa-copyright" style={{ color: '#B89445', marginRight: '8px' }}></i>
                      {isAr ? 'الملكية الفكرية والعلامات' : 'IP & Online Rights'}
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
          <p style={{ fontSize: '0.88rem', color: '#C4A98F' }}>
            {isAr
              ? '© 2026 شركة ميزان للمحاماة والاستشارات القانونية والأدلة الرقمية. جميع الحقوق محفوظة.'
              : '© 2026 Mizan Law Firm. Legal Services & Cyber Defense. All rights reserved.'}
          </p>
        </div>
      </footer>
    </>
  );
}
