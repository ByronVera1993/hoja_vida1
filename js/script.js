const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.querySelector('.back-to-top');
const copyPhoneButton = document.querySelector('#copy-phone');
const toast = document.querySelector('.toast');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  navMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navMenu.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

document.querySelectorAll('.nav-menu a').forEach((link) => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-level]').forEach((bar) => {
        bar.style.width = `${bar.dataset.level}%`;
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });

const skillsSection = document.querySelector('#habilidades');
if (skillsSection) skillsObserver.observe(skillsSection);

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');
const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => activeSectionObserver.observe(section));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

copyPhoneButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('0989586815');
    toast.textContent = '¡Número copiado!';
  } catch {
    toast.textContent = 'Selecciona y copia el número: 0989586815';
  }
  window.setTimeout(() => { toast.textContent = ''; }, 3000);
});

// Las barras comienzan en cero hasta que Byron indique el porcentaje real de cada habilidad.
