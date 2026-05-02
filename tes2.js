// =============================================
//  POPUP LIGHTBOX + SCROLL REVEAL
//  XII DKV SMK Nusa Jaya – by Juhdan
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── POPUP / LIGHTBOX ──
  const overlay  = document.getElementById('popup-overlay');
  const popupImg = document.getElementById('popup-img');
  const closeBtn = document.getElementById('popup-close');

  // Semua gambar di photo-grid bisa diklik (zoom)
  document.querySelectorAll('.photo-grid img, .photo-grid--small img').forEach(img => {
    img.addEventListener('click', () => {
      popupImg.src = img.src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closePopup = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

  // ── SCROLL REVEAL ──
  const revealTargets = document.querySelectorAll(
    '.section, .glass-card, .wali-card, .murid-chip, .section-title, .back-btn, .navbar'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(el => observer.observe(el));

  // ── STAGGER rows tabel ──
  document.querySelectorAll('tbody tr').forEach((row, i) => {
    row.style.transitionDelay = `${i * 0.03}s`;
  });

  // ── NAVBAR active highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent1)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

});
