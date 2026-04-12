import Link from "next/link";

const arrivals = [
  { id: 1, title: "Silver Idols", sub: "Festive Edition", price: "₹ 12,500 onwards", img: "https://picsum.photos/600/420?random=81" },
  { id: 2, title: "Floral Bloom", sub: "Summer Collection", price: "₹ 28,000 onwards", img: "https://picsum.photos/600/420?random=82" },
  { id: 3, title: "Heritage Craft", sub: "Artisan Series", price: "₹ 45,000 onwards", img: "https://picsum.photos/600/420?random=83" },
];

const NewArrival = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
      .na-section { background: #2C1A0E; padding: 0 0 0; overflow: hidden; }
      .na-hero { position: relative; padding: 80px 60px; display: flex; align-items: center; gap: 60px; }
      .na-hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.04'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3C/g%3E%3C/svg%3E"); }
      .na-hero-text { position: relative; z-index: 1; max-width: 480px; }
      .na-hero-tag { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF6A; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .na-hero-tag::before { content: ''; display: block; width: 28px; height: 1px; background: #D4AF6A; }
      .na-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 56px; font-weight: 300; color: #FFFDF9; line-height: 1.1; margin-bottom: 16px; }
      .na-hero-title em { font-style: italic; color: #D4AF6A; }
      .na-hero-desc { font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300; color: #9E8875; line-height: 1.7; margin-bottom: 32px; }
      .na-hero-cta { display: inline-flex; align-items: center; gap: 10px; border: 1px solid #D4AF6A; color: #D4AF6A; padding: 13px 28px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all 0.3s; }
      .na-hero-cta:hover { background: #D4AF6A; color: #2C1A0E; }
      .na-gold-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,106,0.4) 50%, transparent); }
      .na-cards-wrap { padding: 0 40px 56px; }
      .na-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
      .na-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(212,175,106,0.2); border-radius: 4px; overflow: hidden; cursor: pointer; transition: border-color 0.3s, transform 0.3s; text-decoration: none; display: block; }
      .na-card:hover { border-color: #D4AF6A; transform: translateY(-4px); }
      .na-card img { width: 100%; height: 200px; object-fit: cover; display: block; filter: brightness(0.88); transition: filter 0.3s; }
      .na-card:hover img { filter: brightness(1); }
      .na-card-body { padding: 16px 18px 18px; }
      .na-card-sub { font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 5px; }
      .na-card-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: #FFFDF9; margin-bottom: 6px; }
      .na-card-price { font-family: 'Jost', sans-serif; font-size: 12px; color: #9E8875; }
      .na-cards-tag { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF6A; display: flex; align-items: center; gap: 10px; }
      .na-cards-tag::before { content: ''; display: block; width: 20px; height: 1px; background: #D4AF6A; }
      @media (max-width: 900px) { .na-hero { flex-direction: column; padding: 50px 24px; } .na-cards { grid-template-columns: 1fr 1fr; } .na-cards-wrap { padding: 0 16px 40px; } }
      @media (max-width: 560px) { .na-cards { grid-template-columns: 1fr; } .na-hero-title { font-size: 38px; } }
    `}</style>
    <section className="na-section">
      <div className="na-hero">
        <div className="na-hero-text">
          <p className="na-hero-tag">Monday — Friday</p>
          <h2 className="na-hero-title">New <em>Arrivals</em><br />Dropping Daily</h2>
          <p className="na-hero-desc">Explore the latest launches — fresh designs crafted by our master artisans, delivered straight from our ateliers to you.</p>
          <Link href="/listing" className="na-hero-cta">Explore New Arrivals →</Link>
        </div>
      </div>

      <div className="na-gold-line" />

      <div className="na-cards-wrap">
        <p className="na-cards-tag" style={{ paddingTop: "32px" }}>Latest Drops</p>
        <div className="na-cards">
          {arrivals.map(item => (
            <Link href="/listing" key={item.id} className="na-card">
              <img src={item.img} alt={item.title} />
              <div className="na-card-body">
                <p className="na-card-sub">{item.sub}</p>
                <p className="na-card-title">{item.title}</p>
                <p className="na-card-price">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default NewArrival;
