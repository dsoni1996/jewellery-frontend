"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

const occasions = [
  { id: "all",         label: "All Collections" },
  { id: "engagement",  label: "Engagement" },
  { id: "mehendi",     label: "Mehendi" },
  { id: "sangeet",     label: "Sangeet" },
  { id: "wedding",     label: "Wedding Day" },
  { id: "reception",   label: "Reception" },
  { id: "honeymoon",   label: "Honeymoon" },
];

const sets = [
  {
    id: 1,
    name: "Rani Haar Bridal Set",
    sub: "The Grand Entrance",
    occasion: ["wedding"],
    tag: "22KT Gold",
    metal: "22 KT Yellow Gold",
    weight: "98.4 g",
    pieces: 5,
    piecesList: "Necklace · Earrings · Maang Tikka · Nose Ring · Bangles",
    price: 524000,
    originalPrice: 578000,
    rating: 4.9,
    reviews: 312,
    badge: "Bestseller",
    img: "https://picsum.photos/600/700?random=201",
    imgs: [
      "https://picsum.photos/600/700?random=201",
      "https://picsum.photos/600/700?random=202",
      "https://picsum.photos/600/700?random=203",
    ],
    description: "A statement bridal set crafted in 22KT gold, adorned with hand-set polki diamonds and meenakari enamel work. Made for the bride who commands every room.",
    color: "#B8862A",
  },
  {
    id: 2,
    name: "Solitaire Engagement Ring",
    sub: "The Promise",
    occasion: ["engagement"],
    tag: "18KT Diamond",
    metal: "18 KT White Gold",
    weight: "4.2 g",
    pieces: 1,
    piecesList: "Ring",
    price: 185000,
    originalPrice: 185000,
    rating: 4.8,
    reviews: 246,
    badge: "New",
    img: "https://picsum.photos/600/700?random=204",
    imgs: [
      "https://picsum.photos/600/700?random=204",
      "https://picsum.photos/600/700?random=205",
    ],
    description: "A 1.2 ct VVS2 round brilliant diamond set in an 18KT white gold cathedral mount. Certified by IGI. The ring she has always imagined.",
    color: "#8FA8C8",
  },
  {
    id: 3,
    name: "Floral Meenakari Choker",
    sub: "The Mehendi Morning",
    occasion: ["mehendi", "sangeet"],
    tag: "22KT Gold",
    metal: "22 KT Yellow Gold",
    weight: "42.6 g",
    pieces: 3,
    piecesList: "Choker · Earrings · Maang Tikka",
    price: 236000,
    originalPrice: 258000,
    rating: 4.7,
    reviews: 189,
    badge: "Limited",
    img: "https://picsum.photos/600/700?random=206",
    imgs: [
      "https://picsum.photos/600/700?random=206",
      "https://picsum.photos/600/700?random=207",
    ],
    description: "Vivid meenakari enamel flowers in turquoise and coral set in a 22KT gold choker. Perfect for the colourful celebrations before the big day.",
    color: "#C99A30",
  },
  {
    id: 4,
    name: "Diamond Mangalsutra",
    sub: "The Sacred Bond",
    occasion: ["wedding"],
    tag: "18KT Diamond",
    metal: "18 KT Yellow & Black Gold",
    weight: "9.8 g",
    pieces: 1,
    piecesList: "Mangalsutra",
    price: 98500,
    originalPrice: 112000,
    rating: 4.9,
    reviews: 421,
    badge: "Bestseller",
    img: "https://picsum.photos/600/700?random=208",
    imgs: [
      "https://picsum.photos/600/700?random=208",
      "https://picsum.photos/600/700?random=209",
    ],
    description: "Contemporary mangalsutra with VS clarity diamonds set between traditional black bead strands. A timeless symbol reimagined for the modern bride.",
    color: "#4A3728",
  },
  {
    id: 5,
    name: "Kundan Polki Necklace Set",
    sub: "The Royal Sangeet",
    occasion: ["sangeet", "reception"],
    tag: "22KT Gold",
    metal: "22 KT Yellow Gold",
    weight: "68.2 g",
    pieces: 4,
    piecesList: "Necklace · Earrings · Maang Tikka · Ring",
    price: 368000,
    originalPrice: 395000,
    rating: 4.8,
    reviews: 178,
    badge: null,
    img: "https://picsum.photos/600/700?random=210",
    imgs: [
      "https://picsum.photos/600/700?random=210",
      "https://picsum.photos/600/700?random=211",
    ],
    description: "Uncut polki diamonds set in the classic Kundan technique. Each stone hand-placed by our artisans over 120 hours of careful craftsmanship.",
    color: "#B8862A",
  },
  {
    id: 6,
    name: "Pearl & Diamond Reception Set",
    sub: "The Grand Finale",
    occasion: ["reception"],
    tag: "18KT Diamond",
    metal: "18 KT White Gold",
    weight: "22.4 g",
    pieces: 3,
    piecesList: "Necklace · Earrings · Bracelet",
    price: 295000,
    originalPrice: 295000,
    rating: 4.6,
    reviews: 134,
    badge: "Exclusive",
    img: "https://picsum.photos/600/700?random=212",
    imgs: [
      "https://picsum.photos/600/700?random=212",
      "https://picsum.photos/600/700?random=213",
    ],
    description: "South Sea pearls paired with diamond pavé in 18KT white gold. Understated luxury for the reception evening when you want to shine differently.",
    color: "#9BA8B5",
  },
  {
    id: 7,
    name: "Gold Kada Bangle Set",
    sub: "The Everyday Bride",
    occasion: ["mehendi", "honeymoon"],
    tag: "22KT Gold",
    metal: "22 KT Yellow Gold",
    weight: "56.0 g",
    pieces: 6,
    piecesList: "6 Bangles",
    price: 312000,
    originalPrice: 340000,
    rating: 4.7,
    reviews: 267,
    badge: null,
    img: "https://picsum.photos/600/700?random=214",
    imgs: [
      "https://picsum.photos/600/700?random=214",
      "https://picsum.photos/600/700?random=215",
    ],
    description: "A set of six hand-engraved gold kadas with delicate floral motifs. Stack them together or wear one — beautiful either way.",
    color: "#C99A30",
  },
  {
    id: 8,
    name: "Emerald Gold Haath Phool",
    sub: "The Detail That Dazzles",
    occasion: ["wedding", "reception"],
    tag: "22KT Gold",
    metal: "22 KT Yellow Gold",
    weight: "18.6 g",
    pieces: 2,
    piecesList: "Hand Harness (pair)",
    price: 124000,
    originalPrice: 138000,
    rating: 4.5,
    reviews: 98,
    badge: "New",
    img: "https://picsum.photos/600/700?random=216",
    imgs: [
      "https://picsum.photos/600/700?random=216",
      "https://picsum.photos/600/700?random=217",
    ],
    description: "Colombian emerald centre stones surrounded by diamond halos on a gold hand-chain. The finishing touch that makes the bridal look complete.",
    color: "#2E7A4E",
  },
];

