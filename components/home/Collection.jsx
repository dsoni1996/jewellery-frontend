import TitleSection from "../common/TitleSection";
import Link from "next/link";

const collectionItems = [
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3fd145e1/homepage/tanishq-collections/sparkling-desktop.jpg",
    title: "Sparkling Avenues",
    sub: "Diamond Collection",
    span: "large",
  },
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg",
    title: "Stunning Every Ear",
    sub: "Earring Edit",
    span: "small",
  },
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw96c93899/homepage/tanishq-collections/ganesh-chaturthi.jpg",
    title: "Festive Splendour",
    sub: "Occasion Wear",
    span: "small",
  },
];

const Collection = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500&display=swap');
      .coll-section { background: #FAF6F0; padding: 20px 0 70px; }
      .coll-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; gap: 14px; }
      .coll-item { position: relative; overflow: hidden; border-radius: 4px; cursor: pointer; background: #1A0D05; }
      .coll-item.large { grid-row: 1 / 3; }
      .coll-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease, filter 0.4s; min-height: 240px; filter: brightness(0.9); }
      .coll-item:hover img { transform: scale(1.05); filter: brightness(0.75); }
      .coll-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 24px 24px; background: linear-gradient(to top, rgba(20,10,2,0.85) 0%, transparent 100%); transform: translateY(10px); opacity: 0; transition: all 0.35s ease; }
      .coll-item:hover .coll-label { opacity: 1; transform: translateY(0); }
      .coll-label-always { position: absolute; bottom: 20px; left: 24px; }
      .coll-sub { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 4px; }
      .coll-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #FFFDF9; }
      .coll-explore { font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF6A; margin-top: 8px; display: flex; align-items: center; gap: 7px; text-decoration: none; }
      .coll-explore::after { content: '→'; }
      @media (max-width: 640px) { .coll-grid { grid-template-columns: 1fr; } .coll-item.large { grid-row: auto; } }
    `}</style>
    <section className="coll-section">
      <TitleSection title={'Manas <em>Collections</em>'} subtitle="Explore our newly launched collection" width="1320px">
        <div className="coll-grid">
          {collectionItems.map((item, i) => (
            <Link href="/listing" key={i} className={`coll-item${item.span === "large" ? " large" : ""}`}>
              <img src={item.img} alt={item.title} />
              <div className="coll-label-always">
                <p className="coll-sub">{item.sub}</p>
                <p className="coll-title">{item.title}</p>
              </div>
              <div className="coll-label">
                <span className="coll-explore">Explore Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </TitleSection>
    </section>
  </>
);

export default Collection;
