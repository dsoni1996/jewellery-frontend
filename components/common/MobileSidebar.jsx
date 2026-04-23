"use client";
import { X, ChevronDown, Gem, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/* ── Category / Metal / Karatage route maps ── */
const CAT = {
  "Earrings":      "/listing?category=Earring",
  "Rings":         "/listing?category=Ring",
  "Necklaces":     "/listing?category=Necklace",
  "Bangles":       "/listing?category=Bangle",
  "Mangalsutras":  "/listing?category=Mangalsutra",
  "Pendants":      "/listing?category=Pendant",
  "Bracelets":     "/listing?category=Bracelet",
  "Chains":        "/listing?category=Chain",
  "Coins":         "/listing?category=Other",
  "All Jewellery": "/listing",
};
const METAL = {
  "Gold Jewellery":    "/listing?metal=Gold",
  "Diamond Jewellery": "/listing?purity=18KT",
  "Polki Jewellery":   "/listing?style=Polki",
};
const KT = {
  "14KT": "/listing?purity=14KT",
  "18KT": "/listing?purity=18KT",
  "22KT": "/listing?purity=22KT",
  "24KT": "/listing?purity=24KT",
};

const megaCols = [
  { title: "By Category",  items: ["Earrings","Rings","Necklaces","Bangles","Mangalsutras","Pendants","Bracelets","Chains","Coins","All Jewellery"], map: CAT },
  { title: "By Metal",     items: ["Gold Jewellery","Diamond Jewellery","Polki Jewellery"], map: METAL },
  { title: "By Karatage",  items: ["14KT","18KT","22KT","24KT"], map: KT },
];

/* ── Top-level menu with routes ── */
const menuItems = [
  { name: "Brand",        href: "/about"                    },
  { name: "Masterpieces", href: "/listing?sort=rating"      },
  { name: "Jewellery",    href: "/listing", hasMegaMenu: true },
  { name: "Weddings",     href: "/wedding"                  },
  { name: "Occasions",    href: "/listing?occasion=Festive"  },
  { name: "Gold Rate",    href: "/gold-rate"                 },
  { name: "Store",        href: "/contact"                  },
];

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600&family=Jost:wght@300;400;500&display=swap');

  .msb-overlay { position:fixed; inset:0; background:rgba(20,10,5,.55); z-index:998; backdrop-filter:blur(2px); animation:msb-fade .2s ease; }
  @keyframes msb-fade { from{opacity:0} to{opacity:1} }

  .msb-drawer {
    position:fixed; top:0; left:0; height:100vh; width:300px; max-width:88vw;
    background:#FFFDF9; z-index:999; display:flex; flex-direction:column;
    transform:translateX(-100%); transition:transform .32s cubic-bezier(.4,0,.2,1);
    box-shadow:6px 0 40px rgba(44,26,14,.18); font-family:'Jost',sans-serif;
  }
  .msb-drawer.open { transform:translateX(0); }

  /* Header */
  .msb-header { display:flex; align-items:center; justify-content:space-between; padding:18px 20px; border-bottom:1px solid rgba(212,175,106,.2); background:#2C1A0E; flex-shrink:0; }
  .msb-logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; letter-spacing:4px; color:#FFFDF9; text-transform:uppercase; text-decoration:none; }
  .msb-logo span { color:#D4AF6A; }
  .msb-close { background:none; border:none; cursor:pointer; color:#C8B89A; transition:color .2s; padding:4px; display:flex; }
  .msb-close:hover { color:#D4AF6A; }
  .msb-gold-line { height:2px; flex-shrink:0; background:linear-gradient(90deg,transparent,#B8862A 30%,#E8C96A 50%,#B8862A 70%,transparent); }

  /* Search bar in drawer */
  .msb-search { padding:12px 20px; border-bottom:1px solid #F0E8DC; display:flex; align-items:center; gap:10px; }
  .msb-search-input { flex:1; border:none; outline:none; font-family:'Jost',sans-serif; font-size:13px; color:#2C1A0E; background:transparent; }
  .msb-search-input::placeholder { color:#B0A090; }
  .msb-search-btn { background:none; border:none; cursor:pointer; color:#B8862A; display:flex; padding:2px; }

  /* Nav */
  .msb-nav { flex:1; overflow-y:auto; padding:6px 0; }
  .msb-nav::-webkit-scrollbar { width:3px; }
  .msb-nav::-webkit-scrollbar-thumb { background:#D4AF6A; border-radius:2px; }

  .msb-item-row { display:flex; align-items:center; justify-content:space-between; padding:13px 20px; border-bottom:1px solid #F0E8DC; cursor:pointer; transition:background .15s; text-decoration:none; }
  .msb-item-row:hover { background:#FBF6EE; }
  .msb-item-name { font-size:11.5px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; color:#3D2B1A; }
  .msb-chevron { color:#B8862A; transition:transform .3s ease; flex-shrink:0; }
  .msb-chevron.open { transform:rotate(180deg); }

  .msb-dropdown { overflow:hidden; max-height:0; transition:max-height .35s ease; background:#FBF6EE; }
  .msb-dropdown.open { max-height:800px; }
  .msb-dropdown-inner { padding:10px 20px 16px; }
  .msb-col-title { font-size:9px; font-weight:600; letter-spacing:2px; color:#B8862A; text-transform:uppercase; margin:12px 0 7px; }
  .msb-col-title:first-child { margin-top:4px; }
  .msb-sub-item { display:block; font-size:13px; color:#5A4535; padding:6px 0; cursor:pointer; font-weight:300; transition:color .2s,padding-left .2s; text-decoration:none; border:none; background:none; text-align:left; width:100%; font-family:'Jost',sans-serif; }
  .msb-sub-item:hover { color:#B8862A; padding-left:6px; }
  .msb-sub-item.highlight { font-weight:500; text-decoration:underline; }

  /* Bottom icons bar */
  .msb-actions { display:flex; border-top:1px solid #E8DDD0; flex-shrink:0; }
  .msb-action-btn { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; padding:14px 10px; cursor:pointer; color:#5A4535; font-size:9px; letter-spacing:1.5px; text-transform:uppercase; border:none; background:none; font-family:'Jost',sans-serif; transition:color .2s; border-right:1px solid #E8DDD0; text-decoration:none; }
  .msb-action-btn:last-child { border-right:none; }
  .msb-action-btn:hover { color:#B8862A; background:#FBF6EE; }
  .msb-action-badge { background:#B8862A; color:#fff; font-size:9px; width:15px; height:15px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; }

  /* Footer */
  .msb-footer { padding:12px 20px; border-top:1px solid #E8DDD0; font-size:11px; color:#9E8875; display:flex; align-items:center; gap:6px; flex-shrink:0; }
`;

export default function MobileSidebar({ isOpen, setIsOpen, navData = null }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [query,     setQuery]     = useState("");
  const router = useRouter();
  const { cartCount } = useAuth();

  /* Use API data if provided, else fallback to static */
  const dynamicNavItems = navData?.navItems || menuItems;
  const dynamicMegaCols = navData?.megaCols || megaCols;

  const close = () => setIsOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    close();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <>
      <style>{S}</style>

      {isOpen && <div className="msb-overlay" onClick={close} />}

      <div className={`msb-drawer${isOpen ? " open" : ""}`}>
        {/* Header */}
        <div className="msb-header">
          <Link href="/" className="msb-logo" onClick={close}>MAN<span>A</span>S</Link>
          <button className="msb-close" onClick={close}><X size={20} /></button>
        </div>
        <div className="msb-gold-line" />

        {/* Search */}
        <form className="msb-search" onSubmit={handleSearch}>
          <Search size={14} style={{ color: "#B8862A", flexShrink: 0 }} />
          <input
            className="msb-search-input"
            placeholder="Search jewellery…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="msb-search-btn">
            <Search size={14} />
          </button>
        </form>

        {/* Nav items */}
        <nav className="msb-nav">
          {dynamicNavItems.map((item, idx) => (
            <div key={idx}>
              {item.hasMegaMenu ? (
                /* Accordion toggle for Jewellery */
                <div
                  className="msb-item-row"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="msb-item-name">{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`msb-chevron${openIndex === idx ? " open" : ""}`}
                  />
                </div>
              ) : (
                /* Direct link */
                <Link
                  href={item.href || "/"}
                  className="msb-item-row"
                  onClick={close}
                >
                  <span className="msb-item-name">{item.name}</span>
                </Link>
              )}

              {/* Mega accordion content — supports both API {label,href} and legacy string items */}
              {item.hasMegaMenu && (
                <div className={`msb-dropdown${openIndex === idx ? " open" : ""}`}>
                  <div className="msb-dropdown-inner">
                    {dynamicMegaCols.map((col, ci) => (
                      <div key={col._id || ci}>
                        {col.title && <p className="msb-col-title">{col.title}</p>}
                        {col.items.map((sub, si) => {
                          const isLastHighlight = col.highlightLast && si === col.items.length - 1;
                          const label = typeof sub === "string" ? sub : sub.label;
                          const href  = typeof sub === "string" ? (col.map?.[sub] || "/listing") : (sub.href || "/listing");
                          return (
                            <Link
                              key={si}
                              href={href}
                              className={`msb-sub-item${isLastHighlight ? " highlight" : ""}`}
                              onClick={close}
                            >
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom action bar */}
        <div className="msb-actions">
          <Link href="/wishlist" className="msb-action-btn" onClick={close}>
            <Heart size={18} />
            Wishlist
          </Link>
          <Link href="/cart" className="msb-action-btn" onClick={close}>
            <ShoppingBag size={18} />
            {cartCount > 0
              ? <span className="msb-action-badge">{cartCount}</span>
              : <span>Cart</span>
            }
          </Link>
          <Link href="/search" className="msb-action-btn" onClick={close}>
            <Search size={18} />
            Search
          </Link>
        </div>

        {/* Footer */}
        <div className="msb-footer">
          <Gem size={13} style={{ color: "#B8862A" }} />
          BIS Hallmarked &nbsp;·&nbsp; Since 1985
        </div>
      </div>
    </>
  );
}
