import ProductImages from "../../../components/product/ProductImages";
import ProductInfo from "../../../components/product/ProductInfo";
import ProductDetails from "../../../components/product/ProductDetails";
import api from "@/lib/api";

// Square jewellery images work best for the magnifier
const images = [
  "https://picsum.photos/800/800?random=10",
  "https://picsum.photos/800/800?random=20",
  "https://picsum.photos/800/800?random=30",
  "https://picsum.photos/800/800?random=40",
];

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');
  .pp-root { background: #FAF6F0; min-height: 100vh; }
  .pp-breadcrumb {
    max-width: 1400px; margin: 0 auto;
    padding: 18px 40px 0;
    font-family: 'Jost', sans-serif;
    font-size: 11px; letter-spacing: 1px; color: #9E8875;
  }
  .pp-breadcrumb span { color: #B8862A; }
  .pp-top {
    max-width: 1400px; margin: 0 auto;
    padding: 24px 40px 40px;
    display: grid;
    grid-template-columns: 1fr 480px;
    gap: 48px;
    align-items: start;
    background: #fff;
    margin-top: 12px;
  }
  @media (max-width: 1100px) {
    .pp-top { grid-template-columns: 1fr 420px; gap: 32px; padding: 20px 24px 32px; }
  }
  @media (max-width: 900px) {
    .pp-top { grid-template-columns: 1fr; padding: 16px; gap: 24px; }
    .pp-breadcrumb { padding: 16px 16px 0; }
  }
`;

const ProductPage = async ({ params }) => {
  const { slug } = await params;

  const { product } = await api.products.getOne(slug);

  return (
    <>
      <style>{pageStyles}</style>
      <div className="pp-root">
        {/* Breadcrumb */}
        <p className="pp-breadcrumb">
          Home / Jewellery / Necklaces / <span>Aakarshan Gold Necklace</span>
        </p>

        {/* Main section: image LEFT, info RIGHT */}
        <div className="pp-top">
          <ProductImages images={product.images} />
          <ProductInfo product={product}/>
        </div>

        {/* Details + Price Breakup tabs below */}
        <ProductDetails product={product} />
      </div>
    </>
  );
};

export default ProductPage;
