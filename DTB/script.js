const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 450));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.classList.toggle('active');
  nav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.classList.remove('active');
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});

window.addEventListener('scroll', () => {
  const visual = document.querySelector('.hero__visual');
  if (window.scrollY < window.innerHeight) {
    visual.style.transform = `translateY(${window.scrollY * 0.14}px)`;
  }
}, { passive: true });
