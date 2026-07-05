// CMS Connection URL (adjust to production host if deployed)
const CMS_URL = 'http://localhost:3000';

// Fallback arrays for local images in case the CMS is offline or empty
const fallbackProducts = [
  { image: 'https://utfs.io/f/VwJDgBnJTciGaEtzfMHInGQtdDkZ3lAgO1WFm2c5xeMKYCzu' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGvR1QXarDbinWzl28NuIc3woZ16MAvTrhqaGU' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGXlnUTTvUxFrcRKo4tOGmN25pqJLY9AB8w3ed' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGbo4DXiuNTeu6hQf9tMozY2Hmj5sgCRyEZADq' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGenBtjlFUqjVZYnLkGxAuWJKDrmNFbo1pP5sg' },
  { image: 'https://utfs.io/f/VwJDgBnJTciG65e3MTXRxobIsZU0plKEAw3t97NaLjWc8zQn' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGYr47Fcbn20UgT5CXLWJysHIdYVvo7wcZKfb4' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGvyN8JerDbinWzl28NuIc3woZ16MAvTrhqaGU' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGBGomT4xxed1FtVsXmG6cjnUwEOga3A4iZCPT' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGqBya4m6yVeTjdo0JsuX4tUrNFIfPKQEkLYn9' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGR2xdl1C3jmC5VSltfD4QWzU1raIO9F8hyL2v' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGbHJYv0uNTeu6hQf9tMozY2Hmj5sgCRyEZADq' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGL955afKu3TzZ4dS09Cag6w7Rjqbtp8vKGDIe' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGYVuzesGbn20UgT5CXLWJysHIdYVvo7wcZKfb' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGlBxX8xjkEU6fIAlFu0YwxzHZ5h7VT3jySXbP' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGHKZch7RvjcJKo3WgHMNy5Aa0GOpq4IhQ6UVi' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGJUxoQIGLtI3p5ReU6zXuHay48OVlcvhNSfTJ' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGQR1LIQmaUW3MyDSAwgrxq5TeljNdcPkfY1uh' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGq2LekV6yVeTjdo0JsuX4tUrNFIfPKQEkLYn9' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGkVkZs2qnBfV8v3IawdS5qGot0pujyMzNU4Xg' },
];

const fallbackFemaleProducts = [
  { image: 'https://utfs.io/f/VwJDgBnJTciGxqtN3L1ZQdsP7oOjfAyhIiTbH28gBnvc593Y' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGzOyYtbAw4jK7nhE2XGqxrlTf3CbJeouYzsOZ' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGry0aAMY830gSByrzn4l7ZYcXohaP69mDeW2f' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGlU0e9QjkEU6fIAlFu0YwxzHZ5h7VT3jySXbP' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGsztmD65m4V7YEQdL1PH5hDAjwRopq0NJc39i' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGvNjdFWrDbinWzl28NuIc3woZ16MAvTrhqaGU' },
  { image: 'https://utfs.io/f/VwJDgBnJTciG0MNCPbrJRWnNEacj3KgmHudhXVFvPBQrtSxT' },
  { image: 'https://utfs.io/f/VwJDgBnJTciG1g5PdZl8RbiktcWe4Iq6DxrQa9gXEjf5upZT' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGsggG8825m4V7YEQdL1PH5hDAjwRopq0NJc39' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGZlnqLYy6FtBr3RNcv2lKLfWhCJ1DYuUEjaqo' },
  { image: 'https://utfs.io/f/VwJDgBnJTciG17CRfil8RbiktcWe4Iq6DxrQa9gXEjf5upZT' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGrSa3C6Y830gSByrzn4l7ZYcXohaP69mDeW2f' },
  { image: 'https://utfs.io/f/VwJDgBnJTciG1TQfX2l8RbiktcWe4Iq6DxrQa9gXEjf5upZT' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGTfrgU40EM1naI3GbBdNZmuV9cK6pwvYFHX4j' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGWNzSAl99X6yNBMmUxVWEoczrgjlOhCRpPwds' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGqyZcfV6yVeTjdo0JsuX4tUrNFIfPKQEkLYn9' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGiPd2MyTarNgOopSzI57YnTCRtkeZ4fiXJDxL' },
  { image: 'https://utfs.io/f/VwJDgBnJTciGuG4SGEVUo9cBx0bfaiWGCyrHEMTqKQD8hR2w' },
];

// Smooth scroll nav background change on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Intersection Observer for scroll reveal animations
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

// Fallback logic check if IntersectionObserver is supported
const setupReveals = () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((section) => section.classList.add('visible'));
  } else {
    reveals.forEach((section) => revealObserver.observe(section));
  }
};

