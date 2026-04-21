/**
 * MANAS Jewellery — API Client
 * lib/api.js
 *
 * Single source of truth for all backend calls.
 * Handles: auth headers, error parsing, token refresh.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/* ── Token helpers (client-side only) ── */
export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("manas_token") : null;

export const setToken = (t) =>
  typeof window !== "undefined" && localStorage.setItem("manas_token", t);

export const removeToken = () =>
  typeof window !== "undefined" && localStorage.removeItem("manas_token");

/* ── Core fetch wrapper ── */
async function req(path, options = {}) {
  const token = getToken();

  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const res  = await fetch(`${BASE}${path}`, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data   = data;
    throw err;
  }

  return data;
}

/* ════════════════════════════════════════════
   AUTH
════════════════════════════════════════════ */
export const authApi = {
  register:  (body)       => req("/auth/register",   { method: "POST", body }),
  login:     (body)       => req("/auth/login",       { method: "POST", body }),
  sendOtp:   (phone)      => req("/auth/send-otp",    { method: "POST", body: { phone } }),
  verifyOtp: (phone, otp) => req("/auth/verify-otp",  { method: "POST", body: { phone, otp } }),
  logout:    ()           => req("/auth/logout",      { method: "POST" }),
  getMe:     ()           => req("/auth/me"),
  updateMe:  (body)       => req("/auth/me",          { method: "PUT",  body }),
  addAddress:    (body)   => req("/auth/addresses",        { method: "POST",   body }),
  removeAddress: (id)     => req(`/auth/addresses/${id}`,  { method: "DELETE"       }),
};

/* ════════════════════════════════════════════
   PRODUCTS
════════════════════════════════════════════ */
export const productApi = {
  /** GET /api/products with full filter support */
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v !== undefined))
    ).toString();
    return req(`/products${qs ? `?${qs}` : ""}`);
  },

  getOne:          (slug)   => req(`/products/${slug}`),
  getHomeSections: ()       => req("/products/home-sections"),
  getSuggestions:  (q)      => req(`/products/search/suggestions?q=${encodeURIComponent(q)}`),
  addReview: (id, body)     => req(`/products/${id}/reviews`, { method: "POST", body }),
};

/* ════════════════════════════════════════════
   CART
════════════════════════════════════════════ */
export const cartApi = {
  get:          ()                    => req("/cart"),
  add:          (productId, qty = 1, size = null) =>
                                         req("/cart/add", { method: "POST", body: { productId, qty, size } }),
  update:       (itemId, qty)         => req(`/cart/${itemId}`,  { method: "PUT",    body: { qty } }),
  remove:       (itemId)              => req(`/cart/${itemId}`,  { method: "DELETE"              }),
  clear:        ()                    => req("/cart",            { method: "DELETE"              }),
  applyCoupon:  (code)                => req("/cart/coupon",     { method: "POST",   body: { code } }),
  removeCoupon: ()                    => req("/cart/coupon",     { method: "DELETE"              }),
};

/* ════════════════════════════════════════════
   WISHLIST
════════════════════════════════════════════ */
export const wishlistApi = {
  get:    ()         => req("/wishlist"),
  toggle: (productId) => req(`/wishlist/${productId}`, { method: "POST" }),
};

/* ════════════════════════════════════════════
   ORDERS
════════════════════════════════════════════ */
export const orderApi = {
  create:  (body)           => req("/orders",             { method: "POST", body }),
  getAll:  (params = {})    => {
    const qs = new URLSearchParams(params).toString();
    return req(`/orders${qs ? `?${qs}` : ""}`);
  },
  getOne:  (orderNumber)    => req(`/orders/${orderNumber}`),
  cancel:  (id, reason)     => req(`/orders/${id}/cancel`, { method: "PUT", body: { reason } }),
};

/* ════════════════════════════════════════════
   PAGE CONFIG
════════════════════════════════════════════ */
export const pageApi = {
  getHome:  ()       => req("/pages/home"),
  getAdmin: (page)   => req(`/pages/${page}/admin`),
  save:     (page, sections) => req(`/pages/${page}`, { method: "PUT", body: { sections } }),
  updateSection: (page, sectionId, body) =>
    req(`/pages/${page}/section/${sectionId}`, { method: "PATCH", body }),
};

/* ════════════════════════════════════════════
   DEFAULT EXPORT — convenience object
════════════════════════════════════════════ */
const api = { auth: authApi, product: productApi, cart: cartApi, wishlist: wishlistApi, order: orderApi, page: pageApi };
export default api;

/* ════════════════════════════════════════════
   HOMEPAGE SECTIONS
════════════════════════════════════════════ */
export const homeSectionApi = {
  getHome:       ()         => req("/homepage"),
  getConfig:     ()         => req("/homepage/config"),
  saveConfig:    (sections) => req("/homepage/config",        { method: "PUT",    body: { sections } }),
  addSection:    (body)     => req("/homepage/sections",       { method: "POST",   body }),
  updateSection: (id, body) => req(`/homepage/sections/${id}`, { method: "PUT",    body }),
  removeSection: (id)       => req(`/homepage/sections/${id}`, { method: "DELETE" }),
  reset:         ()         => req("/homepage/reset",          { method: "POST"   }),
};
