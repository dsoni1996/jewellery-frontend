"use client";
import { useState, useEffect, useRef } from "react";
import { Loader2, X } from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import { useProducts } from "../../hooks";

const CATEGORIES = ["Ring","Necklace","Earring","Bangle","Bracelet","Mangalsutra","Pendant"];
const PURITIES   = ["22KT","18KT","14KT"];

const SORT_OPTIONS = [
  { value: "",           label: "Recommended" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest First" },
];

const listingStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  .pl-root { background: #FAF6F0; min-height: 100vh; padding: 0px 0 80px; }
  .pl-hero { background: #2C1A0E; color: #FFFDF9; text-align: center; padding: 70px 20px 50px; position: relative; overflow: hidden; }
  .pl-hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.06'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z'/%3E%3C/g%3E%3C/svg%3E"); }
  .pl-hero-content { position: relative; z-index: 1; }
  .pl-breadcrumb { font-size: 11px; letter-spacing: 2px; color: #C4A46A; text-transform: uppercase; margin-bottom: 16px; font-family: 'Jost', sans-serif; }
  .pl-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; letter-spacing: 4px; margin-bottom: 8px; }
  .pl-hero-title em { font-style: italic; color: #D4AF6A; }
  .pl-hero-sub { font-size: 12px; letter-spacing: 2px; color: #9E8B70; text-transform: uppercase; font-family: 'Jost', sans-serif; }
  .pl-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent); }

  /* ── Filter bar ── */
  .pl-filter-wrap { background: #fff; border-bottom: 1px solid #EDE4D8; padding: 14px 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-family: 'Jost', sans-serif; font-size: 12px; position: sticky; top: 90px; z-index: 20; }
  .pl-filter-group { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
  .pl-filter-select { border: 1px solid #D4C4B0; color: #4A3728; padding: 7px 14px; font-size: 11px; letter-spacing: 1px; cursor: pointer; font-family: 'Jost', sans-serif; background: #fff; outline: none; border-radius: 2px; transition: border-color .2s; }
  .pl-filter-select:focus { border-color: #B8862A; }
  .pl-filter-chip { border: 1px solid #D4C4B0; color: #4A3728; padding: 6px 14px; font-size: 11px; letter-spacing: 1px; background: #fff; cursor: pointer; border-radius: 2px; transition: all .2s; font-family: 'Jost', sans-serif; }
  .pl-filter-chip.active { background: #2C1A0E; color: #D4AF6A; border-color: #2C1A0E; }
  .pl-filter-chip:hover:not(.active) { border-color: #B8862A; color: #B8862A; }
  .pl-right-bar { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .pl-count { font-size: 12px; color: #9E8875; white-space: nowrap; }
  .pl-sort select { border: 1px solid #D4C4B0; padding: 7px 12px; font-size: 11px; color: #4A3728; background: #fff; outline: none; cursor: pointer; font-family: 'Jost', sans-serif; border-radius: 2px; }
  .pl-price-row { display: flex; align-items: center; gap: 8px; }
  .pl-price-input { border: 1px solid #D4C4B0; padding: 6px 10px; font-size: 11px; color: #4A3728; width: 80px; outline: none; font-family: 'Jost', sans-serif; border-radius: 2px; transition: border-color .2s; }
  .pl-price-input:focus { border-color: #B8862A; }
  .pl-price-input.dirty { border-color: #B8862A; background: #FFFBF5; }

  /* Clear filters button */
  .pl-clear-btn { display: flex; align-items: center; gap: 5px; border: 1px solid #E8C96A; color: #B8862A; padding: 5px 12px; font-size: 11px; letter-spacing: 1px; background: transparent; cursor: pointer; border-radius: 2px; font-family: 'Jost', sans-serif; transition: all .2s; white-space: nowrap; }
  .pl-clear-btn:hover { background: #2C1A0E; color: #D4AF6A; border-color: #2C1A0E; }

  /* ── Grid & states ── */
  .pl-container { max-width: 1400px; margin: 0 auto; padding: 32px 40px 0; }
  .pl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .pl-loader { display: flex; justify-content: center; align-items: center; min-height: 300px; color: #9E8875; }
  .pl-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 4px; }
  .pl-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #2C1A0E; margin-bottom: 6px; }
  .pl-empty-sub { font-size: 13px; color: #9E8875; }

  /* ── Pagination ── */
  .pl-pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 48px; }
  .pl-page-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8DDD0; background: #fff; cursor: pointer; font-size: 13px; color: #4A3728; border-radius: 2px; transition: all .2s; font-family: 'Jost', sans-serif; }
  .pl-page-btn:hover:not(:disabled) { border-color: #B8862A; color: #B8862A; }
  .pl-page-btn.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .pl-page-btn:disabled { opacity: .4; cursor: not-allowed; }

  /* ── Responsive ── */
  @media (max-width: 1100px) { .pl-grid { grid-template-columns: repeat(3,1fr); } }
  @media (max-width: 768px) {
    .pl-grid { grid-template-columns: repeat(2,1fr); gap: 14px; }
    .pl-container { padding: 20px 16px 0; }
    .pl-filter-wrap { padding: 10px 16px; flex-direction: column; align-items: flex-start; }
    .pl-hero-title { font-size: 36px; }
    .pl-right-bar { width: 100%; }
  }
`;

// ── Price filter with debounce + Enter key support ──────────────────────────
function PriceFilter({ onApply }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const debounceRef   = useRef(null);
  const isDirty       = min !== "" || max !== "";

  const apply = (minVal, maxVal) => {
    onApply(minVal, maxVal);
  };

  const handleChange = (setter, otherVal, isMin) => (e) => {
    const val = e.target.value.replace(/\D/g, ""); // numbers only
    setter(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      apply(isMin ? val : min, isMin ? max : val);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      apply(min, max);
    }
  };

  const handleClear = () => {
    setMin(""); setMax("");
    clearTimeout(debounceRef.current);
    apply("", "");
  };

  return (
    <div className="pl-price-row">
      <input
        className={`pl-price-input${isDirty ? " dirty" : ""}`}
        placeholder="Min ₹"
        value={min}
        onChange={handleChange(setMin, max, true)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      <span style={{ color: "#B0A090", fontSize: 11 }}>—</span>
      <input
        className={`pl-price-input${isDirty ? " dirty" : ""}`}
        placeholder="Max ₹"
        value={max}
        onChange={handleChange(setMax, min, false)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      {isDirty && (
        <button
          onClick={handleClear}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#B8862A", padding: "0 2px", lineHeight: 1 }}
          title="Clear price filter"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function ProductListing() {
  const { products, total, pages, page, loading, filters, setPage, setFilters, updateFilter } = useProducts();

  const activeCategory = filters.category      || "";
  const activePurity   = filters["metal.purity"] || "";
  const activeSort     = filters.sort           || "";

  // Reset to page 1 on any filter change (belt-and-suspenders guard)
  const safeUpdateFilter = (key, value) => {
    setPage(1);
    updateFilter(key, value);
  };

  const handleSort = (e) => safeUpdateFilter("sort", e.target.value);

  const handlePriceApply = (min, max) => {
    // Apply both in one state update to avoid double fetch
    setPage(1);
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const hasActiveFilters =
    activeCategory || activePurity || activeSort ||
    filters.minPrice || filters.maxPrice;

  const clearAllFilters = () => {
    setPage(1);
    setFilters({});
  };

  return (
    <>
      <style>{listingStyles}</style>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div className="pl-root">
        {/* Hero */}
        <div className="pl-hero">
          <div className="pl-hero-content">
            <p className="pl-breadcrumb">
              Home &nbsp;/&nbsp; Jewellery
              {activeCategory && ` \u00a0/\u00a0 ${activeCategory}s`}
            </p>
            <h1 className="pl-hero-title">
              {activeCategory
                ? <em>{activeCategory}s</em>
                : <>Our <em>Collection</em></>}
            </h1>
            <p className="pl-hero-sub">{total} Exquisite Designs</p>
          </div>
        </div>
        <div className="pl-gold-line" />

        {/* ── Filter Bar ── */}
        <div className="pl-filter-wrap">
          {/* Category chips */}
          <div className="pl-filter-group">
            <button
              className={`pl-filter-chip${!activeCategory ? " active" : ""}`}
              onClick={() => safeUpdateFilter("category", "")}
            >
              All
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`pl-filter-chip${activeCategory === c ? " active" : ""}`}
                onClick={() => safeUpdateFilter("category", c)}
              >
                {c}s
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="pl-right-bar">
            {/* Purity — controlled */}
            <select
              className="pl-filter-select"
              value={activePurity}
              onChange={e => safeUpdateFilter("metal.purity", e.target.value)}
            >
              <option value="">All Purity</option>
              {PURITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* Price — debounced + Enter */}
            <PriceFilter onApply={handlePriceApply} />

            {/* Sort — controlled */}
            <div className="pl-sort">
              <select value={activeSort} onChange={handleSort}>
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <span className="pl-count">{total} products</span>

            {/* Clear all — only visible when filters are active */}
            {hasActiveFilters && (
              <button className="pl-clear-btn" onClick={clearAllFilters}>
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="pl-container">
          {loading ? (
            <div className="pl-loader">
              <Loader2 size={28} style={{ animation: "spin 1s linear infinite" }} />
            </div>
          ) : products.length === 0 ? (
            <div className="pl-empty">
              <p className="pl-empty-title">No products found</p>
              <p className="pl-empty-sub">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="pl-grid">
              {products.map(item => (
                <ProductCard
                  key={item._id}
                  product={{
                    id:       item._id,
                    slug:     item.slug,
                    imgUrl:   item.thumbnail,
                    title:    item.name,
                    price:    item.price?.current,
                    tag:      `${item.metal?.purity} ${item.category}`,
                    occasion: item.occasion,
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {pages > 1 && (
            <div className="pl-pagination">
              <button
                className="pl-page-btn"
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                ‹
              </button>

              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  // Fixed: Fragment with key to avoid React warning
                  <span key={p} style={{ display: "contents" }}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span style={{ color: "#B0A090", fontSize: 13 }}>…</span>
                    )}
                    <button
                      className={`pl-page-btn${p === page ? " active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  </span>
                ))}

              <button
                className="pl-page-btn"
                disabled={page >= pages}
                onClick={() => setPage(p => p + 1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}