
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, cartApi, wishlistApi, getToken, setToken, removeToken } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,          setUser]       = useState(null);
  const [cartCount,     setCartCount]  = useState(0);
  const [wishlistIds,   setWishlistIds] = useState(new Set());
  const [loading,       setLoading]    = useState(true);  // initial auth check

  /* ── Initialise: restore session on mount ── */
  useEffect(() => {
    const token = getToken();
    if (token) {
      refreshUser();
      refreshCart();
      refreshWishlist();
    } else {
      setLoading(false);
    }
  }, []);

  /* ── Fetch current user ── */
  const refreshUser = useCallback(async () => {
    try {
      const { user: u } = await authApi.getMe();


      console.log("User data refreshed:", u);
      setUser(u);
    } catch {
     if (err.response?.status === 401) {
      removeToken();
      setUser(null);
    }
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Fetch cart item count ── */
  const refreshCart = useCallback(async () => {
    try {
      const { totals } = await cartApi.get();
      setCartCount(totals?.itemCount ?? 0);
    } catch { setCartCount(0); }
  }, []);

  /* ── Fetch wishlist IDs (as a Set for O(1) lookup) ── */
  const refreshWishlist = useCallback(async () => {
    try {
      const { wishlist } = await wishlistApi.get();
      setWishlistIds(new Set((wishlist || []).map(p => p._id)));
    } catch { setWishlistIds(new Set()); }
  }, []);

  /* ── Login ── */
  const login = async (phone, password) => {
    const { token, user: u } = await authApi.login({ phone, password });
    setToken(token);
    setUser(u);
    await Promise.all([refreshCart(), refreshWishlist()]);
    return u;
  };

  /* ── Register ── */
  const register = async (body) => {
    const { token, user: u } = await authApi.register(body);
    setToken(token);
    setUser(u);
    return u;
  };

  /* ── Verify OTP ── */
  const verifyOtp = async (phone, otp) => {
    const { token, user: u } = await authApi.verifyOtp(phone, otp);
    setToken(token);
    setUser(u);
    await Promise.all([refreshCart(), refreshWishlist()]);
    return u;
  };

  /* ── Logout ── */
  const logout = async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    removeToken();
    setUser(null);
    setCartCount(0);
    setWishlistIds(new Set());
  };

  /* ── Toggle wishlist (optimistic update) ── */
  const toggleWishlist = async (productId) => {
    if (!user) return false; // prompt login
    const prev = new Set(wishlistIds);
    const adding = !wishlistIds.has(productId);

    // Optimistic
    setWishlistIds(s => {
      const n = new Set(s);
      adding ? n.add(productId) : n.delete(productId);
      return n;
    });

    try {
      await wishlistApi.toggle(productId);
      return adding;
    } catch {
      setWishlistIds(prev); // rollback
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      cartCount, setCartCount,
      wishlistIds,
      login, register, verifyOtp, logout,
      toggleWishlist,
      refreshUser, refreshCart, refreshWishlist,
      isLoggedIn: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

