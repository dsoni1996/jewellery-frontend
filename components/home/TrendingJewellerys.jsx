import TitleSection from "../common/TitleSection";
import Link from "next/link";

const DEFAULT_ITEMS = [
  { img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw96c93899/homepage/tanishq-collections/ganesh-chaturthi.jpg",   tag: "Festive", title: "Ganesh Chaturthi Special", desc: "Sacred gold pieces for your most auspicious moments",                  price: "₹ 45,000 onwards" },
  { img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3fd145e1/homepage/tanishq-collections/sparkling-desktop.jpg",  tag: "Diamond", title: "Sparkling Avenues",        desc: "VVS diamonds set in 18K white and yellow gold",                        price: "₹ 1,20,000 onwards" },
  { img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg", tag: "Trending",title: "Ear Candy Edit",           desc: "From subtle drops to bold chandeliers — all day, every day",          price: "₹ 18,000 onwards" },
];

const fmtPrice = p => p?.current ? "₹ " + Number(p.current).toLocaleString("en-IN") : null;

const TrendingJewellerys = ({ settings = {}, products = [] }) => {
  const title    = settings.title    || "Trending <em>Now</em>";
  const subtitle = settings.subtitle || "Jewellery pieces everyone's eyeing right now";
  const ctaLink  = settings.ctaLink  || "/listing";
  const ctaText  = settings.ctaText  || "View All";

  /* Use real products from API if provided, else fallback to defaults */
  const items = products.length > 0
    ? products.map(p => ({
        img:   p.thumbnail,
        tag:   p.metal?.purity || "Gold",
        title: p.name,
        desc:  p.description || "",
        price: fmtPrice(p.price) || "",
        slug:  p.slug,
      }))
    : DEFAULT_ITEMS;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500&display=swap');
        .tj-section { background: #FFFDF9; padding: 20px 0 70px; }
        .tj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .tj-card { background: #fff; border: 1px solid #EDE4D8; border-radius: 4px; overflow: hidden; transition: box-shadow 0.3s, transform 0.3s; cursor: pointer; text-decoration: none; display: block; }
        .tj-card:hover { box-shadow: 0 12px 40px rgba(44,26,14,0.13); transform: translateY(-4px); }
        .tj-card-img-wrap { position: relative; overflow: hidden; }
        .tj-card-img-wrap img { width: 100%; height: 340px; object-fit: cover; display: block; transition: transform 0.6s ease; background: #F5EDE3; }
        .tj-card:hover .tj-card-img-wrap img { transform: scale(1.05); }
        .tj-tag { position: absolute; top: 14px; left: 14px; background: rgba(44,26,14,0.82); color: #D4AF6A; font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 2px; padding: 5px 12px; text-transform: uppercase; border-radius: 2px; }
        .tj-card-body { padding: 20px 20px 22px; }
        .tj-card-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #2C1A0E; margin-bottom: 7px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tj-card-desc { font-family: 'Jost', sans-serif; font-size: 13px; color: #7A6656; line-height: 1.55; margin-bottom: 14px; font-weight: 300; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .tj-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .tj-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #2C1A0E; font-weight: 400; }
        .tj-shop-btn { font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: #B8862A; display: flex; align-items: center; gap: 5px; transition: gap 0.2s; }
        .tj-card:hover .tj-shop-btn { gap: 8px; }
        .tj-cta-wrap { display: flex; justify-content: center; margin-top: 36px; }
        .tj-cta { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #D4C4B0; color: #4A3728; padding: 12px 28px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all .25s; }
        .tj-cta:hover { background: #2C1A0E; color: #D4AF6A; border-color: #2C1A0E; }
        @media (max-width: 900px) { .tj-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 580px) { .tj-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="tj-section">
        <TitleSection title={title} subtitle={subtitle} width="1320px">
          <div className="tj-grid">
            {items.map((item, i) => (
              <Link href={item.slug ? `/product?slug=${item.slug}` : "/listing"} key={i} className="tj-card">
                <div className="tj-card-img-wrap">
                  <img src={item.img} alt={item.title} />
                  <span className="tj-tag">{item.tag}</span>
                </div>
                <div className="tj-card-body">
                  <h3 className="tj-card-title">{item.title}</h3>
                  <p className="tj-card-desc">{item.desc}</p>
                  <div className="tj-card-footer">
                    <span className="tj-price">{item.price}</span>
                    <span className="tj-shop-btn">Shop Now →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="tj-cta-wrap">
            <Link href={ctaLink} className="tj-cta">{ctaText} →</Link>
          </div>
        </TitleSection>
      </section>
    </>
  );
};

export default TrendingJewellerys;
