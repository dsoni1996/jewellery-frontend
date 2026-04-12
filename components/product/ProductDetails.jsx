"use client";
import React, { useState } from "react";
import { ChevronDown, ShoppingBag } from "lucide-react";

// const productDetailsData = [
//   {
//     title: "METAL DETAILS",
//     data: [
//       { value: "18K", label: "Karatage" },
//       { value: "Yellow", label: "Material Colour" },
//       { value: "5.634g", label: "Gross Weight" },
//       { value: "Gold", label: "Metal" },
//       { value: "16.40 MM", label: "Size" },
//     ],
//   },
//   {
//     title: "STONE DETAILS",
//     data: [
//       { value: "Diamond", label: "Stone Type" },
//       { value: "VVS1", label: "Clarity" },
//       { value: "0.25 ct", label: "Carat Weight" },
//     ],
//   },
//   {
//     title: "GENERAL DETAILS",
//     data: [
//       { value: "Necklace", label: "Product Type" },
//       { value: "Women", label: "Gender" },
//       { value: "Hallmarked", label: "Certification" },
//     ],
//   },
//   {
//     title: "DESCRIPTION",
//     data: [
//       { value: "A golden embrace, a symbol of grace. Hand-crafted by master artisans in 22 karat yellow gold.", label: "" },
//     ],
//   },
// ];

// const priceBreakupData = [
//   { name: "Yellow Gold", sub: "18KT", rate: "₹ 11,270.45/g", weight: "2.128g", discount: "—", value: "₹ 23,983" },
//   { name: "Stone", sub: "Diamond VVS1", rate: "—", weight: "1.340 ct / 0.268g", discount: "—", value: "₹ 17,722" },
//   { name: "Making Charges", sub: "", rate: "—", weight: "—", discount: "—", value: "₹ 9,457" },
//   { name: "Sub Total", sub: "", rate: "—", weight: "2.396g (Gross Wt.)", discount: "—", value: "₹ 51,162" },
//   { name: "GST @ 3%", sub: "", rate: "—", weight: "—", discount: "—", value: "₹ 1,534" },
// ];

