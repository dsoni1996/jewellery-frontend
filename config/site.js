/**
 * Lakshmi (imitation jewellery) — site config.
 * Brand naam, token key, categories aur filters yahin se aate hain,
 * taaki components me hardcode na ho.
 *
 * Social / email ke liye .env.local me ye (optional) daalo:
 *   NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_YOUTUBE_URL
 */
export const SITE = {
  /* Backend ko `x-shop` header me ye key jaati hai */
  key: "lakshmi",

  name: "Lakshmi",
  fullName: "Lakshmi Imitation Jewellery",
  tagline: "Trendy imitation jewellery for every occasion — kundan, AD, oxidised and bridal sets.",
  description: "Shop imitation jewellery online: jhumkas, necklaces, bangles, bridal sets and more. New styles every week.",

  /* Logo: [pehla hissa, gold accent letter, baaki] */
  logo: ["LAKSH", "M", "I"],

  tokenKey: "lakshmi_token",

  email:   process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  social: {
    facebook:  process.env.NEXT_PUBLIC_FACEBOOK_URL  || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube:   process.env.NEXT_PUBLIC_YOUTUBE_URL   || "",
  },

  /* Values backend ke Product.category enum se match hone chahiye */
  categories: [
    { value: "Earring",       label: "Earrings" },
    { value: "Necklace",      label: "Necklaces" },
    { value: "Bangle",        label: "Bangles" },
    { value: "Ring",          label: "Rings" },
    { value: "Jhumka",        label: "Jhumkas" },
    { value: "Choker",        label: "Chokers" },
    { value: "Maang Tikka",   label: "Maang Tikka" },
    { value: "Jewellery Set", label: "Jewellery Sets" },
    { value: "Bracelet",      label: "Bracelets" },
    { value: "Pendant",       label: "Pendants" },
  ],

  /* Backend Product.imitation.plating / .style enums */
  platings: ["Gold Plated", "Rose Gold Plated", "Silver Plated", "Rhodium Plated", "Oxidised", "Antique Gold", "Matte Gold", "Black Polish"],
  styles:   ["Kundan", "AD / CZ", "Temple", "Meenakari", "Pearl", "Oxidised", "Polki Look", "Beaded", "Traditional", "Contemporary"],
};

export const categoryLabel = (value) =>
  SITE.categories.find((c) => c.value === value)?.label || value;
