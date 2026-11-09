/* Mizan Law Firm - Main JS */
(function(){
  const langButtons = document.querySelectorAll('.lang-switch button');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksWrapper = document.getElementById('nav-links');
  const fadeEls = document.querySelectorAll('.fade-in');

  function setLang(lang){
    document.body.dir = (lang==='ar') ? 'rtl' : 'ltr';
    langButtons.forEach(b=> b.classList.toggle('active', b.dataset.lang===lang));
    document.querySelectorAll('.lang-en').forEach(e=> e.classList.toggle('hidden', lang==='ar'));
    document.querySelectorAll('.lang-ar').forEach(e=> e.classList.toggle('hidden', lang!=='ar'));
    localStorage.setItem('mizan-lang', lang);
  }

  langButtons.forEach(btn=> btn.addEventListener('click',()=> setLang(btn.dataset.lang)));
  setLang(localStorage.getItem('mizan-lang') || 'en');

  // Mobile nav
  if(navToggle){
    navToggle.addEventListener('click',()=>{
      const open = navLinksWrapper.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
  navLinksWrapper?.querySelectorAll('a').forEach(a=> a.addEventListener('click',()=>{
    if(window.innerWidth < 980 && navLinksWrapper.classList.contains('open')){
      navLinksWrapper.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      navToggle.innerHTML='<i class="fas fa-bars"></i>';
    }
  }));

  // Smooth scroll
  document.addEventListener('click', e=>{
    const target = e.target.closest('[data-scroll]');
    if(!target) return;
    const sel = target.getAttribute('data-scroll');
    const el = document.querySelector(sel);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
      if(sel==='#contact') setTimeout(()=> document.getElementById('name')?.focus(), 600);
    }
  });

  // Service cards clickable with language-aware linking
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const baseLink = card.dataset.link; // e.g., service-digital-forensics.html
      if(!baseLink) return;
      const isArabic = document.body.dir === 'rtl';
      const localized = isArabic
        ? baseLink.replace(/(service-[^.]+)(\.html)$/,'$1-ar$2')
        : baseLink.replace(/-ar(\.html)$/,'$1');
      const finalLink = localized;
  // Navigate in the same tab (was opening a new tab before)
  window.location.href = finalLink;
    });
  });

  // Intersection animations
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:.25 });
  fadeEls.forEach(el=> io.observe(el));

  // Contact form: real submission to Formspree
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }

      const btn = form.querySelector('button[type=submit]');
      const lang = document.body.dir==='rtl' ? 'ar' : 'en';
      const sendingTxt = lang==='ar' ? 'جارٍ الإرسال...' : 'Sending...';
      const sendTxt = lang==='ar' ? 'إرسال' : 'Send Inquiry';
      btn.disabled = true; btn.textContent = sendingTxt;

      // Hide any previous success message
      const successEn = document.getElementById('success-msg-en');
      const successAr = document.getElementById('success-msg-ar');
      if(successEn) successEn.style.display = 'none';
      if(successAr) successAr.style.display = 'none';

      try{
        const data = new FormData(form);
        const resp = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });

        if(resp.ok){
          if(successEn) successEn.style.display = lang==='en' ? 'block' : 'none';
          if(successAr) successAr.style.display = lang==='ar' ? 'block' : 'none';
          form.reset();
        } else {
          // Attempt to parse error details
          let msg = lang==='ar' ? 'تعذّر إرسال الرسالة. حاول مرة أخرى.' : 'Unable to send your message. Please try again.';
          try{
            const data = await resp.json();
            if(data && data.errors && data.errors.length){
              msg = data.errors.map(e=> e.message).join('\n');
            }
          }catch(_){/* ignore JSON parse errors */}
          alert(msg);
        }
      }catch(err){
        const msg = lang==='ar' ? 'حدث خطأ في الشبكة. تحقق من اتصالك.' : 'Network error. Please check your connection.';
        alert(msg);
      } finally {
        btn.disabled = false; btn.textContent = sendTxt;
      }
    });
  }
})();
