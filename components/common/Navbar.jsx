"use client";
import { Heart, User, ShoppingBag, Menu, Search, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import SignupModal from "./SignupModel";
import { useAuth } from "@/context/AuthContext";
import { navApi } from "../../lib/api";

/* ══════════════════════════════
   STATIC FALLBACKS
   (used while API loads or on error)
══════════════════════════════ */
const FALLBACK_NAV = {
  topbar: {
    visible: true,
    text: "FREE SHIPPING ON ORDERS ABOVE ₹50,000 · BIS HALLMARKED JEWELLERY · VISIT OUR STORES",
  },
  navItems: [
    { _id: "1", name: "Brand",        href: "/about",                   visible: true, hasMegaMenu: false },
    { _id: "2", name: "Masterpieces", href: "/listing?sort=rating",     visible: true, hasMegaMenu: false },
    { _id: "3", name: "Jewellery",    href: "/listing",                 visible: true, hasMegaMenu: true  },
    { _id: "4", name: "Weddings",     href: "/wedding",                 visible: true, hasMegaMenu: false },
    { _id: "5", name: "Occasions",    href: "/listing?occasion=Festive",visible: true, hasMegaMenu: false },
    { _id: "6", name: "Gold Rate",    href: "/gold-rate",               visible: true, hasMegaMenu: false },
    { _id: "7", name: "Store",        href: "/contact",                 visible: true, hasMegaMenu: false },
  ],
  megaCols: [
    {
      _id: "c1", title: "By Category", highlightLast: false,
      items: [
        { label: "Earrings",     href: "/listing?category=Earring",     visible: true },
        { label: "Rings",        href: "/listing?category=Ring",        visible: true },
        { label: "Necklaces",    href: "/listing?category=Necklace",    visible: true },
        { label: "Bangles",      href: "/listing?category=Bangle",      visible: true },
        { label: "Mangalsutras", href: "/listing?category=Mangalsutra", visible: true },
      ],
    },
    {
      _id: "c2", title: "", highlightLast: true,
      items: [
        { label: "Pendants",      href: "/listing?category=Pendant",  visible: true },
        { label: "Bracelets",     href: "/listing?category=Bracelet", visible: true },
        { label: "Chains",        href: "/listing?category=Chain",    visible: true },
        { label: "Coins",         href: "/listing?category=Other",    visible: true },
        { label: "All Jewellery", href: "/listing",                   visible: true },
      ],
    },
    {
      _id: "c3", title: "By Metal", highlightLast: false,
      items: [
        { label: "Gold Jewellery",    href: "/listing?metal=Gold",  visible: true },
        { label: "Diamond Jewellery", href: "/listing?purity=18KT", visible: true },
        { label: "Polki Jewellery",   href: "/listing?style=Polki", visible: true },
      ],
    },
    {
      _id: "c4", title: "By Karatage", highlightLast: false,
      items: [
        { label: "14KT", href: "/listing?purity=14KT", visible: true },
        { label: "18KT", href: "/listing?purity=18KT", visible: true },
        { label: "22KT", href: "/listing?purity=22KT", visible: true },
        { label: "24KT", href: "/listing?purity=24KT", visible: true },
      ],
    },
  ],
  megaImgs: [
    { _id: "i1", src: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/rings-cat.jpg",    alt: "Rings",    href: "/listing?category=Ring",   visible: true },
    { _id: "i2", src: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw18de0cb1/homepage/shopByCategory/earrings-cat.jpg", alt: "Earrings", href: "/listing?category=Earring", visible: true },
  ],
  searchHints: ["Gold Rings", "Diamond Necklace", "Bangles", "Mangalsutra", "Earrings", "Bridal Sets"],
};

/* ══════════════════════════════
   STYLES
══════════════════════════════ */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

  .nb-root { font-family:'Jost',sans-serif; background:#FFFDF9; border-bottom:1px solid #E8DDD0; position:fixed; top:0; left:0; width:100%; z-index:50; transition:box-shadow .3s; }
  .nb-root.nb-scrolled { box-shadow:0 4px 24px rgba(139,100,48,.13); }
  .nb-topbar { background:#2C1A0E; text-align:center; padding:7px 0; font-size:11px; letter-spacing:2px; color:#D4AF6A; }
  .nb-gold-line { height:2px; background:linear-gradient(90deg,transparent,#B8862A 20%,#E8C96A 50%,#B8862A 80%,transparent); }
  .nb-inner { max-width:1400px; margin:0 auto; padding:0 40px; display:flex; align-items:center; justify-content:space-between; height:66px; gap:20px; }

  /* Logo */
  .nb-logo { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:600; color:#2C1A0E; letter-spacing:5px; text-transform:uppercase; cursor:pointer; flex-shrink:0; text-decoration:none; }
  .nb-logo span { color:#B8862A; }

  /* Desktop nav */
  .nb-menu { display:flex; align-items:center; gap:0; }
  .nb-link { font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; color:#3D2B1A; padding:6px 11px; position:relative; transition:color .2s; white-space:nowrap; text-decoration:none; display:inline-flex; align-items:center; gap:4px; border:none; background:none; font-family:'Jost',sans-serif; cursor:pointer; }
  .nb-link::after { content:''; position:absolute; bottom:0; left:11px; right:11px; height:1.5px; background:#B8862A; transform:scaleX(0); transform-origin:center; transition:transform .25s; }
  .nb-link:hover { color:#B8862A; }
  .nb-link:hover::after { transform:scaleX(1); }
  .nb-link.active { color:#B8862A; }
  .nb-link.active::after { transform:scaleX(1); }

  /* Mega wrap */
  .nb-mega-wrap { position:relative; }
  .nb-mega-wrap::after { content:''; position:absolute; top:100%; left:0; right:0; height:20px; }

/* Mega panel */
  .nb-mega { position:fixed; left:0; top:var(--navbar-bottom,110px); width:100vw; background:#FFFDF9; border-top:2px solid #E8C96A; box-shadow:0 20px 60px rgba(44,26,14,.14); opacity:0; visibility:hidden; pointer-events:none; transform:translateY(-8px); transition:opacity .22s ease,transform .22s ease,visibility .22s; z-index:49; }
  .nb-mega-wrap:hover .nb-mega, .nb-mega:hover { opacity:1; visibility:visible; pointer-events:all; transform:translateY(0); }
  .nb-mega-inner { max-width:1400px; margin:0 auto; padding:32px 40px 36px; display:grid; gap:36px; }
  .nb-col-title { font-size:9.5px; font-weight:600; letter-spacing:2.5px; color:#B8862A; text-transform:uppercase; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
  .nb-col-title::after { content:''; flex:1; height:1px; background:#EDE4D8; }
  .nb-mega ul { list-style:none; padding:0; margin:0; }
  .nb-mega-item { display:block; font-size:13px; color:#4A3728; padding:6px 0; cursor:pointer; transition:color .18s,padding-left .18s; letter-spacing:.3px; text-decoration:none; border:none; background:none; font-family:'Jost',sans-serif; width:100%; text-align:left; }
  .nb-mega-item:hover { color:#B8862A; padding-left:6px; }
  .nb-mega-item.highlight { font-weight:500; text-decoration:underline; }
  .nb-mega-imgs { display:flex; flex-direction:column; gap:8px; }
  .nb-mega-img-wrap { position:relative; overflow:hidden; border-radius:3px; display:block; flex:1; }
  .nb-mega-img-wrap img { width:100%; height:100px; object-fit:cover; display:block; transition:transform .4s,filter .3s; }
  .nb-mega-img-wrap:hover img { transform:scale(1.05); filter:brightness(.82); }
  .nb-mega-img-label { position:absolute; bottom:8px; left:10px; font-family:'Cormorant Garamond',serif; font-size:15px; color:#FFFDF9; font-weight:400; text-shadow:0 1px 4px rgba(0,0,0,.5); pointer-events:none; }

  /* Search overlay */
  .nb-search-drop { position:fixed; left:0; right:0; top:var(--navbar-bottom,110px); background:#FFFDF9; border-top:1px solid #E8DDD0; box-shadow:0 8px 32px rgba(44,26,14,.12); z-index:48; padding:20px 40px; animation:nb-search-in .18s ease; }
  @keyframes nb-search-in { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  .nb-search-form { max-width:720px; margin:0 auto; display:flex; align-items:center; gap:14px; border-bottom:2px solid #2C1A0E; padding-bottom:12px; }
  .nb-search-input { flex:1; border:none; outline:none; font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300; color:#2C1A0E; background:transparent; caret-color:#B8862A; }
  .nb-search-input::placeholder { color:#C4B4A4; }
  .nb-search-close { background:none; border:none; cursor:pointer; color:#9E8875; transition:color .2s; padding:4px; display:flex; }
  .nb-search-close:hover { color:#2C1A0E; }
  .nb-search-hints { max-width:720px; margin:14px auto 0; display:flex; gap:8px; flex-wrap:wrap; }
  .nb-hint { border:1px solid #E8DDD0; color:#7A6656; padding:5px 14px; font-size:11px; letter-spacing:1px; text-transform:uppercase; cursor:pointer; border-radius:2px; font-family:'Jost',sans-serif; background:none; transition:all .2s; }
  .nb-hint:hover { border-color:#B8862A; color:#B8862A; }

  /* Icons */
  .nb-icons { display:flex; gap:14px; align-items:center; flex-shrink:0; }
  .nb-icon { background:none; border:none; cursor:pointer; color:#3D2B1A; transition:color .2s; display:flex; position:relative; padding:4px; text-decoration:none; }
  .nb-icon:hover { color:#B8862A; }
  .nb-badge { position:absolute; top:-4px; right:-4px; background:#B8862A; color:#fff; font-size:9px; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; }
  .nb-div { width:1px; height:18px; background:#D4C4B0; }
  .nb-mob-btn { display:none; background:none; border:none; cursor:pointer; color:#3D2B1A; }
  @media(max-width:1100px){ .nb-link{padding:6px 8px;font-size:10.5px;} }
  @media(max-width:768px){ .nb-inner{padding:0 20px;} .nb-menu,.nb-icons{display:none;} .nb-mob-btn{display:flex;} .nb-search-drop,.nb-search-hints{padding:16px 20px;} .nb-search-input{font-size:22px;} }
`;

/* ═══════════ COMPONENT ═══════════ */
export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [openModel,  setOpenModel]  = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query,      setQuery]      = useState("");
  const [navData,    setNavData]    = useState(FALLBACK_NAV);
  const searchInputRef = useRef(null);
  const router   = useRouter();
  const pathname = usePathname();
  const { cartCount, isLoggedIn } = useAuth();

  /* ── Fetch nav config from backend ── */
  useEffect(() => {
    navApi.get()
      .then(({ nav }) => {
        if (nav) setNavData(nav);
      })
      .catch(() => { /* keep fallback silently */ });
  }, []);

  /* ── Update --navbar-bottom CSS var ── */
  const updateVar = () => {
    const el = document.querySelector(".nb-root");
    if (el) document.documentElement.style.setProperty("--navbar-bottom", `${el.getBoundingClientRect().bottom}px`);
  };
  useEffect(() => {
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);
  useEffect(() => {
    const h = () => { setScrolled(window.scrollY > 20); updateVar(); };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* ── Focus search on open ── */
  useEffect(() => {
    if (showSearch) setTimeout(() => searchInputRef.current?.focus(), 60);
  }, [showSearch]);

  /* ── Escape closes search ── */
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setShowSearch(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setShowSearch(false);
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const isActive = (href) => {
    if (!href) return false;
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  /* ── Destructure live data ── */
  const { topbar, navItems = [], megaCols = [], megaImgs = [], searchHints = [] } = navData;

  /* Build grid columns count: megaCols + 1 image col */
  const gridCols = `repeat(${megaCols.length}, 1fr) 220px`;

  return (
    <>
      <style>{S}</style>

      <div className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>
        {/* Topbar — controlled by backend */}
        {topbar?.visible && <div className="nb-topbar">{topbar.text}</div>}
        <div className="nb-gold-line" />

        <div className="nb-inner">
          {/* Logo */}
          <Link href="/" className="nb-logo">
            MAN<span>A</span>S
          </Link>

          {/* Desktop nav — from backend */}
          <nav className="nb-menu">
            {navItems.map((item) =>
              item.hasMegaMenu ? (
                <div key={item._id} className="nb-mega-wrap">
                  <Link
                    href={item.href || "/listing"}
                    className={`nb-link${isActive(item.href) ? " active" : ""}`}
                  >
                    {item.name}{" "}
                    <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
                  </Link>

                  {/* Mega panel — columns from backend */}
                  <div className="nb-mega">
                    <div
                      className="nb-mega-inner"
                      style={{ gridTemplateColumns: gridCols }}
                    >
                      {megaCols.map((col) => (
                        <div key={col._id}>
                          {col.title && (
                            <p className="nb-col-title">{col.title}</p>
                          )}
                          <ul>
                            {col.items.map((itm, k) => (
                              <li key={k}>
                                <Link
                                  href={itm.href || "/listing"}
                                  className={`nb-mega-item${col.highlightLast && k === col.items.length - 1 ? " highlight" : ""}`}
                                >
                                  {itm.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Featured images — from backend */}
                      <div className="nb-mega-imgs">
                        {megaImgs.map((img) => (
                          <Link
                            key={img._id}
                            href={img.href || "/listing"}
                            className="nb-mega-img-wrap"
                          >
                            <img src={img.src} alt={img.alt} />
                            <span className="nb-mega-img-label">{img.alt}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item._id}
                  href={item.href || "/"}
                  className={`nb-link${isActive(item.href) ? " active" : ""}`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop icons */}
          <div className="nb-icons">
            <button
              className="nb-icon"
              onClick={() => setShowSearch((v) => !v)}
              title="Search"
            >
              {showSearch ? <X size={17} /> : <Search size={17} />}
            </button>
            <div className="nb-div" />
            <button
              className="nb-icon"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/account");
                } else {
                  setOpenModel(true);
                }
              }}
              title="My Account"
            >
              <User size={17} />
            </button>
            <Link href="/wishlist" className="nb-icon" title="Wishlist">
              <Heart size={17} />
            </Link>
            <Link href="/cart" className="nb-icon" title="Cart">
              <ShoppingBag size={17} />
              {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="nb-mob-btn" onClick={() => setIsOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Search overlay — hints from backend */}
      {showSearch && (
        <div className="nb-search-drop">
          <form className="nb-search-form" onSubmit={handleSearch}>
            <Search size={22} style={{ color: "#B8862A", flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              className="nb-search-input"
              placeholder="Search jewellery…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="nb-search-close"
              onClick={() => setShowSearch(false)}
            >
              <X size={20} />
            </button>
          </form>
          <div className="nb-search-hints">
            {searchHints.map((h, i) => (
              <button
                key={i}
                className="nb-hint"
                onClick={() => {
                  setShowSearch(false);
                  router.push(`/search?q=${encodeURIComponent(h)}`);
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}

      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} navData={navData} />
      {openModel && <SignupModal onClose={() => setOpenModel(false)} />}
    </>
  );
}
