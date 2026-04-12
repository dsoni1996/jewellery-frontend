"use client";
import React, { useState, useRef } from "react";
import Thumbnail from "./Thumbnail";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');

  /* ── Outer wrapper: image left, magnified lens right ── */
  .pim-wrapper {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    font-family: 'Jost', sans-serif;
  }

  /* ── Left column: thumbnails + main image ── */
  .pim-left {
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  /* Vertical thumbnail strip */
  .pim-thumbs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }
  .pim-thumb {
    width: 68px;
    height: 68px;
    object-fit: cover;
    border-radius: 3px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #F5EDE3;
    display: block;
  }
  .pim-thumb.active {
    border-color: #B8862A;
    box-shadow: 0 0 0 2px rgba(184,134,42,0.2);
  }
  .pim-thumb:hover:not(.active) { border-color: #D4C4B0; }

  /* Main image container */
  .pim-main {
    flex: 1;
    min-width: 0;
    position: relative;
    background: #F5EDE3;
    border-radius: 4px;
    overflow: hidden;
    cursor: crosshair;
    /* aspect-ratio keeps it square */
    aspect-ratio: 1 / 1;
  }
  .pim-main img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    user-select: none;
  }

  /* Lens overlay box that follows the cursor */
  .pim-lens {
    position: absolute;
    border: 2px solid #B8862A;
    background: rgba(184,134,42,0.08);
    pointer-events: none;
    border-radius: 2px;
    display: none;
  }
  .pim-main:hover .pim-lens { display: block; }

  /* Hint text */
  .pim-hint {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(44,26,14,0.65);
    color: #D4AF6A;
    font-size: 10px;
    letter-spacing: 1.5px;
    padding: 5px 12px;
    text-transform: uppercase;
    border-radius: 2px;
    pointer-events: none;
    backdrop-filter: blur(4px);
    white-space: nowrap;
    transition: opacity 0.2s;
  }
  .pim-main:hover .pim-hint { opacity: 0; }

  /* ── Right column: magnified result ── */
  .pim-magnified {
    width: 340px;
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #E8DDD0;
    background: #F5EDE3;
    position: relative;
    display: none; /* hidden until hover */
  }
  .pim-magnified.visible { display: block; }
  .pim-magnified-img {
    position: absolute;
    /* size and position set via JS */
    pointer-events: none;
    user-select: none;
  }
  .pim-magnified-label {
    position: absolute;
    top: 10px; left: 14px;
    font-size: 9px; letter-spacing: 2px;
    text-transform: uppercase; color: #B8862A;
    font-family: 'Jost', sans-serif;
    background: rgba(255,253,249,0.9);
    padding: 3px 8px;
    border-radius: 2px;
  }

  /* ── Mobile: hide magnified panel, no lens ── */
  @media (max-width: 900px) {
    .pim-wrapper { flex-direction: column; }
    .pim-magnified { display: none !important; }
    .pim-left { flex-direction: column-reverse; }
    .pim-thumbs { flex-direction: row; }
    .pim-thumb { width: 60px; height: 60px; }
    .pim-main { cursor: default; }
    .pim-lens { display: none !important; }
    .pim-hint { opacity: 1 !important; }
  }
`;

const LENS_SIZE = 120; // px — size of the lens box
const ZOOM = 2.6;     // magnification factor

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [hovering, setHovering] = useState(false);
  const [lens, setLens] = useState({ x: 0, y: 0 });       // lens top-left in px
  const [magnPos, setMagnPos] = useState({ x: 0, y: 0 }); // bg-position for magnified
  const mainRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = mainRef.current.getBoundingClientRect();
    const imgW = rect.width;
    const imgH = rect.height;

    // Cursor position relative to image
    let cx = e.clientX - rect.left;
    let cy = e.clientY - rect.top;

    // Clamp lens so it doesn't overflow
    let lx = cx - LENS_SIZE / 2;
    let ly = cy - LENS_SIZE / 2;
    lx = Math.max(0, Math.min(lx, imgW - LENS_SIZE));
    ly = Math.max(0, Math.min(ly, imgH - LENS_SIZE));

    setLens({ x: lx, y: ly });

    // Background offset for the magnified panel
    // The magnified panel is 340×340 (same as pim-magnified width)
    // Full zoomed image size = imgW * ZOOM  ×  imgH * ZOOM
    // We want the lens centre point to appear at centre of the magnified view
    const panelSize = 340;
    const zoomedW = imgW * ZOOM;
    const zoomedH = imgH * ZOOM;
    const offsetX = cx * ZOOM - panelSize / 2;
    const offsetY = cy * ZOOM - panelSize / 2;

    setMagnPos({
      x: Math.max(0, Math.min(offsetX, zoomedW - panelSize)),
      y: Math.max(0, Math.min(offsetY, zoomedH - panelSize)),
      zoomedW,
      zoomedH,
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pim-wrapper">

        {/* ── LEFT: thumbs + main image ── */}
        <div className="pim-left">
          {/* Vertical thumbnail strip */}
          <div className="pim-thumbs">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`view ${i + 1}`}
                className={`pim-thumb${activeImage === img ? " active" : ""}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>

          {/* Main image */}
          <div
            className="pim-main"
            ref={mainRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <img src={activeImage} alt="product" />

            {/* Lens box */}
            <div
              className="pim-lens"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: lens.x,
                top: lens.y,
              }}
            />

            <span className="pim-hint">Hover to magnify</span>
          </div>
        </div>

        {/* ── RIGHT: magnified panel ── */}
        <div className={`pim-magnified${hovering ? " visible" : ""}`}>
          {hovering && (
            <>
              <img
                src={activeImage}
                alt="magnified"
                className="pim-magnified-img"
                style={{
                  width: magnPos.zoomedW,
                  height: magnPos.zoomedH,
                  left: -magnPos.x,
                  top: -magnPos.y,
                }}
              />
              <span className="pim-magnified-label">Zoomed View</span>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default ProductImages;
