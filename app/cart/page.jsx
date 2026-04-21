"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag, Loader2 } from "lucide-react";
import { useCart } from "@/hooks";
import { useAuth } from "@/context/AuthContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;}
  .cart-root{background:#FAF6F0;min-height:100vh;padding:40px 0 100px;font-family:'Jost',sans-serif;}
  .cart-inner{max-width:1200px;margin:0 auto;padding:0 40px;}
  @media(max-width:900px){.cart-inner{padding:0 16px;}}
  .cart-back{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;text-decoration:none;margin-bottom:32px;transition:color .2s;}
  .cart-back:hover{color:#B8862A;}
  .cart-heading{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:400;color:#2C1A0E;margin-bottom:6px;}
  .cart-heading em{font-style:italic;color:#B8862A;}
  .cart-count{font-size:12px;color:#9E8875;letter-spacing:1px;margin-bottom:36px;}
  .cart-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin-bottom:32px;}
  .cart-layout{display:grid;grid-template-columns:1fr 360px;gap:32px;align-items:start;}
  @media(max-width:900px){.cart-layout{grid-template-columns:1fr;}}
  .cart-items{display:flex;flex-direction:column;gap:0;}
  .cart-item{display:grid;grid-template-columns:100px 1fr auto;gap:20px;align-items:center;background:#fff;padding:20px;border-bottom:1px solid #F0E8DC;transition:background .15s;}
  .cart-item:first-child{border-radius:4px 4px 0 0;}
  .cart-item:last-child{border-radius:0 0 4px 4px;border-bottom:none;}
  .cart-item:hover{background:#FFFDF9;}
  .cart-item-img{width:100px;height:100px;object-fit:cover;border-radius:3px;background:#F5EDE3;display:block;}
  .cart-item-info{min-width:0;}
  .cart-item-tag{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#B8862A;margin-bottom:5px;}
  .cart-item-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#2C1A0E;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .cart-item-meta{font-size:11px;color:#9E8875;letter-spacing:.5px;margin-bottom:10px;}
  .cart-item-price{font-size:16px;font-weight:500;color:#2C1A0E;}
  .cart-item-actions{display:flex;flex-direction:column;align-items:flex-end;gap:12px;}
  .cart-qty{display:flex;align-items:center;gap:0;border:1px solid #E8DDD0;border-radius:2px;}
  .cart-qty-btn{background:none;border:none;padding:6px 10px;cursor:pointer;color:#7A6656;transition:all .2s;display:flex;}
  .cart-qty-btn:hover{background:#FBF6EE;color:#B8862A;}
  .cart-qty-btn:disabled{opacity:.4;cursor:not-allowed;}
  .cart-qty-num{padding:6px 12px;font-size:13px;font-weight:500;color:#2C1A0E;min-width:36px;text-align:center;border-left:1px solid #E8DDD0;border-right:1px solid #E8DDD0;}
  .cart-remove{background:none;border:none;color:#C4A9A0;cursor:pointer;transition:color .2s;padding:4px;display:flex;}
  .cart-remove:hover{color:#c0392b;}
  .cart-summary{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:28px;position:sticky;top:120px;}
  .cart-summary-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:#2C1A0E;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #E8DDD0;}
  .cart-summary-row{display:flex;justify-content:space-between;font-size:13px;color:#6B5744;margin-bottom:12px;}
  .cart-summary-row.total{font-size:16px;font-weight:500;color:#2C1A0E;padding-top:16px;margin-top:4px;border-top:1px solid #E8DDD0;}
  .cart-summary-row.total .val{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:#2C1A0E;}
  .cart-coupon{display:flex;gap:8px;margin:20px 0;}
  .cart-coupon input{flex:1;border:1px solid #E8DDD0;padding:10px 14px;font-size:12px;font-family:'Jost',sans-serif;outline:none;border-radius:2px;color:#2C1A0E;}
  .cart-coupon input:focus{border-color:#B8862A;}
  .cart-coupon-btn{background:#2C1A0E;color:#D4AF6A;border:none;padding:10px 16px;font-size:10px;letter-spacing:1.5px;cursor:pointer;font-family:'Jost',sans-serif;border-radius:2px;display:flex;align-items:center;gap:6px;transition:background .2s;white-space:nowrap;}
  .cart-coupon-btn:hover:not(:disabled){background:#4A3728;}
  .cart-coupon-btn:disabled{opacity:.6;cursor:not-allowed;}
  .cart-coupon-msg{font-size:12px;color:#2e7d32;margin-top:-12px;margin-bottom:8px;}
  .cart-coupon-err{font-size:12px;color:#993C1D;margin-top:-12px;margin-bottom:8px;}
  .cart-checkout-btn{width:100%;background:#2C1A0E;color:#D4AF6A;border:none;padding:16px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;margin-top:16px;transition:background .2s;display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;}
  .cart-checkout-btn:hover{background:#B8862A;color:#fff;}
  .cart-checkout-btn:disabled{opacity:.5;cursor:not-allowed;}
  .cart-trust{display:flex;justify-content:center;gap:16px;margin-top:16px;}
  .cart-trust-item{font-size:10px;color:#9E8875;display:flex;align-items:center;gap:4px;}
  .cart-empty{text-align:center;padding:80px 20px;background:#fff;border-radius:4px;}
  .cart-empty-icon{font-size:56px;margin-bottom:16px;}
  .cart-empty-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:400;color:#2C1A0E;margin-bottom:8px;}
  .cart-empty-sub{font-size:13px;color:#9E8875;margin-bottom:28px;}
  .cart-empty-btn{display:inline-flex;background:#2C1A0E;color:#D4AF6A;padding:14px 32px;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:'Jost',sans-serif;}
  .cart-login-prompt{background:#FBF6EE;border:1px solid #E8D8C0;border-radius:4px;padding:28px;text-align:center;}
  .cart-login-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#2C1A0E;margin-bottom:8px;}
  .cart-login-sub{font-size:13px;color:#9E8875;margin-bottom:20px;}
  .cart-login-btn{display:inline-flex;background:#2C1A0E;color:#D4AF6A;padding:12px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:'Jost',sans-serif;}
`;

export default function CartPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { cart, totals, loading, updateItem, removeItem, applyCoupon, removeCoupon } = useCart();
  const [coupon, setCoupon]           = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg]     = useState("");
  const [couponErr, setCouponErr]     = useState("");
  const [updatingId, setUpdatingId]   = useState(null);

  const fmt = n => "₹ " + (n || 0).toLocaleString("en-IN");

  const handleQty = async (itemId, delta, currentQty) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    setUpdatingId(itemId);
    try { await updateItem(itemId, newQty); }
    catch (e) { alert(e.message); }
    finally { setUpdatingId(null); }
  };

  const handleRemove = async (itemId) => {
    setUpdatingId(itemId);
    try { await removeItem(itemId); }
    finally { setUpdatingId(null); }
  };

  const handleCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true); setCouponMsg(""); setCouponErr("");
    try {
      const res = await applyCoupon(coupon.trim().toUpperCase());
      setCouponMsg(res?.message || "Coupon applied!");
    } catch (e) { setCouponErr(e.message); }
    finally { setCouponLoading(false); }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCoupon(""); setCouponMsg(""); setCouponErr("");
  };

     if (loading) {
    return (
      <div className="wl-root" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Loader2 className="spin" />
      </div>
    );
  }

  if (!isLoggedIn) return (
    <>
      <style>{styles}</style>
      <div className="cart-root">
        <div className="cart-inner">
          <Link href="/" className="cart-back"><ArrowLeft size={14} /> Continue Shopping</Link>
          <h1 className="cart-heading">My <em>Cart</em></h1>
          <div className="cart-gold-line" />
          <div className="cart-login-prompt">
            <p className="cart-login-title">Please log in to view your cart</p>
            <p className="cart-login-sub">Your cart items are saved when you sign in.</p>
            <Link href="/" className="cart-login-btn">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );

  const items = cart?.items || [];

  return (
    <>
      <style>{styles}</style>
      <div className="cart-root">
        <div className="cart-inner">
          <Link href="/listing" className="cart-back"><ArrowLeft size={14} /> Continue Shopping</Link>
          <h1 className="cart-heading">My <em>Cart</em></h1>
          <p className="cart-count">{items.length} item{items.length !== 1 ? "s" : ""} in your bag</p>
          <div className="cart-gold-line" />

          {loading ? (
            <div style={{ display:"flex",justifyContent:"center",padding:60,color:"#9E8875" }}>
              <Loader2 size={28} style={{ animation:"spin 1s linear infinite" }} />
            </div>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <h2 className="cart-empty-title">Your cart is empty</h2>
              <p className="cart-empty-sub">Looks like you haven't added any jewellery yet.</p>
              <Link href="/listing" className="cart-empty-btn">Explore Collection</Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Items */}
              <div className="cart-items">
                {items.map(item => {
                  const p = item.product;
                  const isUpdating = updatingId === item._id;
                  return (
                    <div key={item._id} className="cart-item">
                      <img
                        src={p?.thumbnail || "https://picsum.photos/200/200?random=1"}
                        alt={p?.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-info">
                        <p className="cart-item-tag">{p?.metal?.purity} {p?.category}</p>
                        <p className="cart-item-name">{p?.name}</p>
                        <p className="cart-item-meta">
                          {p?.metal?.type} · {p?.metal?.weight}g
                          {item.size ? ` · Size ${item.size}` : ""}
                        </p>
                        <p className="cart-item-price">
                          {fmt((item.priceAtAdd || p?.price?.current) * item.qty)}
                        </p>
                      </div>
                      <div className="cart-item-actions">
                        <button className="cart-remove" onClick={() => handleRemove(item._id)} disabled={isUpdating}>
                          {isUpdating ? <Loader2 size={14} style={{ animation:"spin 1s linear infinite" }} /> : <Trash2 size={15} />}
                        </button>
                        <div className="cart-qty">
                          <button className="cart-qty-btn" disabled={item.qty <= 1 || isUpdating} onClick={() => handleQty(item._id, -1, item.qty)}>
                            <Minus size={12} />
                          </button>
                          <span className="cart-qty-num">{item.qty}</span>
                          <button className="cart-qty-btn" disabled={isUpdating} onClick={() => handleQty(item._id, 1, item.qty)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <h2 className="cart-summary-title">Order Summary</h2>
                <div className="cart-summary-row"><span>Subtotal</span><span>{fmt(totals?.subtotal)}</span></div>
                {totals?.discount > 0 && (
                  <div className="cart-summary-row" style={{ color:"#2e7d32" }}>
                    <span>Discount ({cart?.couponCode})</span>
                    <span>− {fmt(totals.discount)}</span>
                  </div>
                )}
                <div className="cart-summary-row"><span>GST (3%)</span><span>{fmt(totals?.gst)}</span></div>
                <div className="cart-summary-row"><span>Shipping</span><span style={{ color:"#2e7d32" }}>Free</span></div>

                {/* Coupon */}
                {cart?.couponCode ? (
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",margin:"16px 0",fontSize:12 }}>
                    <span style={{ color:"#2e7d32" }}>✓ Coupon <strong>{cart.couponCode}</strong> applied</span>
                    <button onClick={handleRemoveCoupon} style={{ background:"none",border:"none",cursor:"pointer",color:"#993C1D",fontSize:11,letterSpacing:1 }}>REMOVE</button>
                  </div>
                ) : (
                  <>
                    <div className="cart-coupon">
                      <input placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())}
                        onKeyDown={e => e.key === "Enter" && handleCoupon()} />
                      <button className="cart-coupon-btn" onClick={handleCoupon} disabled={couponLoading || !coupon.trim()}>
                        {couponLoading ? <Loader2 size={11} style={{ animation:"spin 1s linear infinite" }} /> : <Tag size={11} />} Apply
                      </button>
                    </div>
                    {couponMsg && <p className="cart-coupon-msg">✓ {couponMsg}</p>}
                    {couponErr && <p className="cart-coupon-err">⚠ {couponErr}</p>}
                    <p style={{ fontSize:11,color:"#B0A090",marginTop:4,marginBottom:8 }}>Try: MANAS5 · BRIDAL10 · FLAT2000</p>
                  </>
                )}

                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span className="val">{fmt(totals?.total)}</span>
                </div>
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
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
