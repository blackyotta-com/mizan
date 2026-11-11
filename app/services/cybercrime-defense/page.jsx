'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CybercrimeDefense() {
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
        ? 'Cybercrime Defense & Anti-Extortion | Mizan Law Firm'
        : 'الدفاع عن الجرائم الإلكترونية ومكافحة الابتزاز | شركة ميزان للمحاماة';
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
      {/* Header */}
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
                {isAr ? 'الدفاع السيبراني والتحقيقات' : 'Cyber Defense & Forensics'}
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

      {/* Main Content */}
      <main id="main" className="service-subpage">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="service-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">{isAr ? 'الرئيسية' : 'Home'}</Link>
            <i className={`fas ${isAr ? 'fa-chevron-left' : 'fa-chevron-right'}`} style={{ fontSize: '0.7rem' }}></i>
            <Link href="/#services">{isAr ? 'مجالات الممارسة' : 'Practice Areas'}</Link>
            <i className={`fas ${isAr ? 'fa-chevron-left' : 'fa-chevron-right'}`} style={{ fontSize: '0.7rem' }}></i>
            <span style={{ color: '#c8a24d' }}>
              {isAr ? 'الدفاع عن الجرائم الإلكترونية' : 'Cybercrime Defense'}
            </span>
          </nav>

          {/* Subpage Hero */}
          <div className="subpage-hero">
            <span className="section-tag">
              <i className="fas fa-shield-halved"></i> {isAr ? 'دفاع جنائي وسيبراني' : 'High-Stakes Cyber Litigation'}
            </span>
            <h1 className="subpage-hero-title">
              {isAr ? 'الدفاع عن الجرائم الإلكترونية ومكافحة الابتزاز' : 'Cybercrime Defense & Anti-Extortion Practice'}
            </h1>
            <p className="subpage-hero-desc">
              {isAr
                ? 'فريق دفاع هجين يجمع بين المحامين المرخصين أمام المحاكم وخبراء التحليل الجنائي الرقمي، لحماية الأفراد والمؤسسات من الابتزاز، برمجيات الفدية، الاحتيال المالي، والقرصنة.'
                : 'A hybrid defense practice combining licensed trial attorneys with accredited digital forensic engineers. We provide rapid incident containment and formidable courtroom advocacy across cyber extortion, ransomware, and complex financial cyberfraud.'}
            </p>
            <div className="subpage-pills">
              {(isAr
                ? ['برمجيات الفدية', 'الابتزاز الإلكتروني', 'اختراق الشبكات', 'الاحتيال المالي', 'تسريب البيانات', 'تتبع العملات']
                : ['Ransomware Triage', 'Extortion Neutralization', 'Network Intrusion', 'Wire Fraud & BEC', 'Data Breach Defense', 'Crypto Tracing']
              ).map((pill, i) => (
                <span key={i} className="subpage-pill">
                  <i className="fas fa-check" style={{ marginRight: '6px' }}></i> {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: Main Text + Sidebar */}
          <div className="service-content-grid">
            {/* Main Text */}
            <div className="service-main-text">
              <h2>{isAr ? 'نطاق الدفاع والتمثيل القانوني' : 'Scope of Defense & Legal Representation'}</h2>
              <p>
                {isAr
                  ? 'تعد قضايا الجرائم الإلكترونية من أكثر النزاعات تعقيداً في المحاكم المعاصرة، حيث تفشل الاستراتيجيات التقليدية بسبب نقص الإلمام التقني بمسارات الهجوم وسجلات الخوادم وبصمات التشفير. في ميزان، نقدم تمثيلاً متكاملاً يبدأ من اللحظة الأولى لوقوع الحادث وينتهي بغلق الملف القضائي.'
                  : 'Cybercrime allegations and incident responses demand instant technical clarity paired with seasoned legal strategy. Traditional criminal defense firms often misunderstand the digital mechanisms of unauthorized access, packet capture, and cryptographic hashing. Mizan bridges that divide.'}
              </p>

              <h2>{isAr ? 'التهديدات والحالات التي نتولاها' : 'Scenarios & Offenses We Handle'}</h2>
              <ul className="service-list-block">
                <li>
                  <i className="fas fa-shield-virus"></i>
                  <div>
                    <strong>{isAr ? 'هجمات الفدية والابتزاز المؤسسي:' : 'Ransomware Extortion & Network Hostage:'}</strong>{' '}
                    {isAr
                      ? 'التفاوض الحذر مع الجهات المهاجمة، منع تسريب البيانات الحساسة، والتنسيق مع الأجهزة الأمنية لحماية سمعة الشركة واستمرار عملياتها.'
                      : 'Managing high-stakes extortion demands, preserving memory dumps, preventing public data dumping, and coordinating lawful containment without ransom liability.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-comments-dollar"></i>
                  <div>
                    <strong>{isAr ? 'الابتزاز الرقمي وتشويه السمعة:' : 'Blackmail, Defamation & Sextortion:'}</strong>{' '}
                    {isAr
                      ? 'الاستجابة الفورية لحملات التشهير واختراق الحسابات الشخصية، وتتبع عنوان الـ IP والبريد الإلكتروني للفاعل، واستصدار أوامر قضائية مستعجلة بحذف المحتوى.'
                      : 'Immediate protective measures against targeted smear campaigns, unauthorized image dissemination, and social engineering blackmail.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-money-bill-transfer"></i>
                  <div>
                    <strong>{isAr ? 'الاحتيال المالي واختراق الحسابات المصرفية (BEC):' : 'Business Email Compromise (BEC) & Wire Fraud:'}</strong>{' '}
                    {isAr
                      ? 'تتبع الأموال المحولة إلكترونياً، تجميد الحسابات البنكية المستفيدة عبر مذكرات قضائية عاجلة، وتتبع محافظ العملات المشفرة.'
                      : 'Tracing fraudulent wire diversions, obtaining emergency account freezing orders, and tracking illicit cryptocurrency pathways.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-laptop-code"></i>
                  <div>
                    <strong>{isAr ? 'الدفاع ضد اتهامات الاختراق غير المشروع:' : 'Defense Against Computer Misuse Allegations:'}</strong>{' '}
                    {isAr
                      ? 'تمثيل المهندسين والمسؤولين والشركات ضد الدعاوى الكيدية، وتفنيد أدلة الادعاء عبر إثبات عدم سلامة سلسلة الأدلة أو ثغرات الأنظمة.'
                      : 'Formidable defense against unauthorized access charges, insider threat accusations, and regulatory computer crime indictments.'}
                  </div>
                </li>
              </ul>

              <h2>{isAr ? 'لماذا تتفوق ميزان في الدفاع السيبراني؟' : 'The Mizan Evidentiary Advantage'}</h2>
              <p>
                {isAr
                  ? 'ندرك أن مجرد ادعاء النيابة أو الخصم بوجود سجل خادم (Server Log) لا يعني الإدانة. يقوم خبراؤنا بفحص سلامة البصمات التشفيرية، التأكد من عدم تزييف عناوين IP عبر خوادم البروكسي وVPN، وإثبات الثغرات التي تسمح للغير بانتحال الشخصية.'
                  : 'We never accept digital logs at face value. Our digital investigators analyze system clocks, packet timings, VPN relays, and spoofing vulnerabilities to dismantle prosecution narratives and demonstrate reasonable doubt or third-party manipulation.'}
              </p>

              <h2>{isAr ? 'خطوات التحرك عند التعرض لهجوم' : 'Critical Incident Protocol'}</h2>
              <p>
                {isAr
                  ? 'إذا كنت تتعرض لهجوم حالي أو ابتزاز نشط: لا تقم بمسح الرسائل أو إطفاء الأجهزة. تواصل فوراً مع خط طوارئ ميزان المباشر لنباشر التوثيق الجنائي فوراً.'
                  : 'If you or your company is experiencing an ongoing incident: Do not wipe systems, reboot, or destroy chat history. Contact Mizan immediately to execute lawful evidence preservation under attorney-client privilege.'}
              </p>
            </div>

            {/* Sidebar */}
            <aside className="service-sidebar">
              <div className="sidebar-cta-card">
                <span className="emergency-pulse" style={{ margin: '0 auto 12px' }}></span>
                <span className="section-tag" style={{ marginBottom: '14px' }}>
                  {isAr ? 'طوارئ على مدار الساعة' : '24/7 Rapid Response'}
                </span>
                <h3>{isAr ? 'هل تواجه هجوماً إلكترونياً أو ابتزازاً؟' : 'Under Active Attack or Extortion?'}</h3>
                <p>
                  {isAr
                    ? 'فريقنا متاح فورياً لتأمينك واتخاذ الإجراءات القضائية والفنية الفورية.'
                    : 'Our forensic counsel is standing by for immediate containment and protective orders.'}
                </p>
                <a href="tel:+9647504490696" className="btn btn-emergency" style={{ width: '100%', marginBottom: '10px' }}>
                  <i className="fas fa-phone-volume"></i> {isAr ? 'اتصل بالخط الساخن' : 'Call 24/7 Hotline'}
                </a>
                <a
                  href="https://wa.me/9647504490696"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fab fa-whatsapp"></i> {isAr ? 'واتساب فوري' : 'Direct WhatsApp'}
                </a>
              </div>

              {/* Other Services Navigation */}
              <div className="sidebar-links-card">
                <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '16px' }}>
                  {isAr ? 'مجالات ممارسة أخرى' : 'Other Practice Areas'}
                </h4>
                <ul className="sidebar-links-list">
                  <li>
                    <Link href="/services/digital-forensics">
                      <i className="fas fa-magnifying-glass-chart" style={{ color: '#c8a24d', marginRight: '8px' }}></i>
                      {isAr ? 'الأدلة الجنائية الرقمية' : 'Digital Forensics'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/general-law">
                      <i className="fas fa-scale-balanced" style={{ color: '#c8a24d', marginRight: '8px' }}></i>
                      {isAr ? 'القانون العام والتقاضي' : 'General Litigation'}
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/ip-rights">
                      <i className="fas fa-copyright" style={{ color: '#c8a24d', marginRight: '8px' }}></i>
                      {isAr ? 'الملكية الفكرية والعلامات' : 'IP & Online Rights'}
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
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
