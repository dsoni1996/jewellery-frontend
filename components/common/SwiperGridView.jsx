"use client"
import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import ImageCard from "./ImageCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

const SwiperGridView = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8];

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunked = chunkArray(products, 4);

  return (
    <div className="hero-swiper">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `
      <span class="${className} diamond-icon-bullet">
        <svg viewBox="0 0 24 24" class="diamond-icon">
          <polygon points="12,2 22,12 12,22 2,12" />
        </svg>
      </span>
    `;
          },
        }}
      >
        {chunked.map((group, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {group.map((item) => (
                <div
                  key={item}
                  style={{
                    height: "220px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <ImageCard imgUrl={`https://picsum.photos/600/400?${item}`} />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperGridView;
