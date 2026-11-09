'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Language handling
  useEffect(() => {
    const savedLang = localStorage.getItem('mizan-lang') || 'en';
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mizan-lang', language);
  }, [language]);

  const handleLanguageSwitch = (lang) => {
    setLanguage(lang);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMobileNav = () => {
    setIsNavOpen(false);
  };

  // Smooth scroll function
  const handleSmoothScroll = (e, selector) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (selector === '#contact') {
        setTimeout(() => document.getElementById('name')?.focus(), 600);
      }
    }
  };

  // Service card click handler
  const handleServiceCardClick = (baseLink) => {
    if (!baseLink) return;
  
  // Convert HTML file names to Next.js routes
    const route = baseLink
      .replace('service-', '/services/')
      .replace('.html', '');
  
    window.location.href = route;
  };

  // Contact form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const sendingTxt = language === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
    const sendTxt = language === 'ar' ? 'إرسال' : 'Send Inquiry';
    
    btn.disabled = true;
    btn.textContent = sendingTxt;

    // Hide previous success messages
    const successEn = document.getElementById('success-msg-en');
    const successAr = document.getElementById('success-msg-ar');
    if (successEn) successEn.style.display = 'none';
    if (successAr) successAr.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (response.ok) {
        if (successEn) successEn.style.display = language === 'en' ? 'block' : 'none';
        if (successAr) successAr.style.display = language === 'ar' ? 'block' : 'none';
        form.reset();
      } else {
        let errorMessage = language === 'ar' 
          ? 'تعذّر إرسال الرسالة. حاول مرة أخرى.' 
          : 'Unable to send your message. Please try again.';
        
        try {
          const errorData = await response.json();
          if (errorData && errorData.errors && errorData.errors.length) {
            errorMessage = errorData.errors.map(error => error.message).join('\n');
          }
        } catch (_) {
          // Ignore JSON parse errors
        }
        alert(errorMessage);
      }
    } catch (error) {
      const errorMessage = language === 'ar' 
        ? 'حدث خطأ في الشبكة. تحقق من اتصالك.' 
        : 'Network error. Please check your connection.';
      alert(errorMessage);
    } finally {
      btn.disabled = false;
      btn.textContent = sendTxt;
    }
  };

  // Intersection Observer for animations and active section detection
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));

    return () => {
      fadeElements.forEach((el) => fadeObserver.unobserve(el));
    };
  }, []);

  // Separate effect for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100; // offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>


      <header className="site-header" role="banner">
        <div className="container navbar">
          <a href="/" className="brand" aria-label="Mizan Home">
            <img src="/images/mizan-logo.png" alt="Mizan Logo" className="brand-logo" width="150" height="150" loading="eager" />
          </a>
          <button 
            className="nav-toggle" 
            aria-expanded={isNavOpen} 
            aria-controls="primary-nav"
            onClick={toggleNav}
          >
            <i className={isNavOpen ? "fas fa-xmark" : "fas fa-bars"}></i>
          </button>
          <nav id="primary-nav" aria-label="Primary" className="nav-wrapper">
            <ul className={`nav-links ${isNavOpen ? 'open' : ''}`} id="nav-links">
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => { handleSmoothScroll(e, '#home'); closeMobileNav(); }}>Home</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { handleSmoothScroll(e, '#about'); closeMobileNav(); }}>About Us</a></li>
              <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => { handleSmoothScroll(e, '#services'); closeMobileNav(); }}>Services</a></li>
              <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { handleSmoothScroll(e, '#contact'); closeMobileNav(); }}>Contact</a></li>
            </ul>
          </nav>
          <div className="lang-switch" role="group" aria-label="Language switcher">
            <button 
              type="button" 
              className={language === 'en' ? 'active' : ''}
              onClick={() => handleLanguageSwitch('en')}
            >
              EN
            </button>
            <button 
              type="button" 
              className={language === 'ar' ? 'active' : ''}
              onClick={() => handleLanguageSwitch('ar')}
            >
              AR
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className={`hero-copy ${language === 'en' ? '' : 'hidden'}`}>
            <h1 id="hero-heading">Defending Your Rights & Protecting Your Digital World</h1>
            <p className="lead">General law and advanced cybercrime defense from a bilingual team combining courtroom strategy with deep technical forensics.</p>
            <div className="badges">
              <span className="badge">Cybercrime Defense</span>
              <span className="badge">Digital Forensics</span>
              <span className="badge">IP & Online Rights</span>
              <span className="badge">Litigation</span>
            </div>
            <div>
              <button className="btn" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get Legal Help Now</button>
              <button className="btn btn-outline" onClick={(e) => handleSmoothScroll(e, '#services')}>Explore Services</button>
            </div>
          </div>
          <div className={`hero-copy ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">
            <h1>ندافع عن حقوقك ونحمي عالمك الرقمي</h1>
            <p className="lead">فريق ثنائي اللغة متخصص في القضايا العامة والدفاع عن الجرائم الإلكترونية والتحقيقات الرقمية والملكية الفكرية.</p>
            <div className="badges">
              <span className="badge">الدفاع السيبراني</span>
              <span className="badge">الأدلة الرقمية</span>
              <span className="badge">الملكية الفكرية</span>
              <span className="badge">التقاضي</span>
            </div>
            <div>
              <button className="btn" onClick={(e) => handleSmoothScroll(e, '#contact')}>احصل على استشارة الآن</button>
              <button className="btn btn-outline" onClick={(e) => handleSmoothScroll(e, '#services')}>استعرض الخدمات</button>
            </div>
          </div>
        </div>
      </section>
      <hr className="divider" />

      {/* ABOUT */}
      <section id="about" className="section about-enhanced" aria-labelledby="about-heading">
        <div className="container">
          <div className="section-header hidden">
            <span className={`eyebrow ${language === 'en' ? '' : 'hidden'}`}>Who We Are</span>
            <span className={`eyebrow ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">من نحن</span>
            <h2 id="about-heading" className={language === 'en' ? '' : 'hidden'}>Expert Legal & Cyber Defense Team</h2>
            <h2 className={language === 'ar' ? '' : 'hidden'} dir="rtl">فريق متخصص في الدفاع القانوني والجرائم الإلكترونية</h2>
            <p className={`lead ${language === 'en' ? '' : 'hidden'}`}>Mizan blends traditional legal advocacy with cutting-edge digital investigation—representing individuals, startups, and enterprises in complex cross-border matters.</p>
            <p className={`lead ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">تمزج ميزان بين الخبرة القانونية التقليدية والتحقيقات الرقمية الحديثة لخدمة الأفراد والشركات في القضايا المعقدة.</p>
          </div>

          <div className="about-grid">
            {/* Who We Are panel */}
            <div className="about-panel panel-who fade-in">
              <h3 className={language === 'en' ? '' : 'hidden'} style={{marginTop: '0'}}>Who We Are</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{marginTop: '0'}}>من نحن</h3>
              <p className={language === 'en' ? '' : 'hidden'} style={{fontWeight: '700', margin: '.35em 0 .6em'}}>Expert Legal & Cyber Defense Team</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{fontWeight: '700', margin: '.35em 0 .6em'}}>فريق متخصص في الدفاع القانوني والجرائم الإلكترونية</p>
              <p className={language === 'en' ? '' : 'hidden'}>Mizan blends traditional legal advocacy with cutting-edge digital investigation—representing individuals, startups, and enterprises in complex cross-border matters.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">تمزج ميزان بين الخبرة القانونية التقليدية والتحقيقات الرقمية الحديثة لخدمة الأفراد والشركات في القضايا المعقدة.</p>
            </div>

            <div className="about-panel panel-mission fade-in">
              <h3 className={language === 'en' ? '' : 'hidden'} style={{marginTop: '0'}}>Our Mission</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{marginTop: '0'}}>مهمتنا</h3>
              <p className={language === 'en' ? '' : 'hidden'}>Protect rights, neutralize cyber threats, and deliver strategic legal clarity. We operate at the intersection of law, technology, and human impact.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">حماية الحقوق، مواجهة التهديدات السيبرانية، وتقديم وضوح قانوني استراتيجي في تقاطع القانون والتقنية وتأثيرها على الناس.</p>

              <div className="feature-cards">
                <div className={`feature-card ${language === 'en' ? '' : 'hidden'}`}><i className="fas fa-shield-virus"></i><span>Rapid incident & breach response</span></div>
                <div className={`feature-card ${language === 'en' ? '' : 'hidden'}`}><i className="fas fa-scale-balanced"></i><span>Litigation strategy rooted in evidence</span></div>
                <div className={`feature-card ${language === 'en' ? '' : 'hidden'}`}><i className="fas fa-language"></i><span>Bilingual advisory & representation</span></div>
                <div className={`feature-card ${language === 'en' ? '' : 'hidden'}`}><i className="fas fa-magnifying-glass-chart"></i><span>Deep forensic correlation & timelines</span></div>

                <div className={`feature-card ${language === 'ar' ? '' : 'hidden'}`} dir="rtl"><i className="fas fa-shield-virus"></i><span>استجابة سريعة للحوادث والاختراقات</span></div>
                <div className={`feature-card ${language === 'ar' ? '' : 'hidden'}`} dir="rtl"><i className="fas fa-scale-balanced"></i><span>استراتيجية تقاضي مبنية على الأدلة</span></div>
                <div className={`feature-card ${language === 'ar' ? '' : 'hidden'}`} dir="rtl"><i className="fas fa-language"></i><span>استشارات وتمثيل ثنائي اللغة</span></div>
                <div className={`feature-card ${language === 'ar' ? '' : 'hidden'}`} dir="rtl"><i className="fas fa-magnifying-glass-chart"></i><span>تحليل جنائي عميق وربط زمني</span></div>
              </div>

              <div className="stats-row">
                <div className="stat-box"><h4>250+</h4><p className={language === 'en' ? '' : 'hidden'}>Resolved Cases</p><p className={language === 'ar' ? '' : 'hidden'} dir="rtl">قضية محلولة</p></div>
                <div className="stat-box"><h4>92%</h4><p className={language === 'en' ? '' : 'hidden'}>Early Dismissals</p><p className={language === 'ar' ? '' : 'hidden'} dir="rtl">إسقاط مبكر</p></div>
                <div className="stat-box"><h4>24/7</h4><p className={language === 'en' ? '' : 'hidden'}>Rapid Response</p><p className={language === 'ar' ? '' : 'hidden'} dir="rtl">استجابة دائمة</p></div>
                <div className="stat-box"><h4>15+</h4><p className={language === 'en' ? '' : 'hidden'}>Forensic Domains</p><p className={language === 'ar' ? '' : 'hidden'} dir="rtl">مجالات تحليل</p></div>
              </div>
            </div>

            <div className="about-panel panel-choose fade-in">
              <h3 className={language === 'en' ? '' : 'hidden'}>Why Clients Choose Us</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">لماذا يختارنا العملاء</h3>
              <p className={language === 'en' ? '' : 'hidden'}>We align legal strategy with verifiable technical evidence, ensuring credibility with regulators, opposing counsel and courts.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">نربط الاستراتيجية القانونية بالأدلة التقنية الموثوقة، مما يعزز المصداقية أمام الجهات القانونية.</p>
              <ul className={language === 'en' ? '' : 'hidden'} style={{margin: '10px 0 24px 1.1em', lineHeight: '1.6'}}>
                <li>Cyber + traditional legal depth</li>
                <li>Coordinated breach containment</li>
                <li>Chain-of-custody integrity</li>
                <li>Discrete & strategic escalation</li>
                <li>Transparent reporting</li>
              </ul>
              <ul className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{margin: '10px 1.1em 24px 0', lineHeight: '1.6'}}>
                <li>دمج الخبرة القانونية والتقنية</li>
                <li>احتواء منسق للحوادث</li>
                <li>سلامة سلسلة الأدلة</li>
                <li>تصعيد استراتيجي بسرية</li>
                <li>تقارير شفافة</li>
              </ul>
              <p className={language === 'en' ? '' : 'hidden'} style={{fontSize: '.9rem', opacity: '.75'}}>Our analysts employ memory forensics, log correlation, reverse engineering, and OSINT to produce litigation-grade findings.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{fontSize: '.9rem', opacity: '.75'}}>يستخدم محللونا التحليل الجنائي للذاكرة، وترابط السجلات، والهندسة العكسية، وOSINT لإنتاج نتائج قابلة للدفاع قضائياً.</p>
              <div style={{marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
                <button className="btn" onClick={(e) => handleSmoothScroll(e, '#services')}>
                  <span className={language === 'en' ? '' : 'hidden'}>Explore Services</span>
                  <span className={language === 'ar' ? '' : 'hidden'} dir="rtl">استعرض الخدمات</span>
                </button>
                <button className="btn btn-outline" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                  <span className={language === 'en' ? '' : 'hidden'}>Request Consultation</span>
                  <span className={language === 'ar' ? '' : 'hidden'} dir="rtl">اطلب استشارة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header">
            <span className={`eyebrow ${language === 'en' ? '' : 'hidden'}`}>What We Do</span>
            <span className={`eyebrow ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">خدماتنا</span>
            <h2 id="services-heading" className={language === 'en' ? '' : 'hidden'}>Strategic Legal & Digital Solutions</h2>
            <h2 className={language === 'ar' ? '' : 'hidden'} dir="rtl">حلول قانونية ورقمية استراتيجية</h2>
          </div>
          <div className="services-grid">
            <div className="service-card" onClick={() => handleServiceCardClick('service-general-law.html')}>
              <div className="service-icon"><i className="fas fa-balance-scale"></i></div>
              <h3 className={language === 'en' ? '' : 'hidden'}>General Law Cases</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">القانون العام</h3>
              <p className={language === 'en' ? '' : 'hidden'}>Criminal, family, civil litigation, employment, real estate & more with adaptive courtroom strategy.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">القضايا الجنائية، الأسرة، الدعاوى المدنية، العمل، العقارات والمزيد باستراتيجيات دفاع متقدمة.</p>
              <i className="fas fa-arrow-right arrow"></i>
            </div>
            <div className="service-card" onClick={() => handleServiceCardClick('service-cybercrime-defense.html')}>
              <div className="service-icon"><i className="fas fa-shield-halved"></i></div>
              <h3 className={language === 'en' ? '' : 'hidden'}>Cybercrime Defense</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">الدفاع السيبراني</h3>
              <p className={language === 'en' ? '' : 'hidden'}>Defense against hacking, fraud, ransomware, data theft & cyber extortion.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">الدفاع ضد الاختراق والاحتيال والفدية وسرقة البيانات والابتزاز الإلكتروني.</p>
              <i className="fas fa-arrow-right arrow"></i>
            </div>
            <div className="service-card" onClick={() => handleServiceCardClick('service-digital-forensics.html')}>
              <div className="service-icon"><i className="fas fa-magnifying-glass-chart"></i></div>
              <h3 className={language === 'en' ? '' : 'hidden'}>Digital Forensics</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">الأدلة الرقمية</h3>
              <p className={language === 'en' ? '' : 'hidden'}>Evidence recovery, chain-of-custody analysis & expert testimony.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">استخراج الأدلة، تتبع المصدر، وشهادات الخبراء.</p>
              <i className="fas fa-arrow-right arrow"></i>
            </div>
            <div className="service-card" onClick={() => handleServiceCardClick('service-ip-rights.html')}>
              <div className="service-icon"><i className="fas fa-copyright"></i></div>
              <h3 className={language === 'en' ? '' : 'hidden'}>IP & Online Rights</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">الملكية الفكرية</h3>
              <p className={language === 'en' ? '' : 'hidden'}>Copyright, trademarks, digital content protection & anti-piracy actions.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">حقوق النشر، العلامات التجارية، حماية المحتوى الرقمي ومكافحة القرصنة.</p>
              <i className="fas fa-arrow-right arrow"></i>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" className="section section-tight" aria-labelledby="clients-heading">
        <div className="container">
          <div className="section-header" style={{marginBottom: '36px'}}>
            <h2 id="clients-heading" className={language === 'en' ? '' : 'hidden'}>Selected Clients</h2>
            <h2 className={language === 'ar' ? '' : 'hidden'} dir="rtl">عملاء مختارون</h2>
          </div>
          <div className="clients-logos">
            <div className="client-logo"><img src="/images/alhusun.jpeg" alt="Alhusun" /></div>
            <div className="client-logo"><img src="/images/getfit.jpeg" alt="GetFit" /></div>
            <div className="client-logo"><img src="/images/sinjari.jpeg" alt="Sinjari" /></div>
            <div className="client-logo" aria-hidden="true"><span style={{color: '#222', fontSize: '.9rem', fontWeight: '600'}}>+ more</span></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="section-header">
            <span className={`eyebrow ${language === 'en' ? '' : 'hidden'}`}>Get In Touch</span>
            <span className={`eyebrow ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">تواصل معنا</span>
            <h2 id="contact-heading" className={language === 'en' ? '' : 'hidden'}>Request a Confidential Consultation</h2>
            <h2 className={language === 'ar' ? '' : 'hidden'} dir="rtl">اطلب استشارة سرية</h2>
          </div>
          <div className="contact-wrap">
            <form id="contact-form" className="contact-card" action="https://formspree.io/f/xzzjzbbk" method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className={language === 'en' ? '' : 'hidden'}>Name</label>
                <label htmlFor="name" className={language === 'ar' ? '' : 'hidden'} dir="rtl">الاسم</label>
                <input id="name" name="name" type="text" required autoComplete="name" suppressHydrationWarning />
              </div>
              <div className="form-group">
                <label htmlFor="email" className={language === 'en' ? '' : 'hidden'}>Email</label>
                <label htmlFor="email" className={language === 'ar' ? '' : 'hidden'} dir="rtl">البريد الإلكتروني</label>
                <input id="email" name="email" type="email" required autoComplete="email" suppressHydrationWarning />
              </div>
              <div className="form-group">
                <label htmlFor="message" className={language === 'en' ? '' : 'hidden'}>Your Case / Message</label>
                <label htmlFor="message" className={language === 'ar' ? '' : 'hidden'} dir="rtl">وصف القضية / الرسالة</label>
                <textarea id="message" name="message" required suppressHydrationWarning></textarea>
              </div>
              <input type="hidden" name="_subject" value="New inquiry from Mizan Law website" />
              <button className="btn" type="submit">Send Inquiry</button>
              <p className={`success-msg ${language === 'en' ? '' : 'hidden'}`} id="success-msg-en">Message sent. We will reply shortly.</p>
              <p className={`success-msg ${language === 'ar' ? '' : 'hidden'}`} id="success-msg-ar" dir="rtl">تم الإرسال. سنرد قريباً.</p>
            </form>
            <div className="contact-card fade-in">
              <h3 className={language === 'en' ? '' : 'hidden'}>Office & Direct</h3>
              <h3 className={language === 'ar' ? '' : 'hidden'} dir="rtl">المكتب والتواصل</h3>
              <p className={language === 'en' ? '' : 'hidden'}>
                <i className="fas fa-location-dot"></i> Lalav Airport View, Erbil, Iraq<br/>
                <i className="fas fa-phone"></i> +964 750 449 0696<br/>
                <i className="fas fa-envelope"></i> <a className="contact-email" href="mailto:osamaabwbakr@gmail.com">Contact@The-Mizan.net</a>
              </p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl">
                <i className="fas fa-location-dot"></i> لالاف أيربورت ڤيو، أربيل<br/>
                <i className="fas fa-phone"></i> ‎+964 750 449 0696‎<br/>
                <i className="fas fa-envelope"></i> <a className="contact-email" href="mailto:osamaabwbakr@gmail.com">osamaabwbakr@gmail.com</a>
              </p>
              <p className={language === 'en' ? '' : 'hidden'} style={{fontSize: '.85rem', opacity: '.7'}}>Urgent cyber incident? Mention "PRIORITY" in the message.</p>
              <p className={language === 'ar' ? '' : 'hidden'} dir="rtl" style={{fontSize: '.85rem', opacity: '.7'}}>للحالات العاجلة اذكر كلمة "عاجل" في الرسالة.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer" role="contentinfo">
        <div className="container footer-grid">
          <div className="footer-col">
            <h4 className={language === 'en' ? '' : 'hidden'}>Firm</h4>
            <h4 className={language === 'ar' ? '' : 'hidden'} dir="rtl">الشركة</h4>
            <ul className={`footer-links ${language === 'en' ? '' : 'hidden'}`}>
              <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>About</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>Services</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
            </ul>
            <ul className={`footer-links ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">
              <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')}>من نحن</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>الخدمات</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>تواصل</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className={language === 'en' ? '' : 'hidden'}>Focus Areas</h4>
            <h4 className={language === 'ar' ? '' : 'hidden'} dir="rtl">مجالات التركيز</h4>
            <ul className={`footer-links ${language === 'en' ? '' : 'hidden'}`}>
              <li><a href="service-cybercrime-defense.html">Cybercrime</a></li>
              <li><a href="service-digital-forensics.html">Forensics</a></li>
              <li><a href="service-ip-rights.html">IP & Rights</a></li>
            </ul>
            <ul className={`footer-links ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">
              <li><a href="service-cybercrime-defense-ar.html">الجرائم الإلكترونية</a></li>
              <li><a href="service-digital-forensics-ar.html">التحقيقات الرقمية</a></li>
              <li><a href="service-ip-rights-ar.html">الملكية الفكرية</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className={language === 'en' ? '' : 'hidden'}>Policies</h4>
            <h4 className={language === 'ar' ? '' : 'hidden'} dir="rtl">سياسات</h4>
            <ul className={`footer-links ${language === 'en' ? '' : 'hidden'}`}>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
            <ul className={`footer-links ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">
              <li><a href="#">الخصوصية</a></li>
              <li><a href="#">الشروط</a></li>
            </ul>
          </div>
        </div>
        <p className={`copy ${language === 'en' ? '' : 'hidden'}`}>© 2026 Mizan Law Firm. All rights reserved.</p>
        <p className={`copy ${language === 'ar' ? '' : 'hidden'}`} dir="rtl">© 2026 شركة ميزان للمحاماة. جميع الحقوق محفوظة.</p>
      </footer>
    </>
  );
}
