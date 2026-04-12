// import { products } from "../../components/data/products";
import ProductCard from "../../components/common/ProductCard";
import api from "@/lib/api";

const listingStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
  .pl-root { background: #FAF6F0; min-height: 100vh; padding: 40px 0 80px; }
  .pl-hero { background: #2C1A0E; color: #FFFDF9; text-align: center; padding: 70px 20px 50px; position: relative; overflow: hidden; }
  .pl-hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.06'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
  .pl-hero-content { position: relative; z-index: 1; }
  .pl-breadcrumb { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 2px; color: #C4A46A; text-transform: uppercase; margin-bottom: 16px; }
  .pl-hero-title { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; letter-spacing: 4px; margin-bottom: 8px; }
  .pl-hero-title em { font-style: italic; color: #D4AF6A; }
  .pl-hero-sub { font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 2px; color: #9E8B70; text-transform: uppercase; }
  .pl-gold-line { height: 1px; background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent); margin: 0; }
  .pl-filters { background: #fff; border-bottom: 1px solid #EDE4D8; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; font-family: 'Jost', sans-serif; font-size: 12px; }
  .pl-filter-group { display: flex; gap: 24px; }
  .pl-filter-btn { background: none; border: 1px solid #D4C4B0; color: #4A3728; padding: 7px 18px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.2s; font-family: 'Jost', sans-serif; }
  .pl-filter-btn:hover { background: #2C1A0E; color: #D4AF6A; border-color: #2C1A0E; }
  .pl-sort { font-size: 12px; color: #6B5744; display: flex; align-items: center; gap: 8px; }
  .pl-sort select { border: 1px solid #D4C4B0; padding: 7px 12px; font-size: 11px; color: #4A3728; background: #fff; outline: none; cursor: pointer; font-family: 'Jost', sans-serif; border-radius: 2px; }
  .pl-count { font-size: 12px; color: #9E8875; letter-spacing: 0.5px; }
  .pl-container { max-width: 1400px; margin: 0 auto; padding: 40px 40px 0; }
  .pl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  @media (max-width: 1100px) { .pl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) { .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } .pl-container { padding: 24px 16px 0; } .pl-filters { padding: 12px 16px; flex-wrap: wrap; gap: 10px; } .pl-hero-title { font-size: 36px; } }
  @media (max-width: 420px) { .pl-grid { grid-template-columns: 1fr; } }
`;

const ProductListing = async () => {

const { products } = await api.products.getAll({ });

  return (
    <>
      <style>{listingStyles}</style>
      <div className="pl-root">
        <div className="pl-hero">
          <div className="pl-hero-content">
            <p className="pl-breadcrumb">Home &nbsp;/&nbsp; Jewellery &nbsp;/&nbsp; Rings</p>
            <h1 className="pl-hero-title">Finger <em>Rings</em></h1>
            <p className="pl-hero-sub">{products.length} Exquisite Designs</p>
          </div>
        </div>
        <div className="pl-gold-line" />

        <div className="pl-filters">
          <div className="pl-filter-group">
            <button className="pl-filter-btn">Filter ▾</button>
            <button className="pl-filter-btn">Gold ▾</button>
            <button className="pl-filter-btn">Price ▾</button>
            <button className="pl-filter-btn">Karatage ▾</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span className="pl-count">{products.length} products</span>
            <div className="pl-sort">
              <span>Sort:</span>
              <select>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pl-container">
          <div className="pl-grid">
            {products.map((item) => {
              const product = {
                imgUrl: item.thumbnail,
                title: item.name,
                price: item.price?.current,
                slug: item.slug,
              };
              return <ProductCard product={product} key={item.id} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
