"use client";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Clock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { orderApi } from "../../lib/api";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.to-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;padding:52px 0 80px;}
.to-inner{max-width:760px;margin:0 auto;padding:0 40px;}
@media(max-width:768px){.to-inner{padding:0 16px;}}
.to-back{display:inline-flex;align-items:center;gap:7px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;text-decoration:none;margin-bottom:32px;transition:color .2s;}
.to-back:hover{color:#B8862A;}
.to-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:400;color:#2C1A0E;margin-bottom:4px;}
.to-title em{font-style:italic;color:#B8862A;}
.to-sub{font-size:11px;color:#9E8875;letter-spacing:1px;margin-bottom:28px;}
.to-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin-bottom:36px;}
/* Search form */
.to-form{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:28px;margin-bottom:28px;}
.to-form-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2C1A0E;margin-bottom:18px;}
.to-input-row{display:flex;gap:10px;}
.to-input{flex:1;border:1px solid #E8DDD0;padding:12px 16px;font-size:13.5px;color:#2C1A0E;font-family:'Jost',sans-serif;outline:none;border-radius:2px;transition:border-color .2s;background:#FFFDF9;}
.to-input:focus{border-color:#B8862A;}
.to-search-btn{background:#2C1A0E;color:#D4AF6A;border:none;padding:12px 22px;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:2px;display:flex;align-items:center;gap:8px;white-space:nowrap;transition:background .2s;}
.to-search-btn:hover:not(:disabled){background:#B8862A;color:#fff;}
.to-search-btn:disabled{opacity:.6;cursor:not-allowed;}
.to-error{background:#FAECE7;border:1px solid rgba(153,60,29,.2);color:#993C1D;padding:12px 16px;border-radius:2px;font-size:13px;margin-top:12px;}
/* Order result */
.to-result{background:#fff;border:1px solid #E8DDD0;border-radius:4px;overflow:hidden;}
.to-result-head{background:#2C1A0E;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.to-order-num{font-family:'Cormorant Garamond',serif;font-size:22px;color:#FFFDF9;}
.to-order-num em{font-style:italic;color:#D4AF6A;}
.to-status-pill{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:2px;font-weight:500;}
.to-status-pill.delivered{background:#EAF3DE;color:#2e7d32;}
.to-status-pill.shipped,.to-status-pill.out_for_delivery{background:#E6F1FB;color:#185FA5;}
.to-status-pill.processing,.to-status-pill.confirmed,.to-status-pill.packed{background:#FAEEDA;color:#854F0B;}
.to-status-pill.cancelled{background:#FAECE7;color:#993C1D;}
.to-result-body{padding:24px;}
/* Tracker */
.to-tracker{margin-bottom:28px;}
.to-tracker-title{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:18px;}
.to-steps{display:flex;align-items:flex-start;gap:0;position:relative;}
.to-steps::before{content:'';position:absolute;top:18px;left:18px;right:18px;height:1px;background:#E8DDD0;z-index:0;}
.to-step{display:flex;flex-direction:column;align-items:center;flex:1;position:relative;z-index:1;}
.to-step-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:10px;border:2px solid #E8DDD0;background:#FFFDF9;flex-shrink:0;transition:all .3s;}
.to-step-dot.done{background:#2C1A0E;border-color:#2C1A0E;color:#D4AF6A;}
.to-step-dot.active{background:#B8862A;border-color:#B8862A;color:#fff;}
.to-step-dot.pending{background:#F5EDE3;border-color:#E8DDD0;color:#C4B4A4;}
.to-step-label{font-size:10px;letter-spacing:.5px;text-transform:uppercase;color:#9E8875;text-align:center;line-height:1.4;}
.to-step-label.done{color:#2C1A0E;font-weight:500;}
.to-step-label.active{color:#B8862A;font-weight:500;}
/* Info grid */
.to-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px;}
@media(max-width:560px){.to-info-grid{grid-template-columns:1fr;}}
.to-info-box{background:#FBF6EE;border:1px solid #E8D8C0;border-radius:3px;padding:14px 16px;}
.to-info-box-label{font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:8px;}
.to-info-val{font-size:13px;color:#2C1A0E;line-height:1.6;}
.to-info-val strong{font-weight:500;}
/* Items */
.to-items-title{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:14px;}
.to-item-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F5EDE3;}
.to-item-row:last-child{border-bottom:none;}
.to-item-img{width:52px;height:52px;object-fit:cover;border-radius:2px;background:#F5EDE3;flex-shrink:0;}
.to-item-name{font-size:13px;font-weight:500;color:#2C1A0E;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.to-item-qty{font-size:11.5px;color:#9E8875;margin-top:2px;}
.to-item-price{font-family:'Cormorant Garamond',serif;font-size:17px;color:#2C1A0E;flex-shrink:0;}
/* Timeline */
.to-timeline{margin-top:20px;}
.to-timeline-title{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:14px;}
.to-tl-row{display:flex;gap:14px;align-items:flex-start;margin-bottom:0;}
.to-tl-left{display:flex;flex-direction:column;align-items:center;flex-shrink:0;}
.to-tl-dot{width:10px;height:10px;border-radius:50%;background:#B8862A;flex-shrink:0;margin-top:4px;}
.to-tl-line{width:1px;height:24px;background:#E8DDD0;}
.to-tl-row:last-child .to-tl-line{display:none;}
.to-tl-status{font-size:12.5px;font-weight:500;color:#2C1A0E;text-transform:capitalize;}
.to-tl-msg{font-size:11.5px;color:#7A6656;margin-top:1px;}
.to-tl-time{font-size:11px;color:#B0A090;margin-top:1px;}
.ac-spin{animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
`;

const TRACK_STEPS = [
  { key: ["confirmed","processing"], label: "Confirmed", icon: CheckCircle },
  { key: ["packed"],                  label: "Packed",    icon: Package     },
  { key: ["shipped"],                 label: "Shipped",   icon: Truck       },
  { key: ["out_for_delivery"],        label: "Out for\nDelivery", icon: MapPin },
  { key: ["delivered"],               label: "Delivered", icon: CheckCircle },
];

function getStepState(stepKeys, orderStatus) {
  const order = ["confirmed","processing","packed","shipped","out_for_delivery","delivered","cancelled"];
  const orderIdx = order.indexOf(orderStatus);
  const stepMaxIdx = Math.max(...stepKeys.map(k => order.indexOf(k)));
  if (orderStatus === "cancelled") return "pending";
  if (orderIdx > stepMaxIdx) return "done";
  if (stepKeys.includes(orderStatus)) return "active";
  return "pending";
}

export default function TrackOrderPage() {
  const [orderNum,  setOrderNum]  = useState("");
  const [order,     setOrder]     = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const search = async (e) => {
    e.preventDefault();
    if (!orderNum.trim()) return;
    setLoading(true); setError(""); setOrder(null);
    try {
      const { order: o } = await orderApi.getOne(orderNum.trim().toUpperCase());
      setOrder(o);
    } catch (err) {
      setError(err.message?.includes("not found") ? `Order "${orderNum.toUpperCase()}" not found. Check the order number and try again.` : "Could not fetch order. Please try again.");
    } finally { setLoading(false); }
  };

  const fmt = n => "₹ " + (n || 0).toLocaleString("en-IN");
  const fmtDate = d => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <style>{S}</style>
      <div className="to-root">
        <div className="to-inner">
          <Link href="/account" className="to-back"><ArrowLeft size={13} /> My Account</Link>
          <h1 className="to-title">Track My <em>Order</em></h1>
          <p className="to-sub">Enter your order number to see live status</p>
          <div className="to-gold-line" />

          {/* Search form */}
          <div className="to-form">
            <p className="to-form-title">Order Number</p>
            <form onSubmit={search}>
              <div className="to-input-row">
                <input
                  className="to-input"
                  placeholder="e.g. MANAS-2025-00028"
                  value={orderNum}
                  onChange={e => setOrderNum(e.target.value)}
                />
                <button type="submit" className="to-search-btn" disabled={loading}>
                  {loading ? <Loader2 size={14} className="ac-spin" /> : <><Search size={13} /> Track</>}
                </button>
              </div>
            </form>
            {error && <div className="to-error">{error}</div>}
          </div>

          {/* Order result */}
          {order && (
            <div className="to-result">
              {/* Header */}
              <div className="to-result-head">
                <div>
                  <p style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginBottom: 4 }}>Order</p>
                  <p className="to-order-num"><em>{order.orderNumber}</em></p>
                </div>
                <span className={`to-status-pill ${order.status}`}>{order.status?.replace(/_/g, " ")}</span>
              </div>

              <div className="to-result-body">
                {/* Step tracker */}
                <div className="to-tracker">
                  <p className="to-tracker-title">Delivery Progress</p>
                  <div className="to-steps">
                    {TRACK_STEPS.map((step, i) => {
                      const state = getStepState(step.key, order.status);
                      const Icon = step.icon;
                      return (
                        <div key={i} className="to-step">
                          <div className={`to-step-dot ${state}`}>
                            <Icon size={16} />
                          </div>
                          <p className={`to-step-label ${state}`}>
                            {step.label.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Info grid */}
                <div className="to-info-grid">
                  <div className="to-info-box">
                    <p className="to-info-box-label">Estimated Delivery</p>
                    <p className="to-info-val">
                      <strong>{order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "2-digit", month: "long" }) : "5–7 business days"}</strong>
                    </p>
                  </div>
                  <div className="to-info-box">
                    <p className="to-info-box-label">Tracking Number</p>
                    <p className="to-info-val">
                      <strong>{order.trackingNumber || "Will be updated when shipped"}</strong>
                    </p>
                  </div>
                  <div className="to-info-box">
                    <p className="to-info-box-label">Delivery Address</p>
                    <p className="to-info-val" style={{ fontSize: 12 }}>
                      {order.shippingAddress?.fullName}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.state}
                    </p>
                  </div>
                  <div className="to-info-box">
                    <p className="to-info-box-label">Order Total</p>
                    <p className="to-info-val"><strong style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>{fmt(order.pricing?.total)}</strong></p>
                  </div>
                </div>

                {/* Items */}
                <p className="to-items-title">Items in this Order</p>
                {order.items?.map((item, i) => (
                  <div key={i} className="to-item-row">
                    <img src={item.image} alt={item.name} className="to-item-img" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="to-item-name">{item.name}</p>
                      <p className="to-item-qty">Qty: {item.qty}{item.size ? ` · Size: ${item.size}` : ""}</p>
                    </div>
                    <span className="to-item-price">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}

                {/* Tracking timeline */}
                {order.tracking?.length > 0 && (
                  <div className="to-timeline">
                    <p className="to-timeline-title">Tracking History</p>
                    {order.tracking.slice().reverse().map((t, i) => (
                      <div key={i} className="to-tl-row">
                        <div className="to-tl-left">
                          <div className="to-tl-dot" />
                          <div className="to-tl-line" />
                        </div>
                        <div style={{ paddingBottom: 20 }}>
                          <p className="to-tl-status">{t.status?.replace(/_/g, " ")}</p>
                          {t.message && <p className="to-tl-msg">{t.message}</p>}
                          {t.location && <p className="to-tl-msg">📍 {t.location}</p>}
                          <p className="to-tl-time">{fmtDate(t.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
