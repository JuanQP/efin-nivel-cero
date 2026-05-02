// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

// Wrap the last h3+ul pair in each chapter in a summary-box
document.querySelectorAll('.prose').forEach(prose => {
  const headings = prose.querySelectorAll('h3');
  headings.forEach(h3 => {
    if (h3.textContent.trim().startsWith('Lo que aprendiste')) {
      const ul = h3.nextElementSibling;
      if (ul && ul.tagName === 'UL') {
        const box = document.createElement('div');
        box.className = 'summary-box';
        h3.parentNode.insertBefore(box, h3);
        box.appendChild(h3);
        box.appendChild(ul);
      }
    }
  });
});
