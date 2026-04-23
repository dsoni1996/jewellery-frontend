"use client";
import { useState, useEffect, useCallback } from "react";
import { productApi, cartApi } from "../lib/api";
import { useAuth } from "@/context/AuthContext";

/* ─────────────────────────────────────────
   useProducts — paginated product list
   Now accepts initialFilters from URL params (passed from page component)
   Usage: const { products, loading, total, page, setPage, setFilters } = useProducts(initialFilters)
───────────────────────────────────────── */
export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [pages,    setPages]    = useState(1);
  const [page,     setPage]     = useState(Number(initialFilters.page) || 1);
  const [loading,  setLoading]  = useState(true);
  const [filters,  setFilters]  = useState(() => {
    // Strip 'page' from filters — page is managed separately
    const { page: _p, ...rest } = initialFilters;
    return rest;
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll({ ...filters, page, limit: 20 });
      setProducts(res.products || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (e) {
      console.error("useProducts:", e.message);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => { load(); }, [load]);

  const updateFilter = (key, value) => {
    setPage(1);
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return { products, total, pages, page, loading, filters, setPage, setFilters, updateFilter, reload: load };
}

/* ─────────────────────────────────────────
   useProduct — single product by slug
───────────────────────────────────────── */
export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const { product: p } = await productApi.getOne(slug);
        setProduct(p);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return { product, loading, error };
}

/* ─────────────────────────────────────────
   useCart — full cart state + operations
───────────────────────────────────────── */
export function useCart() {
  const { isLoggedIn, setCartCount } = useAuth();
  const [cart,    setCart]    = useState(null);
  const [totals,  setTotals]  = useState(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!isLoggedIn) { setCart(null); setTotals(null); return; }
    setLoading(true);
    try {
      const res = await cartApi.get();
      setCart(res.cart);
      setTotals(res.totals);
      setCartCount(res.totals?.itemCount ?? 0);
    } catch { } finally { setLoading(false); }
  }, [isLoggedIn, setCartCount]);

  useEffect(() => { load(); }, [load]);

  const addItem = async (productId, qty = 1, size = null) => {
    const res = await cartApi.add(productId, qty, size);
    setCart(res.cart);
    setTotals(res.totals);
    setCartCount(res.totals?.itemCount ?? 0);
    return res;
  };

  const updateItem = async (itemId, qty) => {
    const res = await cartApi.update(itemId, qty);
    setCart(res.cart);
    setTotals(res.totals);
    setCartCount(res.totals?.itemCount ?? 0);
  };

  const removeItem = async (itemId) => {
    const res = await cartApi.remove(itemId);
    setCart(res.cart);
    setTotals(res.totals);
    setCartCount(res.totals?.itemCount ?? 0);
  };

  const applyCoupon  = (code) => cartApi.applyCoupon(code).then(load);
  const removeCoupon = ()     => cartApi.removeCoupon().then(load);
  const clearCart    = ()     => cartApi.clear().then(load);

  return { cart, totals, loading, addItem, updateItem, removeItem, applyCoupon, removeCoupon, clearCart, reload: load };
}

/* ─────────────────────────────────────────
   useOrders — my orders list
───────────────────────────────────────── */
export function useOrders() {
  const { isLoggedIn } = useAuth();
  const [orders,  setOrders]  = useState([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      setLoading(true);
      try {
        const { orders: o, total: t } = await require("../lib/api").orderApi.getAll();
        setOrders(o || []); setTotal(t || 0);
      } catch { } finally { setLoading(false); }
    })();
  }, [isLoggedIn]);

  return { orders, total, loading };
}

/* ─────────────────────────────────────────
   useSearchSuggestions — debounced search
───────────────────────────────────────── */
export function useSearchSuggestions(query, delay = 300) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading,     setLoading]     = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) { setSuggestions([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { suggestions: s } = await productApi.getSuggestions(query);
        setSuggestions(s || []);
      } catch { } finally { setLoading(false); }
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return { suggestions, loading };
}

/* ─────────────────────────────────────────
   useHomeSections — home page data
───────────────────────────────────────── */
export function useHomeSections() {
  const [sections, setSections] = useState({ bestSellers: [], newArrivals: [], trending: [], wedding: [] });
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await productApi.getHomeSections();
        setSections(data);
      } catch { } finally { setLoading(false); }
    })();
  }, []);

  return { ...sections, loading };
}
