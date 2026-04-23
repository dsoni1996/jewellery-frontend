"use client";
import React, { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import api from "../../lib/api";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@300;400;500&display=swap');
  .pc-card { position: relative; background: #fff; border-radius: 4px; overflow: hidden; cursor: pointer; transition: box-shadow 0.3s ease; font-family: 'Jost', sans-serif; border: 1px solid #EDE4D8; }
  .pc-card:hover { box-shadow: 0 8px 32px rgba(44,26,14,0.14); }
  .pc-img-wrap { position: relative; overflow: hidden; background: #F5EDE3; aspect-ratio: 1; }
  .pc-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
  .pc-card:hover .pc-img { transform: scale(1.06); }
  .pc-badge { position: absolute; top: 12px; left: 12px; background: #2C1A0E; color: #D4AF6A; font-size: 9px; font-weight: 500; letter-spacing: 1.5px; padding: 4px 9px; text-transform: uppercase; border-radius: 2px; }
  .pc-wish { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; backdrop-filter: blur(4px); }
  .pc-wish:hover { background: #fff; transform: scale(1.08); }
  .pc-wish.active { color: #c0392b; }
  .pc-quick-add { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(44,26,14,0.88); color: #E8C96A; font-size: 11px; font-weight: 500; letter-spacing: 2px; text-align: center; padding: 11px; opacity: 0; transform: translateY(100%); transition: all 0.3s ease; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; backdrop-filter: blur(4px); }
  .pc-card:hover .pc-quick-add { opacity: 1; transform: translateY(0); }
  .pc-body { padding: 14px 14px 16px; }
  .pc-title { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 400; color: #2C1A0E; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px; }
  .pc-meta { font-size: 11px; color: #9E8875; letter-spacing: 0.5px; margin-bottom: 8px; }
  .pc-footer { display: flex; align-items: center; justify-content: space-between; }
  .pc-price { font-size: 16px; font-weight: 500; color: #2C1A0E; font-family: 'Jost', sans-serif; }
  .pc-rating { display: flex; align-items: center; gap: 3px; font-size: 11px; color: #B8862A; }
  .pc-gold-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #D4AF6A, #B8862A); display: inline-block; }
`;

const ProductCard = ({ product }) => {
  const { title, price, imgUrl, id , occasion} = product;
  const [wishlisted, setWishlisted] = useState(false);


    const handleAddToCart = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const token = localStorage.getItem("manas_token");

      console.log('Adding to cart, token:', token)
      if (!token) {
        alert("Login required");
        return;
      }

      try {
        await api.cart.add(id, 1);
        alert("Added to cart ✅");
      } catch (err) {
        console.error(err);
        alert("Failed to add to cart");
      } finally {
      }
    };

    const handleWishlist = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const token = localStorage.getItem("manas_token");
      if (!token) {
        alert("Login required");
        return;
      }

      try {
        await api.wishlist.toggle(id, token);
        setWishlisted((prev) => !prev);
      } catch (err) {
        console.error(err);
        alert("Wishlist error");
      }
    };

    console.log('product',product)

  return (
    <>
      <style>{cardStyles}</style>
      <Link className="pc-card" href={`/product/${product.slug}`}>
        <div className="pc-img-wrap">
          <img
            src={`https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`}
            className="pc-img"
            alt={title}
          />
          {occasion.map((accation, index) => (
            <span className="pc-badge" key={index}>{accation}</span>
          ))}
          <button
            className={`pc-wish${wishlisted ? " active" : ""}`}
            onClick={(e) => handleWishlist(e)}
          >
            <Heart
              size={14}
              fill={wishlisted ? "#c0392b" : "none"}
              color={wishlisted ? "#c0392b" : "#4A3728"}
            />
          </button>
          <button className="pc-quick-add" onClick={handleAddToCart}>
            <ShoppingBag size={13} /> ADD TO BAG
          </button>
        </div>
        <div className="pc-body">
          {title && (
            <>
              <p className="pc-title">{title}</p>
              <p className="pc-meta">
                22 KT Gold &nbsp;·&nbsp; <span className="pc-gold-dot" />
              </p>
              <div className="pc-footer">
                <span className="pc-price">
                  {price ? `₹ ${Number(price).toLocaleString("en-IN")}` : "₹ —"}
                </span>
                <span className="pc-rating">★★★★☆</span>
              </div>
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
