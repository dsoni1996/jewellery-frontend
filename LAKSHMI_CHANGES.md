# Lakshmi (imitation jewellery) — frontend branch `lakshmi-imitation`

Same backend, alag shop: har request me header `x-shop: lakshmi` jaata hai (`lib/api.js`).
Brand/categories/filters sab `config/site.js` me hain.

## Setup
1. `npm install --legacy-peer-deps`  (react 19 peer-dep conflict ki wajah se)
2. `.env.local.example` ko `.env.local` banao, `NEXT_PUBLIC_API_URL` set karo.
3. Alag Vercel project banao is branch (`lakshmi-imitation`) ke liye, same env vars ke saath.
4. Backend me Lakshmi ka frontend URL `EXTRA_ALLOWED_ORIGINS` me daalo (CORS).

## Kya badla
- `config/site.js` (naya): naam, logo, token key, categories, finishes (plating), styles.
- `lib/api.js`: `x-shop` header, `lakshmi_token` key.
- Listing: Gold/Purity filters hataye → Finish (plating) + Style filters. Default `metal=Gold` hata diya.
- Product card / detail: karat, gross weight, making charges, gold-rate note, BIS badge, price-breakup table hata diye. Ab base material, finish, style, size, care dikhte hain.
- Navbar/Footer/MobileSidebar/Signup/Contact/About/Wedding/Home sections: MANAS, "Since 1985", BIS, diamond, Tanishq images hataye.
- Search page ab real API se chalta hai (pehle mock data tha).
- GST label "GST (3%)" → "GST" (rate backend se aata hai).
- Hataye gaye unused/stale files: `app/compare`, `app/listing/previou.jsx`, `components/global/*`, `components/Models/*`, `components/data/*`, `Untitled-1.html`.

## Placeholders jo tumhe bharne hain
- Logo text (`SITE.logo`), tagline, social links/email — `config/site.js` / `.env.local`.
- Home hero/collection images picsum placeholders hain → admin panel se apni Cloudinary images lagao.
- About page ka copy generic hai — apni asli story likho.
- Policy claims jo maine rakhe: "Easy Returns" (product page, cart), "Free" shipping (cart/checkout) — sahi hain ya nahi, check karo.
- Colours (`app/globals.css`) abhi bhi gold theme hain.
