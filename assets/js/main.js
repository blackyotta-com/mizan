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

  // Service cards clickable
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      const link = card.dataset.link;
      if(link) window.open(link,'_blank');
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

  // Contact form (mock submission)
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type=submit]');
      const lang = document.body.dir==='rtl' ? 'ar' : 'en';
      btn.disabled = true; btn.textContent = lang==='ar' ? 'جارٍ الإرسال...' : 'Sending...';
      setTimeout(()=>{
        btn.disabled=false; btn.textContent = lang==='ar' ? 'إرسال' : 'Send Inquiry';
        document.getElementById('success-msg-en').style.display = lang==='en' ? 'block':'none';
        document.getElementById('success-msg-ar').style.display = lang==='ar' ? 'block':'none';
        form.reset();
      }, 900);
    });
  }
})();
