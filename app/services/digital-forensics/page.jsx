'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DigitalForensics() {
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
        ? 'Digital Forensics & Chain-of-Custody | Mizan Law Firm'
        : 'الأدلة الجنائية الرقمية وسلسلة الحيازة | شركة ميزان للمحاماة';
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
                {isAr ? 'الأدلة الرقمية وسلسلة الحيازة' : 'Forensics & Evidence Integrity'}
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
              {isAr ? 'الأدلة الجنائية الرقمية' : 'Digital Forensics'}
            </span>
          </nav>

          <div className="subpage-hero">
            <span className="section-tag">
              <i className="fas fa-microscope"></i> {isAr ? 'تحقيقات جنائية معتمدة' : 'Accredited Forensic Science'}
            </span>
            <h1 className="subpage-hero-title">
              {isAr ? 'الأدلة الجنائية الرقمية وسلسلة الحيازة' : 'Digital Forensics & Chain-of-Custody Investigation'}
            </h1>
            <p className="subpage-hero-desc">
              {isAr
                ? 'استخراج علمي دقيق للقرائن الرقمية من الحواسيب والهواتف والشبكات والأنظمة السحابية، موثقة بتقارير خبراء جاهزة لفرض حجيتها أمام هيئات المحاكم ولجان التحكيم.'
                : 'Scientific forensic acquisition, memory analysis, and log correlation across endpoints, mobile devices, and enterprise cloud environments—delivering litigation-grade expert reports that withstand the harshest judicial scrutiny.'}
            </p>
            <div className="subpage-pills">
              {(isAr
                ? ['سلامة الحيازة', 'فحص الذاكرة العشوائية', 'استعادة البيانات المحذوفة', 'تتبع الاختراق', 'تقارير الخبراء', 'تشفير الأدلة']
                : ['Chain-of-Custody', 'Volatile RAM Analysis', 'Deleted Chat Recovery', 'Threat Attribution', 'Court-Ready Expert Reports', 'Cryptographic Hashing']
              ).map((pill, i) => (
                <span key={i} className="subpage-pill">
                  <i className="fas fa-check" style={{ marginRight: '6px' }}></i> {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="service-content-grid">
            <div className="service-main-text">
              <h2>{isAr ? 'علم الأدلة الرقمية في خدمة العدالة' : 'Forensic Science Engineered for Courtroom Dominance'}</h2>
              <p>
                {isAr
                  ? 'في العصر الرقمي، تحسم المعارك القضائية بما تحتويه السجلات المشفرة وذاكرة الأجهزة ورسائل التطبيقات المحذوفة. يقوم خبراؤنا بنسخ الأجهزة بصورة مطابقة للأصل (Bit-stream Image) دون تغيير بايت واحد، مما يحفظ القيمة الإثباتية للدليل.'
                  : 'In high-stakes litigation, digital artifacts often constitute the deciding factor. Mizan utilizes hardware write-blockers and bit-stream disk imaging to ensure physical and digital integrity, ensuring zero spoliation of evidence.'}
              </p>

              <h2>{isAr ? 'قدراتنا الفنية والجنائية' : 'Technical & Investigative Capabilities'}</h2>
              <ul className="service-list-block">
                <li>
                  <i className="fas fa-hard-drive"></i>
                  <div>
                    <strong>{isAr ? 'النسخ الجنائي للأقراص والوسائط:' : 'Disk & Media Forensic Acquisition:'}</strong>{' '}
                    {isAr
                      ? 'الاستحواذ المباشر على الأقراص الصلبة ووسائط التخزين باستخدام أجهزة منع الكتابة، وتوثيق بصمة الهاش (SHA-256) لمنع أي طعن بالتلاعب.'
                      : 'Physical and logical disk imaging utilizing hardware write-blockers with SHA-256 cryptographic verification.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-mobile-screen-button"></i>
                  <div>
                    <strong>{isAr ? 'التحليل الجنائي للهواتف والتطبيقات:' : 'Mobile & Messaging Extraction:'}</strong>{' '}
                    {isAr
                      ? 'استخراج المحادثات المشفرة وسجلات المكالمات والمواقع الجغرافية والصور من أجهزة iOS وAndroid حتى في حال مسحها أو إتلاف الجهاز جزئياً.'
                      : 'Physical and file system acquisition of smartphones, recovering deleted WhatsApp, Telegram, Signal, call logs, and GPS geolocation caches.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-network-wired"></i>
                  <div>
                    <strong>{isAr ? 'فحص الذاكرة وتتبع مسار الاختراق:' : 'Volatile Memory & Log Correlation:'}</strong>{' '}
                    {isAr
                      ? 'استخراج الأدلة من ذاكرة RAM المؤقتة لكشف البرمجيات الخبيثة المخبأة غير المحفوظة على القرص، وتتبع جدول الهجوم الزمني بدقة متناهية.'
                      : 'In-memory malware artifact extraction, volatile credential dumping analysis, and timeline synchronization across multi-tiered server logs.'}
                  </div>
                </li>
                <li>
                  <i className="fas fa-file-signature"></i>
                  <div>
                    <strong>{isAr ? 'إعداد تقارير الخبراء والشهادة أمام القضاء:' : 'Expert Witness Testimony & Defensible Reports:'}</strong>{' '}
                    {isAr
                      ? 'صياغة تقارير فنية محكمة تفند ادعاءات الخصم وتترجم التفاصيل التقنية المعقدة إلى لغة قانونية واضحة يفهمها القاضي ويدين بها المعتدي.'
                      : 'Authoring rigorous expert submissions and delivering confident courtroom testimony that translates arcane forensic findings into persuasive judicial arguments.'}
                  </div>
                </li>
              </ul>
            </div>

            <aside className="service-sidebar">
              <div className="sidebar-cta-card">
                <span className="section-tag" style={{ marginBottom: '14px' }}>
                  {isAr ? 'طلب خبير جنائي' : 'Retain Forensic Expert'}
                </span>
                <h3>{isAr ? 'هل تحتاج إلى فحص أجهزة أو توثيق دليل؟' : 'Need Evidence Preserved or Devices Imaged?'}</h3>
                <p>
                  {isAr
                    ? 'احمِ دليلك القضائي قبل فوات الأوان. تواصل مع مختبر الأدلة الرقمية لشركة ميزان.'
                    : 'Prevent evidence spoliation and secure an unbroken chain of custody. Contact our forensic lab.'}
                </p>
                <a href="tel:+9647504490696" className="btn btn-gold" style={{ width: '100%', marginBottom: '10px' }}>
                  <i className="fas fa-phone"></i> {isAr ? 'تواصل مع الخبير' : 'Speak to Specialist'}
                </a>
                <Link href="/#contact" className="btn btn-ink" style={{ width: '100%' }}>
                  <i className="fas fa-envelope"></i> {isAr ? 'طلب استشارة' : 'Case Consultation'}
                </Link>
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
                    <Link href="/services/general-law">
                      <i className="fas fa-scale-balanced" style={{ color: '#B89445', marginRight: '8px' }}></i>
                      {isAr ? 'القانون العام والتقاضي' : 'General Litigation'}
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
