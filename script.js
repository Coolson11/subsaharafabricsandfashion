// Dynamic gallery image data array
// These are local files from the images folder in your project.
// Replace, remove, or add entries here when you want to change the mannequin gallery.
const products = [
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.21 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.22 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.23 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.24 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.24 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.25 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.26 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.27 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.27 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.28 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.28 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.30 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.30 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.31 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.31 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.34 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.34 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.34 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.35 PM (1).jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.32 PM.jpeg' },
];

const productGrid = document.getElementById('productGrid');
const femaleGrid = document.getElementById('femaleGrid');

const femaleProducts = [
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.31 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.32 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.33 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.33 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.33 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.35 PM.jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.29 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.29 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.29 PM.jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.23 PM (2).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.23 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.24 PM (1).jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.30 PM.jpeg' },
      { image: 'images/WhatsApp Image 2026-04-03 at 11.00.25 PM (1).jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.25 PM (2).jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.26 PM.jpeg' },
  { image: 'images/WhatsApp Image 2026-04-03 at 11.00.27 PM (1).jpeg' },
    { image: 'images/WhatsApp Image 2026-04-03 at 11.00.22 PM (1).jpeg' },
];

// Create the product gallery dynamically from the array
products.forEach((product) => {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 reveal';

  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.className = 'product-image';
  img.src = product.image;
  img.alt = 'Mannequin product image placeholder';

  card.appendChild(img);
  col.appendChild(card);
  productGrid.appendChild(col);
});

// Create the female mannequin collection dynamically
femaleProducts.forEach((product) => {
  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 reveal';

  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('img');
  img.className = 'product-image';
  img.src = product.image;
  img.alt = 'Female mannequin image placeholder';

  card.appendChild(img);
  col.appendChild(card);
  femaleGrid.appendChild(col);
});

// Smooth scroll nav background change on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer to reveal sections with fade-in animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((section) => revealObserver.observe(section));

// Optional fallback for browsers without IntersectionObserver support
if (!('IntersectionObserver' in window)) {
  reveals.forEach((section) => section.classList.add('visible'));
}
