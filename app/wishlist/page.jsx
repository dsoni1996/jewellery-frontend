  "use client";
  import { useEffect, useState } from "react";
  import Link from "next/link";
  import { Heart, ShoppingBag, Trash2, ArrowLeft, Loader2 } from "lucide-react";
  import { useAuth } from "../../context/AuthContext";
  import { wishlistApi, cartApi } from "../../lib/api";

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;}
    .wl-root{background:#FAF6F0;min-height:100vh;padding:40px 0 80px;font-family:'Jost',sans-serif;}
    .wl-inner{max-width:1400px;margin:0 auto;padding:0 40px;}
    @media(max-width:768px){.wl-inner{padding:0 16px;}}
    .wl-back{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9E8875;text-decoration:none;margin-bottom:32px;transition:color .2s;}
    .wl-back:hover{color:#B8862A;}
    .wl-heading{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:400;color:#2C1A0E;display:flex;align-items:center;gap:14px;margin-bottom:4px;}
    .wl-heading em{font-style:italic;color:#B8862A;}
    .wl-count{font-size:12px;color:#9E8875;letter-spacing:1px;}
    .wl-gold-line{height:1px;background:linear-gradient(90deg,transparent,#D4AF6A 50%,transparent);margin:24px 0 36px;}
    .wl-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
    @media(max-width:1100px){.wl-grid{grid-template-columns:repeat(3,1fr);}}
    @media(max-width:768px){.wl-grid{grid-template-columns:repeat(2,1fr);gap:14px;}}
    .wl-card{background:#fff;border:1px solid #EDE4D8;border-radius:4px;overflow:hidden;transition:box-shadow .3s,transform .3s;position:relative;}
    .wl-card:hover{box-shadow:0 8px 32px rgba(44,26,14,.12);transform:translateY(-3px);}
    .wl-card-img-wrap{position:relative;overflow:hidden;aspect-ratio:1;background:#F5EDE3;}
    .wl-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s;}
    .wl-card:hover .wl-card-img{transform:scale(1.05);}
    .wl-card-remove{position:absolute;top:10px;right:10px;background:rgba(255,255,255,.9);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
    .wl-card-remove:hover{background:#fff;color:#c0392b;}
    .wl-card-tag{position:absolute;top:10px;left:10px;background:rgba(44,26,14,.78);color:#D4AF6A;font-size:9px;letter-spacing:1.5px;padding:4px 9px;text-transform:uppercase;border-radius:2px;}
    .wl-card-body{padding:14px 16px 16px;}
    .wl-card-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:400;color:#2C1A0E;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .wl-card-meta{font-size:11px;color:#9E8875;margin-bottom:10px;}
    .wl-card-footer{display:flex;align-items:center;justify-content:space-between;}
    .wl-card-price{font-size:17px;font-weight:500;color:#2C1A0E;}
    .wl-card-add{display:flex;align-items:center;gap:6px;background:#2C1A0E;color:#D4AF6A;border:none;padding:8px 14px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;border-radius:2px;transition:background .2s;}
    .wl-card-add:hover:not(:disabled){background:#B8862A;color:#fff;}
    .wl-card-add:disabled{opacity:.5;cursor:not-allowed;}
    .wl-empty{text-align:center;padding:80px 20px;background:#fff;border-radius:4px;}
    .wl-empty-icon{font-size:56px;margin-bottom:16px;}
    .wl-empty-title{font-family:'Cormorant Garamond',serif;font-size:32px;color:#2C1A0E;margin-bottom:8px;}
    .wl-empty-sub{font-size:13px;color:#9E8875;margin-bottom:28px;}
    .wl-empty-btn{display:inline-flex;background:#2C1A0E;color:#D4AF6A;padding:14px 32px;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:'Jost',sans-serif;}
    .wl-login-prompt{text-align:center;padding:80px 20px;}
    .wl-login-title{font-family:'Cormorant Garamond',serif;font-size:32px;color:#2C1A0E;margin-bottom:8px;}
    .wl-login-sub{font-size:13px;color:#9E8875;margin-bottom:24px;}
    .wl-login-btn{display:inline-flex;background:#2C1A0E;color:#D4AF6A;padding:13px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;font-family:'Jost',sans-serif;}
    .wl-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#2C1A0E;color:#D4AF6A;padding:12px 24px;font-size:12px;letter-spacing:1px;border-radius:2px;z-index:99;white-space:nowrap;animation:wl-toast-in .3s ease;}
    @keyframes wl-toast-in{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  `;

  export default function WishlistPage() {
    const { user, isLoggedIn, wishlistIds, toggleWishlist, setCartCount,refreshUser, loading } = useAuth();
    const [adding, setAdding]   = useState(null);  // productId being added to cart
    const [toast, setToast]     = useState("");

    /* Wishlist items come from user.wishlist (populated) */
    const items = user?.wishlist || [];

    useEffect(() => {
      refreshUser();
    }, []);

    const showToast = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(""), 2500);
    };

    const handleRemove = async (productId) => {
      await toggleWishlist(productId);
      refreshUser()
      showToast("Removed from wishlist");
    };

    const handleAddToCart = async (productId) => {
      if (!isLoggedIn) return;
      setAdding(productId);
      try {
        const res = await cartApi.add(productId, 1);
        setCartCount(res.totals?.itemCount ?? 0);
        showToast("Added to cart ✓");
      } catch (e) {
        showToast(e.message || "Could not add to cart");
      } finally {
        setAdding(null);
      }
    };

    const fmt = (n) => "₹ " + (n || 0).toLocaleString("en-IN");


    
    if (loading) {
    return (
      <div className="wl-root" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Loader2 className="spin" />
      </div>
    );
  }

    return (
      <>
        <style>{styles}</style>
        <div className="wl-root">
          <div className="wl-inner">
            <Link href="/" className="wl-back"><ArrowLeft size={14} /> Back to Home</Link>

            <div>
              <h1 className="wl-heading">
                <Heart size={32} style={{ color: "#B8862A" }} fill="#B8862A" />
                My <em>Wishlist</em>
              </h1>
              <p className="wl-count">
                {isLoggedIn ? `${items.length} saved piece${items.length !== 1 ? "s" : ""}` : ""}
              </p>
            </div>

            <div className="wl-gold-line" />

            {/* Not logged in */}
            {!isLoggedIn && (
              <div className="wl-login-prompt">
                <p className="wl-login-title">Sign in to see your wishlist</p>
                <p className="wl-login-sub">Save your favourite pieces and come back to them anytime.</p>
                <Link href="/" className="wl-login-btn">Sign In</Link>
              </div>
            )}

            {/* Logged in, empty */}
            {isLoggedIn && items.length === 0 && (
              <div className="wl-empty">
                <div className="wl-empty-icon">🤍</div>
                <h2 className="wl-empty-title">Your wishlist is empty</h2>
                <p className="wl-empty-sub">Save your favourite pieces and come back to them anytime.</p>
                <Link href="/listing" className="wl-empty-btn">Explore Collection</Link>
              </div>
            )}

            {/* Wishlist grid */}
            {isLoggedIn && items.length > 0 && (
              <div className="wl-grid">
                {items.map((item) => (
                  <div key={item._id} className="wl-card">
                    <div className="wl-card-img-wrap">
                      <img
                        src={item.thumbnail || `https://picsum.photos/400/400?random=${item._id}`}
                        alt={item.name}
                        className="wl-card-img"
                      />
                      <span className="wl-card-tag">{item.metal?.purity} {item.category}</span>
                      <button className="wl-card-remove" onClick={() => handleRemove(item._id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="wl-card-body">
                      <p className="wl-card-name">{item.name}</p>
                      <p className="wl-card-meta">{item.metal?.purity} {item.metal?.type} · {item.metal?.weight}g</p>
                      <div className="wl-card-footer">
                        <span className="wl-card-price">{fmt(item.price?.current)}</span>
                        <button
                          className="wl-card-add"
                          disabled={adding === item._id}
                          onClick={() => handleAddToCart(item._id)}
                        >
                          {adding === item._id
                            ? <Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} />
                            : <ShoppingBag size={11} />
                          }
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {toast && <div className="wl-toast">{toast}</div>}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </>
    );
  }
