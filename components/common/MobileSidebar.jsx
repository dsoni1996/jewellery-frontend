"use client";
import { X, ChevronDown, Gem } from "lucide-react";
import { useState } from "react";

const menuData = [
  { title: "BY CATEGORY", items: ["Earrings", "Rings", "Necklaces", "Bangles", "Mangalsutras"] },
  { title: "", items: ["Pendants", "Bracelets", "Chains", "Coins", "All Jewellery"], highlightLast: true },
  { title: "BY METAL", items: ["Gold Jewellery", "Diamond Jewellery", "Polki Jewellery"] },
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

const sidebarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600&family=Jost:wght@300;400;500&display=swap');

  .msb-overlay {
    position: fixed; inset: 0; background: rgba(20,10,5,0.55);
    z-index: 998; backdrop-filter: blur(2px);
    animation: msb-fade 0.2s ease;
  }
  @keyframes msb-fade { from { opacity: 0; } to { opacity: 1; } }

  .msb-drawer {
    position: fixed; top: 0; left: 0; height: 100vh;
    width: 300px; max-width: 85vw;
    background: #FFFDF9;
    z-index: 999;
    display: flex; flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 6px 0 40px rgba(44,26,14,0.18);
    font-family: 'Jost', sans-serif;
  }
  .msb-drawer.open { transform: translateX(0); }

  .msb-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 20px 18px;
    border-bottom: 1px solid #E8DDD0;
    background: #2C1A0E;
    flex-shrink: 0;
  }
  .msb-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    letter-spacing: 4px; color: #FFFDF9;
    text-transform: uppercase;
  }
  .msb-logo span { color: #D4AF6A; }
  .msb-close {
    background: none; border: none; cursor: pointer;
    color: #C8B89A; transition: color 0.2s; padding: 4px;
    display: flex; align-items: center;
  }
  .msb-close:hover { color: #D4AF6A; }

  .msb-gold-line {
    height: 2px; flex-shrink: 0;
    background: linear-gradient(90deg, transparent, #B8862A 30%, #E8C96A 50%, #B8862A 70%, transparent);
  }

  .msb-nav { flex: 1; overflow-y: auto; padding: 8px 0; }
  .msb-nav::-webkit-scrollbar { width: 3px; }
  .msb-nav::-webkit-scrollbar-thumb { background: #D4AF6A; border-radius: 2px; }

  .msb-item-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 13px 20px;
    border-bottom: 1px solid #F0E8DC;
    cursor: pointer;
    transition: background 0.15s;
  }
  .msb-item-row:hover { background: #FBF6EE; }
  .msb-item-name {
    font-size: 12px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: #3D2B1A;
  }
  .msb-chevron {
    color: #B8862A; transition: transform 0.3s ease;
    flex-shrink: 0;
  }
  .msb-chevron.open { transform: rotate(180deg); }

  .msb-dropdown {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease;
    background: #FBF6EE;
    border-bottom: 1px solid #F0E8DC;
  }
  .msb-dropdown.open { max-height: 600px; }

  .msb-dropdown-inner { padding: 12px 20px 16px; }
  .msb-col-title {
    font-size: 9px; font-weight: 600;
    letter-spacing: 2px; color: #B8862A;
    text-transform: uppercase;
    margin: 10px 0 6px;
  }
  .msb-col-title:first-child { margin-top: 0; }
  .msb-sub-item {
    font-size: 13px; color: #5A4535;
    padding: 5px 0; cursor: pointer;
    display: block; font-weight: 300;
    transition: color 0.2s, padding-left 0.2s;
    border: none; background: none;
    text-align: left; width: 100%;
  }
  .msb-sub-item:hover { color: #B8862A; padding-left: 6px; }
  .msb-sub-item.highlight { font-weight: 500; text-decoration: underline; }

  .msb-footer {
    padding: 16px 20px;
    border-top: 1px solid #E8DDD0;
    font-size: 11px; color: #9E8875;
    display: flex; align-items: center; gap: 6px;
    flex-shrink: 0;
  }
`;

const MobileSidebar = ({ isOpen, setIsOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <>
      <style>{sidebarStyles}</style>

      {/* Overlay — only when open */}
      {isOpen && (
        <div className="msb-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`msb-drawer${isOpen ? " open" : ""}`}>
        {/* Header */}
        <div className="msb-header">
          <span className="msb-logo">MAN<span>A</span>S</span>
          <button className="msb-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="msb-gold-line" />

        {/* Nav items */}
        <nav className="msb-nav">
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                className="msb-item-row"
                onClick={() => item.hasMegaMenu ? toggle(index) : setIsOpen(false)}
              >
                <span className="msb-item-name">{item.name}</span>
                {item.hasMegaMenu && (
                  <ChevronDown
                    size={16}
                    className={`msb-chevron${openIndex === index ? " open" : ""}`}
                  />
                )}
              </div>

              {item.hasMegaMenu && (
                <div className={`msb-dropdown${openIndex === index ? " open" : ""}`}>
                  <div className="msb-dropdown-inner">
                    {menuData.map((col, i) => (
                      <div key={i}>
                        {col.title && <p className="msb-col-title">{col.title}</p>}
                        {col.items.map((subItem, j) => (
                          <button
                            key={j}
                            className={`msb-sub-item${col.highlightLast && j === col.items.length - 1 ? " highlight" : ""}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="msb-footer">
          <Gem size={13} style={{ color: "#B8862A" }} />
          BIS Hallmarked &nbsp;·&nbsp; Since 1985
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
