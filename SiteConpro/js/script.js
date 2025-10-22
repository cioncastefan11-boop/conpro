// Mobile menu
const btn = document.querySelector('.menuBtn');
const list = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const open = list.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();