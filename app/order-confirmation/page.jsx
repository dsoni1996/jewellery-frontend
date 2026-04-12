import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .oc-root { background: #FAF6F0; min-height: 100vh; padding: 60px 0 80px; font-family: 'Jost', sans-serif; }
  .oc-inner { max-width: 720px; margin: 0 auto; padding: 0 24px; }

  /* Success banner */
  .oc-banner { background: #2C1A0E; border-radius: 4px; padding: 48px 40px; text-align: center; margin-bottom: 28px; position: relative; overflow: hidden; }
  .oc-banner::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.05'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/svg%3E"); }
  .oc-banner-content { position: relative; z-index: 1; }
  .oc-check { display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .oc-check-circle { width: 72px; height: 72px; background: rgba(184,134,42,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #B8862A; }
  .oc-banner-tag { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 12px; display: block; }
  .oc-banner-title { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 400; color: #FFFDF9; margin-bottom: 8px; }
  .oc-banner-title em { font-style: italic; color: #D4AF6A; }
  .oc-banner-sub { font-size: 13px; color: #9E8875; font-weight: 300; line-height: 1.6; }
  .oc-gold-line { height: 1px; background: rgba(212,175,106,0.3); margin: 20px 0; }

  .oc-order-num { font-size: 12px; color: #C8B89A; letter-spacing: 1px; }
  .oc-order-num strong { color: #D4AF6A; letter-spacing: 2px; }

  /* Card */
  .oc-card { background: #fff; border: 1px solid #E8DDD0; border-radius: 4px; padding: 24px; margin-bottom: 16px; }
  .oc-card-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: #2C1A0E; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid #F0E8DC; }

  /* Tracker */
  .oc-tracker { display: flex; align-items: flex-start; gap: 0; margin-bottom: 4px; }
  .oc-track-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .oc-track-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; border: 2px solid #E8DDD0; }
  .oc-track-icon.done { background: #2C1A0E; border-color: #2C1A0E; color: #D4AF6A; }
  .oc-track-icon.active { background: #FBF6EE; border-color: #B8862A; color: #B8862A; }
  .oc-track-icon.pending { background: #F5F0EA; color: #C4B4A4; }
  .oc-track-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: #9E8875; text-align: center; }
  .oc-track-label.done { color: #2C1A0E; font-weight: 500; }
  .oc-track-line { flex: 1; height: 2px; background: #E8DDD0; margin-top: 20px; align-self: flex-start; }
  .oc-track-line.done { background: #B8862A; }

  /* Items */
  .oc-item { display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid #F5EDE3; }
  .oc-item:last-child { border-bottom: none; }
  .oc-item-img { width: 64px; height: 64px; object-fit: cover; border-radius: 3px; background: #F5EDE3; flex-shrink: 0; }
  .oc-item-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; color: #2C1A0E; }
  .oc-item-meta { font-size: 11px; color: #9E8875; margin-top: 2px; }
  .oc-item-price { margin-left: auto; font-size: 14px; font-weight: 500; color: #2C1A0E; flex-shrink: 0; }

  /* Summary rows */
  .oc-sum-row { display: flex; justify-content: space-between; font-size: 13px; color: #6B5744; margin-bottom: 10px; }
  .oc-sum-row.total { font-size: 15px; font-weight: 500; color: #2C1A0E; padding-top: 12px; border-top: 1px solid #E8DDD0; }
  .oc-sum-row.total span:last-child { font-family: 'Cormorant Garamond', serif; font-size: 24px; }

  /* Address */
  .oc-address { font-size: 13px; color: #6B5744; line-height: 1.7; font-weight: 300; }
  .oc-address strong { color: #2C1A0E; font-weight: 500; display: block; margin-bottom: 4px; font-size: 14px; }

  /* Actions */
  .oc-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
  .oc-btn-primary { display: flex; align-items: center; justify-content: center; gap: 8px; background: #2C1A0E; color: #D4AF6A; padding: 14px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: background 0.2s; }
  .oc-btn-primary:hover { background: #B8862A; color: #fff; }
  .oc-btn-outline { display: flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid #D4C4B0; color: #4A3728; padding: 14px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all 0.2s; }
  .oc-btn-outline:hover { border-color: #B8862A; color: #B8862A; }
`;

const orderItems = [
  { id: 1, name: "Aakarshan Gold Necklace", meta: "22KT · 74.09g", price: 112732, img: "https://picsum.photos/120/120?random=11" },
  { id: 2, name: "Diamond Finger Ring", meta: "18KT VVS1 · 5.63g", price: 52697, img: "https://picsum.photos/120/120?random=22" },
];

const trackSteps = [
  { icon: CheckCircle, label: "Confirmed", status: "done" },
  { icon: Package, label: "Packed", status: "active" },
  { icon: Truck, label: "Shipped", status: "pending" },
  { icon: MapPin, label: "Delivered", status: "pending" },
];

export default function OrderConfirmationPage() {
  const subtotal = orderItems.reduce((s, it) => s + it.price, 0);
  const gst = Math.round(subtotal * 0.03);
  const total = subtotal + gst;

  return (
    <>
      <style>{styles}</style>
      <div className="oc-root">
        <div className="oc-inner">
          {/* Banner */}
          <div className="oc-banner">
            <div className="oc-banner-content">
              <div className="oc-check">
                <div className="oc-check-circle">
                  <CheckCircle size={36} color="#D4AF6A" />
                </div>
              </div>
              <span className="oc-banner-tag">Order Placed Successfully</span>
              <h1 className="oc-banner-title">Thank You, <em>Aarav!</em></h1>
              <div className="oc-gold-line" />
              <p className="oc-banner-sub">Your exquisite jewellery is being carefully prepared.<br />You will receive a confirmation on your registered email.</p>
              <p className="oc-order-num" style={{ marginTop: "16px" }}>Order ID: <strong>MANAS-2025-00847</strong></p>
            </div>
          </div>

          {/* Order Tracker */}
          <div className="oc-card">
            <h2 className="oc-card-title">Order Status</h2>
            <div className="oc-tracker">
              {trackSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <>
                    <div key={i} className="oc-track-step">
                      <div className={`oc-track-icon ${step.status}`}><Icon size={18} /></div>
                      <span className={`oc-track-label ${step.status}`}>{step.label}</span>
                    </div>
                    {i < trackSteps.length - 1 && <div className={`oc-track-line${step.status === "done" ? " done" : ""}`} />}
                  </>
                );
              })}
            </div>
            <p style={{ fontSize: "12px", color: "#9E8875", marginTop: "16px", textAlign: "center" }}>
              Estimated Delivery: <strong style={{ color: "#2C1A0E" }}>5 – 7 Business Days</strong>
            </p>
          </div>

          {/* Items */}
          <div className="oc-card">
            <h2 className="oc-card-title">Items Ordered</h2>
            {orderItems.map(it => (
              <div key={it.id} className="oc-item">
                <img src={it.img} alt={it.name} className="oc-item-img" />
                <div>
                  <p className="oc-item-name">{it.name}</p>
                  <p className="oc-item-meta">{it.meta}</p>
                </div>
                <span className="oc-item-price">₹ {it.price.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0E8DC" }}>
              <div className="oc-sum-row"><span>Subtotal</span><span>₹ {subtotal.toLocaleString("en-IN")}</span></div>
              <div className="oc-sum-row"><span>GST (3%)</span><span>₹ {gst.toLocaleString("en-IN")}</span></div>
              <div className="oc-sum-row"><span>Shipping</span><span style={{ color: "#2e7d32" }}>Free</span></div>
              <div className="oc-sum-row total"><span>Total Paid</span><span>₹ {total.toLocaleString("en-IN")}</span></div>
            </div>
          </div>

          {/* Address */}
          <div className="oc-card">
            <h2 className="oc-card-title">Delivery Address</h2>
            <p className="oc-address">
              <strong>Aarav Sharma</strong>
              42, Sunrise Apartments, MG Road<br />
              Indore, Madhya Pradesh – 452001<br />
              📞 +91 98765 43210
            </p>
          </div>

          {/* Actions */}
          <div className="oc-actions">
            <Link href="/listing" className="oc-btn-primary">Continue Shopping</Link>
            <Link href="/" className="oc-btn-outline">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
