import React, { useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "../../app/product/ProductInfo";
import "./product.css";
import ProductDetails from "../../app/product/ProductDetails";

const images = [
  "https://picsum.photos/1200/500?1",
  "https://picsum.photos/1200/500?2",
  "https://picsum.photos/1200/500?3",
  "https://picsum.photos/1200/500?4",
];

const ProductPage = () => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3 md:p-6 bg-[#fff] ">
        <ProductImages
          images={images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
        <ProductInfo />
      </div>
      <ProductDetails />
    </>
  );
};

export default ProductPage;
