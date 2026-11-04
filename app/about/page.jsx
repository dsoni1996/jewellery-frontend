"use client";
import { SITE } from "@/config/site";
import Link from "next/link";
import { ArrowRight, Award, Shield, Star, Heart } from "lucide-react";

const values = [
  { icon: Star,   title: "Trendy Designs",      desc: "Kundan, AD, temple, oxidised and more — styles picked to match what people actually wear." },
  { icon: Heart,  title: "Made to Be Worn",     desc: "Pieces for weddings, festivals, parties and everyday looks, at prices that make sense." },
  { icon: Shield, title: "Honest Labelling",    desc: "We sell imitation jewellery and say so clearly. No product is described as real gold, silver or hallmarked." },
  { icon: Award,  title: "Care Guidance",       desc: "Every piece comes with simple care tips so your jewellery keeps its shine for longer." },
];

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.ab-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;}

/* Hero */
.ab-hero{background:#1A0D05;min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px;position:relative;overflow:hidden;}
.ab-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.04'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E");}
.ab-hero-inner{position:relative;z-index:1;max-width:720px;}
.ab-hero-tag{font-size:10px;letter-spacing:3.5px;text-transform:uppercase;color:#D4AF6A;margin-bottom:16px;display:block;}
.ab-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6vw,78px);font-weight:300;color:#FFFDF9;line-height:1.05;margin-bottom:20px;}
.ab-hero-title em{font-style:italic;color:#D4AF6A;}
.ab-hero-desc{font-size:15px;font-weight:300;color:#9E8875;line-height:1.8;max-width:540px;margin:0 auto;}
.ab-gold-line{height:2px;background:linear-gradient(90deg,transparent,#B8862A 20%,#E8C96A 50%,#B8862A 80%,transparent);}

/* Sections */
.ab-section{max-width:1200px;margin:0 auto;padding:72px 40px;}
@media(max-width:768px){.ab-section{padding:52px 20px;}}
.ab-section-tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#B8862A;display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.ab-section-tag::before{content:'';display:block;width:24px;height:1px;background:#B8862A;}
.ab-section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,4vw,50px);font-weight:400;color:#2C1A0E;line-height:1.1;margin-bottom:16px;}
.ab-section-title em{font-style:italic;color:#B8862A;}
.ab-section-body{font-size:14px;color:#7A6656;line-height:1.85;font-weight:300;}

/* Story layout */
.ab-story-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
@media(max-width:900px){.ab-story-grid{grid-template-columns:1fr;gap:36px;}}
.ab-story-img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:2px;display:block;}
.ab-story-img-wrap{position:relative;}
.ab-story-badge{position:absolute;bottom:24px;left:-16px;background:#2C1A0E;padding:16px 20px;border-left:3px solid #D4AF6A;}
.ab-story-badge-num{font-family:'Cormorant Garamond',serif;font-size:36px;color:#D4AF6A;font-weight:300;}
.ab-story-badge-text{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-top:2px;}

/* Stats */
.ab-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:#2C1A0E;margin:0;}
@media(max-width:700px){.ab-stats{grid-template-columns:repeat(2,1fr);}}
.ab-stat{padding:36px 28px;text-align:center;border-right:1px solid rgba(212,175,106,.15);}
.ab-stat:last-child{border-right:none;}
.ab-stat-num{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:300;color:#D4AF6A;line-height:1;}
.ab-stat-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7A6352;margin-top:6px;}

/* Values */
.ab-values-bg{background:#FFFDF9;padding:72px 0;border-top:1px solid #E8DDD0;border-bottom:1px solid #E8DDD0;}
.ab-values-grid{max-width:1200px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
@media(max-width:900px){.ab-values-grid{grid-template-columns:repeat(2,1fr);padding:0 20px;}}
@media(max-width:560px){.ab-values-grid{grid-template-columns:1fr;}}
.ab-value-card{padding:28px 24px;}
.ab-value-icon{width:44px;height:44px;border-radius:50%;background:#FBF6EE;border:1px solid #E8D8C0;display:flex;align-items:center;justify-content:center;color:#B8862A;margin-bottom:16px;}
.ab-value-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:400;color:#2C1A0E;margin-bottom:10px;}
.ab-value-desc{font-size:13px;color:#7A6656;line-height:1.7;font-weight:300;}

/* Timeline */
.ab-timeline{position:relative;padding-left:28px;}
.ab-timeline::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,#D4AF6A,rgba(212,175,106,.2));}
.ab-tl-item{position:relative;margin-bottom:36px;}
.ab-tl-item:last-child{margin-bottom:0;}
.ab-tl-dot{position:absolute;left:-28px;top:4px;width:15px;height:15px;border-radius:50%;background:#B8862A;border:3px solid #FAF6F0;box-shadow:0 0 0 2px rgba(184,134,42,.3);}
.ab-tl-year{font-size:11px;font-weight:600;letter-spacing:2px;color:#B8862A;text-transform:uppercase;margin-bottom:5px;}
.ab-tl-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#2C1A0E;margin-bottom:5px;}
.ab-tl-desc{font-size:13px;color:#7A6656;line-height:1.65;font-weight:300;}

/* Artisans */
.ab-artisans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
@media(max-width:768px){.ab-artisans-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:480px){.ab-artisans-grid{grid-template-columns:1fr;}}
.ab-artisan-card{background:#fff;border:1px solid #E8DDD0;border-radius:3px;overflow:hidden;text-align:center;}
.ab-artisan-img{width:100%;aspect-ratio:1;object-fit:cover;display:block;filter:grayscale(20%);}
.ab-artisan-body{padding:18px 16px;}
.ab-artisan-name{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2C1A0E;margin-bottom:3px;}
.ab-artisan-role{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#B8862A;margin-bottom:5px;}
.ab-artisan-spec{font-size:12px;color:#9E8875;}

/* CTA */
.ab-cta{background:#2C1A0E;padding:72px 40px;text-align:center;}
.ab-cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,4vw,48px);font-weight:300;color:#FFFDF9;margin-bottom:12px;}
.ab-cta-title em{font-style:italic;color:#D4AF6A;}
.ab-cta-sub{font-size:13px;color:#7A6352;margin-bottom:32px;font-weight:300;}
.ab-cta-btn{display:inline-flex;align-items:center;gap:9px;background:#B8862A;color:#fff;border:none;padding:15px 36px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none;}
.ab-cta-btn:hover{background:#D4AF6A;color:#2C1A0E;}
`;

export default function AboutPage() {
  return (
    <>
      <style>{S}</style>
      <div className="ab-root">

        {/* Hero */}
        <div className="ab-hero">
          <div className="ab-hero-inner">
            <span className="ab-hero-tag">Imitation Jewellery</span>
            <h1 className="ab-hero-title">Style for Every<br /><em>Occasion</em></h1>
            <p className="ab-hero-desc">{SITE.fullName} brings you trendy imitation jewellery — bridal sets, jhumkas, necklaces, bangles and more.</p>
          </div>
        </div>
        <div className="ab-gold-line" />

        {/* Story */}
        <div className="ab-section">
          <div className="ab-story-grid">
            <div className="ab-story-img-wrap">
              <img src="https://picsum.photos/600/750?random=601" alt="Our Store" className="ab-story-img" />
            </div>
            <div>
              <p className="ab-section-tag">Our Story</p>
              <h2 className="ab-section-title">Jewellery for <em>Every Look</em></h2>
              <p className="ab-section-body" style={{ marginBottom: 20 }}>
                {SITE.fullName} is an imitation jewellery store. We focus on designs that look great for weddings, festivals and everyday wear, without the price of real gold or diamonds.
              </p>
              <p className="ab-section-body" style={{ marginBottom: 32 }}>
                Every product page tells you the base material, finish and style, so you know exactly what you are buying.
              </p>
              <Link href="/listing" className="ab-cta-btn" style={{ display: "inline-flex" }}>
                Explore Our Collection <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="ab-stats">
          {[
            { num: "Kundan", label: "Traditional Styles" },
            { num: "AD / CZ", label: "Party Wear" },
            { num: "Bridal", label: "Wedding Sets" },
            { num: "100%", label: "Honestly Labelled" },
          ].map((s, i) => (
            <div key={i} className="ab-stat">
              <p className="ab-stat-num">{s.num}</p>
              <p className="ab-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="ab-values-bg">
          <div style={{ textAlign: "center", marginBottom: 48, padding: "0 40px" }}>
            <p className="ab-section-tag" style={{ justifyContent: "center" }}>What We Stand For</p>
            <h2 className="ab-section-title">Our <em>Values</em></h2>
          </div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <div key={i} className="ab-value-card">
                <div className="ab-value-icon"><v.icon size={18} /></div>
                <p className="ab-value-title">{v.title}</p>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ab-cta">
          <h2 className="ab-cta-title">Be Part of Our <em>Story</em></h2>
          <p className="ab-cta-sub">Visit us in store or explore our full collection online</p>
          <Link href="/contact" className="ab-cta-btn">Find a Store <ArrowRight size={13} /></Link>
        </div>

      </div>
    </>
  );
}