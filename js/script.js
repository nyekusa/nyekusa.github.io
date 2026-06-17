/* ============================================
   NYEKUSA — Upgraded JavaScript
============================================ */

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ===== HERO SLIDER ===== */
const heroImages = [
  'images/banner/banner1.webp',
  'images/banner/banner2.webp',
  'images/banner/banner3.webp',
  'images/banner/banner4.webp'
];

const heroSlides = document.getElementById('heroSlides');
const dotsContainer = document.getElementById('slideDots');

if (heroSlides && dotsContainer) {
  let currentSlide = 0;
  const slides = [];
  const dots   = [];

  // Build slides and dots
  heroImages.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${src}')`;
    heroSlides.appendChild(slide);
    slides.push(slide);

    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  setInterval(() => goToSlide(currentSlide + 1), 5500);
}

/* ===== SCROLL ANIMATIONS ===== */
const animEls = document.querySelectorAll('[data-animate]');
if (animEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((el, idx) => { if (el === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animEls.forEach(el => observer.observe(el));
}

/* ===== COUNT-UP ANIMATION (stats) ===== */
const statNums = document.querySelectorAll('.stat-number[data-count]');
if (statNums.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = target >= 100 ? '+' : '';
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { start = target; clearInterval(timer); }
          el.textContent = start + suffix;
        }, 16);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObserver.observe(el));
}

/* ===== MEMBER / EXEC TAB SWITCHING ===== */
function showYear(id, btn) {
  document.querySelectorAll('.member-group').forEach(g => g.classList.remove('active-group'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active-group');

  if (btn) {
    btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function showExec(id, btn) {
  document.querySelectorAll('.executive-group').forEach(g => g.classList.remove('active-group'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active-group');

  if (btn) {
    btn.closest('.tab-bar').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

/* ===== GALLERY FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const albumCards  = document.querySelectorAll('.album-card');
const countEl     = document.getElementById('visibleCount');
const noResults   = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    albumCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  });
});
