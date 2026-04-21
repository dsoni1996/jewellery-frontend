"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart }  from "../../hooks";
import { productApi } from "../../lib/api";

/* ──────────────────────────────────────────
   STATIC DATA
────────────────────────────────────────── */
const occasions = [
  { id: "all",        label: "All Collections" },
  { id: "engagement", label: "Engagement"      },
  { id: "mehendi",    label: "Mehendi"          },
  { id: "sangeet",    label: "Sangeet"          },
  { id: "wedding",    label: "Wedding Day"      },
  { id: "reception",  label: "Reception"        },
  { id: "honeymoon",  label: "Honeymoon"        },
];

/* Fallback static sets when API has no bridal products */
const STATIC_SETS = [
  { id:"s1", name:"Rani Haar Bridal Set",        sub:"The Grand Entrance",      occasion:["wedding"],              tag:"22KT Gold",     metal:"22 KT Yellow Gold",         weight:"98.4 g",  pieces:5, piecesList:"Necklace · Earrings · Maang Tikka · Nose Ring · Bangles", price:524000, originalPrice:578000, rating:4.9, reviews:312, badge:"Bestseller", img:"https://picsum.photos/600/700?random=201", imgs:["https://picsum.photos/600/700?random=201","https://picsum.photos/600/700?random=202","https://picsum.photos/600/700?random=203"], description:"A statement bridal set crafted in 22KT gold, adorned with hand-set polki diamonds and meenakari enamel work. Made for the bride who commands every room." },
  { id:"s2", name:"Solitaire Engagement Ring",   sub:"The Promise",             occasion:["engagement"],           tag:"18KT Diamond",  metal:"18 KT White Gold",          weight:"4.2 g",   pieces:1, piecesList:"Ring",                                                     price:185000, originalPrice:185000, rating:4.8, reviews:246, badge:"New",       img:"https://picsum.photos/600/700?random=204", imgs:["https://picsum.photos/600/700?random=204","https://picsum.photos/600/700?random=205"], description:"A 1.2 ct VVS2 round brilliant diamond set in an 18KT white gold cathedral mount. Certified by IGI. The ring she has always imagined." },
  { id:"s3", name:"Floral Meenakari Choker",     sub:"The Mehendi Morning",     occasion:["mehendi","sangeet"],    tag:"22KT Gold",     metal:"22 KT Yellow Gold",         weight:"42.6 g",  pieces:3, piecesList:"Choker · Earrings · Maang Tikka",                         price:236000, originalPrice:258000, rating:4.7, reviews:189, badge:"Limited",   img:"https://picsum.photos/600/700?random=206", imgs:["https://picsum.photos/600/700?random=206","https://picsum.photos/600/700?random=207"], description:"Vivid meenakari enamel flowers in turquoise and coral set in a 22KT gold choker. Perfect for the colourful celebrations before the big day." },
  { id:"s4", name:"Diamond Mangalsutra",         sub:"The Sacred Bond",         occasion:["wedding"],              tag:"18KT Diamond",  metal:"18 KT Yellow & Black Gold", weight:"9.8 g",   pieces:1, piecesList:"Mangalsutra",                                             price:98500,  originalPrice:112000, rating:4.9, reviews:421, badge:"Bestseller", img:"https://picsum.photos/600/700?random=208", imgs:["https://picsum.photos/600/700?random=208","https://picsum.photos/600/700?random=209"], description:"Contemporary mangalsutra with VS clarity diamonds set between traditional black bead strands. A timeless symbol reimagined for the modern bride." },
  { id:"s5", name:"Kundan Polki Necklace Set",   sub:"The Royal Sangeet",       occasion:["sangeet","reception"],  tag:"22KT Gold",     metal:"22 KT Yellow Gold",         weight:"68.2 g",  pieces:4, piecesList:"Necklace · Earrings · Maang Tikka · Ring",               price:368000, originalPrice:395000, rating:4.8, reviews:178, badge:null,         img:"https://picsum.photos/600/700?random=210", imgs:["https://picsum.photos/600/700?random=210","https://picsum.photos/600/700?random=211"], description:"Uncut polki diamonds set in the classic Kundan technique. Each stone hand-placed by our artisans over 120 hours of careful craftsmanship." },
  { id:"s6", name:"Pearl & Diamond Reception Set",sub:"The Grand Finale",       occasion:["reception"],            tag:"18KT Diamond",  metal:"18 KT White Gold",          weight:"22.4 g",  pieces:3, piecesList:"Necklace · Earrings · Bracelet",                          price:295000, originalPrice:295000, rating:4.6, reviews:134, badge:"Exclusive",  img:"https://picsum.photos/600/700?random=212", imgs:["https://picsum.photos/600/700?random=212","https://picsum.photos/600/700?random=213"], description:"South Sea pearls paired with diamond pavé in 18KT white gold. Understated luxury for the reception evening." },
  { id:"s7", name:"Gold Kada Bangle Set",        sub:"The Everyday Bride",      occasion:["mehendi","honeymoon"],  tag:"22KT Gold",     metal:"22 KT Yellow Gold",         weight:"56.0 g",  pieces:6, piecesList:"6 Bangles",                                               price:312000, originalPrice:340000, rating:4.7, reviews:267, badge:null,         img:"https://picsum.photos/600/700?random=214", imgs:["https://picsum.photos/600/700?random=214","https://picsum.photos/600/700?random=215"], description:"A set of six hand-engraved gold kadas with delicate floral motifs. Stack them together or wear one — beautiful either way." },
  { id:"s8", name:"Emerald Gold Haath Phool",    sub:"The Detail That Dazzles",  occasion:["wedding","reception"],  tag:"22KT Gold",     metal:"22 KT Yellow Gold",         weight:"18.6 g",  pieces:2, piecesList:"Hand Harness (pair)",                                     price:124000, originalPrice:138000, rating:4.5, reviews:98,  badge:"New",        img:"https://picsum.photos/600/700?random=216", imgs:["https://picsum.photos/600/700?random=216","https://picsum.photos/600/700?random=217"], description:"Colombian emerald centre stones surrounded by diamond halos on a gold hand-chain. The finishing touch that makes the bridal look complete." },
];

