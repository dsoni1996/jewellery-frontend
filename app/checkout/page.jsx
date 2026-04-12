"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ShieldCheck, Lock } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .co-root { background: #FAF6F0; min-height: 100vh; padding: 40px 0 80px; font-family: 'Jost', sans-serif; }
  .co-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
  @media (max-width: 768px) { .co-inner { padding: 0 16px; } }
  .co-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #9E8875; text-decoration: none; margin-bottom: 32px; transition: color 0.2s; }
  .co-back:hover { color: #B8862A; }
  .co-heading { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 400; color: #2C1A0E; margin-bottom: 4px; }
  .co-heading em { font-style: italic; color: #B8862A; }
  .co-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #D4AF6A 50%, transparent); margin: 20px 0 36px; }

  /* Stepper */
  .co-steps { display: flex; align-items: center; gap: 0; margin-bottom: 40px; }
  .co-step { display: flex; align-items: center; gap: 8px; }
  .co-step-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; border: 2px solid #E8DDD0; color: #9E8875; transition: all 0.3s; flex-shrink: 0; }
  .co-step.active .co-step-num { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .co-step.done .co-step-num { background: #B8862A; border-color: #B8862A; color: #fff; }
  .co-step-label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #9E8875; }
  .co-step.active .co-step-label { color: #2C1A0E; font-weight: 500; }
  .co-step-line { flex: 1; height: 1px; background: #E8DDD0; margin: 0 12px; }

  /* Layout */
  .co-layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
  @media (max-width: 900px) { .co-layout { grid-template-columns: 1fr; } }

  /* Form sections */
  .co-section { background: #fff; border: 1px solid #E8DDD0; border-radius: 4px; padding: 28px; margin-bottom: 16px; }
  .co-section-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #2C1A0E; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
  .co-section-title span { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; color: #B8862A; background: #FBF6EE; padding: 3px 9px; border: 1px solid #E8D8C0; border-radius: 2px; }
  .co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .co-row.full { grid-template-columns: 1fr; }
  .co-row.three { grid-template-columns: 1fr 1fr 1fr; }
  .co-field { display: flex; flex-direction: column; gap: 6px; }
  .co-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #9E8875; }
  .co-input { border: 1px solid #E8DDD0; padding: 11px 14px; font-size: 13px; color: #2C1A0E; font-family: 'Jost', sans-serif; outline: none; border-radius: 2px; transition: border-color 0.2s; background: #FFFDF9; }
  .co-input:focus { border-color: #B8862A; }
  .co-select { border: 1px solid #E8DDD0; padding: 11px 14px; font-size: 13px; color: #2C1A0E; font-family: 'Jost', sans-serif; outline: none; border-radius: 2px; background: #FFFDF9; cursor: pointer; appearance: none; }

  /* Payment options */
  .co-pay-opts { display: flex; flex-direction: column; gap: 10px; }
  .co-pay-opt { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 2px solid #E8DDD0; border-radius: 3px; cursor: pointer; transition: border-color 0.2s; }
  .co-pay-opt.selected { border-color: #B8862A; background: #FBF6EE; }
  .co-pay-opt input[type=radio] { accent-color: #B8862A; width: 16px; height: 16px; }
  .co-pay-opt-label { font-size: 13px; color: #3D2B1A; font-weight: 500; flex: 1; }
  .co-pay-opt-icons { font-size: 11px; color: #9E8875; }

  /* Card fields */
  .co-card-fields { margin-top: 16px; padding-top: 16px; border-top: 1px solid #F0E8DC; }

  /* Order Summary */
  .co-summary { background: #fff; border: 1px solid #E8DDD0; border-radius: 4px; padding: 24px; position: sticky; top: 120px; }
  .co-summary-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #2C1A0E; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #E8DDD0; }
  .co-summary-item { display: flex; gap: 12px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #F5EDE3; }
  .co-summary-item:last-of-type { border-bottom: none; }
  .co-summary-img { width: 60px; height: 60px; object-fit: cover; border-radius: 3px; background: #F5EDE3; flex-shrink: 0; }
  .co-summary-item-info { min-width: 0; }
  .co-summary-item-name { font-size: 13px; color: #2C1A0E; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .co-summary-item-meta { font-size: 11px; color: #9E8875; margin-top: 2px; }
  .co-summary-item-price { font-size: 13px; font-weight: 500; color: #2C1A0E; margin-left: auto; flex-shrink: 0; }
  .co-summary-rows { margin-top: 16px; }
  .co-summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #6B5744; margin-bottom: 10px; }
  .co-summary-row.total { font-size: 15px; font-weight: 500; color: #2C1A0E; padding-top: 14px; border-top: 1px solid #E8DDD0; }
  .co-summary-row.total .val { font-family: 'Cormorant Garamond', serif; font-size: 24px; }
  .co-place-btn { width: 100%; background: #2C1A0E; color: #D4AF6A; border: none; padding: 16px; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s; }
  .co-place-btn:hover { background: #B8862A; color: #fff; }
  .co-secure { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 12px; font-size: 11px; color: #9E8875; }
`;

const cartItems = [
  { id: 1, name: "Aakarshan Gold Necklace", meta: "22KT · 74.09g", price: 112732, img: "https://picsum.photos/120/120?random=11" },
  { id: 2, name: "Diamond Finger Ring", meta: "18KT VVS1 · 5.63g", price: 52697, img: "https://picsum.photos/120/120?random=22" },
];

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icons: "Visa · MC · Amex" },
  { id: "upi", label: "UPI Payment", icons: "GPay · PhonePe · Paytm" },
  { id: "netbanking", label: "Net Banking", icons: "All major banks" },
  { id: "emi", label: "EMI (No Cost)", icons: "6 / 9 / 12 months" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1); // 1=address 2=payment
  const [selectedPay, setSelectedPay] = useState("card");

  const subtotal = cartItems.reduce((s, it) => s + it.price, 0);
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + gst;

  return (
    <>
      <style>{styles}</style>
      <div className="co-root">
        <div className="co-inner">
          <Link href="/cart" className="co-back"><ArrowLeft size={14} /> Back to Cart</Link>
          <h1 className="co-heading">Secure <em>Checkout</em></h1>
          <div className="co-gold-line" />

          {/* Steps */}
          <div className="co-steps">
            {["Delivery Address", "Payment", "Confirmation"].map((s, i) => (
              <>
                <div key={i} className={`co-step${step === i + 1 ? " active" : step > i + 1 ? " done" : ""}`}>
                  <div className="co-step-num">{step > i + 1 ? "✓" : i + 1}</div>
                  <span className="co-step-label">{s}</span>
                </div>
                {i < 2 && <div className="co-step-line" />}
              </>
            ))}
          </div>

          <div className="co-layout">
            {/* Left */}
            <div>
              {/* Address */}
              <div className="co-section">
                <h2 className="co-section-title">Delivery Address <span>STEP 1</span></h2>
                <div className="co-row">
                  <div className="co-field"><label className="co-label">First Name *</label><input className="co-input" placeholder="Aarav" /></div>
                  <div className="co-field"><label className="co-label">Last Name *</label><input className="co-input" placeholder="Sharma" /></div>
                </div>
                <div className="co-row full">
                  <div className="co-field"><label className="co-label">Address Line 1 *</label><input className="co-input" placeholder="House / Flat no., Street" /></div>
                </div>
                <div className="co-row full">
                  <div className="co-field"><label className="co-label">Address Line 2</label><input className="co-input" placeholder="Area, Landmark" /></div>
                </div>
                <div className="co-row three">
                  <div className="co-field"><label className="co-label">City *</label><input className="co-input" placeholder="Mumbai" /></div>
                  <div className="co-field"><label className="co-label">State *</label>
                    <select className="co-select">
                      {["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Tamil Nadu", "Madhya Pradesh"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="co-field"><label className="co-label">PIN Code *</label><input className="co-input" placeholder="400001" /></div>
                </div>
                <div className="co-row">
                  <div className="co-field"><label className="co-label">Phone Number *</label><input className="co-input" placeholder="+91 98765 43210" /></div>
                  <div className="co-field"><label className="co-label">Email</label><input className="co-input" placeholder="you@email.com" /></div>
                </div>
              </div>

              {/* Payment */}
              <div className="co-section">
                <h2 className="co-section-title">Payment Method <span>STEP 2</span></h2>
                <div className="co-pay-opts">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className={`co-pay-opt${selectedPay === pm.id ? " selected" : ""}`} onClick={() => setSelectedPay(pm.id)}>
                      <input type="radio" readOnly checked={selectedPay === pm.id} />
                      <span className="co-pay-opt-label">{pm.label}</span>
                      <span className="co-pay-opt-icons">{pm.icons}</span>
                    </div>
                  ))}
                </div>
                {selectedPay === "card" && (
                  <div className="co-card-fields">
                    <div className="co-row full"><div className="co-field"><label className="co-label">Card Number</label><input className="co-input" placeholder="1234 5678 9012 3456" /></div></div>
                    <div className="co-row">
                      <div className="co-field"><label className="co-label">Expiry Date</label><input className="co-input" placeholder="MM / YY" /></div>
                      <div className="co-field"><label className="co-label">CVV</label><input className="co-input" placeholder="•••" /></div>
                    </div>
                    <div className="co-row full"><div className="co-field"><label className="co-label">Name on Card</label><input className="co-input" placeholder="AARAV SHARMA" /></div></div>
                  </div>
                )}
                {selectedPay === "upi" && (
                  <div className="co-card-fields">
                    <div className="co-row full"><div className="co-field"><label className="co-label">UPI ID</label><input className="co-input" placeholder="yourname@upi" /></div></div>
                  </div>
                )}
              </div>
            </div>

            {/* Right — order summary */}
            <div className="co-summary">
              <h2 className="co-summary-title">Order Summary</h2>
              {cartItems.map(it => (
                <div key={it.id} className="co-summary-item">
                  <img src={it.img} className="co-summary-img" alt={it.name} />
                  <div className="co-summary-item-info">
                    <p className="co-summary-item-name">{it.name}</p>
                    <p className="co-summary-item-meta">{it.meta}</p>
                  </div>
                  <span className="co-summary-item-price">₹ {it.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
              <div className="co-summary-rows">
                <div className="co-summary-row"><span>Subtotal</span><span>₹ {subtotal.toLocaleString("en-IN")}</span></div>
                <div className="co-summary-row"><span>GST (3%)</span><span>₹ {gst.toLocaleString("en-IN")}</span></div>
                <div className="co-summary-row"><span>Shipping</span><span style={{ color: "#2e7d32" }}>Free</span></div>
                <div className="co-summary-row total"><span>Total</span><span className="val">₹ {total.toLocaleString("en-IN")}</span></div>
              </div>
              <Link href="/order-confirmation" className="co-place-btn">
                <Lock size={13} /> Place Order
              </Link>
              <div className="co-secure"><ShieldCheck size={13} /> 100% Secure &amp; Encrypted</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
