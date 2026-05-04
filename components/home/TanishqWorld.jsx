


const WORLD_ITEMS = [
  { id:1, img:"https://picsum.photos/600/900?random=91",  tag:"Craftsmanship", title:"Master Artisans",       desc:"40 years of handcrafted excellence — every piece a legacy", href:"/about"                   },
  { id:2, img:"https://picsum.photos/500/400?random=92",  tag:"Bridal",        title:"Wedding Edit",          desc:"Curated for your most precious day",                         href:"/wedding"                 },
  { id:3, img:"https://picsum.photos/500/400?random=93",  tag:"Festive",       title:"Celebration Pieces",    desc:"Gold that marks every milestone",                            href:"/listing?occasion=Festive"},
  { id:4, img:"https://picsum.photos/900/400?random=94",  tag:"New Season",    title:"Latest Arrivals",       desc:"Fresh designs from our master artisans",                     href:"/listing"                 },
];

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  .mw-wrap { font-family:'Jost',sans-serif; padding:48px 0 0; background:#FAF6F0; }
  .mw-header { text-align:center; margin-bottom:36px; }
  .mw-eyebrow { font-size:10px; letter-spacing:3.5px; text-transform:uppercase; color:#B8862A; display:flex; align-items:center; justify-content:center; gap:14px; margin-bottom:12px; }
  .mw-eyebrow::before,.mw-eyebrow::after { content:''; width:40px; height:1px; background:linear-gradient(90deg,transparent,#B8862A); }
  .mw-eyebrow::after { transform:scaleX(-1); }
  .mw-title { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:#2C1A0E; line-height:1.1; margin-bottom:8px; }
  .mw-title em { font-style:italic; color:#B8862A; }
  .mw-subtitle { font-size:12.5px; color:#9E8875; font-weight:300; letter-spacing:0.5px; }

  .mw-grid { display:grid; grid-template-columns:1.15fr 0.85fr 1fr; grid-template-rows:300px 240px; gap:6px; margin:0 0 6px; }
  .mw-card { position:relative; overflow:hidden; cursor:pointer; display:block; text-decoration:none; }
  .mw-card:nth-child(1) { grid-column:1; grid-row:1/3; }
  .mw-card:nth-child(2) { grid-column:2; grid-row:1; }
  .mw-card:nth-child(3) { grid-column:3; grid-row:1; }
  .mw-card:nth-child(4) { grid-column:2/4; grid-row:2; }

  .mw-card img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s; filter:brightness(0.68) saturate(0.9); }
  .mw-card:hover img { transform:scale(1.07); filter:brightness(0.5) saturate(1.1); }
  .mw-card::before { content:''; position:absolute; inset:0; background:linear-gradient(160deg,rgba(20,8,2,0.1) 0%,rgba(20,8,2,0.65) 100%); z-index:1; transition:opacity 0.4s; }
  .mw-card:hover::before { opacity:0.85; }
  .mw-card::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:linear-gradient(90deg,#B8862A,#E8C96A,#B8862A); z-index:3; transition:width 0.5s ease; }
  .mw-card:hover::after { width:100%; }

  .mw-content { position:absolute; bottom:0; left:0; right:0; padding:24px 26px; z-index:2; transform:translateY(4px); transition:transform 0.35s ease; }
  .mw-card:hover .mw-content { transform:translateY(0); }
  .mw-tag { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:#D4AF6A; display:flex; align-items:center; gap:8px; margin-bottom:7px; }
  .mw-tag::before { content:''; width:18px; height:1px; background:#D4AF6A; display:block; flex-shrink:0; }
  .mw-card-title { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:400; color:#FFFDF9; line-height:1.2; margin-bottom:5px; }
  .mw-card:nth-child(1) .mw-card-title { font-size:32px; }
  .mw-card:nth-child(4) .mw-card-title { font-size:26px; }
  .mw-card-desc { font-size:12px; font-weight:300; color:rgba(255,255,255,0.55); opacity:0; transform:translateY(8px); transition:opacity 0.3s ease 0.08s,transform 0.3s ease 0.08s; max-width:340px; }
  .mw-card:hover .mw-card-desc { opacity:1; transform:translateY(0); }

  .mw-arrow { position:absolute; top:18px; right:18px; width:34px; height:34px; border:1px solid rgba(212,175,106,0.35); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#D4AF6A; font-size:14px; z-index:2; opacity:0; transform:scale(0.8) rotate(-45deg); transition:opacity 0.3s,transform 0.3s; }
  .mw-card:hover .mw-arrow { opacity:1; transform:scale(1) rotate(0deg); }

  .mw-strip { background:#2C1A0E; display:flex; align-items:center; justify-content:space-between; padding:18px 28px; }
  .mw-strip-text { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#D4AF6A; }
  .mw-strip-dots { display:flex; gap:6px; }
  .mw-strip-dot { width:5px; height:5px; border-radius:50%; background:rgba(212,175,106,0.3); }
  .mw-strip-dot:nth-child(2) { background:#D4AF6A; }
  .mw-strip-cta { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#9E8875; display:flex; align-items:center; gap:8px; cursor:pointer; transition:color 0.2s; border:none; background:none; font-family:'Jost',sans-serif; }
  .mw-strip-cta:hover { color:#D4AF6A; }
  .mw-strip-cta::after { content:'→'; font-size:12px; }

  @media(max-width:900px) {
    .mw-grid { grid-template-columns:1fr 1fr; grid-template-rows:240px 200px 200px; }
    .mw-card:nth-child(1) { grid-column:1/3; grid-row:1; }
    .mw-card:nth-child(2) { grid-column:1; grid-row:2; }
    .mw-card:nth-child(3) { grid-column:2; grid-row:2; }
    .mw-card:nth-child(4) { grid-column:1/3; grid-row:3; }
  }
  @media(max-width:560px) {
    .mw-grid { grid-template-columns:1fr; grid-template-rows:unset; }
    .mw-card,.mw-card:nth-child(n) { grid-column:1 !important; grid-row:unset !important; height:220px; }
    .mw-title { font-size:32px; }
  }
`;

import Link from "next/link";
import TitleSection from "../common/TitleSection";

const ManasWorld = ({ settings = {} }) => {
  const title    = settings.title    || "The MANAS <em>World</em>";
  const subtitle = settings.subtitle || "Explore The Universe";

  return (
    <>
      <style>{S}</style>
      <TitleSection title={title} subtitle={subtitle} width="1320px">



      {/* <section className="mw-wrap"> */}
        {/* <div className="mw-header">
          <div className="mw-eyebrow">Explore The Universe</div>
          <h2 className="mw-title" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="mw-subtitle">{subtitle}</p>
        </div> */}

        <div className="mw-grid">
          {WORLD_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} className="mw-card">
              <img src={item.img} alt={item.tag} />
              <div className="mw-content">
                <p className="mw-tag">{item.tag}</p>
                <p className="mw-card-title">{item.title}</p>
                <p className="mw-card-desc">{item.desc}</p>
              </div>
              <span className="mw-arrow">↗</span>
            </Link>
          ))}
        </div>

        {/* <div className="mw-strip">
          <span className="mw-strip-text">MANAS Jewellers · Since 1985</span>
          <div className="mw-strip-dots">
            <div className="mw-strip-dot" />
            <div className="mw-strip-dot" />
            <div className="mw-strip-dot" />
          </div>
          <Link href="/listing" className="mw-strip-cta">Explore All</Link>
        </div> */}
      {/* </section> */}
      </TitleSection>
    </>
  );
};

export default ManasWorld;