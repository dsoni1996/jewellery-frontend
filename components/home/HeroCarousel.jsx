"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ── Default slides (used when no settings from API) ── */
const DEFAULT_SLIDES = [
  {
    img:      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3fd145e1/homepage/tanishq-collections/sparkling-desktop.jpg",
    eyebrow:  "New Collection",
    title:    "Sparkling",
    titleEm:  "Avenues",
    subtitle: "Diamonds that dazzle, designs that endure",
    ctaLabel: "Explore Now",
    ctaHref:  "/listing",
  },
  {
    img:      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg",
    eyebrow:  "Earring Edit",
    title:    "Stunning",
    titleEm:  "Every Ear",
    subtitle: "Crafted to perfection, worn with pride",
    ctaLabel: "Shop Earrings",
    ctaHref:  "/listing?category=Earring",
  },
  {
    img:      "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw96c93899/homepage/tanishq-collections/ganesh-chaturthi.jpg",
    eyebrow:  "Festival Special",
    title:    "Celebrate",
    titleEm:  "Every Moment",
    subtitle: "Gold jewellery for life's most precious occasions",
    ctaLabel: "Discover More",
    ctaHref:  "/listing",
  },
];

const heroStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  .hero-root { position: relative; background: #1A0D05; }
  .hero-root .swiper { width: 100%; }
  .hero-slide { position: relative; overflow: hidden; }
  .hero-slide img { width: 100%; height: 88vh; min-height: 520px; object-fit: cover; display: block; filter: brightness(0.82); transition: transform 8s ease; }
  .swiper-slide-active .hero-slide img { transform: scale(1.04); }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(20,10,2,0.72) 0%, rgba(20,10,2,0.3) 60%, transparent 100%); display: flex; align-items: center; }
  .hero-content { padding: 0 80px; max-width: 600px; }
  .hero-tag { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 3.5px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .hero-tag::before { content: ''; display: block; width: 28px; height: 1px; background: #D4AF6A; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 68px); font-weight: 300; color: #FFFDF9; line-height: 1.1; margin-bottom: 16px; }
  .hero-title em { font-style: italic; color: #D4AF6A; }
  .hero-sub { font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300; color: #C8B89A; letter-spacing: 0.5px; margin-bottom: 36px; line-height: 1.6; }
  .hero-cta { display: inline-flex; align-items: center; gap: 10px; background: transparent; border: 1px solid #D4AF6A; color: #D4AF6A; font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; padding: 14px 32px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
  .hero-cta:hover { background: #D4AF6A; color: #2C1A0E; }
  .hero-root .swiper-pagination { bottom: 28px !important; }
  .hero-root .swiper-pagination-bullet { width: 6px; height: 6px; background: rgba(255,255,255,0.4); opacity: 1; transition: all 0.3s; border-radius: 50%; }
  .hero-root .swiper-pagination-bullet-active { background: #D4AF6A; width: 24px; border-radius: 3px; }
  .hero-scroll { position: absolute; bottom: 36px; right: 60px; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 6px; color: rgba(255,255,255,0.5); font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; }
  .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, #D4AF6A, transparent); }
  @media (max-width: 768px) { .hero-slide img { height: 60vh; } .hero-content { padding: 0 24px; } .hero-scroll { display: none; } }
`;

const HeroCarousel = ({ settings = {} }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ height: "88vh", background: "#1A0D05" }} />;

  /* Use API slides if provided, else fallback to defaults */
  const slides = (settings.slides && settings.slides.length > 0)
    ? settings.slides
    : DEFAULT_SLIDES;

  const delay = settings.autoplayDelay || 4500;

  return (
    <>
      <style>{heroStyles}</style>
      <div className="hero-root">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          slidesPerView={1}
          loop
          autoplay={{ delay, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="hero-slide">
                <img src={slide.img} alt={slide.eyebrow || slide.tag || "slide"} />
                <div className="hero-overlay">
                  <div className="hero-content">
                    <p className="hero-tag">{slide.eyebrow || slide.tag}</p>
                    <h1 className="hero-title">
                      {slide.title} {slide.titleEm && <><br /><em>{slide.titleEm}</em></>}
                    </h1>
                    <p className="hero-sub">{slide.subtitle || slide.sub}</p>
                    <Link href={slide.ctaHref || slide.href || "/listing"} className="hero-cta">
                      {slide.ctaLabel || slide.cta || "Explore Now"} <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          Scroll
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
