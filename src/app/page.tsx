"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import "./styles.css";

// Fallback arrays for local/CDN images in case the CMS is offline or empty
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

const DEFAULT_LOGO_URL = "https://utfs.io/f/VwJDgBnJTciGCXssWwZVMx3KzGL0ZuSavEfgoPqk4OWmeJA1";
const DEFAULT_CROSS_URL = "https://utfs.io/f/VwJDgBnJTciG07CRcsJRWnNEacj3KgmHudhXVFvPBQrtSxTo";

export default function HomePage() {
  const [maleImages, setMaleImages] = useState<any[]>([]);
  const [femaleImages, setFemaleImages] = useState<any[]>([]);
  const [heroBg, setHeroBg] = useState<string | null>(null);
  const [crossImg, setCrossImg] = useState<string | null>(null);
  const [logoImg, setLogoImg] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);


  useEffect(() => {
    // 1. Fetch images dynamically from the unified CMS API
    async function loadCMSData() {
      try {
        const response = await fetch("/api/images");
        if (response.ok) {
          const data = await response.json();
          
          const male = data.filter((img: any) => img.category.toLowerCase() === "male");
          const female = data.filter((img: any) => img.category.toLowerCase() === "female");
          const hero = data.filter((img: any) => img.category.toLowerCase() === "hero");
          const cross = data.filter((img: any) => img.category.toLowerCase() === "cross");
          const logo = data.filter((img: any) => img.category.toLowerCase() === "logo");
          
          setMaleImages(male);
          setFemaleImages(female);
          
          if (hero.length > 0) setHeroBg(hero[0].imageUrl);
          if (cross.length > 0) setCrossImg(cross[0].imageUrl);
          if (logo.length > 0) setLogoImg(logo[0].imageUrl);
        }
      } catch (err) {
        console.warn("CMS API fetch failed, using fallback static CDN mapping.", err);
      }
    }
    
    loadCMSData();

    // 2. Navigation Header background opacity scroll handler
    const header = document.querySelector(".site-header");
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleScroll);

    // 3. Intersection Observer for fade-in animations (.reveal)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((section) => {
        revealObserver.observe(section);
      });
    }, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      clearTimeout(timer);
    };
  }, [maleImages.length, femaleImages.length]);

  const activeMaleList = maleImages.length > 0 ? maleImages : fallbackProducts;
  const activeFemaleList = femaleImages.length > 0 ? femaleImages : fallbackFemaleProducts;
  const activeLogo = logoImg || DEFAULT_LOGO_URL;
  const activeCross = crossImg || DEFAULT_CROSS_URL;

  const heroStyle = heroBg
    ? { backgroundImage: `linear-gradient(180deg, rgba(7, 5, 4, 0.45), rgba(7, 5, 4, 0.75)), url('${heroBg}')` }
    : {}; // Fallback managed by local styles.css definitions

  return (
    <>
      {/* Dynamic Header CSS/CDNs hoisted to HTML head */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.4/font/bootstrap-icons.css" rel="stylesheet" />

      {/* Sticky Header Nav */}
      <header className="site-header fixed-top">
        <nav className="navbar navbar-expand-lg py-3 px-4">
          <div className="container-fluid align-items-center">
            <a className="navbar-brand logo d-flex align-items-center text-white" href="#home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeLogo} alt="Luxe Mode logo" className="logo-img me-2" />
              <span>SUB SAHARA</span>
            </a>
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-controls="navbarMenu" 
              aria-expanded={isNavOpen} 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"><i className="bi bi-list fs-2 text-white"></i></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end ${isNavOpen ? "show" : ""}`} id="navbarMenu">
              <ul className="navbar-nav align-items-center gap-3 ms-auto">
                <li className="nav-item"><a className="nav-link text-white" href="#home" onClick={() => setIsNavOpen(false)}>Home</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#shop" onClick={() => setIsNavOpen(false)}>Shop</a></li>
                <li className="nav-item"><Link className="nav-link text-white" href="/memorabilia" onClick={() => setIsNavOpen(false)}>Memorabilia</Link></li>
                <li className="nav-item"><a className="nav-link text-white" href="#about" onClick={() => setIsNavOpen(false)}>About</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#contact" onClick={() => setIsNavOpen(false)}>Contact</a></li>
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* Hero section */}
      <section id="home" className="hero-section d-flex align-items-center justify-content-center text-center" style={heroStyle}>
        <div className="hero-overlay"></div>
        <div className="hero-content container position-relative text-white">
          <p className="eyebrow text-uppercase letter-spacing-sm mb-4">Luxury fashion collection</p>
          <h1 className="display-4 fw-bold fst-italic">SOPHISTICATION in Every Design</h1>
          <p className="lead mt-4 mx-auto hero-description">A curated world of premium silhouettes, sculpted for modern elegance.</p>
          <a href="#shop" className="btn btn-outline-light btn-shop mt-4">Shop Now</a>
        </div>
      </section>

      {/* Male Collection section */}
      <section id="shop" className="shop-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <p className="section-label text-uppercase mb-2">Male Collection</p>
            <h2 className="section-title text-white">Modern Fabrics Collections</h2>
          </div>
          <div id="productGrid" className="row g-3">
            {activeMaleList.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-3 reveal">
                <div className="product-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl || item.image} alt="Male mannequin product" className="product-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Female Collection section */}
      <section id="female" className="shop-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5">
            <p className="section-label text-uppercase mb-2">Female Collection</p>
            <h2 className="section-title text-white">Modern Fabrics Collections</h2>
          </div>
          <div id="femaleGrid" className="row g-3">
            {activeFemaleList.map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4 col-xl-3 reveal">
                <div className="product-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl || item.image} alt="Female mannequin product" className="product-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scripture-section py-5">
        <div className="container text-center text-white py-5">
          <div className="quote-card mx-auto p-4 p-md-5 rounded-4 shadow-lg text-start">
            <h2 className="section-title text-center mb-4 text-white">Mission Statement</h2>
            <p className="scripture-text mb-3">
              1. The mission of Sub Sahara Fabrics and Fashion LLC is to give Africans the opportunity to design unique, high-end apparel with a sophisticated flair for women and men made of 💯 percent cotton in order to create its own fashion industry and to generate meaningful and sustainable jobs for Africans.
            </p>
            <p className="scripture-text mb-3">
              2. To diversify the effect of cotton by using fabric treatments such as tie-dye, batik, brillian, print and open weave.
            </p>
            <p className="scripture-text mb-3">
              3. To use vivid colors, shape, line and texture in order to harmonize, emphasize and balance the design of the textile.
            </p>
            <h3 className="scripture-title text-uppercase mt-4 mb-3">Our Vision</h3>
            <p className="scripture-text mb-3">
              1. To incorporate into our product line, bedspreads made of woven cotton.
            </p>
            <p className="scripture-text mb-3">
              2. To form a Consortium of African Fabric and Apparel Designers (CAFAD).
            </p>
            <p className="scripture-text mb-0">
              3. To promote and sell consumer products manufactured in the United States throughout the ECOWAS States of the Sub Sahara region, in order to create jobs for Americans and Africans.
            </p>
          </div>
        </div>
      </section>

      {/* Scriptures section */}
      <section id="scriptures" className="scripture-section py-5">
        <div className="container text-center text-white py-5">
          <div className="quote-card mx-auto p-4 p-md-5 rounded-4 shadow-lg">
            <p className="scripture-title text-uppercase mb-4">Isaiah 54:17</p>
            <p className="scripture-text mb-5">"No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn."</p>
            <p className="scripture-title text-uppercase mb-4">Matthew 14:15-21</p>
            <p className="scripture-text">"And they did all eat, and were filled: and they took up of the fragments that remained twelve baskets full."</p>
          </div>
        </div>
      </section>

      {/* Cross section */}
      <section className="cross-section py-5">
        <div className="container d-flex justify-content-center">
          <div className="cross-card rounded-4 shadow-glow p-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeCross} alt="Cross" className="img-fluid cross-image mb-3" />
            <p className="cross-caption text-white mb-0">A quiet symbol of grace and presence.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer-section py-5 text-white">
        <div className="container">
          <div className="row gy-4">
            <div className="col-md-4">
              <div className="footer-brand d-flex align-items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeLogo} alt="Luxe Mode logo" className="footer-logo-img" />
                <h3 className="footer-logo mb-0">SUB SAHARA FABRIC AND FASHION</h3>
              </div>
              <p className="footer-tagline fst-italic">Where every detail is designed to be timeless.</p>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Contact</h5>
              <p className="mb-1">Email: Clairg1947@gmail.com</p>
              <p className="mb-0">Phone: +232 78 544 418 | +347 773 9036</p>
              <p className="mb-0">Address: 43 Main Road, Congo Town</p>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Follow</h5>
              <div className="social-icons d-flex gap-3">
                <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom text-center mt-4">
            <p className="mb-0">&copy; 2026 SUB SAHARA FABRIC AND FASHION. Crafted for the elegant wardrobe.</p>
          </div>
        </div>
      </footer>

      {/* Bootstrap JS bundle */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
    </>
  );
}
