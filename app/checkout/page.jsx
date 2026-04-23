"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { useCart } from "../../hooks";
import { useAuth } from "../../context/AuthContext";
import { orderApi } from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;}
  .co-root{background:#FAF6F0;min-height:100vh;padding:40px 0 80px;font-family:'Jost',sans-serif;}
  .co-inner{max-width:1200px;margin:0 auto;padding:0 40px;}
  @media(max-width:768px){.co-inner{padding:0 16px;}}
  .co-back{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;text-decoration:none;margin-bottom:32px;transition:color .2s;}
  .co-back:hover{color:#B8862A;}
  .co-heading{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:400;color:#2C1A0E;margin-bottom:4px;}
  .co-heading em{font-style:italic;color:#B8862A;}
  .co-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin:20px 0 36px;}
  .co-steps{display:flex;align-items:center;gap:0;margin-bottom:40px;}
  .co-step{display:flex;align-items:center;gap:8px;}
  .co-step-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;border:2px solid #E8DDD0;color:#9E8875;transition:all .3s;flex-shrink:0;}
  .co-step.active .co-step-num{background:#2C1A0E;border-color:#2C1A0E;color:#D4AF6A;}
  .co-step.done .co-step-num{background:#B8862A;border-color:#B8862A;color:#fff;}
  .co-step-label{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#9E8875;}
  .co-step.active .co-step-label{color:#2C1A0E;font-weight:500;}
  .co-step-line{flex:1;height:1px;background:#E8DDD0;margin:0 12px;}
  .co-layout{display:grid;grid-template-columns:1fr 380px;gap:32px;align-items:start;}
  @media(max-width:900px){.co-layout{grid-template-columns:1fr;}}
  .co-section{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:28px;margin-bottom:16px;}
  .co-section-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#2C1A0E;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
  .co-section-title span{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2px;color:#B8862A;background:#FBF6EE;padding:3px 9px;border:1px solid #E8D8C0;border-radius:2px;}
  .co-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
  .co-row.full{grid-template-columns:1fr;}
  .co-row.three{grid-template-columns:1fr 1fr 1fr;}
  .co-field{display:flex;flex-direction:column;gap:5px;}
  .co-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;}
  .co-input,.co-select{border:1px solid #E8DDD0;padding:11px 14px;font-size:13px;color:#2C1A0E;font-family:'Jost',sans-serif;outline:none;border-radius:2px;transition:border-color .2s;background:#FFFDF9;width:100%;}
  .co-input:focus,.co-select:focus{border-color:#B8862A;}
  .co-pay-opts{display:flex;flex-direction:column;gap:10px;}
  .co-pay-opt{display:flex;align-items:center;gap:14px;padding:14px 16px;border:2px solid #E8DDD0;border-radius:3px;cursor:pointer;transition:border-color .2s;}
  .co-pay-opt.selected{border-color:#B8862A;background:#FBF6EE;}
  .co-pay-opt-label{font-size:13px;color:#3D2B1A;font-weight:500;flex:1;}
  .co-pay-opt-icons{font-size:11px;color:#9E8875;}
  .co-card-fields{margin-top:16px;padding-top:16px;border-top:1px solid #F0E8DC;}
  .co-summary{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:24px;position:sticky;top:120px;}
  .co-summary-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:#2C1A0E;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #E8DDD0;}
  .co-summary-item{display:flex;gap:12px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #F5EDE3;}
  .co-summary-item:last-of-type{border-bottom:none;}
  .co-summary-img{width:60px;height:60px;object-fit:cover;border-radius:3px;background:#F5EDE3;flex-shrink:0;}
  .co-summary-item-name{font-size:13px;color:#2C1A0E;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .co-summary-item-meta{font-size:11px;color:#9E8875;margin-top:2px;}
  .co-summary-item-price{font-size:13px;font-weight:500;color:#2C1A0E;margin-left:auto;flex-shrink:0;}
  .co-summary-rows{margin-top:16px;}
  .co-summary-row{display:flex;justify-content:space-between;font-size:13px;color:#6B5744;margin-bottom:10px;}
  .co-summary-row.total{font-size:15px;font-weight:500;color:#2C1A0E;padding-top:14px;border-top:1px solid #E8DDD0;}
  .co-summary-row.total .val{font-family:'Cormorant Garamond',serif;font-size:24px;}
  .co-place-btn{width:100%;background:#2C1A0E;color:#D4AF6A;border:none;padding:16px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;margin-top:20px;display:flex;align-items:center;justify-content:center;gap:10px;transition:background .2s;}
  .co-place-btn:hover:not(:disabled){background:#B8862A;color:#fff;}
  .co-place-btn:disabled{opacity:.5;cursor:not-allowed;}
  .co-secure{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:12px;font-size:11px;color:#9E8875;}
  .co-error{background:#FAECE7;color:#993C1D;padding:12px 16px;border-radius:2px;font-size:13px;margin-bottom:16px;}
`;

const paymentMethods = [
  { id:"card",       label:"Credit / Debit Card", icons:"Visa · MC · Amex" },
  { id:"upi",        label:"UPI Payment",         icons:"GPay · PhonePe · Paytm" },
  { id:"netbanking", label:"Net Banking",          icons:"All major banks" },
  { id:"emi",        label:"EMI (No Cost)",        icons:"6 / 9 / 12 months" },
];

const emptyAddr = { fullName:"", phone:"", line1:"", line2:"", city:"", state:"", pincode:"" };

export default function CheckoutPage() {
  const router  = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { cart, totals } = useCart();
  const [addr, setAddr]   = useState({ ...emptyAddr, ...(user?.addresses?.[0] || {}) });
  const [payMethod, setPay] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const [error, setError]   = useState("");

  const setA = k => e => setAddr(p => ({ ...p, [k]: e.target.value }));
  const fmt  = n => "₹ " + (n || 0).toLocaleString("en-IN");

  const placeOrder = async () => {
    if (!isLoggedIn) { setError("Please sign in to place an order."); return; }
    if (!addr.fullName || !addr.phone || !addr.line1 || !addr.city || !addr.pincode) {
      setError("Please fill in all required delivery address fields."); return;
    }
    setError(""); setPlacing(true);
    try {
      const { order } = await orderApi.create({
        shippingAddress: addr,
        payment: { method: payMethod },
      });
      router.push(`/order-confirmation/${order.orderNumber}`);
    } catch (e) {
      setError(e.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (!isLoggedIn) return (
    <>
      <style>{styles}</style>
      <div className="co-root">
        <div className="co-inner">
          <Link href="/cart" className="co-back"><ArrowLeft size={14} /> Back to Cart</Link>
          <div style={{ textAlign:"center", padding:"80px 20px", background:"#fff", borderRadius:4 }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:"#2C1A0E", marginBottom:8 }}>Sign in to Checkout</p>
            <p style={{ fontSize:13, color:"#9E8875", marginBottom:24 }}>Please sign in to complete your purchase.</p>
            <Link href="/" style={{ background:"#2C1A0E", color:"#D4AF6A", padding:"13px 28px", fontSize:11, letterSpacing:2, textTransform:"uppercase", fontFamily:"'Jost',sans-serif", textDecoration:"none" }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  const items = cart?.items || [];

  return (
    <>
      <style>{styles}</style>
      <div className="co-root">
        <div className="co-inner">
          <Link href="/cart" className="co-back"><ArrowLeft size={14} /> Back to Cart</Link>
          <h1 className="co-heading">Secure <em>Checkout</em></h1>
          <div className="co-gold-line" />

          <div className="co-steps">
            {["Delivery Address","Payment","Confirmation"].map((s, i) => (
              <>
                <div key={i} className={`co-step${i === 0 ? " active" : ""}`}>
                  <div className="co-step-num">{i + 1}</div>
                  <span className="co-step-label">{s}</span>
                </div>
                {i < 2 && <div className="co-step-line" />}
              </>
            ))}
          </div>

          <div className="co-layout">
            <div>
              {error && <div className="co-error">⚠ {error}</div>}

              {/* Address */}
              <div className="co-section">
                <h2 className="co-section-title">Delivery Address <span>STEP 1</span></h2>
                <div className="co-row">
                  <div className="co-field"><label className="co-label">Full Name *</label>
                    <input className="co-input" placeholder="Aarav Sharma" value={addr.fullName} onChange={setA("fullName")} /></div>
                  <div className="co-field"><label className="co-label">Phone *</label>
                    <input className="co-input" placeholder="+91 98765 43210" value={addr.phone} onChange={setA("phone")} /></div>
                </div>
                <div className="co-row full">
                  <div className="co-field"><label className="co-label">Address Line 1 *</label>
                    <input className="co-input" placeholder="House / Flat no., Street" value={addr.line1} onChange={setA("line1")} /></div>
                </div>
                <div className="co-row full">
                  <div className="co-field"><label className="co-label">Address Line 2</label>
                    <input className="co-input" placeholder="Area, Landmark (optional)" value={addr.line2} onChange={setA("line2")} /></div>
                </div>
                <div className="co-row three">
                  <div className="co-field"><label className="co-label">City *</label>
                    <input className="co-input" placeholder="Mumbai" value={addr.city} onChange={setA("city")} /></div>
                  <div className="co-field"><label className="co-label">State *</label>
                    <select className="co-select" value={addr.state} onChange={setA("state")}>
                      <option value="">Select state</option>
                      {["Maharashtra","Gujarat","Delhi","Karnataka","Tamil Nadu","Madhya Pradesh","Rajasthan","West Bengal","Telangana","Kerala"].map(s =>
                        <option key={s}>{s}</option>)}
                    </select></div>
                  <div className="co-field"><label className="co-label">PIN Code *</label>
                    <input className="co-input" placeholder="400001" value={addr.pincode} onChange={setA("pincode")} /></div>
                </div>
              </div>

              {/* Payment */}
              <div className="co-section">
                <h2 className="co-section-title">Payment Method <span>STEP 2</span></h2>
                <div className="co-pay-opts">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className={`co-pay-opt${payMethod === pm.id ? " selected" : ""}`}
                      onClick={() => setPay(pm.id)}>
                      <input type="radio" readOnly checked={payMethod === pm.id} style={{ accentColor:"#B8862A" }} />
                      <span className="co-pay-opt-label">{pm.label}</span>
                      <span className="co-pay-opt-icons">{pm.icons}</span>
                    </div>
                  ))}
                </div>
                {payMethod === "card" && (
                  <div className="co-card-fields">
                    <div className="co-row full"><div className="co-field"><label className="co-label">Card Number</label>
                      <input className="co-input" placeholder="1234 5678 9012 3456" /></div></div>
                    <div className="co-row">
                      <div className="co-field"><label className="co-label">Expiry</label>
                        <input className="co-input" placeholder="MM / YY" /></div>
                      <div className="co-field"><label className="co-label">CVV</label>
                        <input className="co-input" placeholder="•••" /></div>
                    </div>
                  </div>
                )}
                {payMethod === "upi" && (
                  <div className="co-card-fields">
                    <div className="co-row full"><div className="co-field"><label className="co-label">UPI ID</label>
                      <input className="co-input" placeholder="yourname@upi" /></div></div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="co-summary">
              <h2 className="co-summary-title">Order Summary</h2>
              {items.map((item, i) => (
                <div key={i} className="co-summary-item">
                  <img src={item.product?.thumbnail || "https://picsum.photos/120/120?random=1"} className="co-summary-img" alt="" />
                  <div style={{ flex:1, minWidth:0 }}>
                    <p className="co-summary-item-name">{item.product?.name || item.name}</p>
                    <p className="co-summary-item-meta">Qty: {item.qty}{item.size ? ` · Size ${item.size}` : ""}</p>
                  </div>
                  <span className="co-summary-item-price">
                    {fmt((item.priceAtAdd || item.product?.price?.current || 0) * item.qty)}
                  </span>
                </div>
              ))}
              <div className="co-summary-rows">
                <div className="co-summary-row"><span>Subtotal</span><span>{fmt(totals?.subtotal)}</span></div>
                {(totals?.discount > 0) && <div className="co-summary-row" style={{ color:"#2e7d32" }}><span>Discount</span><span>−{fmt(totals.discount)}</span></div>}
                <div className="co-summary-row"><span>GST (3%)</span><span>{fmt(totals?.gst)}</span></div>
                <div className="co-summary-row"><span>Shipping</span><span style={{ color:"#2e7d32" }}>Free</span></div>
                <div className="co-summary-row total"><span>Total</span><span className="val">{fmt(totals?.total)}</span></div>
              </div>
              <button className="co-place-btn" onClick={placeOrder} disabled={placing || items.length === 0}>
                {placing ? <><Loader2 size={13} style={{ animation:"spin 1s linear infinite" }} /> Placing Order…</> : <><Lock size={13} /> Place Order</>}
              </button>
              <div className="co-secure"><ShieldCheck size={13} /> 100% Secure &amp; Encrypted</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
