"use client";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
.nl-root { background: #2C1A0E; padding: 60px 40px; text-align: center; position: relative; overflow: hidden; }
.nl-root::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.04'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3C/g%3E%3C/svg%3E"); }
.nl-inner { position: relative; z-index: 1; max-width: 560px; margin: 0 auto; }
.nl-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(184,134,42,0.15); border: 1px solid rgba(184,134,42,0.3); display: flex; align-items: center; justify-content: center; color: #D4AF6A; margin: 0 auto 18px; }
.nl-tag { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 10px; display: block; }
.nl-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #FFFDF9; margin-bottom: 8px; }
.nl-title em { font-style: italic; color: #D4AF6A; }
.nl-sub { font-size: 13px; color: #9E8875; font-weight: 300; margin-bottom: 28px; line-height: 1.6; }
.nl-form { display: flex; gap: 0; max-width: 420px; margin: 0 auto; }
.nl-input { flex: 1; border: 1px solid rgba(212,175,106,0.3); background: rgba(255,255,255,0.05); color: #FFFDF9; padding: 13px 18px; font-family: 'Jost', sans-serif; font-size: 13px; outline: none; transition: border-color .2s; border-radius: 0; }
.nl-input::placeholder { color: rgba(255,255,255,0.3); }
.nl-input:focus { border-color: #D4AF6A; }
.nl-btn { background: #B8862A; color: #fff; border: none; padding: 13px 22px; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background .2s; white-space: nowrap; }
.nl-btn:hover { background: #D4AF6A; color: #2C1A0E; }
.nl-success { font-size: 13px; color: #D4AF6A; margin-top: 12px; }
.nl-offer { display: inline-block; margin-top: 16px; font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; }
`;

export default function NewsletterBanner({ settings = {} }) {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const offerText = settings.offerText || "Get 5% off your first order";

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{S}</style>
      <section className="nl-root">
        <div className="nl-inner">
          <div className="nl-icon"><Mail size={20} /></div>
          <span className="nl-tag">Exclusive Offers</span>
          <h2 className="nl-title">Join the <em>MANAS</em> Circle</h2>
          <p className="nl-sub">{offerText}. Be the first to know about new arrivals, bridal collections and special events.</p>

          {!submitted ? (
            <form className="nl-form" onSubmit={submit}>
              <input
                className="nl-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="nl-btn">
                Subscribe <ArrowRight size={13} />
              </button>
            </form>
          ) : (
            <p className="nl-success">✦ Thank you! Your exclusive offer is on its way.</p>
          )}

          <span className="nl-offer">No spam, ever. Unsubscribe anytime.</span>
        </div>
      </section>
    </>
  );
}
