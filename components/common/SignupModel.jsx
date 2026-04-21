"use client";
import React, { useState } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "../../lib/api";

const modalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  .sm-overlay{position:fixed;inset:0;background:rgba(20,10,5,0.65);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(4px);animation:sm-fade-in 0.2s ease;}
  @keyframes sm-fade-in{from{opacity:0}to{opacity:1}}
  .sm-box{width:860px;max-width:95vw;background:#fff;display:flex;border-radius:4px;overflow:hidden;box-shadow:0 30px 80px rgba(20,10,5,0.3);animation:sm-slide-up 0.3s ease;max-height:95vh;}
  @keyframes sm-slide-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .sm-left{flex:1;position:relative;min-height:480px;overflow:hidden;display:none;}
  @media(min-width:640px){.sm-left{display:block;}}
  .sm-left img{width:100%;height:100%;object-fit:cover;}
  .sm-left-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(44,26,14,0.85) 0%,transparent 50%);}
  .sm-left-text{position:absolute;bottom:30px;left:28px;right:28px;color:#FFFDF9;}
  .sm-left-tag{font-family:'Jost',sans-serif;font-size:10px;letter-spacing:2.5px;color:#D4AF6A;text-transform:uppercase;margin-bottom:8px;}
  .sm-left-quote{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;line-height:1.4;font-style:italic;}
  .sm-right{flex:1;padding:40px 36px;position:relative;overflow-y:auto;font-family:'Jost',sans-serif;}
  .sm-close{position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;color:#9E8875;transition:color 0.2s;padding:4px;}
  .sm-close:hover{color:#2C1A0E;}
  .sm-brand{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;letter-spacing:4px;color:#2C1A0E;text-transform:uppercase;margin-bottom:28px;display:block;}
  .sm-brand span{color:#B8862A;}
  .sm-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:400;color:#2C1A0E;margin-bottom:4px;}
  .sm-sub{font-size:12.5px;color:#8A7464;margin-bottom:28px;line-height:1.5;}
  .sm-divider{height:1px;background:linear-gradient(90deg,#E8DDD0,#D4AF6A 50%,#E8DDD0);margin-bottom:24px;}
  .sm-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
  .sm-field{display:flex;flex-direction:column;gap:5px;}
  .sm-field label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;}
  .sm-field input{border:none;border-bottom:1px solid #D4C4B0;padding:9px 0;font-size:14px;color:#2C1A0E;outline:none;transition:border-color 0.2s;font-family:'Jost',sans-serif;background:transparent;width:100%;}
  .sm-field input:focus{border-bottom-color:#B8862A;}
  .sm-phone-row{display:grid;grid-template-columns:70px 1fr;gap:12px;margin-bottom:14px;}
  .sm-err{background:#FAECE7;color:#993C1D;font-size:12px;padding:9px 13px;border-radius:2px;margin-bottom:14px;border:1px solid rgba(153,60,29,.2);}
  .sm-success{background:#EAF3DE;color:#2e7d32;font-size:12px;padding:9px 13px;border-radius:2px;margin-bottom:14px;}
  .sm-btn-primary{width:100%;background:#2C1A0E;color:#D4AF6A;border:none;padding:14px;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'Jost',sans-serif;margin-bottom:10px;}
  .sm-btn-primary:hover:not(:disabled){background:#4A3728;}
  .sm-btn-primary:disabled{opacity:.6;cursor:not-allowed;}
  .sm-btn-secondary{width:100%;background:transparent;border:1px solid #D4C4B0;color:#4A3728;padding:13px;font-size:11px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .2s;font-family:'Jost',sans-serif;}
  .sm-btn-secondary:hover{border-color:#B8862A;color:#B8862A;}
  .sm-otp-input{width:100%;border:none;border-bottom:2px solid #D4C4B0;padding:12px 0;font-size:22px;text-align:center;letter-spacing:12px;color:#2C1A0E;outline:none;font-family:'Jost',sans-serif;margin-bottom:24px;transition:border-color .2s;}
  .sm-otp-input:focus{border-bottom-color:#B8862A;}
  .sm-text-link{background:none;border:none;color:#B8862A;font-size:12px;cursor:pointer;text-decoration:underline;font-family:'Jost',sans-serif;}
  .sm-welcome{text-align:center;padding:20px 0;}
  .sm-welcome-icon{font-size:40px;margin-bottom:12px;}
  .sm-welcome-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#2C1A0E;margin-bottom:6px;}
  .sm-welcome-sub{font-size:13px;color:#9E8875;}
`;

const SignupModal = ({ onClose }) => {
  const { login, verifyOtp } = useAuth();
  const [step, setStep]       = useState("signup"); // signup | otp | login | success
  const [phone, setPhone]     = useState("");
  const [otp, setOtp]         = useState("");
  const [form, setForm]       = useState({ firstName:"", lastName:"", city:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) { setError("Please enter a valid 10-digit phone number"); return; }
    setError(""); setLoading(true);
    try {
      await authApi.sendOtp(phone);
      setStep("otp");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleRegister = async () => {
    if (!form.firstName || !phone) { setError("Please fill all required fields"); return; }
    setError(""); setLoading(true);
    try {
      await authApi.register({ ...form, phone });
      await authApi.sendOtp(phone);
      setStep("otp");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) { setError("Please enter the OTP"); return; }
    setError(""); setLoading(true);
    try {
      await verifyOtp(phone, otp);
      setStep("success");
      setTimeout(onClose, 1800);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{modalStyles}</style>
      <div className="sm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="sm-box">
          {/* Left image */}
          <div className="sm-left">
            <img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600" alt="jewellery" />
            <div className="sm-left-overlay" />
            <div className="sm-left-text">
              <p className="sm-left-tag">Since 1985</p>
              <p className="sm-left-quote">"Crafting timeless beauty, one jewel at a time."</p>
            </div>
          </div>

          {/* Right form */}
          <div className="sm-right">
            <button className="sm-close" onClick={onClose}><X size={18} /></button>
            <span className="sm-brand">MAN<span>A</span>S</span>

            {error && <div className="sm-err">⚠ {error}</div>}

            {/* ── SIGNUP ── */}
            {step === "signup" && (
              <>
                <h2 className="sm-title">Create Account</h2>
                <p className="sm-sub">Stay connected for exquisite designs and exclusive offers.</p>
                <div className="sm-divider" />
                <div className="sm-row">
                  <div className="sm-field"><label>First Name *</label><input placeholder="Aarav" value={form.firstName} onChange={set("firstName")} /></div>
                  <div className="sm-field"><label>Last Name *</label><input placeholder="Sharma" value={form.lastName} onChange={set("lastName")} /></div>
                </div>
                <div className="sm-phone-row">
                  <div className="sm-field"><label>Code</label><input value="+91" readOnly /></div>
                  <div className="sm-field"><label>Phone *</label><input placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                </div>
                <div className="sm-field" style={{ marginBottom:14 }}><label>City</label><input placeholder="Mumbai" value={form.city} onChange={set("city")} /></div>
                <button className="sm-btn-primary" onClick={handleRegister} disabled={loading}>
                  {loading ? <><Loader2 size={13} style={{ animation:"spin .8s linear infinite" }} /> Processing…</> : <>Get OTP to Proceed <ArrowRight size={13} /></>}
                </button>
                <button className="sm-btn-secondary" onClick={() => { setError(""); setStep("login"); }}>Already a Member? Log In</button>
              </>
            )}

            {/* ── OTP ── */}
            {step === "otp" && (
              <>
                <h2 className="sm-title">Verify OTP</h2>
                <p className="sm-sub">A 6-digit code has been sent to +91 {phone}</p>
                <div className="sm-divider" />
                <input type="text" maxLength={6} className="sm-otp-input" placeholder="● ● ● ● ● ●" value={otp} onChange={e => setOtp(e.target.value)} />
                <button className="sm-btn-primary" onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? <><Loader2 size={13} style={{ animation:"spin .8s linear infinite" }} /> Verifying…</> : <>Verify & Continue <ArrowRight size={13} /></>}
                </button>
                <div style={{ textAlign:"center", marginTop:12 }}>
                  <button className="sm-text-link" onClick={() => { setError(""); setStep("signup"); }}>← Change Number</button>
                </div>
              </>
            )}

            {/* ── LOGIN ── */}
            {step === "login" && (
              <>
                <h2 className="sm-title">Welcome Back</h2>
                <p className="sm-sub">Login with your registered phone number.</p>
                <div className="sm-divider" />
                <div className="sm-phone-row" style={{ marginBottom:22 }}>
                  <div className="sm-field"><label>Code</label><input value="+91" readOnly /></div>
                  <div className="sm-field"><label>Phone</label><input placeholder="98765 43210" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                </div>
                <button className="sm-btn-primary" onClick={handleSendOtp} disabled={loading}>
                  {loading ? <><Loader2 size={13} style={{ animation:"spin .8s linear infinite" }} /> Sending…</> : <>Get OTP <ArrowRight size={13} /></>}
                </button>
                <button className="sm-btn-secondary" style={{ marginTop:10 }} onClick={() => { setError(""); setStep("signup"); }}>Create New Account</button>
              </>
            )}

            {/* ── SUCCESS ── */}
            {step === "success" && (
              <div className="sm-welcome">
                <div className="sm-welcome-icon">✨</div>
                <h2 className="sm-welcome-title">Welcome to MANAS!</h2>
                <p className="sm-welcome-sub">You are now logged in. Redirecting…</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
};

export default SignupModal;
 