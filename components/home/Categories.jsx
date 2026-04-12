import TitleSection from "../common/TitleSection";
import ImageCard from "../common/ImageCard";

const categoriesData = [
  { id: 1, title: "Rings", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/rings-cat.jpg" },
  { id: 2, title: "Earrings", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/earrings-cat.jpg" },
  { id: 3, title: "Necklaces", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/necklaces-cat.jpg" },
  { id: 4, title: "Bracelets", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/bracelets-cat.jpg" },
  { id: 5, title: "Bangles", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/bangles-cat.jpg" },
  { id: 6, title: "Mangalsutras", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/mangalsutra-cat.jpg" },
  { id: 7, title: "Pendants", imgUrl: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2562a9fe/homepage/shopByCategory/pendants-cat.jpg" },
];

const Categories = () => (
  <>
    <style>{`
      .cat-section { background: #FFFDF9; padding: 20px 0 60px; }
      .cat-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 20px; padding: 0 20px; }
      .cat-view-all { display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; gap: 8px; }
      .cat-view-all-ring { width: 100%; aspect-ratio: 1; border-radius: 50%; border: 2px dashed #D4AF6A; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #FBF6EE, #F5EDE3); transition: all 0.3s; }
      .cat-view-all-ring:hover { border-style: solid; border-color: #B8862A; }
      .cat-view-all-num { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #B8862A; display: block; line-height: 1; }
      .cat-view-all-label { font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #9E8875; text-align: center; padding: 0 4px; line-height: 1.4; }
      .cat-view-all-title { font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #B8862A; margin-top: 12px; }
      @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; } }
      @media (max-width: 500px) { .cat-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
    `}</style>
    <section className="cat-section">
      <TitleSection title={'Find Your Perfect <em>Match</em>'} subtitle="Shop by Categories" width="1320px">
        <div className="cat-grid">
          {categoriesData.map((item) => (
            <ImageCard key={item.id} title={item.title} imgUrl={item.imgUrl} />
          ))}
          <div className="cat-view-all">
            <div className="cat-view-all-ring">
              <div style={{ textAlign: "center" }}>
                <span className="cat-view-all-num">10+</span>
                <p className="cat-view-all-label">More to explore</p>
              </div>
            </div>
            <p className="cat-view-all-title">View All</p>
          </div>
        </div>
      </TitleSection>
    </section>
  </>
);

export default Categories;
