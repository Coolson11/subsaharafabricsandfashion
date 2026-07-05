"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import "../styles.css";

const DEFAULT_LOGO_URL = "https://utfs.io/f/VwJDgBnJTciGCXssWwZVMx3KzGL0ZuSavEfgoPqk4OWmeJA1";
const DEFAULT_FATHER_URL = "https://utfs.io/f/VwJDgBnJTciGvHRFL9rDbinWzl28NuIc3woZ16MAvTrhqaGU";
const DEFAULT_MOTHER_URL = "https://utfs.io/f/VwJDgBnJTciGc1xziZSBjSeyQbzWB7Guf9i3qM8tav5wnZkl";

export default function MemorabiliaPage() {
  const [logoImg, setLogoImg] = useState<string | null>(null);
  const [fatherImg, setFatherImg] = useState<string | null>(null);
  const [motherImg, setMotherImg] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);


  useEffect(() => {
    // 1. Fetch images dynamically from the unified CMS API
    async function loadCMSData() {
      try {
        const response = await fetch("/api/images");
        if (response.ok) {
          const data = await response.json();
          
          const logo = data.filter((img: any) => img.category.toLowerCase() === "logo");
          const father = data.filter((img: any) => img.category.toLowerCase() === "father");
          const mother = data.filter((img: any) => img.category.toLowerCase() === "mother");
          
          if (logo.length > 0) setLogoImg(logo[0].imageUrl);
          if (father.length > 0) setFatherImg(father[0].imageUrl);
          if (mother.length > 0) setMotherImg(mother[0].imageUrl);
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

    // 3. Setup Observer for reveal classes
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
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
  }, []);

  const activeLogo = logoImg || DEFAULT_LOGO_URL;
  const activeFather = fatherImg || DEFAULT_FATHER_URL;
  const activeMother = motherImg || DEFAULT_MOTHER_URL;

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
            <Link className="navbar-brand logo d-flex align-items-center text-white" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeLogo} alt="Luxe Mode logo" className="logo-img me-2" />
              <span>SUB SAHARA</span>
            </Link>
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
                <li className="nav-item"><Link className="nav-link text-white" href="/#home" onClick={() => setIsNavOpen(false)}>Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" href="/#shop" onClick={() => setIsNavOpen(false)}>Shop</Link></li>
                <li className="nav-item"><Link className="nav-link text-white active" href="/memorabilia" onClick={() => setIsNavOpen(false)}>Memorabilia</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" href="/#about" onClick={() => setIsNavOpen(false)}>About</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" href="/#contact" onClick={() => setIsNavOpen(false)}>Contact</Link></li>
              </ul>
            </div>

          </div>
        </nav>
      </header>

      {/* Memorabilia Section */}
      <section className="memorabilia-section py-5">
        <div className="container">
          <div className="section-header text-center mb-5 mt-5">
            <p className="section-label text-uppercase mb-2">In Loving Memory</p>
            <h2 className="section-title text-white">FABRICS AND FASHION</h2>
            <p className="section-description text-white mb-4">My beloved Father and Mother... my inspirators.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {/* Father Tribute */}
            <div className="col-md-5">
              <div className="tribute-card text-center">
                <div className="tribute-image-wrapper mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeFather} alt="My beloved father, Mr. H.B. Williams" className="img-fluid tribute-image rounded-4 shadow-lg" />
                </div>
                <h3 className="tribute-name">My Beloved Father</h3>
                <p className="tribute-title">Mr. H.B. Williams</p>
              </div>
            </div>
            {/* Mother Tribute */}
            <div className="col-md-5">
              <div className="tribute-card text-center">
                <div className="tribute-image-wrapper mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeMother} alt="My beloved mother, Mrs. C.K. Williams" className="img-fluid tribute-image rounded-4 shadow-lg" />
                </div>
                <h3 className="tribute-name">My Beloved Mother</h3>
                <p className="tribute-title">Mrs. C.K. Williams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-5 text-white">
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
