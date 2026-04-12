"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, X, Plus, Star, ShoppingBag, Heart,
  Check, Minus, ChevronDown, ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const allProducts = [
  {
    id: 1,
    name: "Aakarshan Gold Necklace",
    tag: "22KT Gold",
    img: "https://picsum.photos/480/480?random=101",
    price: 112732,
    originalPrice: 124000,
    rating: 4.7,
    reviews: 128,
    badge: "Bestseller",
    specs: {
      metal: "Gold",
      karatage: "22 KT",
      colour: "Yellow",
      grossWeight: "74.09 g",
      netWeight: "71.2 g",
      stoneType: "—",
      stoneWeight: "—",
      gender: "Women",
      type: "Necklace",
      occasion: "Wedding, Festive",
      certification: "BIS Hallmarked",
      warranty: "Lifetime",
      making: "₹ 14,200",
      emi: "₹ 9,394 / mo",
    },
  },
  {
    id: 2,
    name: "Diamond Finger Ring",
    tag: "18KT Diamond",
    img: "https://picsum.photos/480/480?random=102",
    price: 52697,
    originalPrice: 52697,
    rating: 4.5,
    reviews: 86,
    badge: "New",
    specs: {
      metal: "Gold",
      karatage: "18 KT",
      colour: "Yellow",
      grossWeight: "5.63 g",
      netWeight: "5.1 g",
      stoneType: "Diamond",
      stoneWeight: "0.25 ct",
      gender: "Women",
      type: "Ring",
      occasion: "Engagement, Daily",
      certification: "IGI Certified",
      warranty: "Lifetime",
      making: "₹ 9,457",
      emi: "₹ 4,391 / mo",
    },
  },
  {
    id: 3,
    name: "Floral Gold Bangle",
    tag: "22KT Gold",
    img: "https://picsum.photos/480/480?random=103",
    price: 87450,
    originalPrice: 95000,
    rating: 4.8,
    reviews: 204,
    badge: "Top Rated",
    specs: {
      metal: "Gold",
      karatage: "22 KT",
      colour: "Yellow",
      grossWeight: "18.4 g",
      netWeight: "17.8 g",
      stoneType: "—",
      stoneWeight: "—",
      gender: "Women",
      type: "Bangle",
      occasion: "Wedding, Festive, Daily",
      certification: "BIS Hallmarked",
      warranty: "Lifetime",
      making: "₹ 11,800",
      emi: "₹ 7,287 / mo",
    },
  },
  {
    id: 4,
    name: "Pearl Drop Earrings",
    tag: "18KT Gold",
    img: "https://picsum.photos/480/480?random=104",
    price: 34200,
    originalPrice: 38000,
    rating: 4.3,
    reviews: 57,
    badge: null,
    specs: {
      metal: "Gold",
      karatage: "18 KT",
      colour: "White",
      grossWeight: "4.8 g",
      netWeight: "4.2 g",
      stoneType: "Pearl",
      stoneWeight: "2.4 ct",
      gender: "Women",
      type: "Earrings",
      occasion: "Party, Daily",
      certification: "BIS Hallmarked",
      warranty: "Lifetime",
      making: "₹ 6,200",
      emi: "₹ 2,850 / mo",
    },
  },
  {
    id: 5,
    name: "Emerald Pendant Set",
    tag: "22KT Gold",
    img: "https://picsum.photos/480/480?random=105",
    price: 67890,
    originalPrice: 72000,
    rating: 4.6,
    reviews: 91,
    badge: "Limited",
    specs: {
      metal: "Gold",
      karatage: "22 KT",
      colour: "Yellow",
      grossWeight: "9.2 g",
      netWeight: "8.7 g",
      stoneType: "Emerald",
      stoneWeight: "1.8 ct",
      gender: "Women",
      type: "Pendant",
      occasion: "Festive, Party",
      certification: "BIS Hallmarked",
      warranty: "Lifetime",
      making: "₹ 8,900",
      emi: "₹ 5,657 / mo",
    },
  },
];

