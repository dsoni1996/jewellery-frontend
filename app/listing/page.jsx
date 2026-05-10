"use client";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
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

  /* ── Base ── */
  .pl-root { background: #FAF6F0; min-height: 100vh; padding: 0 0 80px; }

  /* ── Hero ── */
  .pl-hero { background: #2C1A0E; color: #FFFDF9; text-align: center; padding: 70px 20px 50px; position: relative; overflow: hidden; }
  .pl-hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.06'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z'/%3E%3C/g%3E%3C/svg%3E"); }
  .pl-hero-content { position: relative; z-index: 1; }
  .pl-breadcrumb { font-size: 11px; letter-spacing: 2px; color: #C4A46A; text-transform: uppercase; margin-bottom: 16px; font-family: 'Jost', sans-serif; }
  .pl-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; letter-spacing: 4px; margin-bottom: 8px; }
  .pl-hero-title em { font-style: italic; color: #D4AF6A; }
  .pl-hero-sub { font-size: 12px; letter-spacing: 2px; color: #9E8B70; text-transform: uppercase; font-family: 'Jost', sans-serif; }
  .pl-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent); }

  /* ── Filter bar wrapper ── */
  .ls-filters { background: #fff; border-bottom: 1px solid #E8DDD0; position: sticky; top: 99px; z-index: 20; }

  /* ── Shared pill style ── */
  .ls-cat-pill { flex-shrink: 0; border: 1px solid #E8DDD0; background: none; padding: 6px 14px; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 400; color: #5A4535; cursor: pointer; border-radius: 20px; transition: all .18s; white-space: nowrap; }
  .ls-cat-pill:hover { border-color: #B8862A; color: #B8862A; }
  .ls-cat-pill.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; font-weight: 500; }

  /* ── Compact select ── */
  .ls-select { flex-shrink: 0; border: 1px solid #E8DDD0; background: #FAF6F0; padding: 6px 28px 6px 10px; font-family: 'Jost', sans-serif; font-size: 12px; color: #3D2B1A; cursor: pointer; border-radius: 20px; appearance: none; -webkit-appearance: none; outline: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23B8862A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; transition: border-color .2s; }
  .ls-select:focus { border-color: #B8862A; }

  /* ── Price range ── */
  .ls-price-wrap { display: flex; align-items: center; gap: 4px; flex-shrink: 0; border: 1px solid #E8DDD0; border-radius: 20px; padding: 4px 10px; background: #FAF6F0; }
  .ls-price-input { width: 68px; border: none; outline: none; background: transparent; font-family: 'Jost', sans-serif; font-size: 12px; color: #3D2B1A; text-align: center; min-width: 0; }
  .ls-price-input::placeholder { color: #B0A090; }
  .ls-price-sep { font-size: 11px; color: #B0A090; flex-shrink: 0; }

  /* ── Clear btn ── */
  .ls-clear-btn { flex-shrink: 0; display: flex; align-items: center; gap: 4px; border: 1px solid #E8DDD0; background: #FAECE7; color: #993C1D; padding: 6px 12px; font-family: 'Jost', sans-serif; font-size: 11px; cursor: pointer; border-radius: 20px; white-space: nowrap; transition: all .2s; }
  .ls-clear-btn:hover { background: #993C1D; color: #fff; border-color: #993C1D; }

  /* ── Result count ── */
  .ls-result-tag { flex-shrink: 0; font-size: 11px; color: #9E8875; white-space: nowrap; margin-left: auto; }

  /* ── Filter icon btn ── */
  .ls-filter-icon-btn { flex-shrink: 0; display: flex; align-items: center; gap: 6px; border: 1px solid #E8DDD0; background: #FAF6F0; padding: 6px 12px; font-family: 'Jost', sans-serif; font-size: 12px; color: #3D2B1A; cursor: pointer; border-radius: 20px; transition: all .2s; white-space: nowrap; }
  .ls-filter-icon-btn:hover { border-color: #B8862A; color: #B8862A; }
  .ls-filter-icon-btn.has-filters { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .ls-filter-badge { background: #B8862A; color: #fff; font-size: 9px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }

  /* ══ DESKTOP bar — single scrollable row ══ */
  .ls-desktop-bar { display: flex; align-items: center; gap: 8px; padding: 10px 24px; overflow-x: auto; scrollbar-width: none; }
  .ls-desktop-bar::-webkit-scrollbar { display: none; }
  .ls-desktop-divider { width: 1px; height: 20px; background: #E8DDD0; flex-shrink: 0; margin: 0 4px; }

  /* ══ MOBILE rows — hidden on desktop ══ */
  .ls-cat-row { display: none; }
  .ls-options-row { display: none; }

  /* ── Mobile drawer ── */
  .ls-overlay { position: fixed; inset: 0; background: rgba(20,10,5,.52); z-index: 100; backdrop-filter: blur(2px); animation: ls-fade .2s; }
  @keyframes ls-fade { from{opacity:0} to{opacity:1} }
  .ls-drawer { position: fixed; bottom: 0; left: 0; right: 0; background: #FFFDF9; border-radius: 16px 16px 0 0; z-index: 101; padding: 0 0 32px; max-height: 85vh; overflow-y: auto; animation: ls-slide .3s cubic-bezier(.4,0,.2,1); }
  @keyframes ls-slide { from{transform:translateY(100%)} to{transform:translateY(0)} }
  .ls-drawer-handle { width: 40px; height: 4px; border-radius: 2px; background: #E8DDD0; margin: 10px auto 0; }
  .ls-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #E8DDD0; }
  .ls-drawer-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #2C1A0E; }
  .ls-drawer-title em { font-style: italic; color: #B8862A; }
  .ls-drawer-close { background: none; border: none; cursor: pointer; color: #9E8875; display: flex; }
  .ls-drawer-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 20px; }
  .ls-drawer-section-label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #9E8875; margin-bottom: 10px; }
  .ls-drawer-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .ls-drawer-pill { border: 1px solid #E8DDD0; background: none; padding: 7px 16px; font-family: 'Jost', sans-serif; font-size: 12.5px; color: #5A4535; cursor: pointer; border-radius: 20px; transition: all .18s; }
  .ls-drawer-pill.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .ls-drawer-pill:hover:not(.active) { border-color: #B8862A; color: #B8862A; }
  .ls-drawer-price-row { display: flex; align-items: center; gap: 10px; }
  .ls-drawer-price-input { flex: 1; border: 1px solid #E8DDD0; padding: 10px 14px; font-family: 'Jost', sans-serif; font-size: 13px; color: #2C1A0E; border-radius: 8px; outline: none; background: #FFFDF9; }
  .ls-drawer-price-input:focus { border-color: #B8862A; }
  .ls-drawer-apply { width: 100%; margin-top: 8px; background: #2C1A0E; color: #D4AF6A; border: none; padding: 14px; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; border-radius: 8px; transition: background .2s; }
  .ls-drawer-apply:hover { background: #B8862A; color: #fff; }

  /* ── Product grid ── */
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

  /* ══ MOBILE overrides ══ */
  @media (max-width: 768px) {
    .pl-hero { padding: 44px 16px 32px; }
    .pl-hero-title { font-size: 34px; }
    .ls-filters { top: 62px; }

    /* Hide desktop bar, show mobile rows */
    .ls-desktop-bar { display: none; }
    .ls-cat-row { display: flex; align-items: center; gap: 8px; padding: 10px 14px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid #F0E8DC; }
    .ls-cat-row::-webkit-scrollbar { display: none; }
    .ls-options-row { display: flex; align-items: center; gap: 8px; padding: 8px 14px; overflow-x: auto; scrollbar-width: none; }
    .ls-options-row::-webkit-scrollbar { display: none; }

    .pl-container { padding: 16px 12px 0; }
    .pl-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
  }
`;

/* ── PriceFilter subcomponent ── */
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
    if (e.key === "Enter") { clearTimeout(debounceRef.current); apply(min, max); }
  };

  const handleClear = () => {
    setMin(""); setMax("");
    clearTimeout(debounceRef.current);
    apply("", "");
  };

  return (
    <div className="ls-price-wrap">
      <input
        className="ls-price-input"
        placeholder="Min ₹"
        value={min}
        onChange={handleChange(setMin, true)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      <span className="ls-price-sep">—</span>
      <input
        className="ls-price-input"
        placeholder="Max ₹"
        value={max}
        onChange={handleChange(setMax, false)}
        onKeyDown={handleKeyDown}
        inputMode="numeric"
      />
      {isDirty && (
        <button onClick={handleClear} style={{ background:"none", border:"none", cursor:"pointer", color:"#B8862A", padding:"0 2px", lineHeight:1 }}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}

/* ── Drawer price subcomponent (local state, apply on button) ── */
function DrawerPriceFilter({ initialMin = "", initialMax = "", onChange }) {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  useEffect(() => { setMin(initialMin); }, [initialMin]);
  useEffect(() => { setMax(initialMax); }, [initialMax]);

  const update = (newMin, newMax) => onChange(newMin, newMax);

  return (
    <div className="ls-drawer-price-row">
      <input
        className="ls-drawer-price-input"
        placeholder="Min ₹"
        value={min}
        onChange={e => { setMin(e.target.value); update(e.target.value, max); }}
        inputMode="numeric"
      />
      <span style={{ color:"#9E8875", flexShrink:0 }}>—</span>
      <input
        className="ls-drawer-price-input"
        placeholder="Max ₹"
        value={max}
        onChange={e => { setMax(e.target.value); update(min, e.target.value); }}
        inputMode="numeric"
      />
    </div>
  );
}

/* ── Inner component ── */
function ProductListingInner() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [showDrawer, setShowDrawer] = useState(false);

  /* Drawer local state */
  const [drawerCat,  setDrawerCat]  = useState("");
  const [drawerPur,  setDrawerPur]  = useState("");
  const [drawerSort, setDrawerSort] = useState("");
  const [drawerMin,  setDrawerMin]  = useState("");
  const [drawerMax,  setDrawerMax]  = useState("");

  function searchParamsToFilters(sp) {
    const f = {};
    ["category","metal.purity","sort","minPrice","maxPrice"].forEach(k => {
      const v = sp.get(k); if (v) f[k] = v;
    });
    return f;
  }

  function buildSearchParams(f, pg) {
    const p = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => { if (v !== "" && v != null) p.set(k, v); });
    if (pg > 1) p.set("page", String(pg));
    return p;
  }

  const initialFilters = searchParamsToFilters(searchParams);
  const initialPage    = Number(searchParams.get("page")) || 1;

  const { products, total, pages, page, loading, filters, setPage, setFilters, updateFilter } =
    useProducts({ ...initialFilters, page: initialPage });
  const { toasts, showToast } = useToast();

  const isFirstRender = useRef(true);
  const isUpdatingUrl = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const params = buildSearchParams(filters, page);
    const query  = params.toString();
    isUpdatingUrl.current = true;
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [filters, page]); // eslint-disable-line

  useEffect(() => {
    if (isUpdatingUrl.current) { isUpdatingUrl.current = false; return; }
    const fromUrl     = searchParamsToFilters(searchParams);
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    setFilters(fromUrl);
    setPage(pageFromUrl);
  }, [searchParams]); // eslint-disable-line

  const activeCategory = filters.category        || "";
  const activePurity   = filters["metal.purity"] || "";
  const activeSort     = filters.sort            || "";

  const safeUpdateFilter = (key, value) => { setPage(1); updateFilter(key, value); };
  const handleSort       = (e) => safeUpdateFilter("sort", e.target.value);
  const handlePriceApply = (min, max) => { setPage(1); setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max })); };

  const hasActiveFilters = activeCategory || activePurity || activeSort || filters.minPrice || filters.maxPrice;
  const activeFilterCount = [activeCategory, activePurity, activeSort, filters.minPrice, filters.maxPrice].filter(Boolean).length;

  const clearAllFilters = () => { setPage(1); setFilters({}); };

  const openDrawer = () => {
    setDrawerCat(activeCategory);
    setDrawerPur(activePurity);
    setDrawerSort(activeSort);
    setDrawerMin(filters.minPrice || "");
    setDrawerMax(filters.maxPrice || "");
    setShowDrawer(true);
  };

  const applyDrawer = () => {
    setPage(1);
    setFilters({
      ...(drawerCat  ? { category: drawerCat }          : {}),
      ...(drawerPur  ? { "metal.purity": drawerPur }    : {}),
      ...(drawerSort ? { sort: drawerSort }              : {}),
      ...(drawerMin  ? { minPrice: drawerMin }           : {}),
      ...(drawerMax  ? { maxPrice: drawerMax }           : {}),
    });
    setShowDrawer(false);
  };

  return (
    <>
      <style>{listingStyles}</style>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <Toast toasts={toasts} />

      <div className="pl-root">
        {/* Hero */}
        <div className="pl-hero">
          <div className="pl-hero-content">
            <p className="pl-breadcrumb">Home &nbsp;/&nbsp; Jewellery{activeCategory && ` / ${activeCategory}s`}</p>
            <h1 className="pl-hero-title">
              {activeCategory ? <em>{activeCategory}s</em> : <>Our <em>Collection</em></>}
            </h1>
            <p className="pl-hero-sub">{total} Exquisite Designs</p>
          </div>
        </div>
        <div className="pl-gold-line" />

        {/* ══ FILTER BAR ══ */}
        <div className="ls-filters">

          {/* ── DESKTOP: single row ── */}
          <div className="ls-desktop-bar">
            <button
              className={`ls-cat-pill${!activeCategory ? " active" : ""}`}
              onClick={() => safeUpdateFilter("category", "")}
            >All</button>

            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`ls-cat-pill${activeCategory === c ? " active" : ""}`}
                onClick={() => safeUpdateFilter("category", c)}
              >{c}s</button>
            ))}

            <span className="ls-desktop-divider" />

            <select className="ls-select" value={activePurity}
              onChange={e => safeUpdateFilter("metal.purity", e.target.value)}>
              <option value="">All Purity</option>
              {PURITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <PriceFilter
              initialMin={filters.minPrice || ""}
              initialMax={filters.maxPrice || ""}
              onApply={handlePriceApply}
            />

            <select className="ls-select" value={activeSort} onChange={handleSort}>
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>

            <span className="ls-result-tag">{total} products</span>

            {hasActiveFilters && (
              <button className="ls-clear-btn" onClick={clearAllFilters}>
                <X size={11} /> Clear
              </button>
            )}
          </div>

          {/* ── MOBILE Row 1: category pills ── */}
          <div className="ls-cat-row">
            <button
              className={`ls-cat-pill${!activeCategory ? " active" : ""}`}
              onClick={() => safeUpdateFilter("category", "")}
            >All</button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`ls-cat-pill${activeCategory === c ? " active" : ""}`}
                onClick={() => safeUpdateFilter("category", c)}
              >{c}s</button>
            ))}
          </div>

          {/* ── MOBILE Row 2: sort + count + filter btn ── */}
          <div className="ls-options-row">
            <select className="ls-select" value={activeSort} onChange={handleSort}>
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>

            <span className="ls-result-tag">{total} products</span>

            {hasActiveFilters && (
              <button className="ls-clear-btn" onClick={clearAllFilters}>
                <X size={11} /> Clear
              </button>
            )}

            <button
              className={`ls-filter-icon-btn${hasActiveFilters ? " has-filters" : ""}`}
              onClick={openDrawer}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="ls-filter-badge">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ══ PRODUCTS ══ */}
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
              <button className="pl-page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  <span key={p} style={{ display:"contents" }}>
                    {i > 0 && arr[i-1] !== p-1 && <span style={{ color:"#B0A090", fontSize:13 }}>…</span>}
                    <button
                      className={`pl-page-btn${p === page ? " active" : ""}`}
                      onClick={() => setPage(p)}
                    >{p}</button>
                  </span>
                ))}
              <button className="pl-page-btn" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          )}
        </div>
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      {showDrawer && (
        <>
          <div className="ls-overlay" onClick={() => setShowDrawer(false)} />
          <div className="ls-drawer">
            <div className="ls-drawer-handle" />
            <div className="ls-drawer-head">
              <p className="ls-drawer-title">Filter <em>Products</em></p>
              <button className="ls-drawer-close" onClick={() => setShowDrawer(false)}><X size={18} /></button>
            </div>
            <div className="ls-drawer-body">

              {/* Category */}
              <div>
                <p className="ls-drawer-section-label">Category</p>
                <div className="ls-drawer-pills">
                  <button
                    className={`ls-drawer-pill${drawerCat === "" ? " active" : ""}`}
                    onClick={() => setDrawerCat("")}
                  >All</button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`ls-drawer-pill${drawerCat === cat ? " active" : ""}`}
                      onClick={() => setDrawerCat(cat)}
                    >{cat}s</button>
                  ))}
                </div>
              </div>

              {/* Purity */}
              <div>
                <p className="ls-drawer-section-label">Gold Purity</p>
                <div className="ls-drawer-pills">
                  <button
                    className={`ls-drawer-pill${drawerPur === "" ? " active" : ""}`}
                    onClick={() => setDrawerPur("")}
                  >All</button>
                  {PURITIES.map(p => (
                    <button
                      key={p}
                      className={`ls-drawer-pill${drawerPur === p ? " active" : ""}`}
                      onClick={() => setDrawerPur(p)}
                    >{p}</button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="ls-drawer-section-label">Price Range</p>
                <DrawerPriceFilter
                  initialMin={drawerMin}
                  initialMax={drawerMax}
                  onChange={(mn, mx) => { setDrawerMin(mn); setDrawerMax(mx); }}
                />
              </div>

              {/* Sort */}
              <div>
                <p className="ls-drawer-section-label">Sort By</p>
                <div className="ls-drawer-pills">
                  {SORT_OPTIONS.filter(s => s.value !== "").map(s => (
                    <button
                      key={s.value}
                      className={`ls-drawer-pill${drawerSort === s.value ? " active" : ""}`}
                      onClick={() => setDrawerSort(s.value)}
                    >{s.label}</button>
                  ))}
                </div>
              </div>

              <button className="ls-drawer-apply" onClick={applyDrawer}>
                Apply Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function ProductListing() {
  return (
    <Suspense fallback={
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"60vh", color:"#9E8875" }}>
        <Loader2 size={28} style={{ animation:"spin 1s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    }>
      <ProductListingInner />
    </Suspense>
  );
}