const heroSlides = [
  { img:"https://picsum.photos/1600/900?random=401", eyebrow:"2025 Bridal Collection", title:"Crafted for\nYour",        em:"Greatest Day"   },
  { img:"https://picsum.photos/1600/900?random=402", eyebrow:"The Engagement Edit",    title:"A Promise\nSet in",        em:"Gold & Diamond" },
  { img:"https://picsum.photos/1600/900?random=403", eyebrow:"Heritage Craftsmanship", title:"Timeless Beauty\nFor Your",em:"Every Ritual"   },
];

const journeySteps = [
  { num:"01", title:"Engagement",  desc:"Solitaires & couple rings that mark the beginning"       },
  { num:"02", title:"Mehendi",     desc:"Colourful meenakari & floral pieces for the joyful morning" },
  { num:"03", title:"Sangeet",     desc:"Polki & kundan sets to dazzle under the lights"            },
  { num:"04", title:"Wedding Day", desc:"Grand bridal sets — your most important look"              },
  { num:"05", title:"Reception",   desc:"Diamonds & pearls for a refined evening statement"         },
  { num:"06", title:"Honeymoon",   desc:"Wearable everyday pieces that travel with your story"      },
];

const testimonials = [
  { name:"Priya S.",  city:"Mumbai",    text:"The Rani Haar set was exactly what I dreamed of for my wedding. The craftsmanship is unlike anything I've seen. Every guest asked where it was from.", rating:5, set:"Rani Haar Bridal Set",       img:"https://picsum.photos/80/80?random=301" },
  { name:"Aarti M.",  city:"Delhi",     text:"I wore the Kundan Polki set for my sangeet and I've never felt more beautiful. My mother cried when she saw me in it.",                               rating:5, set:"Kundan Polki Necklace Set",  img:"https://picsum.photos/80/80?random=302" },
  { name:"Sneha R.",  city:"Bangalore", text:"The diamond mangalsutra is perfect — modern yet traditional. I wear it every single day and get compliments constantly.",                              rating:5, set:"Diamond Mangalsutra",        img:"https://picsum.photos/80/80?random=303" },
];

/* ──────────────────────────────────────────
   HELPERS
────────────────────────────────────────── */
function fmt(n) { return "₹\u202F" + n.toLocaleString("en-IN"); }

/* Map a Product doc (from API) → set shape used by components */
function apiProductToSet(p) {
  return {
    id:            p._id,
    _id:           p._id,
    slug:          p.slug,
    name:          p.name,
    sub:           p.description?.slice(0, 60) + "…" || "",
    occasion:      (p.occasion || []).map(o => o.toLowerCase()),
    tag:           `${p.metal?.purity || ""} ${p.metal?.type || "Gold"}`.trim(),
    metal:         `${p.metal?.purity || ""} ${p.metal?.type || "Gold"}`.trim(),
    weight:        p.metal?.weight ? `${p.metal.weight} g` : "—",
    pieces:        1,
    piecesList:    p.category || "",
    price:         p.price?.current || 0,
    originalPrice: p.price?.original || p.price?.current || 0,
    rating:        p.rating || 0,
    reviews:       p.reviewCount || 0,
    badge:         p.isBestSeller ? "Bestseller" : p.isNewArrival ? "New" : null,
    img:           p.thumbnail || p.images?.[0] || "",
    imgs:          p.images?.length ? p.images : [p.thumbnail].filter(Boolean),
    description:   p.description || "",
  };
}