/* Rows shown in the comparison table */
const specRows = [
  { key: "metal",       label: "Metal" },
  { key: "karatage",    label: "Karatage" },
  { key: "colour",      label: "Colour" },
  { key: "grossWeight", label: "Gross Weight" },
  { key: "netWeight",   label: "Net Weight" },
  { key: "stoneType",   label: "Stone Type" },
  { key: "stoneWeight", label: "Stone Weight" },
  { key: "gender",      label: "Gender" },
  { key: "type",        label: "Product Type" },
  { key: "occasion",    label: "Occasion" },
  { key: "certification", label: "Certification" },
  { key: "warranty",    label: "Warranty" },
  { key: "making",      label: "Making Charges" },
  { key: "emi",         label: "EMI Starts At" },
];

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.cp-root {
  background: #FAF6F0;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  padding-bottom: 80px;
}

/* ── Header ── */
.cp-header {
  background: #FFFDF9;
  border-bottom: 1px solid #E8DDD0;
  padding: 20px 40px;
  position: sticky;
  top: 0;
  z-index: 30;
}
.cp-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.cp-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #9E8875;
  text-decoration: none;
  flex-shrink: 0;
  transition: color 0.2s;
}
.cp-back:hover { color: #B8862A; }
.cp-title-block { text-align: center; }
.cp-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px;
  font-weight: 400;
  color: #2C1A0E;
  line-height: 1;
}
.cp-title em { font-style: italic; color: #B8862A; }
.cp-subtitle { font-size: 11px; color: #9E8875; letter-spacing: 1.5px; margin-top: 3px; text-transform: uppercase; }
.cp-gold-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent);
}

/* ── Add product picker ── */
.cp-picker-bar {
  max-width: 1400px;
  margin: 32px auto 0;
  padding: 0 40px;
}
.cp-picker-label {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #B8862A;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cp-picker-label::before {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background: #B8862A;
}
.cp-picker-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.cp-picker-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #E8DDD0;
  padding: 8px 14px;
  font-size: 12px;
  color: #4A3728;
  cursor: pointer;
  border-radius: 2px;
  font-family: 'Jost', sans-serif;
  transition: all 0.2s;
}
.cp-picker-chip:hover { border-color: #B8862A; color: #B8862A; }
.cp-picker-chip.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
.cp-picker-chip-img {
  width: 28px; height: 28px;
  object-fit: cover;
  border-radius: 2px;
  flex-shrink: 0;
}

/* ── Main compare area ── */
.cp-main {
  max-width: 1400px;
  margin: 28px auto 0;
  padding: 0 40px;
}

/* Scroll wrapper for mobile */
.cp-scroll { overflow-x: auto; }

/* The whole table */
.cp-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
}

/* Column widths */
.cp-table .col-label { width: 180px; }
.cp-table .col-product { min-width: 220px; }

