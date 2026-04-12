"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ImageCard = ({ title, imgUrl }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <style>{`
        .ic-wrap { display: flex; flex-direction: column; align-items: center; cursor: pointer; text-decoration: none; color: inherit; }
        .ic-img-ring { border-radius: 50%; overflow: hidden; position: relative; border: 2px solid #E8DDD0; transition: border-color 0.3s, box-shadow 0.3s; aspect-ratio: 1; }
        .ic-img-ring.hovered { border-color: #B8862A; box-shadow: 0 0 0 3px rgba(184,134,42,0.18); }
        .ic-img-ring img { transition: transform 0.5s ease; }
        .ic-img-ring.hovered img { transform: scale(1.08); }
        .ic-title { font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 400; letter-spacing: 1.5px; text-transform: uppercase; color: #4A3728; margin-top: 12px; transition: color 0.2s; text-align: center; }
        .ic-wrap:hover .ic-title { color: #B8862A; }
        .ic-dot { width: 4px; height: 4px; background: #B8862A; border-radius: 50%; margin: 6px auto 0; opacity: 0; transition: opacity 0.2s; }
        .ic-wrap:hover .ic-dot { opacity: 1; }
      `}</style>
      <Link
        href="/listing"
        className="ic-wrap"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`ic-img-ring${hovered ? " hovered" : ""}`}>
          <Image
            src={imgUrl}
            alt={title || "category"}
            width={160}
            height={160}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {title && <p className="ic-title">{title}</p>}
        <div className="ic-dot" />
      </Link>
    </>
  );
};

export default ImageCard;
