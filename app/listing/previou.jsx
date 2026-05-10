"use client";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader2, SlidersHorizontal, X, ChevronDown, Search, Heart, ShoppingBag, Star } from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import { useProducts, useToast } from "../../hooks";
import { Toast } from "@/components/common/Toast";

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
  .pl-clear-btn { display: flex; align-items: center; gap: 5px; border: 1px solid #E8C96A; color: #B8862A; padding: 5px 12px; font-size: 11px; letter-spacing: 1px; background: transparent; cursor: pointer; border-radius: 2px; font-family: 'Jost', sans-serif; transition: all .2s; white-space: nowrap; }
  .pl-clear-btn:hover { background: #2C1A0E; color: #D4AF6A; border-color: #2C1A0E; }
  .pl-container { max-width: 1400px; margin: 0 auto; padding: 32px 40px 0; }
  .pl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .pl-loader { display: flex; justify-content: center; align-items: center; min-height: 300px; color: #9E8875; }
  .pl-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 4px; }
  .pl-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #2C1A0E; margin-bottom: 6px; }
  .pl-empty-sub { font-size: 13px; color: #9E8875; }
  .pl-pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 48px; }
  .pl-page-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8DDD0; background: #fff; cursor: pointer; font-size: 13px; color: #4A3728; border-radius: 2px; transition: all .2s; font-family: 'Jost', sans-serif; }
  .pl-page-btn:hover:not(:disabled) { border-color: #B8862A; color: #B8862A; }
  .pl-page-btn.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .pl-page-btn:disabled { opacity: .4; cursor: not-allowed; }
  @media (max-width: 1100px) { .pl-grid { grid-template-columns: repeat(3,1fr); } }
  @media (max-width: 768px) {
    .pl-grid { grid-template-columns: repeat(2,1fr); gap: 14px; }
    .pl-container { padding: 20px 16px 0; }
    .pl-filter-wrap { padding: 10px 16px; flex-direction: column; align-items: flex-start; }
    .pl-hero-title { font-size: 36px; }
    .pl-right-bar { width: 100%; }
  }


   
/* ── Filter bar ── */
.ls-filters{background:#fff;border-bottom:1px solid #E8DDD0;position:sticky;top:95px;z-index:20;}
@media(max-width:768px){.ls-filters{top:115px;}}
 
/* Category pills — horizontal scroll on mobile */
.ls-cat-row{display:flex;align-items:center;gap:8px;padding:10px 16px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid #F0E8DC;}
.ls-cat-row::-webkit-scrollbar{display:none;}
.ls-cat-pill{flex-shrink:0;border:1px solid #E8DDD0;background:none;padding:6px 14px;font-family:'Jost',sans-serif;font-size:12px;font-weight:400;color:#5A4535;cursor:pointer;border-radius:20px;transition:all .18s;white-space:nowrap;}
.ls-cat-pill:hover{border-color:#B8862A;color:#B8862A;}
.ls-cat-pill.active{background:#2C1A0E;border-color:#2C1A0E;color:#D4AF6A;font-weight:500;}
 
/* Second row — purity + price + sort + filter btn */
.ls-options-row{display:flex;align-items:center;gap:8px;padding:8px 16px;overflow-x:auto;scrollbar-width:none;}
.ls-options-row::-webkit-scrollbar{display:none;}
 
/* Compact select */
.ls-select{flex-shrink:0;border:1px solid #E8DDD0;background:#FAF6F0;padding:6px 28px 6px 10px;font-family:'Jost',sans-serif;font-size:12px;color:#3D2B1A;cursor:pointer;border-radius:20px;appearance:none;-webkit-appearance:none;outline:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B8862A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;transition:border-color .2s;}
.ls-select:focus{border-color:#B8862A;}
 
/* Price range — compact */
.ls-price-wrap{display:flex;align-items:center;gap:4px;flex-shrink:0;border:1px solid #E8DDD0;border-radius:20px;padding:4px 10px;background:#FAF6F0;}
.ls-price-input{width:72px;border:none;outline:none;background:transparent;font-family:'Jost',sans-serif;font-size:12px;color:#3D2B1A;text-align:center;}
.ls-price-input::placeholder{color:#B0A090;}
.ls-price-sep{font-size:11px;color:#B0A090;flex-shrink:0;}
 
/* Clear button */
.ls-clear-btn{flex-shrink:0;display:flex;align-items:center;gap:4px;border:1px solid #E8DDD0;background:#FAECE7;color:#993C1D;padding:6px 12px;font-family:'Jost',sans-serif;font-size:11px;cursor:pointer;border-radius:20px;white-space:nowrap;transition:all .2s;}
.ls-clear-btn:hover{background:#993C1D;color:#fff;border-color:#993C1D;}
 
/* Result count */
.ls-result-tag{flex-shrink:0;font-size:11px;color:#9E8875;white-space:nowrap;margin-left:auto;}
 
/* ── Mobile filter drawer ── */
.ls-overlay{position:fixed;inset:0;background:rgba(20,10,5,.52);z-index:100;backdrop-filter:blur(2px);animation:ls-fade .2s;}
@keyframes ls-fade{from{opacity:0}to{opacity:1}}
.ls-drawer{position:fixed;bottom:0;left:0;right:0;background:#FFFDF9;border-radius:16px 16px 0 0;z-index:101;padding:0 0 32px;max-height:85vh;overflow-y:auto;animation:ls-slide .3s cubic-bezier(.4,0,.2,1);}
@keyframes ls-slide{from{transform:translateY(100%)}to{transform:translateY(0)}}
.ls-drawer-handle{width:40px;height:4px;border-radius:2px;background:#E8DDD0;margin:10px auto 0;}
.ls-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #E8DDD0;}
.ls-drawer-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2C1A0E;}
.ls-drawer-title em{font-style:italic;color:#B8862A;}
.ls-drawer-close{background:none;border:none;cursor:pointer;color:#9E8875;display:flex;}
.ls-drawer-body{padding:16px 20px;display:flex;flex-direction:column;gap:20px;}
.ls-drawer-section-label{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:10px;}
.ls-drawer-pills{display:flex;flex-wrap:wrap;gap:8px;}
.ls-drawer-pill{border:1px solid #E8DDD0;background:none;padding:7px 16px;font-family:'Jost',sans-serif;font-size:12.5px;color:#5A4535;cursor:pointer;border-radius:20px;transition:all .18s;}
.ls-drawer-pill.active{background:#2C1A0E;border-color:#2C1A0E;color:#D4AF6A;}
.ls-drawer-pill:hover:not(.active){border-color:#B8862A;color:#B8862A;}
.ls-drawer-price-row{display:flex;align-items:center;gap:10px;}
.ls-drawer-price-input{flex:1;border:1px solid #E8DDD0;padding:10px 14px;font-family:'Jost',sans-serif;font-size:13px;color:#2C1A0E;border-radius:8px;outline:none;background:#FFFDF9;}
.ls-drawer-price-input:focus{border-color:#B8862A;}
.ls-drawer-apply{width:100%;margin-top:16px;background:#2C1A0E;color:#D4AF6A;border:none;padding:14px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;border-radius:8px;transition:background .2s;}
.ls-drawer-apply:hover{background:#B8862A;color:#fff;}
 
/* Filter icon button */
.ls-filter-icon-btn{flex-shrink:0;display:flex;align-items:center;gap:6px;border:1px solid #E8DDD0;background:#FAF6F0;padding:6px 12px;font-family:'Jost',sans-serif;font-size:12px;color:#3D2B1A;cursor:pointer;border-radius:20px;transition:all .2s;white-space:nowrap;}
.ls-filter-icon-btn:hover{border-color:#B8862A;color:#B8862A;}
.ls-filter-icon-btn.has-filters{background:#2C1A0E;border-color:#2C1A0E;color:#D4AF6A;}
.ls-filter-badge{background:#B8862A;color:#fff;font-size:9px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;}
`;

function searchParamsToFilters(searchParams) {
  const filters = {};
  const keys = ["category", "metal.purity", "sort", "minPrice", "maxPrice"];
  keys.forEach(key => {
    const val = searchParams.get(key);
    if (val) filters[key] = val;
  });
  return filters;
}

function buildSearchParams(filters, page) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== "" && val !== null && val !== undefined) {
      params.set(key, val);
    }
  });
  if (page > 1) params.set("page", String(page));
  return params;
}

function PriceFilter({ initialMin = "", initialMax = "", onApply }) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const debounceRef   = useRef(null);
  const isDirty       = min !== "" || max !== "";

  useEffect(() => { setMin(initialMin); }, [initialMin]);
  useEffect(() => { setMax(initialMax); }, [initialMax]);

  const apply = (minVal, maxVal) => onApply(minVal, maxVal);

  const handleChange = (setter, isMin) => (e) => {
    const val = e.target.value.replace(/\D/g, "");
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


    {/* Price range */}
            {/* <div className="ls-price-wrap">
              <input
                className="ls-price-input"
                placeholder="Min ₹"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                onBlur={() => setPage(1)}
                type="number"
              />
              <span className="ls-price-sep">—</span>
              <input
                className="ls-price-input"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                onBlur={() => setPage(1)}
                type="number"
              /> */}
            {/* </div> */}

  return (
    <div className="ls-price-wrap">
      <input
        className={`ls-price-input${isDirty ? " dirty" : ""}`}
        placeholder="Min ₹"
        value={min}
        onChange={handleChange(setMin, true)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      <span className="ls-price-sep">—</span>
      <input
        className={`ls-price-input${isDirty ? " dirty" : ""}`}
        placeholder="Max ₹"
        value={max}
        onChange={handleChange(setMax, false)}
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

// ── Inner component: contains all useSearchParams logic ──────────────────────
function ProductListingInner() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [showDrawer, setShowDrawer]   = useState(false);

  const initialFilters = searchParamsToFilters(searchParams);
  const initialPage    = Number(searchParams.get("page")) || 1;

  const {
    products, total, pages, page, loading,
    filters, setPage, setFilters, updateFilter,
  } = useProducts({ ...initialFilters, page: initialPage });
  const { toasts, showToast } = useToast();

  const isFirstRender  = useRef(true);
  const isUpdatingUrl  = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const params = buildSearchParams(filters, page);
    const query  = params.toString();
    isUpdatingUrl.current = true;
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [filters, page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isUpdatingUrl.current) {
      isUpdatingUrl.current = false;
      return;
    }
    const fromUrl     = searchParamsToFilters(searchParams);
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    setFilters(fromUrl);
    setPage(pageFromUrl);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeCategory = filters.category        || "";
  const activePurity   = filters["metal.purity"] || "";
  const activeSort     = filters.sort            || "";

  const safeUpdateFilter = (key, value) => {
    setPage(1);
    updateFilter(key, value);
  };

  const handleSort = (e) => safeUpdateFilter("sort", e.target.value);

  const handlePriceApply = (min, max) => {
    setPage(1);
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  };

    const applyDrawer = () => {
    // setCategory(drawerCat);
    // setPurity(drawerPur);
    // setMinPrice(drawerMin);
    // setMaxPrice(drawerMax);
    // setPage(1);
    setShowDrawer(false);
  };

   const openDrawer = () => {
  
    setShowDrawer(true);
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
      <Toast toasts={toasts} />
      <div className="pl-root">
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

         <div className="ls-filters">
 
          {/* Row 1 — category pills */}
          <div className="ls-cat-row">
            {CATEGORIES.map(c => (
              <button
                 key={c}
                className={`ls-cat-pill${activeCategory === c ? " active" : ""}`}
                   onClick={() => safeUpdateFilter("category", c)}
              >
                {c}
              </button>
            ))}
          </div>
 
          {/* Row 2 — purity + price + sort + filter btn + count */}
          <div className="ls-options-row">
 
            {/* Purity — desktop only visible nicely, mobile in drawer */}
            <select
              className="ls-select"
              value={activePurity}
              onChange={e => safeUpdateFilter("metal.purity", e.target.value)}
            >
               {PURITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>


            <PriceFilter
              initialMin={filters.minPrice || ""}
              initialMax={filters.maxPrice || ""}
              onApply={handlePriceApply}
            />
           
            {/* Price range */}
            {/* <div className="ls-price-wrap">
              <input
                className="ls-price-input"
                placeholder="Min ₹"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                onBlur={() => setPage(1)}
                type="number"
              />
              <span className="ls-price-sep">—</span>
              <input
                className="ls-price-input"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                onBlur={() => setPage(1)}
                type="number"
              /> */}
            {/* </div> */}
 
            {/* Sort */}
            <select
              className="ls-select"
              value={activeSort}
              onChange={handleSort}
            >
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
 
            {/* Clear — only when filters active */}
            {hasActiveFilters  && (
              <button className="ls-clear-btn" onClick={clearAllFilters}>
                <X size={11} /> Clear
              </button>
            )}
 
            {/* Result count */}
            <span className="ls-result-tag">{total} products</span>
 
            {/* Filter drawer btn — mobile friendly */}
            <button
              className={`ls-filter-icon-btn${hasActiveFilters ? " has-filters" : ""}`}
              onClick={openDrawer}
            >
              <SlidersHorizontal size={13} />
              Filters
              {hasActiveFilters&& (
                <span className="ls-filter-badge">{1}</span>
              )}
            </button>
          </div>
        </div>

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
                  showToast={showToast}
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


       {showDrawer && (
        <>
          <div className="ls-overlay" onClick={() => setShowDrawer(false)} />
          <div className="ls-drawer">
            <div className="ls-drawer-handle" />
            <div className="ls-drawer-head">
              <p className="ls-drawer-title">Filter <em>Products</em></p>
              <button className="ls-drawer-close" onClick={() => setShowDrawer(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="ls-drawer-body">
 
              {/* Category */}
              <div>
                <p className="ls-drawer-section-label">Category</p>
                <div className="ls-drawer-pills">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`ls-drawer-pill${activeCategory === cat ? " active" : ""}`}
                      onClick={() => setDrawerCat(cat.id)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Purity */}
              <div>
                <p className="ls-drawer-section-label">Gold Purity</p>
                <div className="ls-drawer-pills">
                  {PURITIES.map(p => (
                    <button
                      key={p}
                      className={`ls-drawer-pill${activePurity === p ? " active" : ""}`}
                      onClick={() => setDrawerPur(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Price range */}
              {/* <div>
                <p className="ls-drawer-section-label">Price Range</p>
                <div className="ls-drawer-price-row">
                  <input
                    className="ls-drawer-price-input"
                    placeholder="Min ₹"
                    value={drawerMin}
                    onChange={e => setDrawerMin(e.target.value)}
                    type="number"
                  />
                  <span style={{ color:"#9E8875", flexShrink:0 }}>—</span>
                  <input
                    className="ls-drawer-price-input"
                    placeholder="Max ₹"
                    value={drawerMax}
                    onChange={e => setDrawerMax(e.target.value)}
                    type="number"
                  />
                </div>
              </div> */}
 
              {/* Sort */}
              <div>
                <p className="ls-drawer-section-label">Sort By</p>
                <div className="ls-drawer-pills">
                  {SORT_OPTIONS.map(s => (
                    <button
                      key={s.id}
                      className={`ls-drawer-pill${activeSort === s.value ? " active" : ""}`}
                      onClick={handleSort}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
 
              <button className="ls-drawer-apply" onClick={applyDrawer}>
                Apply Filters { hasActiveFilters ? `(${1})` : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ── Default export: Suspense boundary wrapping the inner component ─────────────
export default function ProductListing() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex", justifyContent: "center",
        alignItems: "center", minHeight: "60vh", color: "#9E8875"
      }}>
        <Loader2 size={28} style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <ProductListingInner />
    </Suspense>
  );
}