/* ── Product header cards ── */
.cp-prod-cell {
  padding: 0 0 0 12px;
  vertical-align: top;
}
.cp-prod-card {
  background: #fff;
  border: 1px solid #E8DDD0;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  position: relative;
  height: 100%;
}
.cp-prod-card.highlight {
  border-color: #B8862A;
  border-bottom: none;
}
.cp-prod-card.highlight::before {
  content: 'Best Value';
  position: absolute;
  top: -1px; left: 50%;
  transform: translateX(-50%);
  background: #B8862A;
  color: #fff;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 0 0 4px 4px;
}
.cp-remove-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #C4B4A4;
  transition: color 0.2s;
  padding: 2px;
  display: flex;
}
.cp-remove-btn:hover { color: #c0392b; }
.cp-prod-img-wrap {
  position: relative;
  margin-bottom: 14px;
}
.cp-prod-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 3px;
  background: #F5EDE3;
  display: block;
}
.cp-prod-badge {
  position: absolute;
  top: 8px; left: 8px;
  background: #2C1A0E;
  color: #D4AF6A;
  font-size: 9px;
  letter-spacing: 1.5px;
  padding: 3px 9px;
  text-transform: uppercase;
  border-radius: 2px;
}
.cp-prod-tag {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #B8862A;
  margin-bottom: 4px;
}
.cp-prod-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  color: #2C1A0E;
  margin-bottom: 8px;
  line-height: 1.25;
}
.cp-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}
.cp-star { color: #B8862A; font-size: 13px; }
.cp-star.empty { color: #E8DDD0; }
.cp-rating-num { font-size: 12px; color: #4A3728; font-weight: 500; }
.cp-reviews { font-size: 11px; color: #9E8875; }
.cp-price-block { margin-bottom: 14px; }
.cp-price {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 400;
  color: #2C1A0E;
  display: block;
}
.cp-original-price {
  font-size: 12px;
  color: #B0A090;
  text-decoration: line-through;
  margin-left: 6px;
}
.cp-saving {
  font-size: 11px;
  color: #2e7d32;
  font-weight: 500;
}
.cp-add-btn {
  width: 100%;
  background: #2C1A0E;
  color: #D4AF6A;
  border: none;
  padding: 11px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.2s;
  margin-bottom: 6px;
}
.cp-add-btn:hover { background: #B8862A; color: #fff; }
.cp-wish-btn {
  width: 100%;
  background: none;
  border: 1px solid #E8DDD0;
  color: #7A6656;
  padding: 9px;
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: all 0.2s;
}
.cp-wish-btn:hover { border-color: #B8862A; color: #B8862A; }

/* ── Empty product slot ── */
.cp-empty-cell { padding: 0 0 0 12px; vertical-align: top; }
.cp-empty-card {
  background: #fff;
  border: 1px dashed #D4C4B0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  height: 100%;
  min-height: 420px;
  gap: 10px;
}
.cp-empty-card:hover { border-color: #B8862A; background: #FBF6EE; }
.cp-empty-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #FBF6EE;
  border: 1px solid #E8D8C0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B8862A;
  margin-bottom: 4px;
}
.cp-empty-label {
  font-size: 12px;
  color: #9E8875;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
}

/* ── Row label column ── */
.cp-label-cell {
  padding: 0;
  vertical-align: top;
}
.cp-label-spacer { height: 420px; } /* matches product card height */

/* ── Spec rows ── */
.cp-spec-section-header td {
  padding: 20px 0 8px;
}
.cp-section-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #B8862A;
  display: flex;
  align-items: center;
  gap: 8px;
}
.cp-section-tag::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #E8DDD0, transparent);
}

.cp-spec-row { }
.cp-spec-row:last-child .cp-spec-label-td,
.cp-spec-row:last-child .cp-spec-val-td { border-bottom: none; }

.cp-spec-label-td {
  padding: 13px 16px 13px 0;
  border-bottom: 1px solid #F0E8DC;
  vertical-align: middle;
}
.cp-spec-label {
  font-size: 12px;
  color: #9E8875;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.cp-spec-val-td {
  padding: 13px 0 13px 12px;
  border-bottom: 1px solid #F0E8DC;
  vertical-align: middle;
}
.cp-spec-val-card {
  background: #fff;
  border-left: 1px solid #E8DDD0;
  border-right: 1px solid #E8DDD0;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
}
.cp-spec-val-card.highlight {
  border-left-color: #B8862A;
  border-right-color: #B8862A;
  background: #FFFDF9;
}
.cp-spec-last .cp-spec-val-card {
  border-bottom: 1px solid #E8DDD0;
  border-radius: 0 0 4px 4px;
  padding-bottom: 4px;
  padding-top: 4px;
}
.cp-spec-last .cp-spec-val-card.highlight {
  border-bottom-color: #B8862A;
}
.cp-spec-val {
  font-size: 13px;
  color: #3D2B1A;
  font-weight: 400;
}
.cp-spec-val.dash { color: #C4B4A4; }
.cp-spec-check { color: #2e7d32; display: flex; }
.cp-spec-diff { color: #B8862A; font-weight: 500; }

/* ── Picker dropdown modal ── */
.cp-picker-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20,10,5,0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}
.cp-picker-modal {
  background: #FFFDF9;
  border-radius: 4px;
  width: 520px;
  max-width: 95vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(20,10,5,0.25);
}
.cp-picker-modal-head {
  padding: 20px 24px 16px;
  border-bottom: 1px solid #E8DDD0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: #FFFDF9;
  z-index: 1;
}
.cp-picker-modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  color: #2C1A0E;
}
.cp-picker-modal-close {
  background: none; border: none; cursor: pointer;
  color: #9E8875; transition: color 0.2s; display: flex;
}
.cp-picker-modal-close:hover { color: #2C1A0E; }
.cp-picker-list { padding: 12px 0; }
.cp-picker-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background 0.15s;
}
.cp-picker-item:hover { background: #FBF6EE; }
.cp-picker-item.disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.cp-picker-item-img {
  width: 52px; height: 52px;
  object-fit: cover;
  border-radius: 3px;
  background: #F5EDE3;
  flex-shrink: 0;
}
.cp-picker-item-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  color: #2C1A0E;
}
.cp-picker-item-meta { font-size: 11px; color: #9E8875; margin-top: 2px; }
.cp-picker-item-price { font-size: 14px; font-weight: 500; color: #2C1A0E; margin-left: auto; flex-shrink: 0; }
.cp-picker-item-check { color: #B8862A; margin-left: 8px; flex-shrink: 0; }

/* ── Differences toggle ── */
.cp-diff-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}
.cp-diff-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #E8DDD0;
  padding: 9px 20px;
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #4A3728;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;
}
.cp-diff-btn:hover, .cp-diff-btn.active { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .cp-header { padding: 16px 20px; }
  .cp-picker-bar, .cp-main { padding: 0 16px; }
  .cp-table .col-label { width: 120px; }
}
@media (max-width: 640px) {
  .cp-title { font-size: 22px; }
  .cp-picker-bar { margin-top: 20px; }
}
`;

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="cp-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`cp-star${i > Math.round(rating) ? " empty" : ""}`}>★</span>
      ))}
      <span className="cp-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

function formatPrice(n) {
  return "₹ " + n.toLocaleString("en-IN");
}

/* Section boundaries for spec rows */
const sections = [
  { label: "Metal & Weight", keys: ["metal", "karatage", "colour", "grossWeight", "netWeight"] },
  { label: "Stone Details", keys: ["stoneType", "stoneWeight"] },
  { label: "Product Info", keys: ["gender", "type", "occasion", "certification", "warranty"] },
  { label: "Pricing", keys: ["making", "emi"] },
];

/* ─────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────── */
export default function ComparePage() {
  /* selected products — start with first 2 */
  const [selected, setSelected] = useState([allProducts[0], allProducts[1]]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerSlot, setPickerSlot] = useState(null); // which slot to fill (0,1,2)
  const [onlyDiffs, setOnlyDiffs] = useState(false);
  const [wishlisted, setWishlisted] = useState({});

  const MAX = 3;

  /* open picker for a specific slot or "add new" */
  const openPicker = (slot) => {
    setPickerSlot(slot);
    setShowPicker(true);
  };

  const selectProduct = (product) => {
    const next = [...selected];
    if (pickerSlot === "new") {
      next.push(product);
    } else {
      next[pickerSlot] = product;
    }
    setSelected(next);
    setShowPicker(false);
  };

  const removeProduct = (idx) => {
    setSelected(selected.filter((_, i) => i !== idx));
  };

  const toggleWish = (id) => setWishlisted(p => ({ ...p, [id]: !p[id] }));

  /* for "show differences only" — filter spec rows where values differ */
  const filteredSpecRows = onlyDiffs
    ? specRows.filter(row => {
        const vals = selected.map(p => p?.specs?.[row.key] ?? "—");
        return new Set(vals).size > 1;
      })
    : specRows;

  /* which product has lowest price (highlight) */
  const minPrice = Math.min(...selected.map(p => p.price));

  /* build sections list using filtered rows */
  const visibleSections = sections.map(sec => ({
    ...sec,
    rows: filteredSpecRows.filter(r => sec.keys.includes(r.key)),
  })).filter(sec => sec.rows.length > 0);

  const totalFilteredRows = filteredSpecRows.length;

  return (
    <>
      <style>{styles}</style>

      {/* ── Picker modal ── */}
      {showPicker && (
        <div className="cp-picker-modal-overlay" onClick={() => setShowPicker(false)}>
          <div className="cp-picker-modal" onClick={e => e.stopPropagation()}>
            <div className="cp-picker-modal-head">
              <span className="cp-picker-modal-title">Choose a product</span>
              <button className="cp-picker-modal-close" onClick={() => setShowPicker(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cp-picker-list">
              {allProducts.map(p => {
                const alreadyIn = selected.some((s, i) => s?.id === p.id && i !== pickerSlot);
                return (
                  <div
                    key={p.id}
                    className={`cp-picker-item${alreadyIn ? " disabled" : ""}`}
                    onClick={() => !alreadyIn && selectProduct(p)}
                  >
                    <img src={p.img} alt={p.name} className="cp-picker-item-img" />
                    <div>
                      <p className="cp-picker-item-name">{p.name}</p>
                      <p className="cp-picker-item-meta">{p.tag} · {p.specs.grossWeight}</p>
                    </div>
                    <span className="cp-picker-item-price">{formatPrice(p.price)}</span>
                    {alreadyIn && <Check size={15} className="cp-picker-item-check" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="cp-root">
        {/* ── Sticky header ── */}
        <div className="cp-header">
          <div className="cp-header-inner">
            <Link href="/listing" className="cp-back">
              <ArrowLeft size={14} /> Back
            </Link>
            <div className="cp-title-block">
              <h1 className="cp-title">Compare <em>Jewellery</em></h1>
              <p className="cp-subtitle">Side-by-side · Up to 3 products</p>
            </div>
            {/* spacer to balance the back link */}
            <div style={{ width: 80 }} />
          </div>
        </div>
        <div className="cp-gold-line" />

        {/* ── Quick-add chips ── */}
        <div className="cp-picker-bar" style={{ marginTop: 28 }}>
          <p className="cp-picker-label">Products in comparison</p>
          <div className="cp-picker-row">
            {selected.map((p, i) => (
              <button key={i} className="cp-picker-chip active" onClick={() => openPicker(i)}>
                <img src={p.img} alt={p.name} className="cp-picker-chip-img" />
                {p.name.length > 22 ? p.name.slice(0, 22) + "…" : p.name}
                <X size={12} style={{ marginLeft: 2, opacity: 0.7 }} onClick={(e) => { e.stopPropagation(); removeProduct(i); }} />
              </button>
            ))}
            {selected.length < MAX && (
              <button className="cp-picker-chip" onClick={() => openPicker("new")}>
                <Plus size={14} style={{ color: "#B8862A" }} /> Add product
              </button>
            )}
          </div>
        </div>

        {/* ── Differences toggle ── */}
        <div className="cp-diff-toggle" style={{ marginTop: 24 }}>
          <button
            className={`cp-diff-btn${onlyDiffs ? " active" : ""}`}
            onClick={() => setOnlyDiffs(!onlyDiffs)}
          >
            {onlyDiffs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {onlyDiffs ? "Show all specs" : "Show differences only"}
          </button>
        </div>

        {/* ── Main compare table ── */}
        <div className="cp-main">
          <div className="cp-scroll">
            <table className="cp-table">
              <colgroup>
                <col className="col-label" />
                {selected.map((_, i) => <col key={i} className="col-product" />)}
                {selected.length < MAX && <col className="col-product" />}
              </colgroup>

              <tbody>
                {/* ── Product header row ── */}
                <tr>
                  <td className="cp-label-cell">
                    <div className="cp-label-spacer" />
                  </td>

                  {selected.map((p, i) => (
                    <td key={p.id} className="cp-prod-cell">
                      <div className={`cp-prod-card${p.price === minPrice ? " highlight" : ""}`}>
                        <button className="cp-remove-btn" onClick={() => removeProduct(i)}>
                          <X size={15} />
                        </button>

                        <div className="cp-prod-img-wrap">
                          <img src={p.img} alt={p.name} className="cp-prod-img" />
                          {p.badge && <span className="cp-prod-badge">{p.badge}</span>}
                        </div>

                        <p className="cp-prod-tag">{p.tag}</p>
                        <p className="cp-prod-name">{p.name}</p>

                        <StarRating rating={p.rating} />
                        <p className="cp-reviews">{p.reviews} reviews</p>

                        <div className="cp-price-block" style={{ marginTop: 10 }}>
                          <span className="cp-price">
                            {formatPrice(p.price)}
                            {p.originalPrice > p.price && (
                              <span className="cp-original-price">{formatPrice(p.originalPrice)}</span>
                            )}
                          </span>
                          {p.originalPrice > p.price && (
                            <p className="cp-saving">
                              Save {formatPrice(p.originalPrice - p.price)}
                            </p>
                          )}
                        </div>

                        <button className="cp-add-btn">
                          <ShoppingBag size={13} /> Add to Cart
                        </button>
                        <button
                          className="cp-wish-btn"
                          onClick={() => toggleWish(p.id)}
                          style={wishlisted[p.id] ? { borderColor: "#B8862A", color: "#B8862A" } : {}}
                        >
                          <Heart size={13} fill={wishlisted[p.id] ? "#B8862A" : "none"} />
                          {wishlisted[p.id] ? "Wishlisted" : "Wishlist"}
                        </button>
                      </div>
                    </td>
                  ))}

                  {/* Empty slot */}
                  {selected.length < MAX && (
                    <td className="cp-empty-cell">
                      <div className="cp-empty-card" onClick={() => openPicker("new")}>
                        <div className="cp-empty-icon"><Plus size={20} /></div>
                        <p className="cp-empty-label">Add product<br />to compare</p>
                      </div>
                    </td>
                  )}
                </tr>

                {/* ── Spec rows, grouped by section ── */}
                {totalFilteredRows === 0 ? (
                  <tr>
                    <td colSpan={selected.length + 2} style={{ padding: "32px 0", textAlign: "center" }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#2C1A0E" }}>
                        All specs are identical
                      </p>
                      <p style={{ fontSize: 12, color: "#9E8875", marginTop: 6 }}>
                        No differences found between selected products.
                      </p>
                    </td>
                  </tr>
                ) : (
                  visibleSections.map((section) => (
                    <>
                      {/* Section header */}
                      <tr key={`sec-${section.label}`} className="cp-spec-section-header">
                        <td colSpan={selected.length + (selected.length < MAX ? 2 : 1)}>
                          <div className="cp-section-tag">{section.label}</div>
                        </td>
                      </tr>

                      {/* Spec rows */}
                      {section.rows.map((row, rowIdx) => {
                        const isLast = rowIdx === section.rows.length - 1;
                        const vals = selected.map(p => p.specs[row.key] ?? "—");
                        const allSame = new Set(vals).size === 1;

                        return (
                          <tr key={row.key} className="cp-spec-row">
                            <td className={`cp-spec-label-td${isLast ? " cp-spec-last" : ""}`}>
                              <span className="cp-spec-label">{row.label}</span>
                            </td>

                            {selected.map((p, pi) => {
                              const val = p.specs[row.key] ?? "—";
                              const isDash = val === "—";
                              const isDiff = !allSame;
                              const isHighlight = p.price === minPrice;

                              return (
                                <td
                                  key={p.id}
                                  className={`cp-spec-val-td${isLast ? " cp-spec-last" : ""}`}
                                >
                                  <div className={`cp-spec-val-card${isHighlight ? " highlight" : ""}`}>
                                    {val === "Lifetime" || val === "BIS Hallmarked" || val === "IGI Certified" ? (
                                      <span className="cp-spec-check"><Check size={14} /></span>
                                    ) : (
                                      <span className={`cp-spec-val${isDash ? " dash" : ""}${isDiff && !isDash ? " cp-spec-diff" : ""}`}>
                                        {val}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              );
                            })}

                            {/* Empty slot filler */}
                            {selected.length < MAX && (
                              <td className={`cp-spec-val-td${isLast ? " cp-spec-last" : ""}`}>
                                <div className="cp-spec-val-card">
                                  <span className="cp-spec-val dash">—</span>
                                </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