function Stars({ n, size = 13 }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize:size, color: i <= Math.round(n) ? "#B8862A" : "#E8DDD0" }}>★</span>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   TOAST NOTIFICATION
────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div style={{ position:"fixed", bottom:28, right:24, zIndex:200, display:"flex", flexDirection:"column", gap:10, pointerEvents:"none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display:"flex", alignItems:"center", gap:10,
          background: t.type === "error" ? "#993C1D" : "#2C1A0E",
          color: t.type === "error" ? "#FAECE7" : "#D4AF6A",
          padding:"12px 20px", fontSize:13, borderRadius:3,
          boxShadow:"0 8px 32px rgba(0,0,0,0.25)",
          animation:"wb-toast-in .25s ease",
          fontFamily:"'Jost',sans-serif", letterSpacing:.3,
          pointerEvents:"all",
        }}>
          {t.type === "error"
            ? <AlertCircle size={14} />
            : <CheckCircle size={14} />
          }
          {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   FEATURED CARD
────────────────────────────────────────── */
function FeaturedCard({ set, wishlisted, onWish, onAddCart, addingId }) {
  const [activeImg, setActiveImg] = useState(0);
  const imgs = set.imgs?.length ? set.imgs : [set.img].filter(Boolean);
  const isAdding = addingId === set.id;

  return (
    <div className="wb-featured">
      {/* Images */}
      <div className="wb-featured-imgs">
        <img src={imgs[activeImg] || set.img} alt={set.name} className="wb-featured-main-img" />
        {set.badge && <span className="wb-featured-badge">{set.badge}</span>}
        {imgs.length > 1 && (
          <div className="wb-featured-thumb-row">
            {imgs.map((img, i) => (
              <img key={i} src={img} alt="" className={`wb-featured-thumb${activeImg === i ? " active" : ""}`}
                onClick={() => setActiveImg(i)} />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="wb-featured-body">
        <p className="wb-featured-eyebrow">Featured Collection</p>
        <div className="wb-featured-occasion-pills">
          {set.occasion.map(o => (
            <span key={o} className="wb-occasion-pill">
              {occasions.find(oc => oc.id === o)?.label ?? o}
            </span>
          ))}
        </div>
        <h2 className="wb-featured-title">{set.name}</h2>
        <p className="wb-featured-sub">{set.sub}</p>
        <p className="wb-featured-desc">{set.description}</p>

        <div className="wb-featured-specs">
          <div className="wb-featured-spec">
            <p className="wb-featured-spec-label">Metal</p>
            <p className="wb-featured-spec-val">{set.metal}</p>
          </div>
          <div className="wb-featured-spec">
            <p className="wb-featured-spec-label">Gross Weight</p>
            <p className="wb-featured-spec-val">{set.weight}</p>
          </div>
          <div className="wb-featured-spec">
            <p className="wb-featured-spec-label">Pieces</p>
            <p className="wb-featured-spec-val">{set.pieces} pc</p>
          </div>
        </div>

        <div className="wb-featured-stars">
          <Stars n={set.rating} size={14} />
          <span style={{ fontSize:12, color:"#4A3728", fontWeight:500, marginLeft:6 }}>
            {set.rating} <span style={{ color:"#9E8875", fontWeight:400 }}>({set.reviews} reviews)</span>
          </span>
        </div>

        <div className="wb-featured-price-row">
          <span className="wb-featured-price">{fmt(set.price)}</span>
          {set.originalPrice > set.price && (
            <>
              <span className="wb-featured-orig">{fmt(set.originalPrice)}</span>
              <span className="wb-featured-save">Save {fmt(set.originalPrice - set.price)}</span>
            </>
          )}
        </div>

        {set.piecesList && (
          <p style={{ fontSize:11, color:"#9E8875", marginBottom:20 }}>{set.piecesList}</p>
        )}

        <div className="wb-featured-btns">
          <button
            className="wb-btn-gold"
            onClick={() => onAddCart(set)}
            disabled={isAdding}
          >
            {isAdding
              ? <><Loader2 size={13} className="wb-spin" /> Adding…</>
              : <><ShoppingBag size={13} /> Add to Cart</>
            }
          </button>
          <button
            className={`wb-btn-wish${wishlisted ? " active" : ""}`}
            onClick={() => onWish(set.id || set._id)}
          >
            <Heart size={16} fill={wishlisted ? "#c0392b" : "none"} color={wishlisted ? "#c0392b" : "#9E8875"} />
          </button>
        </div>

        {/* View detail link if slug exists */}
        {set.slug && (
          <Link
            href={`/product?slug=${set.slug}`}
            style={{ display:"flex", alignItems:"center", gap:6, marginTop:14, fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"#B8862A", textDecoration:"none" }}
          >
            View Full Details <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   GRID CARD
────────────────────────────────────────── */
function SetCard({ set, wishlisted, onWish, onAddCart, addingId }) {
  const isAdding = addingId === set.id;

  return (
    <div className="wb-card">
      <div className="wb-card-img-wrap">
        <img src={set.img} alt={set.name} className="wb-card-img" />
        {set.badge && <span className="wb-card-badge">{set.badge}</span>}

        {/* Wishlist btn */}
        <button
          className={`wb-card-wish${wishlisted ? " active" : ""}`}
          onClick={e => { e.stopPropagation(); onWish(set.id || set._id); }}
        >
          <Heart size={14} fill={wishlisted ? "#c0392b" : "none"} color={wishlisted ? "#c0392b" : "#4A3728"} />
        </button>

        {/* Occasion pills */}
        <div className="wb-card-occasions">
          {set.occasion.slice(0, 2).map(o => (
            <span key={o} className="wb-card-occ-pill">
              {occasions.find(oc => oc.id === o)?.label ?? o}
            </span>
          ))}
        </div>
      </div>

      <div className="wb-card-body">
        <p className="wb-card-tag">{set.tag}{set.pieces > 1 ? ` · ${set.pieces} Piece Set` : ""}</p>
        <p className="wb-card-name">{set.name}</p>
        <p className="wb-card-sub">{set.sub}</p>
        <p className="wb-card-meta">{set.metal} · {set.weight}</p>

        <div className="wb-card-stars">
          <Stars n={set.rating} size={11} />
          <span className="wb-card-rating">{set.rating}</span>
          <span className="wb-card-reviews">({set.reviews})</span>
        </div>

        <div className="wb-card-footer">
          <div>
            <span className="wb-card-price">{fmt(set.price)}</span>
            {set.originalPrice > set.price && (
              <span className="wb-card-orig">{fmt(set.originalPrice)}</span>
            )}
          </div>
          <button
            className="wb-card-add"
            onClick={() => onAddCart(set)}
            disabled={isAdding}
          >
            {isAdding
              ? <Loader2 size={10} className="wb-spin" />
              : <><ShoppingBag size={10} /> Add</>
            }
          </button>
        </div>

        {set.slug && (
          <Link
            href={`/product?slug=${set.slug}`}
            style={{ display:"block", marginTop:10, fontSize:10.5, color:"#B8862A", letterSpacing:1, textDecoration:"none", textTransform:"uppercase" }}
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STYLES
────────────────────────────────────────── */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.wb-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;color:#2C1A0E;}

/* HERO */
.wb-hero{position:relative;height:100vh;min-height:600px;max-height:900px;overflow:hidden;background:#1A0D05;display:flex;align-items:center;}
.wb-hero-slides{position:absolute;inset:0;}
.wb-hero-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.4s ease;}
.wb-hero-slide.active{opacity:1;}
.wb-hero-slide img{width:100%;height:100%;object-fit:cover;filter:brightness(0.5);}
.wb-hero-overlay{position:absolute;inset:0;background:linear-gradient(110deg,rgba(20,8,2,0.92) 0%,rgba(20,8,2,0.5) 55%,transparent 100%);}
.wb-hero-frame{position:absolute;inset:24px;pointer-events:none;z-index:4;}
.wb-hero-frame-tl{position:absolute;top:0;left:0;width:44px;height:44px;border-top:1px solid rgba(212,175,106,0.55);border-left:1px solid rgba(212,175,106,0.55);}
.wb-hero-frame-tr{position:absolute;top:0;right:0;width:44px;height:44px;border-top:1px solid rgba(212,175,106,0.55);border-right:1px solid rgba(212,175,106,0.55);}
.wb-hero-frame-bl{position:absolute;bottom:0;left:0;width:44px;height:44px;border-bottom:1px solid rgba(212,175,106,0.55);border-left:1px solid rgba(212,175,106,0.55);}
.wb-hero-frame-br{position:absolute;bottom:0;right:0;width:44px;height:44px;border-bottom:1px solid rgba(212,175,106,0.55);border-right:1px solid rgba(212,175,106,0.55);}
.wb-hero-content{position:relative;z-index:5;max-width:680px;padding:0 80px;}
.wb-hero-eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#D4AF6A;margin-bottom:22px;}
.wb-hero-eyebrow::before{content:'';display:block;width:36px;height:1px;background:linear-gradient(90deg,transparent,#D4AF6A);}
.wb-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(50px,6.5vw,86px);font-weight:300;color:#FFFDF9;line-height:1.05;margin-bottom:22px;letter-spacing:.5px;}
.wb-hero-title em{font-style:italic;color:#D4AF6A;display:block;font-weight:300;}
.wb-hero-desc{font-size:15px;font-weight:300;color:#C8B89A;line-height:1.8;margin-bottom:40px;max-width:480px;}
.wb-hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
.wb-hero-btn-primary{display:inline-flex;align-items:center;gap:10px;background:#B8862A;color:#FFFDF9;border:none;padding:15px 34px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;text-decoration:none;transition:background .25s;box-shadow:0 4px 20px rgba(184,134,42,.35);}
.wb-hero-btn-primary:hover{background:#D4AF6A;color:#2C1A0E;}
.wb-hero-btn-outline{display:inline-flex;align-items:center;gap:10px;background:transparent;color:#D4AF6A;border:1px solid rgba(212,175,106,.55);padding:15px 34px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;text-decoration:none;transition:all .25s;}
.wb-hero-btn-outline:hover{background:rgba(212,175,106,.1);border-color:#D4AF6A;}
.wb-hero-dots{position:absolute;bottom:36px;left:80px;display:flex;gap:10px;z-index:5;}
.wb-hero-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .35s;border:none;padding:0;}
.wb-hero-dot.active{background:#D4AF6A;width:24px;border-radius:3px;}
.wb-hero-scroll{position:absolute;bottom:32px;right:60px;z-index:5;display:flex;flex-direction:column;align-items:center;gap:6px;}
.wb-hero-scroll-line{width:1px;height:44px;background:linear-gradient(to bottom,#D4AF6A,transparent);}
.wb-hero-scroll-text{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.35);}
.wb-gold-line{height:1px;background:linear-gradient(90deg,transparent,#B8862A 20%,#E8C96A 50%,#B8862A 80%,transparent);}

/* FILTER */
.wb-filter-strip{background:#2C1A0E;position:sticky;top:0;z-index:30;border-bottom:1px solid rgba(184,134,42,.3);box-shadow:0 4px 24px rgba(0,0,0,.25);}
.wb-filter-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;overflow-x:auto;scrollbar-width:none;}
.wb-filter-inner::-webkit-scrollbar{display:none;}
.wb-filter-btn{flex-shrink:0;background:none;border:none;padding:18px 28px;font-family:'Jost',sans-serif;font-size:11px;font-weight:400;letter-spacing:2px;text-transform:uppercase;color:#7A6352;cursor:pointer;position:relative;transition:color .2s;white-space:nowrap;}
.wb-filter-btn::after{content:'';position:absolute;bottom:0;left:16px;right:16px;height:2px;background:linear-gradient(90deg,transparent,#D4AF6A,transparent);transform:scaleX(0);transition:transform .3s ease;}
.wb-filter-btn:hover{color:#C8B89A;}
.wb-filter-btn.active{color:#D4AF6A;}
.wb-filter-btn.active::after{transform:scaleX(1);}
.wb-filter-count{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:rgba(212,175,106,.15);color:#D4AF6A;font-size:9px;margin-left:6px;font-weight:500;border:1px solid rgba(212,175,106,.2);}

/* SECTION */
.wb-section{max-width:1400px;margin:0 auto;padding:72px 40px;}
.wb-section-label{display:flex;align-items:center;gap:14px;margin-bottom:12px;justify-content:center;}
.wb-section-tag{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#B8862A;}
.wb-section-line{flex:1;height:1px;background:linear-gradient(90deg,#E8DDD0,transparent);}
.wb-section-line-l{flex:1;height:1px;background:linear-gradient(90deg,transparent,#E8DDD0);}
.wb-section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,4vw,52px);font-weight:400;color:#2C1A0E;margin-bottom:8px;line-height:1.1;text-align:center;}
.wb-section-title em{font-style:italic;color:#B8862A;}
.wb-section-sub{font-size:12px;color:#9E8875;font-weight:300;margin-bottom:52px;text-align:center;letter-spacing:.5px;}

/* FEATURED */
.wb-featured{display:grid;grid-template-columns:1fr 1fr;gap:0;background:#fff;border:1px solid #E8DDD0;overflow:hidden;margin-bottom:32px;box-shadow:0 8px 40px rgba(44,26,14,.08);transition:box-shadow .4s;}
.wb-featured:hover{box-shadow:0 16px 60px rgba(44,26,14,.14);}
.wb-featured-imgs{position:relative;overflow:hidden;}
.wb-featured-main-img{width:100%;height:100%;min-height:520px;object-fit:cover;display:block;transition:transform .7s ease;}
.wb-featured:hover .wb-featured-main-img{transform:scale(1.04);}
.wb-featured-thumb-row{position:absolute;bottom:16px;left:16px;display:flex;gap:8px;}
.wb-featured-thumb{width:54px;height:54px;object-fit:cover;border:2px solid transparent;cursor:pointer;transition:border-color .2s,transform .2s;background:#F5EDE3;}
.wb-featured-thumb.active{border-color:#D4AF6A;transform:scale(1.04);}
.wb-featured-thumb:hover{border-color:rgba(212,175,106,.6);}
.wb-featured-badge{position:absolute;top:16px;left:16px;background:#2C1A0E;color:#D4AF6A;font-size:9px;letter-spacing:2.5px;padding:6px 14px;text-transform:uppercase;}
.wb-featured-body{padding:52px 48px;display:flex;flex-direction:column;justify-content:center;border-left:1px solid #EDE4D8;}
.wb-featured-eyebrow{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#B8862A;margin-bottom:12px;display:flex;align-items:center;gap:10px;}
.wb-featured-eyebrow::before{content:'';width:24px;height:1px;background:#B8862A;display:block;}
.wb-featured-occasion-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;}
.wb-occasion-pill{font-size:10px;letter-spacing:1px;background:#FBF6EE;border:1px solid #E8D8C0;color:#8B6B2A;padding:4px 12px;text-transform:uppercase;}
.wb-featured-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3vw,40px);font-weight:400;color:#2C1A0E;line-height:1.15;margin-bottom:5px;}
.wb-featured-sub{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;color:#B8862A;margin-bottom:18px;}
.wb-featured-desc{font-size:13px;color:#7A6656;line-height:1.8;font-weight:300;margin-bottom:24px;}
.wb-featured-specs{display:flex;gap:0;margin-bottom:28px;border:1px solid #EDE4D8;}
.wb-featured-spec{flex:1;padding:14px 18px;border-right:1px solid #EDE4D8;}
.wb-featured-spec:last-child{border-right:none;}
.wb-featured-spec-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;margin-bottom:4px;}
.wb-featured-spec-val{font-size:13px;font-weight:500;color:#2C1A0E;}
.wb-featured-stars{display:flex;align-items:center;gap:5px;margin-bottom:20px;}
.wb-featured-price-row{display:flex;align-items:baseline;gap:12px;margin-bottom:8px;padding-bottom:22px;border-bottom:1px solid #EDE4D8;}
.wb-featured-price{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:400;color:#2C1A0E;}
.wb-featured-orig{font-size:15px;color:#B0A090;text-decoration:line-through;}
.wb-featured-save{font-size:11px;color:#2e7d32;font-weight:500;background:rgba(46,125,50,.07);padding:3px 10px;border:1px solid rgba(46,125,50,.15);}
.wb-featured-btns{display:grid;grid-template-columns:1fr auto;gap:10px;}
.wb-btn-gold{display:flex;align-items:center;justify-content:center;gap:9px;background:#2C1A0E;color:#D4AF6A;border:none;padding:15px;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background .2s;box-shadow:none;}
.wb-btn-gold:hover:not(:disabled){background:#B8862A;color:#fff;}
.wb-btn-gold:disabled{opacity:.6;cursor:not-allowed;}
.wb-btn-wish{background:none;border:1px solid #E8DDD0;padding:15px 18px;cursor:pointer;color:#9E8875;transition:all .2s;display:flex;align-items:center;}
.wb-btn-wish:hover{border-color:#B8862A;color:#B8862A;}
.wb-btn-wish.active{color:#c0392b;border-color:rgba(192,57,43,.35);}

/* GRID */
.wb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.wb-card{background:#fff;border:1px solid #EDE4D8;overflow:hidden;transition:box-shadow .35s,transform .35s,border-color .35s;cursor:pointer;position:relative;}
.wb-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#D4AF6A,transparent);transform:scaleX(0);transition:transform .4s ease;z-index:2;pointer-events:none;}
.wb-card:hover{box-shadow:0 16px 48px rgba(44,26,14,.12);transform:translateY(-5px);border-color:#D4C4A8;}
.wb-card:hover::before{transform:scaleX(1);}
.wb-card-img-wrap{position:relative;overflow:hidden;aspect-ratio:4/5;}
.wb-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .65s ease;}
.wb-card:hover .wb-card-img{transform:scale(1.06);}
.wb-card-badge{position:absolute;top:12px;left:12px;z-index:1;background:rgba(44,26,14,.85);color:#D4AF6A;font-size:9px;letter-spacing:2px;padding:5px 12px;text-transform:uppercase;}
.wb-card-wish{position:absolute;top:10px;right:10px;z-index:1;background:rgba(255,255,255,.92);border:none;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.wb-card-wish:hover{background:#fff;transform:scale(1.08);}
.wb-card-wish.active{background:#fff;}
.wb-card-occasions{position:absolute;bottom:12px;left:12px;display:flex;gap:5px;}
.wb-card-occ-pill{background:rgba(44,26,14,.72);color:#D4AF6A;font-size:9px;letter-spacing:1px;padding:3px 9px;text-transform:uppercase;backdrop-filter:blur(4px);}
.wb-card-body{padding:18px 20px 20px;}
.wb-card-tag{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#B8862A;margin-bottom:6px;}
.wb-card-name{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:400;color:#2C1A0E;margin-bottom:3px;line-height:1.25;}
.wb-card-sub{font-family:'Cormorant Garamond',serif;font-size:14px;font-style:italic;color:#9E8875;margin-bottom:10px;}
.wb-card-meta{font-size:11px;color:#B0A090;margin-bottom:10px;}
.wb-card-stars{display:flex;align-items:center;gap:3px;margin-bottom:13px;}
.wb-card-rating{font-size:11px;color:#4A3728;font-weight:500;margin-left:3px;}
.wb-card-reviews{font-size:11px;color:#9E8875;}
.wb-card-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid #F0E8DC;}
.wb-card-price{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:400;color:#2C1A0E;}
.wb-card-orig{font-size:12px;color:#B0A090;text-decoration:line-through;margin-left:5px;}
.wb-card-add{display:flex;align-items:center;gap:6px;background:#2C1A0E;color:#D4AF6A;border:none;padding:9px 16px;font-family:'Jost',sans-serif;font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background .2s;white-space:nowrap;}
.wb-card-add:hover:not(:disabled){background:#B8862A;color:#fff;}
.wb-card-add:disabled{opacity:.5;cursor:not-allowed;}

/* JOURNEY */
.wb-journey{background:#2C1A0E;padding:72px 0;}
.wb-journey-inner{max-width:1400px;margin:0 auto;padding:0 40px;}
.wb-journey-head{text-align:center;margin-bottom:56px;}
.wb-journey-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,4vw,48px);font-weight:300;color:#FFFDF9;margin-bottom:8px;}
.wb-journey-title em{font-style:italic;color:#D4AF6A;}
.wb-journey-sub{font-size:13px;color:#7A6352;font-weight:300;}
.wb-journey-track{display:flex;align-items:flex-start;position:relative;}
.wb-journey-track::before{content:'';position:absolute;top:20px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#B8862A 10%,#D4AF6A 50%,#B8862A 90%,transparent);}
.wb-journey-step{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 12px;position:relative;z-index:1;}
.wb-journey-dot{width:40px;height:40px;border-radius:50%;background:#2C1A0E;border:1px solid #B8862A;display:flex;align-items:center;justify-content:center;color:#D4AF6A;font-size:13px;margin-bottom:18px;flex-shrink:0;font-family:'Cormorant Garamond',serif;font-weight:600;transition:box-shadow .3s,border-color .3s;}
.wb-journey-step:hover .wb-journey-dot{border-color:#D4AF6A;box-shadow:0 0 0 6px rgba(212,175,106,.12);}
.wb-journey-step-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#FFFDF9;margin-bottom:6px;}
.wb-journey-step-desc{font-size:11px;color:#7A6352;line-height:1.6;font-weight:300;max-width:130px;}

/* TESTIMONIALS */
.wb-testi{background:#FFFDF9;padding:72px 0;border-top:1px solid #E8DDD0;}
.wb-testi-inner{max-width:1200px;margin:0 auto;padding:0 40px;}
.wb-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.wb-testi-card{background:#fff;border:1px solid #E8DDD0;padding:28px;position:relative;transition:box-shadow .3s;}
.wb-testi-card:hover{box-shadow:0 8px 32px rgba(44,26,14,.08);}
.wb-testi-card::before{content:'\u201C';position:absolute;top:12px;right:18px;font-family:'Cormorant Garamond',serif;font-size:72px;line-height:1;color:rgba(184,134,42,.1);pointer-events:none;}
.wb-testi-stars{display:flex;gap:3px;margin-bottom:14px;}
.wb-testi-text{font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;font-weight:300;color:#3D2B1A;line-height:1.7;margin-bottom:20px;}
.wb-testi-divider{height:1px;background:linear-gradient(90deg,#EDE4D8,transparent);margin-bottom:18px;}
.wb-testi-author{display:flex;align-items:center;gap:12px;}
.wb-testi-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:2px solid #E8D8C0;}
.wb-testi-author-name{font-size:13px;font-weight:500;color:#2C1A0E;}
.wb-testi-author-meta{font-size:11px;color:#9E8875;margin-top:1px;}
.wb-testi-set{font-size:10px;letter-spacing:1px;color:#B8862A;margin-top:3px;text-transform:uppercase;}

/* CTA */
.wb-cta{background:#1A0D05;padding:88px 40px;text-align:center;position:relative;overflow:hidden;}
.wb-cta::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.04'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E");}
.wb-cta-frame{position:absolute;inset:32px;pointer-events:none;}
.wb-cta-frame::before,.wb-cta-frame::after{content:'';position:absolute;width:52px;height:52px;}
.wb-cta-frame::before{top:0;left:0;border-top:1px solid rgba(212,175,106,.3);border-left:1px solid rgba(212,175,106,.3);}
.wb-cta-frame::after{bottom:0;right:0;border-bottom:1px solid rgba(212,175,106,.3);border-right:1px solid rgba(212,175,106,.3);}
.wb-cta-inner{position:relative;z-index:1;max-width:620px;margin:0 auto;}
.wb-cta-tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#D4AF6A;margin-bottom:14px;display:block;}
.wb-cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,5vw,56px);font-weight:300;color:#FFFDF9;line-height:1.15;margin-bottom:14px;}
.wb-cta-title em{font-style:italic;color:#D4AF6A;}
.wb-cta-divider{width:64px;height:1px;background:linear-gradient(90deg,transparent,#D4AF6A,transparent);margin:0 auto 24px;}
.wb-cta-sub{font-size:13px;color:#7A6352;font-weight:300;line-height:1.75;margin-bottom:38px;}
.wb-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.wb-cta-btn-a{display:inline-flex;align-items:center;gap:9px;background:#B8862A;color:#fff;border:none;padding:16px 38px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background .2s;text-decoration:none;}
.wb-cta-btn-a:hover{background:#D4AF6A;color:#2C1A0E;}
.wb-cta-btn-b{display:inline-flex;align-items:center;gap:9px;background:transparent;color:#D4AF6A;border:1px solid rgba(212,175,106,.4);padding:16px 38px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:all .2s;text-decoration:none;}
.wb-cta-btn-b:hover{background:rgba(212,175,106,.08);border-color:#D4AF6A;}

/* EMPTY */
.wb-empty{text-align:center;padding:80px 20px;background:#fff;border:1px solid #E8DDD0;}
.wb-empty-icon{font-size:48px;margin-bottom:16px;}
.wb-empty-title{font-family:'Cormorant Garamond',serif;font-size:30px;color:#2C1A0E;margin-bottom:8px;}
.wb-empty-sub{font-size:13px;color:#9E8875;}

/* Loader skeleton */
.wb-skeleton{background:linear-gradient(90deg,#F5EDE3 25%,#EDE4D8 50%,#F5EDE3 75%);background-size:800px 100%;animation:wb-sk 1.4s infinite linear;border-radius:4px;}
@keyframes wb-sk{0%{background-position:-800px 0}100%{background-position:800px 0}}
@keyframes wb-toast-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.wb-spin{animation:wb-spin-anim .8s linear infinite;}
@keyframes wb-spin-anim{to{transform:rotate(360deg)}}

@media(max-width:1100px){.wb-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:1000px){.wb-featured{grid-template-columns:1fr;}.wb-featured-main-img{min-height:320px;}.wb-featured-body{padding:32px 28px;}.wb-journey-track{flex-wrap:wrap;gap:28px;}.wb-journey-track::before{display:none;}.wb-journey-step{flex:0 0 calc(33.333% - 19px);}}
@media(max-width:768px){.wb-section{padding:52px 20px;}.wb-grid{grid-template-columns:repeat(2,1fr);gap:14px;}.wb-hero-content{padding:0 24px;}.wb-hero-dots{left:24px;}.wb-hero-scroll{display:none;}.wb-filter-btn{padding:14px 18px;}.wb-testi-grid{grid-template-columns:1fr 1fr;}.wb-testi-inner{padding:0 20px;}.wb-journey-inner{padding:0 20px;}.wb-journey-step{flex:0 0 calc(50% - 14px);}.wb-cta{padding:64px 20px;}}
@media(max-width:560px){.wb-testi-grid{grid-template-columns:1fr;}.wb-grid{grid-template-columns:1fr;}.wb-journey-step{flex:0 0 100%;}}
`;

/* ──────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────── */
export default function WeddingPage() {
  const { isLoggedIn, wishlistIds, toggleWishlist } = useAuth();
  const { addItem } = useCart();

  const [activeFilter, setActiveFilter] = useState("all");
  const [heroIdx,      setHeroIdx]      = useState(0);
  const [sets,         setSets]         = useState(STATIC_SETS);
  const [apiLoaded,    setApiLoaded]    = useState(false);
  const [addingId,     setAddingId]     = useState(null);   // which item is being added
  const [toasts,       setToasts]       = useState([]);

  /* ── Hero auto-advance ── */
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* ── Fetch bridal products from API ── */
  useEffect(() => {
    productApi.getAll({ isWedding: true, limit: 12 })
      .then(({ products }) => {
        if (products?.length) {
          setSets(products.map(apiProductToSet));
          setApiLoaded(true);
        }
      })
      .catch(() => { /* keep static fallback silently */ });
  }, []);

  /* ── Toast helper ── */
  const showToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  /* ── Add to cart ── */
  const handleAddCart = useCallback(async (set) => {
    if (!isLoggedIn) {
      showToast("Please log in to add items to cart", "error");
      return;
    }
    /* Static sets don't have _id — go to listing */
    if (!set._id && !set.slug) {
      showToast("Please select this item from the product page", "error");
      return;
    }
    setAddingId(set.id);
    try {
      await addItem(set._id || set.id, 1);
      showToast(`"${set.name}" added to cart ✓`);
    } catch (err) {
      showToast(err.message || "Could not add to cart", "error");
    } finally {
      setAddingId(null);
    }
  }, [isLoggedIn, addItem, showToast]);

  /* ── Wishlist toggle ── */
  const handleWish = useCallback(async (id) => {
    if (!isLoggedIn) {
      showToast("Please log in to save to wishlist", "error");
      return;
    }
    const added = await toggleWishlist(id);
    if (added === true)  showToast("Added to wishlist ♥");
    if (added === false) showToast("Removed from wishlist");
    if (added === null)  showToast("Could not update wishlist", "error");
  }, [isLoggedIn, toggleWishlist, showToast]);

  /* ── Filtering ── */
  const filteredSets = activeFilter === "all"
    ? sets
    : sets.filter(s => s.occasion.includes(activeFilter));
  const featured   = filteredSets[0] ?? sets[0];
  const gridSets   = filteredSets.slice(1);
  const countFor   = id => id === "all" ? sets.length : sets.filter(s => s.occasion.includes(id)).length;

  return (
    <>
      <style>{S}</style>
      <Toast toasts={toasts} />

      <div className="wb-root">

        {/* ── HERO ── */}
        <div className="wb-hero">
          <div className="wb-hero-slides">
            {heroSlides.map((slide, i) => (
              <div key={i} className={`wb-hero-slide${heroIdx === i ? " active" : ""}`}>
                <img src={slide.img} alt={slide.eyebrow} />
              </div>
            ))}
          </div>
          <div className="wb-hero-overlay" />
          <div className="wb-hero-frame">
            <div className="wb-hero-frame-tl" /><div className="wb-hero-frame-tr" />
            <div className="wb-hero-frame-bl" /><div className="wb-hero-frame-br" />
          </div>
          <div className="wb-hero-content">
            <p className="wb-hero-eyebrow">{heroSlides[heroIdx].eyebrow}</p>
            <h1 className="wb-hero-title">
              {heroSlides[heroIdx].title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}
              <em>{heroSlides[heroIdx].em}</em>
            </h1>
            <p className="wb-hero-desc">
              Handcrafted in 22KT & 18KT gold, set with the finest diamonds, emeralds, and pearls.
              Each piece made for one of life's most precious moments.
            </p>
            <div className="wb-hero-btns">
              <a href="#collections" className="wb-hero-btn-primary">
                Explore Collections <ArrowRight size={14} />
              </a>
              <a href="#journey" className="wb-hero-btn-outline">Our Bridal Journey</a>
            </div>
          </div>
          <div className="wb-hero-dots">
            {heroSlides.map((_, i) => (
              <button key={i} className={`wb-hero-dot${heroIdx === i ? " active" : ""}`} onClick={() => setHeroIdx(i)} />
            ))}
          </div>
          <div className="wb-hero-scroll">
            <div className="wb-hero-scroll-line" />
            <span className="wb-hero-scroll-text">Scroll</span>
          </div>
        </div>

        <div className="wb-gold-line" />

        {/* ── OCCASION FILTER BAR ── */}
        <div className="wb-filter-strip" id="collections">
          <div className="wb-filter-inner">
            {occasions.map(occ => (
              <button
                key={occ.id}
                className={`wb-filter-btn${activeFilter === occ.id ? " active" : ""}`}
                onClick={() => setActiveFilter(occ.id)}
              >
                {occ.label}
                <span className="wb-filter-count">{countFor(occ.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── COLLECTIONS ── */}
        <div className="wb-section">
          <div className="wb-section-label">
            <div className="wb-section-line-l" />
            <span className="wb-section-tag">
              {activeFilter === "all" ? "All Collections" : occasions.find(o => o.id === activeFilter)?.label}
            </span>
            <div className="wb-section-line" />
          </div>
          <h2 className="wb-section-title">
            {activeFilter === "all"
              ? <>Curated <em>Bridal Sets</em></>
              : <>{occasions.find(o => o.id === activeFilter)?.label} <em>Collections</em></>
            }
          </h2>
          <p className="wb-section-sub">
            {filteredSets.length} set{filteredSets.length !== 1 ? "s" : ""}
            &nbsp;·&nbsp; Handcrafted by master artisans
            {apiLoaded && <span style={{ marginLeft:8, fontSize:10, color:"#B8862A", letterSpacing:1 }}>✦ LIVE</span>}
          </p>

          {filteredSets.length === 0 ? (
            <div className="wb-empty">
              <div className="wb-empty-icon">💍</div>
              <h3 className="wb-empty-title">No sets found</h3>
              <p className="wb-empty-sub">Try a different occasion filter above.</p>
            </div>
          ) : (
            <>
              <FeaturedCard
                set={featured}
                wishlisted={wishlistIds.has(featured.id || featured._id)}
                onWish={handleWish}
                onAddCart={handleAddCart}
                addingId={addingId}
              />
              {gridSets.length > 0 && (
                <div className="wb-grid" style={{ marginTop: 26 }}>
                  {gridSets.map(set => (
                    <SetCard
                      key={set.id}
                      set={set}
                      wishlisted={wishlistIds.has(set.id || set._id)}
                      onWish={handleWish}
                      onAddCart={handleAddCart}
                      addingId={addingId}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="wb-gold-line" />

        {/* ── WEDDING JOURNEY TIMELINE ── */}
        <div className="wb-journey" id="journey">
          <div className="wb-journey-inner">
            <div className="wb-journey-head">
              <span style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#D4AF6A", display:"block", marginBottom:10 }}>
                The Complete Bridal Story
              </span>
              <h2 className="wb-journey-title">Your <em>Wedding Journey</em></h2>
              <p className="wb-journey-sub">From the first yes to the last dance — we have a piece for every moment</p>
            </div>
            <div className="wb-journey-track">
              {journeySteps.map((step, i) => (
                <div key={i} className="wb-journey-step">
                  <div className="wb-journey-dot">{step.num}</div>
                  <p className="wb-journey-step-title">{step.title}</p>
                  <p className="wb-journey-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="wb-testi">
          <div className="wb-testi-inner">
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="wb-section-label" style={{ justifyContent:"center", marginBottom:10 }}>
                <div className="wb-section-line-l" style={{ maxWidth:100 }} />
                <span className="wb-section-tag">Real Brides</span>
                <div className="wb-section-line" style={{ maxWidth:100 }} />
              </div>
              <h2 className="wb-section-title" style={{ marginBottom:0 }}>Their <em>Stories</em></h2>
            </div>
            <div className="wb-testi-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="wb-testi-card">
                  <div className="wb-testi-stars">
                    {[1,2,3,4,5].map(j => <span key={j} style={{ fontSize:12, color:"#B8862A" }}>★</span>)}
                  </div>
                  <p className="wb-testi-text">{t.text}</p>
                  <div className="wb-testi-divider" />
                  <div className="wb-testi-author">
                    <img src={t.img} alt={t.name} className="wb-testi-avatar" />
                    <div>
                      <p className="wb-testi-author-name">{t.name}</p>
                      <p className="wb-testi-author-meta">{t.city}</p>
                      <p className="wb-testi-set">{t.set}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="wb-cta">
          <div className="wb-cta-frame" />
          <div className="wb-cta-inner">
            <span className="wb-cta-tag">Your Dream Bridal Look Awaits</span>
            <h2 className="wb-cta-title">Book a <em>Private</em><br />Bridal Consultation</h2>
            <div className="wb-cta-divider" />
            <p className="wb-cta-sub">
              Visit any MANAS store for a dedicated bridal session. Our specialists will help you
              curate the perfect set for every ceremony — at your pace, in complete privacy.
            </p>
            <div className="wb-cta-btns">
              <Link href="/contact" className="wb-cta-btn-a">
                Book Appointment <ArrowRight size={13} />
              </Link>
              <Link href="/listing" className="wb-cta-btn-b">Browse All Jewellery</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}