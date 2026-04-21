"use client";
import { useEffect, useState } from "react";
import { homeSectionApi } from "../lib/api";

import HeroCarousel       from "../components/home/HeroCarousel";
import Collection         from "../components/home/Collection";
import Categories         from "../components/home/Categories";
import TrendingJewellerys from "../components/home/TrendingJewellerys";
import TanishqWorld       from "../components/home/TanishqWorld";
import NewArrival         from "../components/home/NewArrival";
import NewsletterBanner   from "../components/home/NewsletterBanner";

/* ── Section type → component ── */
const SECTION_MAP = {
  hero_carousel:  HeroCarousel,
  collection_grid:Collection,
  categories:     Categories,
  trending:       TrendingJewellerys,
  new_arrivals:   NewArrival,
  trust_world:    TanishqWorld,
  newsletter:     NewsletterBanner,
};

/* ── Shimmer skeleton ── */
const SK = `
  @keyframes sk{0%{background-position:-600px 0}100%{background-position:600px 0}}
  .sk{background:linear-gradient(90deg,#F5EDE3 25%,#EDE4D8 50%,#F5EDE3 75%);background-size:1200px 100%;animation:sk 1.6s infinite linear;border-radius:4px;}
`;
function Skeleton() {
  return (
    <>
      <style>{SK}</style>
      <div className="sk" style={{ height: "88vh", minHeight: 500 }} />
      {[200, 180, 160, 200].map((h, i) => (
        <div key={i} style={{ maxWidth: 1320, margin: "48px auto", padding: "0 40px" }}>
          <div className="sk" style={{ height: 20, width: 220, margin: "0 auto 14px" }} />
          <div className="sk" style={{ height: h }} />
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const [sections, setSections] = useState(null);

  useEffect(() => {
    homeSectionApi.getHome()
      .then(({ sections: s }) => setSections(s || []))
      .catch(() => {
        /* Fallback: default order if API is down */
        setSections([
          { id: "hero",         type: "hero_carousel",   settings: {}, products: [] },
          { id: "collections",  type: "collection_grid", settings: {}, products: [] },
          { id: "categories",   type: "categories",      settings: {}, products: [] },
          { id: "trending",     type: "trending",        settings: {}, products: [] },
          { id: "trust",        type: "trust_world",     settings: {}, products: [] },
          { id: "new_arrivals", type: "new_arrivals",    settings: {}, products: [] },
        ]);
      });
  }, []);

  if (sections === null) return <Skeleton />;

  return (
    <>
      {sections.map(section => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return null;
        return (
          <Component
            key={section.id}
            settings={section.settings || {}}
            products={section.products || []}
          />
        );
      })}
    </>
  );
}
