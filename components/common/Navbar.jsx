"use client";
import { Heart, User, ShoppingBag, Menu, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import SignupModal from "./SignupModel";

const menuData = [
  {
    title: "BY CATEGORY",
    items: ["Earrings", "Rings", "Necklaces", "Bangles", "Mangalsutras"],
  },
  {
    title: "",
    items: ["Pendants", "Bracelets", "Chains", "Coins", "All Jewellery"],
    highlightLast: true,
  },
  {
    title: "BY METAL",
    items: ["Gold Jewellery", "Diamond Jewellery", "Polki Jewellery"],
  },
  { title: "BY KARATAGE", items: ["14KT", "18KT", "22KT", "24KT"] },
];

const menuItems = [
  { name: "Brand" },
  { name: "Masterpieces" },
  { name: "Jewellery", hasMegaMenu: true },
  { name: "Weddings" },
  { name: "Occasions" },
  { name: "Golden Programs" },
  { name: "Store" },
];

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

  /* ── Root bar ── */
  .nb-root {
    font-family: 'Jost', sans-serif;
    background: #FFFDF9;
    border-bottom: 1px solid #E8DDD0;
    position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
    transition: box-shadow 0.3s;
  }
  .nb-root.nb-scrolled { box-shadow: 0 4px 24px rgba(139,100,48,0.13); }

  .nb-topbar {
    background: #2C1A0E; text-align: center;
    padding: 7px 0; font-size: 11px; letter-spacing: 2px; color: #D4AF6A;
  }
  .nb-gold-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent);
  }
  .nb-inner {
    max-width: 1400px; margin: 0 auto; padding: 0 40px;
    display: flex; align-items: center; justify-content: space-between; height: 66px;
  }

  /* ── Logo ── */
  .nb-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 600; color: #2C1A0E;
    letter-spacing: 5px; text-transform: uppercase; cursor: pointer;
    flex-shrink: 0;
  }
  .nb-logo span { color: #B8862A; }

  /* ── Desktop menu ── */
  .nb-menu { display: flex; gap: 28px; align-items: center; }

  .nb-item {
    font-size: 11.5px; font-weight: 500; letter-spacing: 1.5px;
    text-transform: uppercase; color: #3D2B1A; cursor: pointer;
    padding: 4px 0; position: relative; transition: color 0.2s; white-space: nowrap;
  }
  .nb-item::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 1px; background: #B8862A; transition: width 0.3s;
  }
  .nb-item:hover { color: #B8862A; }
  .nb-item:hover::after { width: 100%; }

  /* ── Mega menu wrapper — key: position relative so the panel sits below THIS element ── */
  .nb-mega-wrap {
    position: relative; /* intentionally static so .nb-mega can use fixed below nb-root */
  }
  .nb-mega-wrap::after {
    content: "";
    position: absolute;
    top: 100%;      /* item ke niche start */
    left: 0;
    width: 100%;
    height: 25px;   /* 👈 gap cover karega */
}
  .nb-mega-wrap .nb-item { display: flex; align-items: center; gap: 4px; }

  /* Panel: sits just below the full navbar (top = height of topbar+gold+inner ≈ 110px) */
  /* We use a CSS variable set via JS on mount, but a reasonable default is fine */
  .nb-mega {
    position: fixed;
    left: 0;
    top: var(--navbar-bottom, 110px);   /* JS will update this */
    width: 100vw;
    background: #FFFDF9;
    border-top: 2px solid #E8C96A;
    box-shadow: 0 20px 60px rgba(44,26,14,0.14);
    /* hidden by default */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-6px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
    z-index: 49;
  }
  /* Show on hover of the wrapper */
  .nb-mega-wrap:hover .nb-mega {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transform: translateY(0);
  }
  /* Keep panel open when mouse is on panel itself */
  .nb-mega:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transform: translateY(0);
  }

  .nb-mega-inner {
    max-width: 1400px; margin: 0 auto; padding: 36px 40px;
    display: grid; grid-template-columns: repeat(4, 1fr) 200px; gap: 36px;
  }
  .nb-col-title {
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    color: #B8862A; text-transform: uppercase; margin-bottom: 12px;
  }
  .nb-mega ul { list-style: none; padding: 0; margin: 0; }
  .nb-mega ul li {
    font-size: 13px; color: #4A3728; padding: 5px 0;
    cursor: pointer; transition: color 0.2s, padding-left 0.2s; letter-spacing: 0.3px;
  }
  .nb-mega ul li:hover { color: #B8862A; padding-left: 5px; }
  .nb-mega-imgs { display: flex; gap: 8px; }
  .nb-mega-imgs img { flex: 1; height: 150px; object-fit: cover; border-radius: 3px; }

  /* ── Icons ── */
  .nb-icons { display: flex; gap: 18px; align-items: center; flex-shrink: 0; }
  .nb-icon {
    background: none; border: none; cursor: pointer;
    color: #3D2B1A; transition: color 0.2s; display: flex; position: relative;
  }
  .nb-icon:hover { color: #B8862A; }
  .nb-badge {
    position: absolute; top: -5px; right: -5px;
    background: #B8862A; color: #fff; font-size: 9px;
    width: 15px; height: 15px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-weight: 700;
  }
  .nb-div { width: 1px; height: 18px; background: #D4C4B0; }

  /* ── Mobile toggle — hidden on desktop, visible on mobile ── */
  .nb-mob-btn {
    display: none;
    background: none; border: none; cursor: pointer; color: #3D2B1A;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .nb-menu { gap: 18px; }
    .nb-item { font-size: 11px; }
  }
  @media (max-width: 768px) {
    .nb-inner { padding: 0 20px; }
    .nb-menu { display: none; }
    .nb-icons { display: none; }
    .nb-mob-btn { display: flex; }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Update the CSS variable so mega menu snaps exactly below the full navbar
  useEffect(() => {
    const updateNavBottom = () => {
      const el = document.querySelector(".nb-root");
      if (el) {
        const bottom = el.getBoundingClientRect().bottom;
        document.documentElement.style.setProperty(
          "--navbar-bottom",
          `${bottom}px`,
        );
      }
    };
    updateNavBottom();
    window.addEventListener("resize", updateNavBottom);
    return () => window.removeEventListener("resize", updateNavBottom);
  }, []);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 20);
      // recompute after scroll since topbar may hide
      const el = document.querySelector(".nb-root");
      if (el) {
        document.documentElement.style.setProperty(
          "--navbar-bottom",
          `${el.getBoundingClientRect().bottom}px`,
        );
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <style>{navStyles}</style>

      <div className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>
        <div className="nb-topbar">
          FREE SHIPPING ON ORDERS ABOVE ₹50,000 &nbsp;·&nbsp; BIS HALLMARKED
          JEWELLERY &nbsp;·&nbsp; VISIT OUR STORES
        </div>
        <div className="nb-gold-line" />

        <div className="nb-inner">
          {/* Logo */}
          <span className="nb-logo">
            MAN<span>A</span>S
          </span>

          {/* Desktop Nav */}
          <nav className="nb-menu">
            {menuItems.map((item, i) =>
              item.hasMegaMenu ? (
                <div key={i} className="nb-mega-wrap">
                  <span className="nb-item">{item.name} ▾</span>

                  {/* Mega menu panel */}
                  <div className="nb-mega">
                    <div className="nb-mega-inner">
                      {menuData.map((col, j) => (
                        <div key={j}>
                          {col.title && (
                            <p className="nb-col-title">{col.title}</p>
                          )}
                          <ul>
                            {col.items.map((itm, k) => (
                              <li
                                key={k}
                                style={
                                  col.highlightLast &&
                                  k === col.items.length - 1
                                    ? {
                                        fontWeight: 500,
                                        textDecoration: "underline",
                                      }
                                    : {}
                                }
                              >
                                {itm}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="nb-mega-imgs">
                        <img src="https://picsum.photos/150/250?1" alt="" />
                        <img src="https://picsum.photos/150/250?2" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span key={i} className="nb-item">
                  {item.name}
                </span>
              ),
            )}
          </nav>

          {/* Desktop Icons */}
          <div className="nb-icons">
            <a
              href="/search"
              className="nb-icon"
              style={{ textDecoration: "none" }}
            >
              <Search size={17} />
            </a>
            <div className="nb-div" />
            <button className="nb-icon" onClick={() => setOpenModel(true)}>
              <User size={17} />
            </button>
            <a
              href="/wishlist"
              className="nb-icon"
              style={{ textDecoration: "none" }}
            >
              <Heart size={17} />
            </a>
            <a
              href="/cart"
              className="nb-icon"
              style={{ textDecoration: "none" }}
            >
              <ShoppingBag size={17} />
              <span className="nb-badge">0</span>
            </a>
          </div>

          {/* Mobile hamburger — only visible on small screens via CSS */}
          <button className="nb-mob-btn" onClick={() => setIsOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* These render outside the navbar div so they don't affect layout */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {openModel && <SignupModal onClose={() => setOpenModel(false)} />}
    </>
  );
};

export default Navbar;
