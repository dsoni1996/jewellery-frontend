"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ChevronDown, Check, Loader2, MessageSquare } from "lucide-react";

const FAQs = [
  { q: "What is BIS hallmarking and do all your products have it?",
    a: "BIS (Bureau of Indian Standards) hallmarking is a government certification that guarantees the purity of gold jewellery. Yes, every single piece at MANAS is BIS hallmarked — no exceptions. The hallmark includes the purity grade (22KT, 18KT, etc.), assay centre mark, and year of marking." },
  { q: "Can I exchange or return jewellery?",
    a: "Yes! We offer lifetime exchange on all gold jewellery at current gold rates. For returns, we accept unused pieces within 7 days with original packaging and bill. Diamond jewellery can be exchanged within 30 days." },
  { q: "Do you offer jewellery repair and cleaning services?",
    a: "Absolutely. We offer free cleaning for pieces bought at MANAS. Repair services are available at nominal charges. Just walk into any MANAS store with your original bill." },
  { q: "How long does home delivery take?",
    a: "We deliver across India. Standard delivery takes 5–7 business days. For bridal orders or customised pieces, please allow 15–21 days. All orders are fully insured and dispatched in tamper-proof packaging." },
  { q: "Can I get jewellery customised or engraved?",
    a: "Yes, we love customisation! You can personalise pieces with names, initials, or special dates. Engraving is available on most rings, bangles, and pendants. Visit any store or contact us to discuss your requirements." },
  { q: "Is my online payment secure?",
    a: "Completely. We use 256-bit SSL encryption and support all major payment methods — UPI, credit/debit cards, net banking, and 0% EMI on select cards. We never store your payment details." },
];

const STORES = [
  { city: "Indore (HQ)", address: "42, MG Road, Indore – 452001", phone: "+91 731 421 0000", hours: "10:30 AM – 9:00 PM" },
  { city: "Indore (Vijay Nagar)", address: "12, Scheme 54, Vijay Nagar, Indore – 452010", phone: "+91 731 421 0001", hours: "10:30 AM – 9:00 PM" },
];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.ct-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;}