const grandTotal = "₹ 52,697";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');

  .pd-root {
    background: #FAF6F0;
    padding: 0 0 120px;
    font-family: 'Jost', sans-serif;
  }

  /* ── Gold divider between sections ── */
  .pd-gold-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent);
    margin: 0;
  }

  /* ── Section header ── */
  .pd-section-head {
    text-align: center;
    padding: 48px 20px 32px;
  }
  .pd-section-tag {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: #B8862A; margin-bottom: 8px; display: block;
  }
  .pd-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 400; color: #2C1A0E;
  }
  .pd-section-title em { font-style: italic; color: #B8862A; }

  /* ── Tab bar ── */
  .pd-tabs {
    display: flex;
    justify-content: center;
    gap: 0;
    margin-bottom: 40px;
    border-bottom: 1px solid #E8DDD0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .pd-tab {
    flex: 1;
    padding: 14px 32px;
    background: none;
    border: none;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9E8875;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
  }
  .pd-tab::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 2px;
    background: #B8862A;
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }
  .pd-tab.active { color: #2C1A0E; }
  .pd-tab.active::after { transform: scaleX(1); }
  .pd-tab:hover { color: #B8862A; }

  /* ── Content area ── */
  .pd-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* ── Accordion ── */
  .pd-accordion {
    border: 1px solid #E8DDD0;
    border-radius: 3px;
    background: #fff;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .pd-accordion-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 22px;
    cursor: pointer;
    transition: background 0.15s;
    user-select: none;
  }
  .pd-accordion-head:hover { background: #FBF6EE; }
  .pd-accordion-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #3D2B1A;
  }
  .pd-accordion-chevron {
    color: #B8862A;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }
  .pd-accordion-chevron.open { transform: rotate(180deg); }
  .pd-accordion-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease, padding 0.35s ease;
    padding: 0 22px;
  }
  .pd-accordion-body.open {
    max-height: 400px;
    padding: 4px 22px 22px;
  }

  /* ── Detail grid ── */
  .pd-detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
    text-align: center;
  }
  .pd-detail-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    color: #2C1A0E;
    display: block;
    margin-bottom: 3px;
  }
  .pd-detail-label {
    font-size: 11px;
    color: #9E8875;
    letter-spacing: 0.5px;
  }
  .pd-desc-text {
    font-size: 14px;
    color: #6B5744;
    line-height: 1.75;
    font-weight: 300;
  }

  /* ── Price breakup table ── */
  .pd-price-table { width: 100%; border-collapse: collapse; }
  .pd-price-table thead tr {
    background: #FBF6EE;
    border-bottom: 2px solid #E8DDD0;
  }
  .pd-price-table th {
    padding: 12px 16px;
    text-align: left;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9E8875;
  }
  .pd-price-table th:last-child { text-align: right; }
  .pd-price-table tbody tr {
    border-bottom: 1px solid #F0E8DC;
    transition: background 0.15s;
  }
  .pd-price-table tbody tr:hover { background: #FBF9F5; }
  .pd-price-table td {
    padding: 14px 16px;
    font-size: 13px;
    color: #4A3728;
  }
  .pd-price-table td:last-child { text-align: right; font-weight: 500; }
  .pd-price-sub { font-size: 11px; color: #B0A090; display: block; margin-top: 2px; }
  .pd-price-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px;
    background: #2C1A0E;
    border-radius: 0 0 3px 3px;
    margin-top: 0;
  }
  .pd-price-total-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #D4AF6A;
  }
  .pd-price-total-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    color: #E8C96A;
  }

  /* ── Sticky bottom bar ── */
  .pd-sticky {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #2C1A0E;
    border-top: 2px solid #B8862A;
    padding: 14px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 40;
    gap: 20px;
  }
  .pd-sticky-info { display: flex; align-items: center; gap: 28px; }
  .pd-sticky-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 400; color: #FFFDF9;
  }
  .pd-sticky-meta { font-size: 12px; color: #9E8875; display: flex; flex-direction: column; gap: 2px; }
  .pd-sticky-meta strong { color: #C8B89A; font-weight: 500; }
  .pd-sticky-btn {
    display: flex; align-items: center; gap: 9px;
    background: #B8862A; color: #FFFDF9;
    border: none; padding: 13px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 2.5px;
    text-transform: uppercase; cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .pd-sticky-btn:hover { background: #D4AF6A; color: #2C1A0E; }
  @media (max-width: 600px) {
    .pd-sticky { padding: 12px 16px; }
    .pd-sticky-meta { display: none; }
    .pd-content { padding: 0 16px; }
  }
`;

/* ── Accordion component ── */
const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="pd-accordion">
      <div className="pd-accordion-head" onClick={() => setOpen(!open)}>
        <span className="pd-accordion-title">{title}</span>
        <ChevronDown size={18} className={`pd-accordion-chevron${open ? " open" : ""}`} />
      </div>
      <div className={`pd-accordion-body${open ? " open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

/* ── Main component ── */
const ProductDetails = ({product}) => {
  const [tab, setTab] = useState("details");

  const productDetailsData = [
  {
    title: "METAL DETAILS",
    data: [
      { value: product?.metal?.purity, label: "Karatage" },
      { value: product?.metal?.colour, label: "Material Colour" },
      { value: `${product?.metal?.weight} g`, label: "Weight" },
      { value: product?.metal?.type, label: "Metal" },
      { value: product?.variants?.sizes?.[0] || "-", label: "Size" },
    ],
  },
  {
    title: "STONE DETAILS",
    data: product?.stones
      ? [
          { value: product.stones.type, label: "Stone Type" },
          { value: product.stones.clarity, label: "Clarity" },
          { value: product.stones.weight, label: "Carat Weight" },
        ]
      : [{ value: "No Stones", label: "" }],
  },
  {
    title: "GENERAL DETAILS",
    data: [
      { value: product?.category, label: "Product Type" },
      { value: "Unisex", label: "Gender" },
      { value: product?.certification, label: "Certification" },
    ],
  },
  {
    title: "DESCRIPTION",
    data: [{ value: product?.description, label: "" }],
  },
];

const priceBreakupData = [
  {
    name: product?.metal?.type,
    sub: product?.metal?.purity,
    rate: "—",
    weight: `${product?.metal?.weight}g`,
    discount: product?.price?.discountPercent || "—",
    value: `₹ ${product?.price?.current}`,
  },
  {
    name: "Making Charges",
    value: `₹ ${product?.makingCharges}`,
  },
  {
    name: "GST (3%)",
    value: `₹ ${Math.round(product?.price?.current * 0.03)}`,
  },
];

  return (
    <>
      <style>{styles}</style>
      <div className="pd-root">
        <div className="pd-gold-line" />

        {/* Section heading */}
        <div className="pd-section-head">
          <span className="pd-section-tag">Complete Information</span>
          <h2 className="pd-section-title">Jewellery <em>Details</em></h2>
        </div>

        {/* Tab switcher */}
        <div className="pd-tabs">
          <button
            className={`pd-tab${tab === "details" ? " active" : ""}`}
            onClick={() => setTab("details")}
          >
            Product Details
          </button>
          <button
            className={`pd-tab${tab === "price" ? " active" : ""}`}
            onClick={() => setTab("price")}
          >
            Price Breakup
          </button>
        </div>

        {/* Tab content */}
        <div className="pd-content">

          {/* ── PRODUCT DETAILS tab ── */}
          {tab === "details" && (
            <div>
              {productDetailsData.map((section, i) => (
                <Accordion key={i} title={section.title} defaultOpen={i === 0}>
                  {section.title === "DESCRIPTION" ? (
                    <p className="pd-desc-text">{section.data[0].value}</p>
                  ) : (
                    <div className="pd-detail-grid">
                      {section.data.map((item, j) => (
                        <div key={j}>
                          <span className="pd-detail-value">{item.value}</span>
                          <span className="pd-detail-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Accordion>
              ))}
            </div>
          )}

          {/* ── PRICE BREAKUP tab ── */}
          {tab === "price" && (
            <div className="pd-accordion" style={{ overflow: "hidden" }}>
              <table className="pd-price-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Rate</th>
                    <th>Weight</th>
                    <th>Discount</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {priceBreakupData.map((row, i) => (
                    <tr key={i}>
                      <td>
                        <strong style={{ display: "block", color: "#2C1A0E", fontWeight: 500 }}>{row.name}</strong>
                        {row.sub && <span className="pd-price-sub">{row.sub}</span>}
                      </td>
                      <td>{row.rate}</td>
                      <td>{row.weight}</td>
                      <td>{row.discount}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pd-price-total">
                <span className="pd-price-total-label">Grand Total (incl. GST)</span>
                <span className="pd-price-total-value">{grandTotal}</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div className="pd-sticky">
        <div className="pd-sticky-info">
          <span className="pd-sticky-price">₹ 52,697</span>
          <div className="pd-sticky-meta">
            <span>Size: <strong>16.40 mm</strong></span>
            <span>Weight: <strong>5.634 g</strong></span>
          </div>
          <div className="pd-sticky-meta">
            <span>Metal: <strong>18KT Yellow Gold</strong></span>
            <span>Stone: <strong>Diamond VVS1</strong></span>
          </div>
        </div>
        <button className="pd-sticky-btn">
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
