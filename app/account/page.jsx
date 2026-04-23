"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, MapPin, ShoppingBag, Heart, LogOut,
  Edit2, Plus, Trash2, Check, Loader2,
  Phone, Mail, ChevronRight, Shield, Star,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi, orderApi, wishlistApi } from "../../lib/api";

/* ─── STYLES ─── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.ac-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;padding:52px 0 80px;}
.ac-inner{max-width:1100px;margin:0 auto;padding:0 40px;}
@media(max-width:768px){.ac-inner{padding:0 16px;}.ac-layout{grid-template-columns:1fr!important;}}

.ac-hero{margin-bottom:32px;}
.ac-page-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:400;color:#2C1A0E;margin-bottom:4px;}
.ac-page-title em{font-style:italic;color:#B8862A;}
.ac-page-sub{font-size:11px;color:#9E8875;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;}
.ac-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin-bottom:36px;}

.ac-layout{display:grid;grid-template-columns:230px 1fr;gap:22px;align-items:start;}

/* ── Sidebar ── */
.ac-sidebar{background:#fff;border:1px solid #E8DDD0;border-radius:4px;overflow:hidden;position:sticky;top:96px;}
.ac-user-head{background:#2C1A0E;padding:22px 20px 20px;position:relative;overflow:hidden;}
.ac-user-head::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.06'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/svg%3E");}
.ac-avatar{width:50px;height:50px;border-radius:50%;background:rgba(212,175,106,.18);border:2px solid rgba(212,175,106,.35);display:flex;align-items:center;justify-content:center;color:#D4AF6A;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;margin-bottom:10px;position:relative;z-index:1;}
.ac-user-name{font-size:14px;font-weight:500;color:#FFFDF9;margin-bottom:2px;position:relative;z-index:1;}
.ac-user-phone{font-size:11px;color:#7A6352;letter-spacing:.5px;position:relative;z-index:1;}
.ac-gold-strip{height:2px;background:linear-gradient(90deg,transparent,#B8862A 30%,#E8C96A 50%,#B8862A 70%,transparent);}
.ac-nav{padding:6px 0;}
.ac-nav-item{display:flex;align-items:center;gap:11px;padding:12px 20px;font-size:12.5px;color:#5A4535;cursor:pointer;border:none;border-bottom:1px solid #F5EDE3;transition:all .15s;text-decoration:none;letter-spacing:.3px;width:100%;background:none;outline:none;}
.ac-nav-item:last-of-type{border-bottom:none;}
.ac-nav-item:hover{background:#FBF6EE;color:#B8862A;}
.ac-nav-item.active{background:#FBF6EE;color:#B8862A;font-weight:500;}
.ac-nav-item.danger{color:#993C1D}
.ac-nav-item.danger:hover{background:#FAECE7;border-color:#F5EDE3;}
.ac-nav-badge{margin-left:auto;background:#2C1A0E;color:#D4AF6A;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:600;}

/* ── Cards ── */
.ac-card{background:#fff;border:1px solid #E8DDD0;border-radius:4px;margin-bottom:20px;}
.ac-card-head{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;border-bottom:1px solid #E8DDD0;flex-wrap:wrap;gap:10px;}
.ac-card-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#2C1A0E;}
.ac-card-title em{font-style:italic;color:#B8862A;}
.ac-card-body{padding:22px;}

/* ── Form elements ── */
.ac-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
.ac-form-grid.full{grid-template-columns:1fr;}
@media(max-width:600px){.ac-form-grid{grid-template-columns:1fr;}}
.ac-field{display:flex;flex-direction:column;gap:5px;}
.ac-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;}
.ac-input{border:1px solid #E8DDD0;padding:10px 13px;font-size:13px;color:#2C1A0E;font-family:'Jost',sans-serif;outline:none;border-radius:2px;transition:border-color .2s;background:#FFFDF9;width:100%;}
.ac-input:focus{border-color:#B8862A;}
.ac-input:disabled{background:#F5EDE3;color:#9E8875;cursor:not-allowed;}

/* ── Buttons ── */
.ac-btn-primary{display:inline-flex;align-items:center;gap:7px;background:#2C1A0E;color:#D4AF6A;border:none;padding:10px 22px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:background .2s;}
.ac-btn-primary:hover:not(:disabled){background:#B8862A;color:#fff;}
.ac-btn-primary:disabled{opacity:.6;cursor:not-allowed;}
.ac-btn-outline{display:inline-flex;align-items:center;gap:7px;background:none;border:1px solid #E8DDD0;padding:9px 18px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:2px;color:#5A4535;transition:all .2s;}
.ac-btn-outline:hover{border-color:#B8862A;color:#B8862A;}
.ac-btn-danger{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid rgba(153,60,29,.2);color:#993C1D;padding:8px 14px;font-family:'Jost',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s;}
.ac-btn-danger:hover{background:#FAECE7;border-color:#993C1D;}

/* ── Stats strip ── */
.ac-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
@media(max-width:600px){.ac-stats{grid-template-columns:1fr 1fr;}}
.ac-stat{background:#FBF6EE;border:1px solid #E8D8C0;border-radius:3px;padding:14px 16px;text-align:center;}
.ac-stat-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:400;color:#2C1A0E;}
.ac-stat-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;margin-top:3px;}

/* ── Address cards ── */
.ac-addr-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:600px){.ac-addr-grid{grid-template-columns:1fr;}}
.ac-addr-card{border:1px solid #E8DDD0;border-radius:3px;padding:16px;position:relative;background:#FFFDF9;transition:border-color .2s;}
.ac-addr-card.default{border-color:#B8862A;}
.ac-addr-card-label{font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#B8862A;margin-bottom:8px;display:flex;align-items:center;gap:6px;}
.ac-addr-name{font-size:13px;font-weight:500;color:#2C1A0E;margin-bottom:4px;}
.ac-addr-text{font-size:12.5px;color:#7A6656;line-height:1.6;font-weight:300;}
.ac-addr-phone{font-size:12px;color:#9E8875;margin-top:5px;}
.ac-addr-actions{display:flex;gap:8px;margin-top:12px;}
.ac-addr-add{border:1px dashed #D4C4B0;border-radius:3px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:all .2s;background:none;width:100%;font-family:'Jost',sans-serif;}
.ac-addr-add:hover{border-color:#B8862A;background:#FBF6EE;}
.ac-addr-add-icon{width:36px;height:36px;border-radius:50%;background:#FBF6EE;border:1px solid #E8D8C0;display:flex;align-items:center;justify-content:center;color:#B8862A;transition:background .2s;}
.ac-addr-add:hover .ac-addr-add-icon{background:#fff;}
.ac-addr-add-text{font-size:12px;color:#9E8875;letter-spacing:.5px;}

/* ── Order rows ── */
.ac-order-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #F5EDE3;}
.ac-order-row:last-child{border-bottom:none;}
.ac-order-img{width:52px;height:52px;object-fit:cover;border-radius:2px;background:#F5EDE3;flex-shrink:0;}
.ac-order-info{flex:1;min-width:0;}
.ac-order-num{font-size:12px;font-weight:500;color:#2C1A0E;font-family:monospace;}
.ac-order-date{font-size:11px;color:#9E8875;margin-top:1px;}
.ac-order-items{font-size:11.5px;color:#7A6656;margin-top:2px;}
.ac-order-right{text-align:right;flex-shrink:0;}
.ac-order-price{font-family:'Cormorant Garamond',serif;font-size:18px;color:#2C1A0E;}
.ac-status{display:inline-flex;align-items:center;padding:3px 9px;border-radius:2px;font-size:10px;font-weight:500;letter-spacing:.5px;text-transform:capitalize;margin-top:4px;}
.ac-status.delivered{background:#EAF3DE;color:#2e7d32;}
.ac-status.shipped{background:#E6F1FB;color:#185FA5;}
.ac-status.processing,.ac-status.confirmed{background:#FAEEDA;color:#854F0B;}
.ac-status.cancelled{background:#FAECE7;color:#993C1D;}

/* ── Address modal ── */
.ac-modal-overlay{position:fixed;inset:0;background:rgba(20,10,5,.52);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);}
.ac-modal{background:#FFFDF9;border-radius:4px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(20,10,5,.25);}
.ac-modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #E8DDD0;position:sticky;top:0;background:#FFFDF9;z-index:1;}
.ac-modal-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2C1A0E;}
.ac-modal-title em{font-style:italic;color:#B8862A;}
.ac-modal-close{background:none;border:none;cursor:pointer;color:#9E8875;display:flex;transition:color .2s;}
.ac-modal-close:hover{color:#2C1A0E;}
.ac-modal-body{padding:22px;}
.ac-modal-foot{padding:14px 22px;border-top:1px solid #E8DDD0;display:flex;justify-content:flex-end;gap:10px;}

/* ── Toast ── */
.ac-toast{position:fixed;bottom:28px;right:24px;background:#2C1A0E;color:#D4AF6A;padding:12px 22px;border-radius:3px;font-size:13px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,.2);z-index:200;animation:ac-toast-in .25s ease;font-family:'Jost',sans-serif;}
@keyframes ac-toast-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.ac-spin{animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
`;

const TABS = [
  { id: "profile",   label: "My Profile",   icon: User      },
  { id: "orders",    label: "My Orders",     icon: ShoppingBag },
  { id: "addresses", label: "Addresses",     icon: MapPin    },
  { id: "wishlist",  label: "Wishlist",      icon: Heart     },
  { id: "security",  label: "Security",      icon: Shield    },
];

const STATUS_MAP = {
  delivered: "delivered", shipped: "shipped",
  processing: "processing", confirmed: "confirmed", cancelled: "cancelled",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading, logout, refreshUser } = useAuth();

  const [tab,        setTab]        = useState("profile");
  const [editing,    setEditing]    = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [toast,      setToast]      = useState(null);
  const [form,       setForm]       = useState({ firstName: "", lastName: "", email: "" });
  const [orders,     setOrders]     = useState([]);
  const [ordersLoading, setOL]      = useState(false);
  const [wishlist,   setWishlist]   = useState([]);
  const [showAddrModal, setShowAddrModal] = useState(false);
  const [addrForm,   setAddrForm]   = useState({});
  const [addrSaving, setAddrSaving] = useState(false);

  /* redirect if not logged in */
  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.push("/");
  }, [authLoading, isLoggedIn]);

  /* sync form with user data */
  useEffect(() => {
    if (user) setForm({ firstName: user.firstName || "", lastName: user.lastName || "", email: user.email || "" });
  }, [user]);

  /* fetch orders when tab opens */
  useEffect(() => {
    if (tab === "orders" && orders.length === 0) {
      setOL(true);
      orderApi.getAll({ limit: 10 })
        .then(r => setOrders(r.orders || []))
        .catch(() => {})
        .finally(() => setOL(false));
    }
  }, [tab]);

  /* fetch wishlist when tab opens */
  useEffect(() => {
    if (tab === "wishlist") {
      wishlistApi.get()
        .then(r => setWishlist(r.wishlist || []))
        .catch(() => {});
    }
  }, [tab]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  /* Save profile */
  const saveProfile = async () => {
    setSaving(true);
    try {
      await authApi.updateMe(form);
      await refreshUser();
      setEditing(false);
      showToast("Profile updated ✓");
    } catch (e) {
      showToast("Could not save: " + e.message);
    } finally { setSaving(false); }
  };

  /* Add address */
  const saveAddress = async () => {
    if (!addrForm.fullName || !addrForm.line1 || !addrForm.city || !addrForm.pincode) {
      showToast("Please fill all required fields"); return;
    }
    setAddrSaving(true);
    try {
      await authApi.addAddress(addrForm);
      await refreshUser();
      setShowAddrModal(false);
      setAddrForm({});
      showToast("Address saved ✓");
    } catch (e) {
      showToast("Could not save address");
    } finally { setAddrSaving(false); }
  };

  /* Remove address */
  const removeAddress = async (id) => {
    if (!confirm("Remove this address?")) return;
    try {
      await authApi.removeAddress(id);
      await refreshUser();
      showToast("Address removed");
    } catch { showToast("Could not remove address"); }
  };

  /* Logout */
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const sf = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const af = (k) => (e) => setAddrForm(p => ({ ...p, [k]: e.target.value }));
  const fmt = (n) => "₹ " + (n || 0).toLocaleString("en-IN");
  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "U";

  if (authLoading || !user) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={28} className="ac-spin" style={{ color: "#B8862A" }} />
    </div>
  );

  return (
    <>
      <style>{S}</style>
      {toast && <div className="ac-toast"><Check size={14} /> {toast}</div>}

      {/* Address modal */}
      {showAddrModal && (
        <div className="ac-modal-overlay" onClick={e => e.target === e.currentTarget && setShowAddrModal(false)}>
          <div className="ac-modal">
            <div className="ac-modal-head">
              <span className="ac-modal-title">Add <em>Address</em></span>
              <button className="ac-modal-close" onClick={() => setShowAddrModal(false)}>✕</button>
            </div>
            <div className="ac-modal-body">
              <div className="ac-form-grid">
                <div className="ac-field">
                  <label className="ac-label">Full Name *</label>
                  <input className="ac-input" value={addrForm.fullName || ""} onChange={af("fullName")} placeholder="Aarav Sharma" />
                </div>
                <div className="ac-field">
                  <label className="ac-label">Phone *</label>
                  <input className="ac-input" value={addrForm.phone || ""} onChange={af("phone")} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="ac-form-grid full">
                <div className="ac-field">
                  <label className="ac-label">Address Line 1 *</label>
                  <input className="ac-input" value={addrForm.line1 || ""} onChange={af("line1")} placeholder="House / Flat no., Street" />
                </div>
              </div>
              <div className="ac-form-grid full">
                <div className="ac-field">
                  <label className="ac-label">Address Line 2</label>
                  <input className="ac-input" value={addrForm.line2 || ""} onChange={af("line2")} placeholder="Area, Landmark" />
                </div>
              </div>
              <div className="ac-form-grid">
                <div className="ac-field">
                  <label className="ac-label">City *</label>
                  <input className="ac-input" value={addrForm.city || ""} onChange={af("city")} placeholder="Mumbai" />
                </div>
                <div className="ac-field">
                  <label className="ac-label">PIN Code *</label>
                  <input className="ac-input" value={addrForm.pincode || ""} onChange={af("pincode")} placeholder="400001" />
                </div>
              </div>
              <div className="ac-form-grid">
                <div className="ac-field">
                  <label className="ac-label">State</label>
                  <input className="ac-input" value={addrForm.state || ""} onChange={af("state")} placeholder="Maharashtra" />
                </div>
                <div className="ac-field">
                  <label className="ac-label">Label</label>
                  <select className="ac-input" value={addrForm.label || "Home"} onChange={af("label")}>
                    <option>Home</option><option>Work</option><option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="ac-modal-foot">
              <button className="ac-btn-outline" onClick={() => setShowAddrModal(false)}>Cancel</button>
              <button className="ac-btn-primary" onClick={saveAddress} disabled={addrSaving}>
                {addrSaving ? <><Loader2 size={13} className="ac-spin" /> Saving…</> : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ac-root">
        <div className="ac-inner">
          <div className="ac-hero">
            <h1 className="ac-page-title">My <em>Account</em></h1>
            <p className="ac-page-sub">Welcome back, {user.firstName}</p>
          </div>
          <div className="ac-gold-line" />

          {/* Stats strip */}
          <div className="ac-stats">
            <div className="ac-stat">
              <p className="ac-stat-num">{orders.length || "—"}</p>
              <p className="ac-stat-label">Orders</p>
            </div>
            <div className="ac-stat">
              <p className="ac-stat-num">{user.wishlist?.length || 0}</p>
              <p className="ac-stat-label">Wishlist</p>
            </div>
            <div className="ac-stat">
              <p className="ac-stat-num">{user.addresses?.length || 0}</p>
              <p className="ac-stat-label">Addresses</p>
            </div>
          </div>

          <div className="ac-layout">
            {/* ── Sidebar ── */}
            <div className="ac-sidebar">
              <div className="ac-user-head">
                <div className="ac-avatar">{initials}</div>
                <p className="ac-user-name">{user.firstName} {user.lastName}</p>
                <p className="ac-user-phone">{user.phone}</p>
              </div>
              <div className="ac-gold-strip" />
              <nav className="ac-nav">
                {TABS.map(t => (
                  <button key={t.id} className={`ac-nav-item${tab === t.id ? " active" : ""}`}
                    onClick={() => setTab(t.id)}>
                    <t.icon size={14} />
                    {t.label}
                  </button>
                ))}
                <button className="ac-nav-item danger" onClick={handleLogout}>
                  <LogOut size={14} /> Log Out
                </button>
              </nav>
            </div>

            {/* ── Main content ── */}
            <div>

              {/* ─── PROFILE TAB ─── */}
              {tab === "profile" && (
                <div className="ac-card">
                  <div className="ac-card-head">
                    <span className="ac-card-title">Personal <em>Details</em></span>
                    {!editing && (
                      <button className="ac-btn-outline" onClick={() => setEditing(true)}>
                        <Edit2 size={12} /> Edit
                      </button>
                    )}
                  </div>
                  <div className="ac-card-body">
                    <div className="ac-form-grid">
                      <div className="ac-field">
                        <label className="ac-label">First Name</label>
                        <input className="ac-input" value={form.firstName} onChange={sf("firstName")} disabled={!editing} />
                      </div>
                      <div className="ac-field">
                        <label className="ac-label">Last Name</label>
                        <input className="ac-input" value={form.lastName} onChange={sf("lastName")} disabled={!editing} />
                      </div>
                    </div>
                    <div className="ac-form-grid">
                      <div className="ac-field">
                        <label className="ac-label">Phone Number</label>
                        <input className="ac-input" value={user.phone} disabled
                          style={{ display: "flex", alignItems: "center", gap: 6 }} />
                      </div>
                      <div className="ac-field">
                        <label className="ac-label">Email Address</label>
                        <input className="ac-input" value={form.email} onChange={sf("email")} disabled={!editing}
                          placeholder="your@email.com" />
                      </div>
                    </div>
                    {editing && (
                      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                        <button className="ac-btn-primary" onClick={saveProfile} disabled={saving}>
                          {saving ? <><Loader2 size={13} className="ac-spin" /> Saving…</> : <><Check size={13} /> Save Changes</>}
                        </button>
                        <button className="ac-btn-outline" onClick={() => { setEditing(false); setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email || "" }); }}>
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Verification status */}
                    <div style={{ marginTop: 24, padding: "14px 16px", background: user.isVerified ? "#EAF3DE" : "#FBF6EE", border: `1px solid ${user.isVerified ? "rgba(46,125,50,.2)" : "#E8D8C0"}`, borderRadius: 3, display: "flex", alignItems: "center", gap: 10 }}>
                      <Shield size={15} style={{ color: user.isVerified ? "#2e7d32" : "#B8862A", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: user.isVerified ? "#2e7d32" : "#2C1A0E" }}>
                          {user.isVerified ? "Account Verified ✓" : "Account Not Verified"}
                        </p>
                        <p style={{ fontSize: 11.5, color: "#9E8875", marginTop: 1 }}>
                          {user.isVerified ? "Your phone number is verified" : "Verify your phone to unlock all features"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── ORDERS TAB ─── */}
              {tab === "orders" && (
                <div className="ac-card">
                  <div className="ac-card-head">
                    <span className="ac-card-title">My <em>Orders</em></span>
                    <Link href="/track-order" style={{ fontSize: 11, color: "#B8862A", letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                      Track Order <ChevronRight size={12} />
                    </Link>
                  </div>
                  <div className="ac-card-body">
                    {ordersLoading ? (
                      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                        <Loader2 size={22} className="ac-spin" style={{ color: "#B8862A" }} />
                      </div>
                    ) : orders.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px 20px" }}>
                        <ShoppingBag size={36} style={{ color: "#D4C4B0", margin: "0 auto 12px" }} />
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#2C1A0E", marginBottom: 6 }}>No orders yet</p>
                        <p style={{ fontSize: 12.5, color: "#9E8875", marginBottom: 20 }}>Your order history will appear here</p>
                        <Link href="/listing" className="ac-btn-primary" style={{ textDecoration: "none" }}>Shop Now</Link>
                      </div>
                    ) : (
                      orders.map(o => (
                        <div key={o._id} className="ac-order-row">
                          <img src={o.items?.[0]?.image || "https://picsum.photos/52/52?random=1"} alt="" className="ac-order-img" />
                          <div className="ac-order-info">
                            <p className="ac-order-num">{o.orderNumber}</p>
                            <p className="ac-order-date">{new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                            <p className="ac-order-items">{o.items?.length} item{o.items?.length !== 1 ? "s" : ""}</p>
                          </div>
                          <div className="ac-order-right">
                            <p className="ac-order-price">{fmt(o.pricing?.total)}</p>
                            <span className={`ac-status ${STATUS_MAP[o.status] || "confirmed"}`}>{o.status}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ─── ADDRESSES TAB ─── */}
              {tab === "addresses" && (
                <div className="ac-card">
                  <div className="ac-card-head">
                    <span className="ac-card-title">Saved <em>Addresses</em></span>
                    <button className="ac-btn-outline" onClick={() => setShowAddrModal(true)}>
                      <Plus size={13} /> Add New
                    </button>
                  </div>
                  <div className="ac-card-body">
                    <div className="ac-addr-grid">
                      {(user.addresses || []).map((addr, i) => (
                        <div key={addr._id || i} className={`ac-addr-card${addr.isDefault ? " default" : ""}`}>
                          <p className="ac-addr-card-label">
                            <MapPin size={11} /> {addr.label || "Home"}
                            {addr.isDefault && <span style={{ marginLeft: "auto", fontSize: 9, background: "#B8862A", color: "#fff", padding: "1px 6px", borderRadius: 2 }}>DEFAULT</span>}
                          </p>
                          <p className="ac-addr-name">{addr.fullName}</p>
                          <p className="ac-addr-text">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />{addr.city}, {addr.state} – {addr.pincode}</p>
                          <p className="ac-addr-phone">{addr.phone}</p>
                          <div className="ac-addr-actions">
                            <button className="ac-btn-danger" onClick={() => removeAddress(addr._id)}>
                              <Trash2 size={11} /> Remove
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add button */}
                      <button className="ac-addr-add" onClick={() => setShowAddrModal(true)}>
                        <div className="ac-addr-add-icon"><Plus size={16} /></div>
                        <span className="ac-addr-add-text">Add New Address</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── WISHLIST TAB ─── */}
              {tab === "wishlist" && (
                <div className="ac-card">
                  <div className="ac-card-head">
                    <span className="ac-card-title">My <em>Wishlist</em></span>
                    <Link href="/wishlist" style={{ fontSize: 11, color: "#B8862A", letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none" }}>
                      View All →
                    </Link>
                  </div>
                  <div className="ac-card-body">
                    {wishlist.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px 20px" }}>
                        <Heart size={36} style={{ color: "#D4C4B0", margin: "0 auto 12px" }} />
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "#2C1A0E", marginBottom: 6 }}>Wishlist is empty</p>
                        <p style={{ fontSize: 12.5, color: "#9E8875", marginBottom: 20 }}>Save pieces you love for later</p>
                        <Link href="/listing" className="ac-btn-primary" style={{ textDecoration: "none" }}>Explore Jewellery</Link>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                        {wishlist.map(p => (
                          <Link key={p._id} href={`/product?slug=${p.slug}`} style={{ textDecoration: "none" }}>
                            <div style={{ border: "1px solid #EDE4D8", borderRadius: 3, overflow: "hidden", transition: "box-shadow .2s" }}>
                              <img src={p.thumbnail} alt={p.name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", background: "#F5EDE3" }} />
                              <div style={{ padding: "10px 12px" }}>
                                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "#2C1A0E", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                                <p style={{ fontSize: 14, fontWeight: 500, color: "#2C1A0E" }}>₹ {(p.price?.current || 0).toLocaleString("en-IN")}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SECURITY TAB ─── */}
              {tab === "security" && (
                <div className="ac-card">
                  <div className="ac-card-head">
                    <span className="ac-card-title">Account <em>Security</em></span>
                  </div>
                  <div className="ac-card-body">
                    {[
                      { label: "Phone Number", value: user.phone, icon: Phone, verified: true },
                      { label: "Email Address", value: user.email || "Not added", icon: Mail, verified: !!user.email },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: i === 0 ? "1px solid #F5EDE3" : "none" }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FBF6EE", border: "1px solid #E8D8C0", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8862A", flexShrink: 0 }}>
                          <item.icon size={16} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#9E8875", marginBottom: 3 }}>{item.label}</p>
                          <p style={{ fontSize: 13.5, color: "#2C1A0E" }}>{item.value}</p>
                        </div>
                        <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 2, background: item.verified ? "#EAF3DE" : "#F5EDE3", color: item.verified ? "#2e7d32" : "#9E8875" }}>
                          {item.verified ? "Verified" : "Not set"}
                        </span>
                      </div>
                    ))}

                    <div style={{ marginTop: 24, padding: "16px", background: "#FAECE7", border: "1px solid rgba(153,60,29,.15)", borderRadius: 3 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#993C1D", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <LogOut size={13} /> Danger Zone
                      </p>
                      <p style={{ fontSize: 12, color: "#7A6656", marginBottom: 14 }}>Log out from all devices or delete your account.</p>
                      <button className="ac-btn-danger" onClick={handleLogout}>
                        <LogOut size={12} /> Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
