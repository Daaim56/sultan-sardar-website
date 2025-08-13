(async function(){
  const cfg = await (await fetch('config.json')).json();
  const tel = 'tel:' + cfg.phone.replace(/\D/g,'');
  const email = 'mailto:' + cfg.email + '?subject=Security%20Inquiry';
  const wa = 'https://wa.me/' + cfg.whatsapp.replace(/\D/g,'');

  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
  const phoneLink = document.getElementById('phoneLink'); if(phoneLink) phoneLink.href = tel;
  const emailLink = document.getElementById('emailLink'); if(emailLink) emailLink.href = email;
  const waLink = document.getElementById('waLink'); if(waLink) waLink.href = wa;
  const waTop = document.getElementById('waTop'); if(waTop) waTop.href = wa;
  const addr = document.getElementById('addressText'); if(addr) addr.textContent = cfg.address_en;
  const hrs = document.getElementById('hoursText'); if(hrs) hrs.textContent = cfg.hours_en;
  const map = document.getElementById('map'); if(map) map.src = cfg.google_maps_embed;

  // Language toggle (English/Arabic)
  const toggle = document.getElementById('langToggle'); let lang = 'en';
  function applyLang(l){
    lang = l; document.documentElement.dir = (l==='ar') ? 'rtl' : 'ltr';
    if(addr) addr.textContent = (l==='ar') ? cfg.address_ar : cfg.address_en;
    if(hrs) hrs.textContent = (l==='ar') ? cfg.hours_ar : cfg.hours_en;
    document.querySelectorAll('[data-i]').forEach(el=>{
      const key = el.getAttribute('data-i'); const dict = window.I18N[l];
      if(dict && dict[key]) el.textContent = dict[key];
    });
    if(toggle) toggle.textContent = (l==='ar') ? 'EN' : 'العربية';
  }
  if(toggle) toggle.addEventListener('click', ()=> applyLang(lang==='en' ? 'ar' : 'en'));
  applyLang('en');

  // Contact form
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const summary = `Inquiry - ${cfg.company_name_en}\nName: ${data.get('name')}\nContact: ${data.get('contact')}\nService: ${data.get('service')}\nMessage: ${data.get('message')}`;
      const mail = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('New Inquiry') + '&body=' + encodeURIComponent(summary);
      const wamsg = 'https://wa.me/' + cfg.whatsapp.replace(/\D/g,'') + '?text=' + encodeURIComponent(summary);
      window.open(mail, '_blank'); window.open(wamsg, '_blank');
      alert((lang==='ar') ? 'شكراً لك! سنتواصل معك قريباً.' : 'Thanks! We will contact you shortly.');
      form.reset();
    });
  }
})();