// Helper function to build and render dynamic cards to grids
function renderCollection(container, items, defaultAlt) {
  if (!container) return;
  container.innerHTML = ''; // Clear container

  items.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 reveal';

    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.className = 'product-image';
    // Support direct API url key as well as standard static objects
    img.src = item.imageUrl || item.image;
    img.alt = item.originalFileName || defaultAlt;

    card.appendChild(img);
    col.appendChild(card);
    container.appendChild(col);
  });
}

// Asynchronously load and map CMS image data
async function loadCMSContent() {
  const productGrid = document.getElementById('productGrid');
  const femaleGrid = document.getElementById('femaleGrid');
  const heroSection = document.querySelector('.hero-section');
  const crossImage = document.querySelector('.cross-image');
  
  // Tribute images selectors using partial alt matches
  const fatherImage = document.querySelector('img[alt*="father"]');
  const motherImage = document.querySelector('img[alt*="mother"]');

  let cmsImages = [];
  try {
    const response = await fetch(`${CMS_URL}/api/images`);
    if (response.ok) {
      cmsImages = await response.json();
    }
  } catch (error) {
    console.warn("CMS service is unreachable, using static fallback assets.", error);
  }

  // 1. Male Collection Grid
  if (productGrid) {
    const maleImages = cmsImages.filter(img => img.category.toLowerCase() === 'male');
    if (maleImages.length > 0) {
      renderCollection(productGrid, maleImages, 'Male mannequin apparel');
    } else {
      renderCollection(productGrid, fallbackProducts, 'Male mannequin apparel placeholder');
    }
  }

  // 2. Female Collection Grid
  if (femaleGrid) {
    const femaleImages = cmsImages.filter(img => img.category.toLowerCase() === 'female');
    if (femaleImages.length > 0) {
      renderCollection(femaleGrid, femaleImages, 'Female mannequin apparel');
    } else {
      renderCollection(femaleGrid, fallbackFemaleProducts, 'Female mannequin apparel placeholder');
    }
  }

  // 3. Hero Header Image
  if (heroSection) {
    const heroImages = cmsImages.filter(img => img.category.toLowerCase() === 'hero');
    if (heroImages.length > 0) {
      const heroUrl = heroImages[0].imageUrl;
      heroSection.style.backgroundImage = `linear-gradient(180deg, rgba(7, 5, 4, 0.45), rgba(7, 5, 4, 0.75)), url('${heroUrl}')`;
    }
  }

  // 4. Religious Cross Illustration
  if (crossImage) {
    const crossImages = cmsImages.filter(img => img.category.toLowerCase() === 'cross');
    if (crossImages.length > 0) {
      crossImage.src = crossImages[0].imageUrl;
    }
  }

  // 5. Tribute Memorabilia Photos
  if (fatherImage) {
    const fatherImages = cmsImages.filter(img => img.category.toLowerCase() === 'father');
    if (fatherImages.length > 0) {
      fatherImage.src = fatherImages[0].imageUrl;
    }
  }
  if (motherImage) {
    const motherImages = cmsImages.filter(img => img.category.toLowerCase() === 'mother');
    if (motherImages.length > 0) {
      motherImage.src = motherImages[0].imageUrl;
    }
  }

  // Initialize animations for all loaded elements (both database and fallback)
  setupReveals();
}

// Execute core logic when document is parsed
document.addEventListener('DOMContentLoaded', loadCMSContent);
