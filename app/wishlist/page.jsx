"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .wl-root { background: #FAF6F0; min-height: 100vh; padding: 40px 0 80px; font-family: 'Jost', sans-serif; }
  .wl-inner { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .wl-inner { padding: 0 16px; } }
  .wl-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #9E8875; text-decoration: none; margin-bottom: 32px; transition: color 0.2s; }
  .wl-back:hover { color: #B8862A; }
  .wl-header { margin-bottom: 40px; }
  .wl-heading { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 400; color: #2C1A0E; display: flex; align-items: center; gap: 14px; margin-bottom: 4px; }
  .wl-heading em { font-style: italic; color: #B8862A; }
  .wl-heading-icon { color: #B8862A; }
  .wl-count { font-size: 12px; color: #9E8875; letter-spacing: 1px; }
  .wl-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #D4AF6A 50%, transparent); margin: 24px 0 36px; }

  .wl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  @media (max-width: 1100px) { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) { .wl-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

  .wl-card { background: #fff; border: 1px solid #EDE4D8; border-radius: 4px; overflow: hidden; transition: box-shadow 0.3s, transform 0.3s; position: relative; }
  .wl-card:hover { box-shadow: 0 8px 32px rgba(44,26,14,0.12); transform: translateY(-3px); }
  .wl-card-img-wrap { position: relative; overflow: hidden; aspect-ratio: 1; background: #F5EDE3; }
  .wl-card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s; }
  .wl-card:hover .wl-card-img { transform: scale(1.05); }
  .wl-card-remove { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
  .wl-card-remove:hover { background: #fff; color: #c0392b; }
  .wl-card-tag { position: absolute; top: 10px; left: 10px; background: rgba(44,26,14,0.78); color: #D4AF6A; font-size: 9px; letter-spacing: 1.5px; padding: 4px 9px; text-transform: uppercase; border-radius: 2px; }
  .wl-card-body { padding: 14px 16px 16px; }
  .wl-card-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; color: #2C1A0E; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .wl-card-meta { font-size: 11px; color: #9E8875; margin-bottom: 10px; }
  .wl-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .wl-card-price { font-size: 17px; font-weight: 500; color: #2C1A0E; }
  .wl-card-add { display: flex; align-items: center; gap: 6px; background: #2C1A0E; color: #D4AF6A; border: none; padding: 8px 14px; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; font-family: 'Jost', sans-serif; border-radius: 2px; transition: background 0.2s; }
  .wl-card-add:hover { background: #B8862A; color: #fff; }

  .wl-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 4px; }
  .wl-empty-icon { font-size: 56px; margin-bottom: 16px; }
  .wl-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2C1A0E; margin-bottom: 8px; }
  .wl-empty-sub { font-size: 13px; color: #9E8875; margin-bottom: 28px; }
  .wl-empty-btn { display: inline-flex; background: #2C1A0E; color: #D4AF6A; padding: 14px 32px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-family: 'Jost', sans-serif; }
`;

const initialItems = [
  { id: 1, name: "Aakarshan Gold Necklace", tag: "22KT Gold", meta: "22 KT Yellow · 74.09g", price: 112732, img: "https://picsum.photos/400/400?random=11" },
  { id: 2, name: "Diamond Finger Ring", tag: "18KT Diamond", meta: "18 KT Yellow · VVS1 · 5.63g", price: 52697, img: "https://picsum.photos/400/400?random=22" },
  { id: 3, name: "Floral Gold Bangle", tag: "22KT Gold", meta: "22 KT Yellow · 18.4g", price: 87450, img: "https://picsum.photos/400/400?random=33" },
  { id: 4, name: "Pearl Drop Earrings", tag: "18KT Gold", meta: "18 KT White · Pearl", price: 34200, img: "https://picsum.photos/400/400?random=44" },
  { id: 5, name: "Emerald Pendant", tag: "22KT Gold", meta: "22 KT Yellow · Emerald", price: 67890, img: "https://picsum.photos/400/400?random=55" },
  { id: 6, name: "Ruby Mangalsutra", tag: "22KT Gold", meta: "22 KT Yellow · Ruby · 12.2g", price: 45600, img: "https://picsum.photos/400/400?random=66" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialItems);

  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id));

  return (
    <>
      <style>{styles}</style>
      <div className="wl-root">
        <div className="wl-inner">
          <Link href="/" className="wl-back"><ArrowLeft size={14} /> Back to Home</Link>

          <div className="wl-header">
            <h1 className="wl-heading">
              <Heart size={32} className="wl-heading-icon" fill="#B8862A" />
              My <em>Wishlist</em>
            </h1>
            <p className="wl-count">{items.length} saved piece{items.length !== 1 ? "s" : ""}</p>
          </div>

          <div className="wl-gold-line" />

          {items.length === 0 ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">🤍</div>
              <h2 className="wl-empty-title">Your wishlist is empty</h2>
              <p className="wl-empty-sub">Save your favourite pieces and come back to them anytime.</p>
              <Link href="/listing" className="wl-empty-btn">Explore Collection</Link>
            </div>
          ) : (
            <div className="wl-grid">
              {items.map(item => (
                <div key={item.id} className="wl-card">
                  <div className="wl-card-img-wrap">
                    <img src={item.img} alt={item.name} className="wl-card-img" />
                    <span className="wl-card-tag">{item.tag}</span>
                    <button className="wl-card-remove" onClick={() => remove(item.id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="wl-card-body">
                    <p className="wl-card-name">{item.name}</p>
                    <p className="wl-card-meta">{item.meta}</p>
                    <div className="wl-card-footer">
                      <span className="wl-card-price">₹ {item.price.toLocaleString("en-IN")}</span>
                      <button className="wl-card-add"><ShoppingBag size={11} /> Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
