"use client";
import { FaHeart, FaShareAlt, FaRegCopy, FaCheck } from "react-icons/fa";
import ActionButtons from "./ActionButtons";
import { useState } from "react";

const infoStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  .pi-root { flex: 1; max-width: 520px; font-family: 'Jost', sans-serif; }
  .pi-breadcrumb { font-size: 11px; color: #9E8875; letter-spacing: 0.5px; margin-bottom: 12px; }
  .pi-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
  .pi-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 400; color: #2C1A0E; line-height: 1.15; }
  .pi-actions { display: flex; gap: 12px; margin-top: 6px; }
  .pi-action-btn { background: none; border: 1px solid #E8DDD0; color: #7A6656; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .pi-action-btn:hover { border-color: #B8862A; color: #B8862A; }
  .pi-sku { font-size: 11px; color: #B0A090; display: flex; align-items: center; gap: 5px; margin-bottom: 16px; letter-spacing: 0.5px; }
  .pi-sku button { background: none; border: none; color: #B0A090; cursor: pointer; padding: 0; display: flex; transition: color 0.2s; }
  .pi-sku button:hover { color: #B8862A; }
  .pi-gold-line { height: 1px; background: linear-gradient(90deg, #E8DDD0, #D4AF6A 50%, #E8DDD0); margin: 16px 0; }
  .pi-desc { font-size: 14px; color: #6B5744; line-height: 1.7; margin-bottom: 10px; font-weight: 300; }
  .pi-metal-tag { display: inline-flex; align-items: center; gap: 7px; background: #FBF5EC; border: 1px solid #E8D8C0; padding: 6px 14px; font-size: 12px; color: #8B6B2A; font-weight: 500; border-radius: 2px; letter-spacing: 0.5px; margin-bottom: 20px; }
  .pi-metal-dot { width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(135deg, #F0CF6A, #C8961A); }
  .pi-price-block { margin-bottom: 6px; }
  .pi-price { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 400; color: #2C1A0E; }
  .pi-price-note { font-size: 11px; color: #B0A090; font-weight: 300; letter-spacing: 0.5px; }
  .pi-options { display: flex; gap: 28px; margin: 20px 0 24px; }
  .pi-option-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #9E8875; margin-bottom: 10px; display: block; }
  .pi-color-swatch { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #F0CF6A, #C8961A); border: 3px solid #B8862A; box-shadow: 0 0 0 2px rgba(184,134,42,0.25); cursor: pointer; }
  .pi-size-tag { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #2C1A0E; font-weight: 400; padding: 5px }
  .pi-trust { display: flex; gap: 20px; margin-top: 20px; }
  .pi-trust-item { display: flex; align-items: center; gap: 7px; font-size: 11px; color: #8A7464; letter-spacing: 0.3px; }
  .pi-trust-icon { font-size: 14px; }
`;

const ProductInfo = ({ product }) => {
  const { name, sku, description, metal, price, variants } = product;
  const [copied, setCopied] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("JTXYA20-AENC014");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <style>{infoStyles}</style>
      <div className="pi-root">
        <p className="pi-breadcrumb">
          Home / Jewellery / Necklaces / Aakarshan Gold Necklace
        </p>

        <div className="pi-header">
          <h1 className="pi-title">{name}</h1>
          <div className="pi-actions">
            <button
              className="pi-action-btn"
              onClick={() => setWishlisted(!wishlisted)}
            >
              <FaHeart color={wishlisted ? "#c0392b" : undefined} />
            </button>
            <button className="pi-action-btn">
              <FaShareAlt />
            </button>
          </div>
        </div>

        <p className="pi-sku">
          {sku}
          <button onClick={handleCopy}>
            {copied ? <FaCheck /> : <FaRegCopy />}
          </button>
        </p>

        <div className="pi-gold-line" />

        <p className="pi-desc">{description}</p>

        <span className="pi-metal-tag">
          <span className="pi-metal-dot" />
          {`${metal.purity} Karat ${metal.colour}  ${metal.weight}g Gross Weight`}
        </span>

        <div className="pi-price-block">
          <p className="pi-price">₹ {price.current.toLocaleString("en-IN")}</p>
          <p className="pi-price-note">
            Approximate price, excluding taxes. Subject to daily gold rate.
          </p>
        </div>

        <div className="pi-gold-line" />

        <div className="pi-options">
          <div>
            <span className="pi-option-label">Colour</span>
            <div className="pi-color-swatch" />
          </div>
          <div>
            <span className="pi-option-label">Size</span>
            {variants.sizes.map((size) => {
              return <span className="pi-size-tag">{size}</span>;
            })}
          </div>
        </div>

        <ActionButtons />

        <div className="pi-trust">
          {[
            { icon: "🔒", text: "Secure Checkout" },
            { icon: "✦", text: "BIS Hallmarked" },
            { icon: "🔄", text: "Easy Returns" },
          ].map((t, i) => (
            <div key={i} className="pi-trust-item">
              <span className="pi-trust-icon">{t.icon}</span> {t.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
