"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "../../components/common/ProductCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .sr-root { background: #FAF6F0; min-height: 100vh; padding: 40px 0 80px; font-family: 'Jost', sans-serif; }
  .sr-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .sr-inner { padding: 0 16px; } }

  /* Search bar */
  .sr-search-wrap { background: #fff; border: 1px solid #E8DDD0; border-radius: 4px; display: flex; align-items: center; gap: 14px; padding: 0 20px; margin-bottom: 32px; }
  .sr-search-icon { color: #B8862A; flex-shrink: 0; }
  .sr-search-input { flex: 1; border: none; outline: none; font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #2C1A0E; padding: 18px 0; background: transparent; }
  .sr-search-input::placeholder { color: #C4B4A4; }
  .sr-clear { background: none; border: none; color: #C4B4A4; cursor: pointer; transition: color 0.2s; padding: 4px; display: flex; }
  .sr-clear:hover { color: #2C1A0E; }

  /* Chips */
  .sr-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; align-items: center; }
  .sr-chip-label { font-size: 11px; letter-spacing: 1px; color: #9E8875; text-transform: uppercase; }
  .sr-chip { border: 1px solid #E8DDD0; background: #fff; color: #4A3728; padding: 6px 14px; font-size: 11px; letter-spacing: 1px; cursor: pointer; border-radius: 2px; font-family: 'Jost', sans-serif; transition: all 0.2s; }
  .sr-chip:hover, .sr-chip.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }

  /* Meta bar */
  .sr-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .sr-heading { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 400; color: #2C1A0E; }
  .sr-heading em { font-style: italic; color: #B8862A; }
  .sr-count { font-size: 12px; color: #9E8875; margin-top: 4px; }
  .sr-sort { display: flex; align-items: center; gap: 10px; }
  .sr-sort select { border: 1px solid #E8DDD0; padding: 9px 14px; font-size: 11px; color: #4A3728; font-family: 'Jost', sans-serif; outline: none; background: #fff; border-radius: 2px; cursor: pointer; }
  .sr-filter-btn { display: flex; align-items: center; gap: 7px; background: none; border: 1px solid #E8DDD0; padding: 9px 16px; font-size: 11px; letter-spacing: 1px; color: #4A3728; cursor: pointer; font-family: 'Jost', sans-serif; border-radius: 2px; transition: all 0.2s; }
  .sr-filter-btn:hover { border-color: #B8862A; color: #B8862A; }

  /* Gold line */
  .sr-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #D4AF6A 50%, transparent); margin-bottom: 32px; }

  /* Grid */
  .sr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  @media (max-width: 1100px) { .sr-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) { .sr-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

  /* No results */
  .sr-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 4px; }
  .sr-empty-icon { font-size: 52px; margin-bottom: 16px; }
  .sr-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; color: #2C1A0E; margin-bottom: 8px; }
  .sr-empty-sub { font-size: 13px; color: #9E8875; }
`;

const suggestions = ["Gold Rings", "Diamond Necklace", "Bangles", "Mangalsutra", "Earrings", "Bracelets"];

const allProducts = [
  { id: 1, name: "Aakarshan Gold Necklace", price: 112732, img: "https://picsum.photos/400/400?random=11", cat: "Necklaces" },
  { id: 2, name: "Diamond Finger Ring", price: 52697, img: "https://picsum.photos/400/400?random=22", cat: "Rings" },
  { id: 3, name: "Floral Gold Bangle", price: 87450, img: "https://picsum.photos/400/400?random=33", cat: "Bangles" },
  { id: 4, name: "Pearl Drop Earrings", price: 34200, img: "https://picsum.photos/400/400?random=44", cat: "Earrings" },
  { id: 5, name: "Emerald Gold Pendant", price: 67890, img: "https://picsum.photos/400/400?random=55", cat: "Pendants" },
  { id: 6, name: "Ruby Mangalsutra", price: 45600, img: "https://picsum.photos/400/400?random=66", cat: "Mangalsutras" },
  { id: 7, name: "Diamond Tennis Bracelet", price: 98000, img: "https://picsum.photos/400/400?random=77", cat: "Bracelets" },
  { id: 8, name: "Gold Polki Earrings", price: 72000, img: "https://picsum.photos/400/400?random=88", cat: "Earrings" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("Gold Rings");
  const [activeChip, setActiveChip] = useState(null);

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.cat.toLowerCase().includes(query.toLowerCase()) ||
    (activeChip && p.cat.toLowerCase().includes(activeChip.toLowerCase()))
  );

  return (
    <>
      <style>{styles}</style>
      <div className="sr-root">
        <div className="sr-inner">
          {/* Search input */}
          <div className="sr-search-wrap">
            <Search size={22} className="sr-search-icon" />
            <input
              className="sr-search-input"
              placeholder="Search jewellery…"
              value={query}
              onChange={e => { setQuery(e.target.value); setActiveChip(null); }}
              autoFocus
            />
            {query && <button className="sr-clear" onClick={() => setQuery("")}><X size={18} /></button>}
          </div>

          {/* Suggestion chips */}
          <div className="sr-chips">
            <span className="sr-chip-label">Popular:</span>
            {suggestions.map(s => (
              <button
                key={s}
                className={`sr-chip${activeChip === s ? " active" : ""}`}
                onClick={() => { setQuery(s); setActiveChip(s); }}
              >{s}</button>
            ))}
          </div>

          {/* Meta bar */}
          <div className="sr-meta">
            <div>
              <h1 className="sr-heading">
                Results for <em>"{query || "All"}"</em>
              </h1>
              <p className="sr-count">{filtered.length} piece{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
            <div className="sr-sort">
              <button className="sr-filter-btn"><SlidersHorizontal size={13} /> Filters</button>
              <select>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="sr-gold-line" />

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="sr-empty">
              <div className="sr-empty-icon">🔍</div>
              <h2 className="sr-empty-title">No results found</h2>
              <p className="sr-empty-sub">Try a different search term or browse our collections.</p>
            </div>
          ) : (
            <div className="sr-grid">
              {filtered.map(item => (
                <ProductCard key={item.id} product={{ title: item.name, price: item.price, imgUrl: item.img }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
