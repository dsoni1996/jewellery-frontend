"use client";
import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .cart-root { background: #FAF6F0; min-height: 100vh; padding: 40px 0 100px; font-family: 'Jost', sans-serif; }
  .cart-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  .cart-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #9E8875; text-decoration: none; margin-bottom: 32px; transition: color 0.2s; }
  .cart-back:hover { color: #B8862A; }
  .cart-heading { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 400; color: #2C1A0E; margin-bottom: 6px; }
  .cart-heading em { font-style: italic; color: #B8862A; }
  .cart-count { font-size: 12px; color: #9E8875; letter-spacing: 1px; margin-bottom: 36px; }
  .cart-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #D4AF6A 50%, transparent); margin-bottom: 32px; }

  .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
  @media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr; } .cart-inner { padding: 0 16px; } }

  /* Items */
  .cart-items { display: flex; flex-direction: column; gap: 0; }
  .cart-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 20px; align-items: center; background: #fff; padding: 20px; border-bottom: 1px solid #F0E8DC; transition: background 0.15s; }
  .cart-item:first-child { border-radius: 4px 4px 0 0; }
  .cart-item:last-child { border-radius: 0 0 4px 4px; border-bottom: none; }
  .cart-item:hover { background: #FFFDF9; }
  .cart-item-img { width: 100px; height: 100px; object-fit: cover; border-radius: 3px; background: #F5EDE3; display: block; }
  .cart-item-info { min-width: 0; }
  .cart-item-tag { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #B8862A; margin-bottom: 5px; }
  .cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: #2C1A0E; margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cart-item-meta { font-size: 11px; color: #9E8875; letter-spacing: 0.5px; margin-bottom: 10px; }
  .cart-item-price { font-size: 16px; font-weight: 500; color: #2C1A0E; }
  .cart-item-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
  .cart-qty { display: flex; align-items: center; gap: 0; border: 1px solid #E8DDD0; border-radius: 2px; }
  .cart-qty-btn { background: none; border: none; padding: 6px 10px; cursor: pointer; color: #7A6656; transition: all 0.2s; display: flex; }
  .cart-qty-btn:hover { background: #FBF6EE; color: #B8862A; }
  .cart-qty-num { padding: 6px 12px; font-size: 13px; font-weight: 500; color: #2C1A0E; min-width: 36px; text-align: center; border-left: 1px solid #E8DDD0; border-right: 1px solid #E8DDD0; }
  .cart-remove { background: none; border: none; color: #C4A9A0; cursor: pointer; transition: color 0.2s; padding: 4px; display: flex; }
  .cart-remove:hover { color: #c0392b; }

  /* Summary */
  .cart-summary { background: #fff; border: 1px solid #E8DDD0; border-radius: 4px; padding: 28px; position: sticky; top: 120px; }
  .cart-summary-title { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #2C1A0E; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #E8DDD0; }
  .cart-summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #6B5744; margin-bottom: 12px; }
  .cart-summary-row.total { font-size: 16px; font-weight: 500; color: #2C1A0E; padding-top: 16px; margin-top: 4px; border-top: 1px solid #E8DDD0; }
  .cart-summary-row.total .val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #2C1A0E; }
  .cart-coupon { display: flex; gap: 8px; margin: 20px 0; }
  .cart-coupon input { flex: 1; border: 1px solid #E8DDD0; padding: 10px 14px; font-size: 12px; font-family: 'Jost', sans-serif; outline: none; border-radius: 2px; color: #2C1A0E; }
  .cart-coupon input:focus { border-color: #B8862A; }
  .cart-coupon-btn { background: #2C1A0E; color: #D4AF6A; border: none; padding: 10px 16px; font-size: 10px; letter-spacing: 1.5px; cursor: pointer; font-family: 'Jost', sans-serif; border-radius: 2px; display: flex; align-items: center; gap: 6px; transition: background 0.2s; }
  .cart-coupon-btn:hover { background: #4A3728; }
  .cart-checkout-btn { width: 100%; background: #2C1A0E; color: #D4AF6A; border: none; padding: 16px; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; margin-top: 16px; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; }
  .cart-checkout-btn:hover { background: #B8862A; color: #fff; }
  .cart-trust { display: flex; justify-content: center; gap: 16px; margin-top: 16px; }
  .cart-trust-item { font-size: 10px; color: #9E8875; display: flex; align-items: center; gap: 4px; }

  /* Empty state */
  .cart-empty { text-align: center; padding: 80px 20px; background: #fff; border-radius: 4px; }
  .cart-empty-icon { font-size: 56px; margin-bottom: 16px; }
  .cart-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: #2C1A0E; margin-bottom: 8px; }
  .cart-empty-sub { font-size: 13px; color: #9E8875; margin-bottom: 28px; }
  .cart-empty-btn { display: inline-flex; background: #2C1A0E; color: #D4AF6A; padding: 14px 32px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-family: 'Jost', sans-serif; transition: background 0.2s; }
  .cart-empty-btn:hover { background: #B8862A; color: #fff; }
`;

const initialItems = [
  { id: 1, name: "Aakarshan Gold Necklace", tag: "22KT Gold", meta: "22 KT Yellow · 74.09g", price: 112732, qty: 1, img: "https://picsum.photos/200/200?random=11" },
  { id: 2, name: "Diamond Finger Ring", tag: "18KT Diamond", meta: "18 KT Yellow · VVS1 · 5.63g", price: 52697, qty: 1, img: "https://picsum.photos/200/200?random=22" },
  { id: 3, name: "Floral Gold Bangle", tag: "22KT Gold", meta: "22 KT Yellow · 18.4g", price: 87450, qty: 1, img: "https://picsum.photos/200/200?random=33" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  };
  const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id));

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.05) : 0;
  const shipping = 0;
  const gst = Math.round((subtotal - discount) * 0.03);
  const total = subtotal - discount + gst;

  return (
    <>
      <style>{styles}</style>
      <div className="cart-root">
        <div className="cart-inner">
          <Link href="/" className="cart-back"><ArrowLeft size={14} /> Continue Shopping</Link>
          <h1 className="cart-heading">My <em>Cart</em></h1>
          <p className="cart-count">{items.length} item{items.length !== 1 ? "s" : ""} in your bag</p>
          <div className="cart-gold-line" />

          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <h2 className="cart-empty-title">Your cart is empty</h2>
              <p className="cart-empty-sub">Looks like you haven't added any jewellery yet.</p>
              <Link href="/listing" className="cart-empty-btn">Explore Collection</Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left — items */}
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-tag">{item.tag}</p>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-meta">{item.meta}</p>
                      <p className="cart-item-price">₹ {(item.price * item.qty).toLocaleString("en-IN")}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button className="cart-remove" onClick={() => removeItem(item.id)}><Trash2 size={15} /></button>
                      <div className="cart-qty">
                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}><Minus size={12} /></button>
                        <span className="cart-qty-num">{item.qty}</span>
                        <button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right — summary */}
              <div className="cart-summary">
                <h2 className="cart-summary-title">Order Summary</h2>
                <div className="cart-summary-row"><span>Subtotal</span><span>₹ {subtotal.toLocaleString("en-IN")}</span></div>
                {couponApplied && <div className="cart-summary-row" style={{ color: "#2e7d32" }}><span>Discount (MANAS5)</span><span>− ₹ {discount.toLocaleString("en-IN")}</span></div>}
                <div className="cart-summary-row"><span>GST (3%)</span><span>₹ {gst.toLocaleString("en-IN")}</span></div>
                <div className="cart-summary-row"><span>Shipping</span><span style={{ color: "#2e7d32" }}>Free</span></div>
                <div className="cart-coupon">
                  <input placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} />
                  <button className="cart-coupon-btn" onClick={() => { if (coupon.trim()) setCouponApplied(true); }}>
                    <Tag size={12} /> Apply
                  </button>
                </div>
                <div className="cart-summary-row total"><span>Total</span><span className="val">₹ {total.toLocaleString("en-IN")}</span></div>
                <Link href="/checkout" className="cart-checkout-btn">
                  <ShoppingBag size={14} /> Proceed to Checkout
                </Link>
                <div className="cart-trust">
                  <span className="cart-trust-item">🔒 Secure</span>
                  <span className="cart-trust-item">✦ BIS Certified</span>
                  <span className="cart-trust-item">🔄 Easy Returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