/* Hero */
.ct-hero{background:#2C1A0E;padding:64px 40px;text-align:center;position:relative;overflow:hidden;}
.ct-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.05'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/svg%3E");}
.ct-hero-inner{position:relative;z-index:1;}
.ct-hero-tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#D4AF6A;margin-bottom:10px;display:block;}
.ct-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,5vw,62px);font-weight:300;color:#FFFDF9;margin-bottom:10px;}
.ct-hero-title em{font-style:italic;color:#D4AF6A;}
.ct-hero-sub{font-size:13px;color:#7A6352;font-weight:300;}
.ct-gold-line{height:2px;background:linear-gradient(90deg,transparent,#B8862A 20%,#E8C96A 50%,#B8862A 80%,transparent);}

/* Layout */
.ct-main{max-width:1100px;margin:0 auto;padding:64px 40px;}
@media(max-width:768px){.ct-main{padding:40px 16px;}}
.ct-grid{display:grid;grid-template-columns:1fr 380px;gap:40px;align-items:start;}
@media(max-width:900px){.ct-grid{grid-template-columns:1fr;}}

/* Form card */
.ct-form-card{background:#fff;border:1px solid #E8DDD0;border-radius:4px;padding:32px;}
.ct-form-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:#2C1A0E;margin-bottom:6px;}
.ct-form-title em{font-style:italic;color:#B8862A;}
.ct-form-sub{font-size:12.5px;color:#9E8875;margin-bottom:24px;font-weight:300;}
.ct-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.ct-form-row.full{grid-template-columns:1fr;}
@media(max-width:560px){.ct-form-row{grid-template-columns:1fr;}}
.ct-field{display:flex;flex-direction:column;gap:5px;}
.ct-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;}
.ct-input,.ct-select,.ct-textarea{border:1px solid #E8DDD0;padding:10px 13px;font-size:13px;color:#2C1A0E;font-family:'Jost',sans-serif;outline:none;border-radius:2px;transition:border-color .2s;background:#FFFDF9;width:100%;}
.ct-input:focus,.ct-select:focus,.ct-textarea:focus{border-color:#B8862A;}
.ct-textarea{resize:vertical;min-height:100px;}
.ct-submit{width:100%;background:#2C1A0E;color:#D4AF6A;border:none;padding:14px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;margin-top:6px;transition:background .2s;border-radius:2px;}
.ct-submit:hover:not(:disabled){background:#B8862A;color:#fff;}
.ct-submit:disabled{opacity:.6;cursor:not-allowed;}
.ct-success{background:#EAF3DE;border:1px solid rgba(46,125,50,.2);color:#2e7d32;padding:14px 16px;border-radius:2px;display:flex;align-items:center;gap:10px;font-size:13px;}

/* Right panel */
.ct-info-card{background:#fff;border:1px solid #E8DDD0;border-radius:4px;margin-bottom:16px;overflow:hidden;}
.ct-info-head{background:#2C1A0E;padding:14px 20px;}
.ct-info-head-title{font-family:'Cormorant Garamond',serif;font-size:17px;color:#D4AF6A;}
.ct-info-body{padding:16px 20px;}
.ct-info-row{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid #F5EDE3;}
.ct-info-row:last-child{border-bottom:none;}
.ct-info-icon{width:32px;height:32px;border-radius:50%;background:#FBF6EE;border:1px solid #E8D8C0;display:flex;align-items:center;justify-content:center;color:#B8862A;flex-shrink:0;}
.ct-info-label{font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;margin-bottom:3px;}
.ct-info-val{font-size:13px;color:#3D2B1A;line-height:1.5;}
.ct-map-placeholder{height:160px;background:#EDE4D8;display:flex;align-items:center;justify-content:center;border-top:1px solid #E8DDD0;}
.ct-map-text{font-size:12px;color:#9E8875;letter-spacing:1px;text-transform:uppercase;}

/* FAQ */
.ct-faq{margin-top:52px;}
.ct-faq-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:400;color:#2C1A0E;margin-bottom:6px;}
.ct-faq-title em{font-style:italic;color:#B8862A;}
.ct-faq-sub{font-size:13px;color:#9E8875;margin-bottom:32px;font-weight:300;}
.ct-faq-item{border:1px solid #E8DDD0;border-radius:3px;margin-bottom:10px;background:#fff;overflow:hidden;}
.ct-faq-q{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;cursor:pointer;gap:12px;transition:background .15s;}
.ct-faq-q:hover{background:#FBF6EE;}
.ct-faq-q.open{background:#FBF6EE;}
.ct-faq-q-text{font-size:14px;font-weight:500;color:#2C1A0E;flex:1;line-height:1.4;}
.ct-faq-chevron{color:#B8862A;flex-shrink:0;transition:transform .3s;}
.ct-faq-chevron.open{transform:rotate(180deg);}
.ct-faq-a{overflow:hidden;max-height:0;transition:max-height .35s ease;}
.ct-faq-a.open{max-height:300px;}
.ct-faq-a-inner{padding:0 20px 16px;font-size:13.5px;color:#7A6656;line-height:1.75;font-weight:300;border-top:1px solid #F0E8DC;}
.ct-spin{animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
`;

export default function ContactPage() {
  const [form,     setForm]     = useState({ name: "", phone: "", email: "", subject: "General Enquiry", message: "" });
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [openFaq,  setOpenFaq]  = useState(null);

  const sf = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200)); /* simulate API */
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <style>{S}</style>
      <div className="ct-root">

        <div className="ct-hero">
          <div className="ct-hero-inner">
            <span className="ct-hero-tag">We'd Love to Hear From You</span>
            <h1 className="ct-hero-title">Get in <em>Touch</em></h1>
            <p className="ct-hero-sub">Our team is available 7 days a week to answer your questions</p>
          </div>
        </div>
        <div className="ct-gold-line" />

        <div className="ct-main">
          <div className="ct-grid">
            {/* Form */}
            <div className="ct-form-card">
              <h2 className="ct-form-title">Send Us a <em>Message</em></h2>
              <p className="ct-form-sub">We respond within 24 hours on working days</p>

              {sent ? (
                <div className="ct-success">
                  <Check size={18} />
                  <div>
                    <p style={{ fontWeight: 500 }}>Message sent successfully!</p>
                    <p style={{ fontSize: 12, marginTop: 2, color: "#2e7d32" }}>We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="ct-form-row">
                    <div className="ct-field">
                      <label className="ct-label">Your Name *</label>
                      <input className="ct-input" value={form.name} onChange={sf("name")} placeholder="Aarav Sharma" required />
                    </div>
                    <div className="ct-field">
                      <label className="ct-label">Phone Number *</label>
                      <input className="ct-input" value={form.phone} onChange={sf("phone")} placeholder="+91 98765 43210" required />
                    </div>
                  </div>
                  <div className="ct-form-row full">
                    <div className="ct-field">
                      <label className="ct-label">Email Address</label>
                      <input className="ct-input" type="email" value={form.email} onChange={sf("email")} placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="ct-form-row full">
                    <div className="ct-field">
                      <label className="ct-label">Subject</label>
                      <select className="ct-select" value={form.subject} onChange={sf("subject")}>
                        {["General Enquiry","Product Query","Order Issue","Return / Exchange","Customisation","Store Visit","Other"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="ct-form-row full">
                    <div className="ct-field">
                      <label className="ct-label">Message *</label>
                      <textarea className="ct-textarea" value={form.message} onChange={sf("message")} placeholder="Tell us how we can help…" required />
                    </div>
                  </div>
                  <button type="submit" className="ct-submit" disabled={sending}>
                    {sending ? <><Loader2 size={14} className="ct-spin" /> Sending…</> : <><MessageSquare size={13} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div>
              <div className="ct-info-card">
                <div className="ct-info-head">
                  <p className="ct-info-head-title">Contact Details</p>
                </div>
                <div className="ct-info-body">
                  {[
                    { icon: Phone,   label: "Call Us",       val: "+91 731 421 0000\n+91 731 421 0001"    },
                    { icon: Mail,    label: "Email Us",       val: "care@manasjewellery.com"              },
                    { icon: Clock,   label: "Working Hours",  val: "Mon – Sun: 10:30 AM – 9:00 PM"       },
                  ].map((r, i) => (
                    <div key={i} className="ct-info-row">
                      <div className="ct-info-icon"><r.icon size={14} /></div>
                      <div>
                        <p className="ct-info-label">{r.label}</p>
                        <p className="ct-info-val">{r.val.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {STORES.map((store, i) => (
                <div key={i} className="ct-info-card">
                  <div className="ct-info-head">
                    <p className="ct-info-head-title">MANAS {store.city}</p>
                  </div>
                  <div className="ct-info-body">
                    <div className="ct-info-row">
                      <div className="ct-info-icon"><MapPin size={14} /></div>
                      <div>
                        <p className="ct-info-label">Address</p>
                        <p className="ct-info-val">{store.address}</p>
                      </div>
                    </div>
                    <div className="ct-info-row">
                      <div className="ct-info-icon"><Phone size={14} /></div>
                      <div>
                        <p className="ct-info-label">Phone</p>
                        <p className="ct-info-val">{store.phone}</p>
                      </div>
                    </div>
                    <div className="ct-info-row">
                      <div className="ct-info-icon"><Clock size={14} /></div>
                      <div>
                        <p className="ct-info-label">Hours</p>
                        <p className="ct-info-val">{store.hours}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ct-map-placeholder">
                    <p className="ct-map-text">📍 Map · {store.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="ct-faq">
            <h2 className="ct-faq-title">Frequently Asked <em>Questions</em></h2>
            <p className="ct-faq-sub">Answers to our most common questions</p>
            {FAQs.map((faq, i) => (
              <div key={i} className="ct-faq-item">
                <div className={`ct-faq-q${openFaq === i ? " open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <p className="ct-faq-q-text">{faq.q}</p>
                  <ChevronDown size={16} className={`ct-faq-chevron${openFaq === i ? " open" : ""}`} />
                </div>
                <div className={`ct-faq-a${openFaq === i ? " open" : ""}`}>
                  <p className="ct-faq-a-inner">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
