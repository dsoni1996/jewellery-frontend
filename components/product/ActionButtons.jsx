"use client";
import { ShoppingBag, MapPin, Phone } from "lucide-react";

const ActionButtons = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap');
      .ab-group { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; font-family: 'Jost', sans-serif; }
      .ab-btn-primary { display: flex; align-items: center; justify-content: center; gap: 10px; background: #2C1A0E; color: #D4AF6A; border: none; height: 52px; font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; width: 100%; }
      .ab-btn-primary:hover { background: #4A3728; }
      .ab-btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .ab-btn-outline { display: flex; align-items: center; justify-content: center; gap: 8px; background: transparent; border: 1px solid #D4C4B0; color: #4A3728; height: 48px; font-size: 10px; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; }
      .ab-btn-outline:hover { border-color: #B8862A; color: #B8862A; }
    `}</style>
    <div className="ab-group">
      <button className="ab-btn-primary">
        <ShoppingBag size={15} /> Add to Cart
      </button>
      <div className="ab-btn-row">
        <button className="ab-btn-outline"><MapPin size={13} /> Find Store</button>
        <button className="ab-btn-outline"><Phone size={13} /> Call Us</button>
      </div>
    </div>
  </>
);

export default ActionButtons;