const testimonials = [
  { name: "Priya S.", city: "Mumbai", text: "The Rani Haar set was exactly what I dreamed of for my wedding. The craftsmanship is unlike anything I've seen. Every guest asked where it was from.", rating: 5, set: "Rani Haar Bridal Set", img: "https://picsum.photos/80/80?random=301" },
  { name: "Aarti M.", city: "Delhi", text: "I wore the Kundan Polki set for my sangeet and I've never felt more beautiful. My mother cried when she saw me in it.", rating: 5, set: "Kundan Polki Necklace Set", img: "https://picsum.photos/80/80?random=302" },
  { name: "Sneha R.", city: "Bangalore", text: "The diamond mangalsutra is perfect — modern yet traditional. I wear it every single day and get compliments constantly.", rating: 5, set: "Diamond Mangalsutra", img: "https://picsum.photos/80/80?random=303" },
];

/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */
const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── Root ── */
.wb-root{background:#FAF6F0;min-height:100vh;font-family:'Jost',sans-serif;}

/* ── HERO ── */
.wb-hero{
  position:relative;
  height:100vh;
  min-height:600px;
  max-height:900px;
  overflow:hidden;
  background:#1A0D05;
  display:flex;
  align-items:center;
}
.wb-hero-slides{position:absolute;inset:0;}
.wb-hero-slide{
  position:absolute;inset:0;
  opacity:0;
  transition:opacity 1.2s ease;
}
.wb-hero-slide.active{opacity:1;}
.wb-hero-slide img{
  width:100%;height:100%;
  object-fit:cover;
  filter:brightness(0.55);
}
.wb-hero-overlay{
  position:absolute;inset:0;
  background:linear-gradient(105deg,rgba(20,8,2,0.88) 0%,rgba(20,8,2,0.45) 55%,transparent 100%);
}
.wb-hero-content{
  position:relative;z-index:5;
  max-width:680px;
  padding:0 80px;
}
.wb-hero-eyebrow{
  display:inline-flex;align-items:center;gap:12px;
  font-size:10px;letter-spacing:4px;text-transform:uppercase;
  color:#D4AF6A;margin-bottom:22px;
}
.wb-hero-eyebrow::before{content:'';display:block;width:32px;height:1px;background:#D4AF6A;}
.wb-hero-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(48px,6vw,82px);
  font-weight:300;
  color:#FFFDF9;
  line-height:1.05;
  margin-bottom:22px;
  letter-spacing:1px;
}
.wb-hero-title em{
  font-style:italic;
  color:#D4AF6A;
  display:block;
  font-weight:300;
}
.wb-hero-desc{
  font-size:15px;font-weight:300;
  color:#C8B89A;
  line-height:1.75;
  margin-bottom:38px;
  max-width:480px;
}
.wb-hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
.wb-hero-btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  background:#B8862A;color:#FFFDF9;
  border:none;padding:15px 32px;
  font-family:'Jost',sans-serif;font-size:11px;
  font-weight:500;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;text-decoration:none;
  transition:background .25s;
}
.wb-hero-btn-primary:hover{background:#D4AF6A;color:#2C1A0E;}
.wb-hero-btn-outline{
  display:inline-flex;align-items:center;gap:10px;
  background:transparent;color:#D4AF6A;
  border:1px solid #D4AF6A;padding:15px 32px;
  font-family:'Jost',sans-serif;font-size:11px;
  font-weight:500;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;text-decoration:none;
  transition:all .25s;
}
.wb-hero-btn-outline:hover{background:#D4AF6A;color:#2C1A0E;}
/* Slide dots */
.wb-hero-dots{
  position:absolute;bottom:36px;left:80px;
  display:flex;gap:10px;z-index:5;
}
.wb-hero-dot{
  width:6px;height:6px;border-radius:50%;
  background:rgba(255,255,255,.35);
  cursor:pointer;transition:all .3s;border:none;padding:0;
}
.wb-hero-dot.active{background:#D4AF6A;width:22px;border-radius:3px;}
/* Scroll cue */
.wb-hero-scroll{
  position:absolute;bottom:32px;right:60px;z-index:5;
  display:flex;flex-direction:column;align-items:center;gap:6px;
}
.wb-hero-scroll-line{width:1px;height:44px;background:linear-gradient(to bottom,#D4AF6A,transparent);}
.wb-hero-scroll-text{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.4);}

/* ── OCCASION FILTER ── */
.wb-filter-strip{
  background:#2C1A0E;
  padding:0;
  position:sticky;top:0;z-index:30;
  border-bottom:2px solid #B8862A;
}
.wb-filter-inner{
  max-width:1400px;margin:0 auto;
  display:flex;align-items:center;
  overflow-x:auto;
  scrollbar-width:none;
}
.wb-filter-inner::-webkit-scrollbar{display:none;}
.wb-filter-btn{
  flex-shrink:0;
  background:none;border:none;
  padding:17px 28px;
  font-family:'Jost',sans-serif;font-size:11px;
  font-weight:400;letter-spacing:2px;text-transform:uppercase;
  color:#9E8875;cursor:pointer;
  position:relative;transition:color .2s;
  white-space:nowrap;
}
.wb-filter-btn::after{
  content:'';position:absolute;bottom:0;left:0;right:0;
  height:2px;background:#D4AF6A;
  transform:scaleX(0);transition:transform .25s ease;
}
.wb-filter-btn:hover{color:#C8B89A;}
.wb-filter-btn.active{color:#D4AF6A;}
.wb-filter-btn.active::after{transform:scaleX(1);}
.wb-filter-count{
  display:inline-flex;align-items:center;justify-content:center;
  width:18px;height:18px;border-radius:50%;
  background:rgba(184,134,42,.25);color:#D4AF6A;
  font-size:9px;margin-left:6px;font-weight:500;
}

/* ── SECTION WRAPPER ── */
.wb-section{max-width:1400px;margin:0 auto;padding:70px 40px;}
@media(max-width:768px){.wb-section{padding:48px 16px;}}

/* ── SECTION LABEL ── */
.wb-section-label{
  display:flex;align-items:center;gap:14px;
  margin-bottom:14px;
}
.wb-section-tag{
  font-size:10px;font-weight:500;letter-spacing:3px;
  text-transform:uppercase;color:#B8862A;
}
.wb-section-line{flex:1;height:1px;background:linear-gradient(90deg,#E8DDD0,transparent);}
.wb-section-title{
  font-family:'Cormorant Garamond',serif;
  font-size:42px;font-weight:400;color:#2C1A0E;
  margin-bottom:8px;line-height:1.1;
}
.wb-section-title em{font-style:italic;color:#B8862A;}
.wb-section-sub{font-size:13px;color:#9E8875;font-weight:300;margin-bottom:48px;}

/* ── FEATURED SET (large horizontal) ── */
.wb-featured{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  background:#fff;
  border:1px solid #E8DDD0;
  border-radius:4px;
  overflow:hidden;
  margin-bottom:32px;
}
.wb-featured-imgs{position:relative;overflow:hidden;}
.wb-featured-main-img{
  width:100%;height:100%;
  min-height:500px;
  object-fit:cover;display:block;
  transition:transform .6s ease;
}
.wb-featured:hover .wb-featured-main-img{transform:scale(1.03);}
.wb-featured-thumb-row{
  position:absolute;bottom:16px;left:16px;
  display:flex;gap:8px;
}
.wb-featured-thumb{
  width:52px;height:52px;object-fit:cover;
  border-radius:2px;cursor:pointer;
  border:2px solid transparent;
  transition:border-color .2s;
  background:#F5EDE3;
}
.wb-featured-thumb.active{border-color:#D4AF6A;}
.wb-featured-badge{
  position:absolute;top:16px;left:16px;
  background:#2C1A0E;color:#D4AF6A;
  font-size:9px;letter-spacing:2px;padding:5px 12px;text-transform:uppercase;
}
.wb-featured-body{
  padding:48px 44px;
  display:flex;flex-direction:column;
  justify-content:center;
}
.wb-featured-eyebrow{
  font-size:10px;letter-spacing:3px;text-transform:uppercase;
  color:#B8862A;margin-bottom:12px;
  display:flex;align-items:center;gap:10px;
}
.wb-featured-eyebrow::before{content:'';width:20px;height:1px;background:#B8862A;display:block;}
.wb-featured-occasion-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;}
.wb-occasion-pill{
  font-size:10px;letter-spacing:1px;
  background:#FBF6EE;border:1px solid #E8D8C0;
  color:#8B6B2A;padding:4px 11px;border-radius:2px;
  text-transform:uppercase;
}
.wb-featured-title{
  font-family:'Cormorant Garamond',serif;
  font-size:36px;font-weight:400;color:#2C1A0E;
  line-height:1.15;margin-bottom:6px;
}
.wb-featured-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:18px;font-style:italic;
  color:#B8862A;margin-bottom:18px;
}
.wb-featured-desc{
  font-size:13px;color:#7A6656;line-height:1.75;
  font-weight:300;margin-bottom:22px;
}
.wb-featured-specs{
  display:flex;gap:28px;margin-bottom:28px;
  flex-wrap:wrap;
}
.wb-featured-spec{}
.wb-featured-spec-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9E8875;margin-bottom:3px;}
.wb-featured-spec-val{font-size:14px;font-weight:500;color:#2C1A0E;}
.wb-featured-stars{display:flex;align-items:center;gap:5px;margin-bottom:20px;}
.wb-star{color:#B8862A;font-size:13px;}
.wb-star.e{color:#E8DDD0;}
.wb-featured-price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:22px;}
.wb-featured-price{
  font-family:'Cormorant Garamond',serif;
  font-size:34px;font-weight:400;color:#2C1A0E;
}
.wb-featured-orig{font-size:15px;color:#B0A090;text-decoration:line-through;}
.wb-featured-save{font-size:12px;color:#2e7d32;font-weight:500;}
.wb-featured-btns{display:grid;grid-template-columns:1fr auto;gap:10px;}
.wb-btn-gold{
  display:flex;align-items:center;justify-content:center;gap:9px;
  background:#2C1A0E;color:#D4AF6A;border:none;
  padding:15px;font-family:'Jost',sans-serif;
  font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:background .2s;
}
.wb-btn-gold:hover{background:#B8862A;color:#fff;}
.wb-btn-wish{
  background:none;border:1px solid #E8DDD0;
  padding:15px 18px;cursor:pointer;
  color:#7A6656;transition:all .2s;display:flex;align-items:center;
}
.wb-btn-wish:hover{border-color:#B8862A;color:#B8862A;}
.wb-btn-wish.active{color:#c0392b;border-color:#c0392b;}

/* ── GRID CARDS ── */
.wb-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}
@media(max-width:1000px){.wb-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:580px){.wb-grid{grid-template-columns:1fr;}}

.wb-card{
  background:#fff;border:1px solid #EDE4D8;
  border-radius:4px;overflow:hidden;
  transition:box-shadow .3s,transform .3s;
  cursor:pointer;
}
.wb-card:hover{box-shadow:0 12px 40px rgba(44,26,14,.13);transform:translateY(-4px);}
.wb-card-img-wrap{position:relative;overflow:hidden;aspect-ratio:4/5;}
.wb-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease;}
.wb-card:hover .wb-card-img{transform:scale(1.06);}
.wb-card-badge{
  position:absolute;top:12px;left:12px;
  background:rgba(44,26,14,.82);color:#D4AF6A;
  font-size:9px;letter-spacing:2px;padding:4px 10px;
  text-transform:uppercase;border-radius:2px;
}
.wb-card-wish{
  position:absolute;top:10px;right:10px;
  background:rgba(255,255,255,.9);border:none;
  border-radius:50%;width:34px;height:34px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .2s;
}
.wb-card-wish:hover{background:#fff;transform:scale(1.08);}
.wb-card-occasions{
  position:absolute;bottom:12px;left:12px;
  display:flex;gap:5px;
}
.wb-card-occ-pill{
  background:rgba(44,26,14,.7);color:#D4AF6A;
  font-size:9px;letter-spacing:1px;padding:3px 8px;
  text-transform:uppercase;border-radius:2px;
  backdrop-filter:blur(4px);
}
.wb-card-body{padding:16px 18px 18px;}
.wb-card-tag{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#B8862A;margin-bottom:5px;}
.wb-card-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;font-weight:400;color:#2C1A0E;
  margin-bottom:3px;line-height:1.25;
}
.wb-card-sub{
  font-family:'Cormorant Garamond',serif;
  font-size:14px;font-style:italic;color:#9E8875;
  margin-bottom:10px;
}
.wb-card-meta{font-size:11px;color:#B0A090;margin-bottom:10px;}
.wb-card-stars{display:flex;align-items:center;gap:3px;margin-bottom:12px;}
.wb-card-rating{font-size:11px;color:#4A3728;font-weight:500;margin-left:2px;}
.wb-card-reviews{font-size:11px;color:#9E8875;}
.wb-card-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.wb-card-price{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#2C1A0E;}
.wb-card-orig{font-size:12px;color:#B0A090;text-decoration:line-through;margin-left:4px;}
.wb-card-add{
  display:flex;align-items:center;gap:6px;
  background:#2C1A0E;color:#D4AF6A;border:none;
  padding:9px 16px;font-family:'Jost',sans-serif;
  font-size:9px;font-weight:500;letter-spacing:2px;text-transform:uppercase;
  cursor:pointer;border-radius:2px;transition:background .2s;
  white-space:nowrap;
}
.wb-card-add:hover{background:#B8862A;color:#fff;}

/* ── TIMELINE / OCCASION JOURNEY ── */
.wb-journey{background:#2C1A0E;padding:70px 0;}
.wb-journey-inner{max-width:1400px;margin:0 auto;padding:0 40px;}
.wb-journey-head{text-align:center;margin-bottom:52px;}
.wb-journey-title{
  font-family:'Cormorant Garamond',serif;
  font-size:40px;font-weight:300;color:#FFFDF9;
  margin-bottom:8px;
}
.wb-journey-title em{font-style:italic;color:#D4AF6A;}
.wb-journey-sub{font-size:13px;color:#9E8875;font-weight:300;}
.wb-journey-track{
  display:flex;align-items:flex-start;
  gap:0;position:relative;
}
.wb-journey-track::before{
  content:'';position:absolute;
  top:20px;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,#B8862A 10%,#D4AF6A 50%,#B8862A 90%,transparent);
}
.wb-journey-step{
  flex:1;display:flex;flex-direction:column;
  align-items:center;text-align:center; 
  padding:0 12px;position:relative;z-index:1;
}
.wb-journey-dot{
  width:40px;height:40px;border-radius:50%;
  background:#2C1A0E;border:2px solid #B8862A;
  display:flex;align-items:center;justify-content:center;
  color:#D4AF6A;font-size:14px;
  margin-bottom:16px;flex-shrink:0;
  font-family:'Cormorant Garamond',serif;font-weight:600;
}
.wb-journey-step-title{
  font-family:'Cormorant Garamond',serif;
  font-size:17px;font-weight:400;color:#FFFDF9;
  margin-bottom:5px;
}
.wb-journey-step-desc{font-size:11px;color:#7A6656;line-height:1.55;font-weight:300;}
@media(max-width:768px){
  .wb-journey-track{flex-wrap:wrap;gap:28px;}
  .wb-journey-track::before{display:none;}
  .wb-journey-step{flex:0 0 calc(50% - 14px);}
  .wb-journey-inner{padding:0 20px;}
}

/* ── TESTIMONIALS ── */
.wb-testi{background:#FFFDF9;padding:70px 0;border-top:1px solid #E8DDD0;}
.wb-testi-inner{max-width:1200px;margin:0 auto;padding:0 40px;}
.wb-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
@media(max-width:900px){.wb-testi-grid{grid-template-columns:1fr 1fr;}}
@media(max-width:560px){.wb-testi-grid{grid-template-columns:1fr;}}
.wb-testi-card{
  background:#fff;border:1px solid #E8DDD0;
  border-radius:4px;padding:24px;
}
.wb-testi-stars{display:flex;gap:3px;margin-bottom:14px;}
.wb-testi-text{
  font-family:'Cormorant Garamond',serif;
  font-size:17px;font-style:italic;font-weight:300;
  color:#3D2B1A;line-height:1.65;margin-bottom:18px;
}
.wb-testi-text::before{content:'';color:#D4AF6A;font-size:28px;line-height:0;vertical-align:-10px;margin-right:3px;}
.wb-testi-divider{height:1px;background:#F0E8DC;margin-bottom:16px;}
.wb-testi-author{display:flex;align-items:center;gap:12px;}
.wb-testi-avatar{
  width:40px;height:40px;border-radius:50%;
  object-fit:cover;border:2px solid #E8D8C0;
}
.wb-testi-author-name{font-size:13px;font-weight:500;color:#2C1A0E;}
.wb-testi-author-meta{font-size:11px;color:#9E8875;margin-top:1px;}
.wb-testi-set{
  font-size:10px;letter-spacing:1px;
  color:#B8862A;margin-top:3px;text-transform:uppercase;
}

/* ── CTA BANNER ── */
.wb-cta{
  background:#1A0D05;
  padding:80px 40px;
  text-align:center;
  position:relative;overflow:hidden;
}
.wb-cta::before{
  content:'';position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.04'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E");
}
.wb-cta-inner{position:relative;z-index:1;max-width:620px;margin:0 auto;}
.wb-cta-tag{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#D4AF6A;margin-bottom:14px;display:block;}
.wb-cta-title{
  font-family:'Cormorant Garamond',serif;
  font-size:44px;font-weight:300;color:#FFFDF9;
  line-height:1.15;margin-bottom:14px;
}
.wb-cta-title em{font-style:italic;color:#D4AF6A;}
.wb-cta-sub{font-size:13px;color:#9E8875;font-weight:300;line-height:1.65;margin-bottom:36px;}
.wb-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.wb-cta-btn-a{
  display:inline-flex;align-items:center;gap:9px;
  background:#B8862A;color:#fff;border:none;
  padding:15px 36px;font-family:'Jost',sans-serif;
  font-size:11px;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:background .2s;text-decoration:none;
}
.wb-cta-btn-a:hover{background:#D4AF6A;color:#2C1A0E;}
.wb-cta-btn-b{
  display:inline-flex;align-items:center;gap:9px;
  background:transparent;color:#D4AF6A;
  border:1px solid #D4AF6A;
  padding:15px 36px;font-family:'Jost',sans-serif;
  font-size:11px;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:all .2s;text-decoration:none;
}
.wb-cta-btn-b:hover{background:#D4AF6A;color:#2C1A0E;}

/* ── Empty state ── */
.wb-empty{
  text-align:center;padding:80px 20px;
  background:#fff;border-radius:4px;
  border:1px solid #E8DDD0;
}
.wb-empty-icon{font-size:48px;margin-bottom:16px;}
.wb-empty-title{font-family:'Cormorant Garamond',serif;font-size:28px;color:#2C1A0E;margin-bottom:8px;}
.wb-empty-sub{font-size:13px;color:#9E8875;}

/* ── Responsive hero ── */
@media(max-width:768px){
  .wb-hero-content{padding:0 24px;}
  .wb-hero-dots{left:24px;}
  .wb-hero-scroll{display:none;}
  .wb-featured{grid-template-columns:1fr;}
  .wb-featured-main-img{min-height:300px;}
  .wb-featured-body{padding:28px 24px;}
  .wb-filter-btn{padding:14px 18px;}
  .wb-testi-inner{padding:0 16px;}
  .wb-cta{padding:60px 20px;}
}
`;

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════ */
function Stars({ n, size = 13 }) {
  return (
    <div className="wb-card-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`wb-star${i > Math.round(n) ? " e" : ""}`} style={{ fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function fmt(n) { return "₹ " + n.toLocaleString("en-IN"); }

function FeaturedCard({ set, wishlist, onWish }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="wb-featured">
      <div className="wb-featured-imgs">
        <img src={set.imgs[activeImg]} alt={set.name} className="wb-featured-main-img" />
        {set.badge && <span className="wb-featured-badge">{set.badge}</span>}
        <div className="wb-featured-thumb-row">
          {set.imgs.map((img, i) => (
            <img key={i} src={img} alt="" className={`wb-featured-thumb${activeImg === i ? " active" : ""}`}
              onClick={() => setActiveImg(i)} />
          ))}
        </div>
      </div>
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
            <p className="wb-featured-spec-val">{set.pieces} pc set</p>
          </div>
        </div>
        <div className="wb-featured-stars">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`wb-star${i > Math.round(set.rating) ? " e" : ""}`}>★</span>
          ))}
          <span style={{ fontSize:12, color:"#4A3728", fontWeight:500, marginLeft:5 }}>
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
        <p style={{ fontSize:11, color:"#9E8875", marginBottom:18 }}>{set.piecesList}</p>
        <div className="wb-featured-btns">
          <button className="wb-btn-gold"><ShoppingBag size={13} /> Add to Cart</button>
          <button
            className={`wb-btn-wish${wishlist[set.id] ? " active" : ""}`}
            onClick={() => onWish(set.id)}
          >
            <Heart size={16} fill={wishlist[set.id] ? "#c0392b" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SetCard({ set, wishlist, onWish }) {
  return (
    <div className="wb-card">
      <div className="wb-card-img-wrap">
        <img src={set.img} alt={set.name} className="wb-card-img" />
        {set.badge && <span className="wb-card-badge">{set.badge}</span>}
        <button
          className={`wb-card-wish${wishlist[set.id] ? " active" : ""}`}
          onClick={e => { e.stopPropagation(); onWish(set.id); }}
        >
          <Heart size={14} fill={wishlist[set.id] ? "#c0392b" : "none"} color={wishlist[set.id] ? "#c0392b" : "#4A3728"} />
        </button>
        <div className="wb-card-occasions">
          {set.occasion.slice(0,2).map(o => (
            <span key={o} className="wb-card-occ-pill">
              {occasions.find(oc => oc.id === o)?.label ?? o}
            </span>
          ))}
        </div>
      </div>
      <div className="wb-card-body">
        <p className="wb-card-tag">{set.tag} · {set.pieces} Piece Set</p>
        <p className="wb-card-name">{set.name}</p>
        <p className="wb-card-sub">{set.sub}</p>
        <p className="wb-card-meta">{set.metal} · {set.weight}</p>
        <div className="wb-card-stars">
          {[1,2,3,4,5].map(i => (
            <span key={i} className={`wb-star${i > Math.round(set.rating) ? " e" : ""}`} style={{ fontSize:12 }}>★</span>
          ))}
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
          <button className="wb-card-add"><ShoppingBag size={11} /> Add</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO SLIDE DATA
═══════════════════════════════════════════ */
const heroSlides = [
  { img: "https://picsum.photos/1600/900?random=401", eyebrow: "2025 Bridal Collection", title: "Crafted for\nYour", em: "Greatest Day" },
  { img: "https://picsum.photos/1600/900?random=402", eyebrow: "The Engagement Edit", title: "A Promise\nSet in", em: "Gold & Diamond" },
  { img: "https://picsum.photos/1600/900?random=403", eyebrow: "Heritage Craftsmanship", title: "Timeless Beauty\nFor Your", em: "Every Ritual" },
];

/* ═══════════════════════════════════════════
   JOURNEY STEPS
═══════════════════════════════════════════ */
const journeySteps = [
  { num: "01", title: "Engagement",   desc: "Solitaires & couple rings that mark the beginning" },
  { num: "02", title: "Mehendi",      desc: "Colourful meenakari & floral pieces for the joyful morning" },
  { num: "03", title: "Sangeet",      desc: "Polki & kundan sets to dazzle under the lights" },
  { num: "04", title: "Wedding Day",  desc: "Grand bridal sets — your most important look" },
  { num: "05", title: "Reception",    desc: "Diamonds & pearls for a refined evening statement" },
  { num: "06", title: "Honeymoon",    desc: "Wearable everyday pieces that travel with your story" },
];

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function WeddingPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist]         = useState({});
  const [heroIdx, setHeroIdx]           = useState(0);

  /* Auto-advance hero */
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const toggleWish = id => setWishlist(p => ({ ...p, [id]: !p[id] }));

  /* Filter sets */
  const filteredSets = activeFilter === "all"
    ? sets
    : sets.filter(s => s.occasion.includes(activeFilter));

  /* Featured = first of filtered (or fallback to first overall) */
  const featured = filteredSets[0] ?? sets[0];
  const gridSets = filteredSets.slice(1);

  /* Count per occasion for badges */
  const countFor = id =>
    id === "all" ? sets.length : sets.filter(s => s.occasion.includes(id)).length;

  return (
    <>
      <style>{S}</style>
      <div className="wb-root">

        {/* ══ HERO ══ */}
        <div className="wb-hero">
          <div className="wb-hero-slides">
            {heroSlides.map((slide, i) => (
              <div key={i} className={`wb-hero-slide${heroIdx === i ? " active" : ""}`}>
                <img src={slide.img} alt={slide.eyebrow} />
              </div>
            ))}
          </div>
          <div className="wb-hero-overlay" />

          <div className="wb-hero-content">
            <p className="wb-hero-eyebrow">{heroSlides[heroIdx].eyebrow}</p>
            <h1 className="wb-hero-title">
              {heroSlides[heroIdx].title.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
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
              <a href="#journey" className="wb-hero-btn-outline">
                Our Bridal Journey
              </a>
            </div>
          </div>

          {/* Dots */}
          <div className="wb-hero-dots">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`wb-hero-dot${heroIdx === i ? " active" : ""}`}
                onClick={() => setHeroIdx(i)}
              />
            ))}
          </div>

          {/* Scroll cue */}
          <div className="wb-hero-scroll">
            <div className="wb-hero-scroll-line" />
            <span className="wb-hero-scroll-text">Scroll</span>
          </div>
        </div>

        {/* ══ OCCASION FILTER BAR ══ */}
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

        {/* ══ COLLECTIONS ══ */}
        <div className="wb-section">
          {/* Section heading */}
          <div className="wb-section-label">
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
            {filteredSets.length} set{filteredSets.length !== 1 ? "s" : ""} · Handcrafted by master artisans
          </p>

          {filteredSets.length === 0 ? (
            <div className="wb-empty">
              <div className="wb-empty-icon">💍</div>
              <h3 className="wb-empty-title">No sets found</h3>
              <p className="wb-empty-sub">Try a different occasion filter above.</p>
            </div>
          ) : (
            <>
              {/* Featured large card */}
              <FeaturedCard set={featured} wishlist={wishlist} onWish={toggleWish} />

              {/* Grid cards */}
              {gridSets.length > 0 && (
                <div className="wb-grid" style={{ marginTop: 24 }}>
                  {gridSets.map(set => (
                    <SetCard key={set.id} set={set} wishlist={wishlist} onWish={toggleWish} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ BRIDAL JOURNEY TIMELINE ══ */}
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

        {/* ══ TESTIMONIALS ══ */}
        <div className="wb-testi">
          <div className="wb-testi-inner">
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#B8862A", display:"block", marginBottom:10 }}>Real Brides</span>
              <h2 className="wb-section-title" style={{ marginBottom:0 }}>Their <em>Stories</em></h2>
            </div>
            <div className="wb-testi-grid">
              {testimonials.map((t, i) => (
                <div key={i} className="wb-testi-card">
                  <div className="wb-testi-stars">
                    {[1,2,3,4,5].map(j => <span key={j} className="wb-star" style={{ fontSize:12 }}>★</span>)}
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

        {/* ══ CTA BANNER ══ */}
        <div className="wb-cta">
          <div className="wb-cta-inner">
            <span className="wb-cta-tag">Your Dream Bridal Look Awaits</span>
            <h2 className="wb-cta-title">Book a <em>Private</em><br />Bridal Consultation</h2>
            <p className="wb-cta-sub">
              Visit any MANAS store for a dedicated bridal session. Our specialists will help you
              curate the perfect set for every ceremony — at your pace, in complete privacy.
            </p>
            <div className="wb-cta-btns">
              <Link href="/contact" className="wb-cta-btn-a">
                Book Appointment <ArrowRight size={13} />
              </Link>
              <Link href="/listing" className="wb-cta-btn-b">
                Browse All Jewellery
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
