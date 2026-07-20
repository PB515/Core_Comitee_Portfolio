// ---- Nav scroll state + active dot ----
const nav = document.getElementById('nav');
const dots = document.querySelectorAll('.nav-dots a');
const sections = [...dots].map(d => document.querySelector(d.getAttribute('href')));

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let current = sections[0];
  for (const s of sections) {
    if (s && window.scrollY >= s.offsetTop - window.innerHeight * 0.5) current = s;
  }
  dots.forEach((d, i) => d.classList.toggle('active', sections[i] === current));
}, { passive: true });

// ---- Reveal on scroll ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- QR code pointing at the real, live Synergy deployment ----
(function setupQr() {
  const qrImg = document.getElementById('qrImg');
  const qrUrl = document.getElementById('qrUrl');
  if (!qrImg) return;

  const synergyUrl = 'https://jules-purven-s-projects.vercel.app';
  const api = `https://api.qrserver.com/v1/create-qr-code/?size=380x380&margin=0&data=${encodeURIComponent(synergyUrl)}`;
  qrImg.src = api;
  qrUrl.textContent = synergyUrl;
})();

// ---- Lightbox for certificate/photo/video thumbnails ----
(function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxVid = document.getElementById('lightboxVid');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox) return;

  function openImage(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxImg.style.display = 'block';
    lightboxVid.style.display = 'none';
    lightbox.classList.add('open');
  }
  function openVideo(src) {
    lightboxVid.src = src;
    lightboxVid.style.display = 'block';
    lightboxImg.style.display = 'none';
    lightbox.classList.add('open');
  }
  function close() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    lightboxVid.src = '';
  }

  document.querySelectorAll('.cert-thumb').forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      const img = thumb.querySelector('img');
      openImage(thumb.href, img ? img.alt : '');
    });
  });

  document.querySelectorAll('.video-item video').forEach((vid) => {
    vid.style.cursor = 'pointer';
    vid.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(vid.src);
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
  });
})();
