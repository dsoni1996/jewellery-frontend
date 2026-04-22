import Link from "next/link";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.nf-root{background:#1A0D05;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Jost',sans-serif;padding:40px 20px;position:relative;overflow:hidden;}
.nf-root::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF6A' fill-opacity='0.03'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z'/%3E%3C/g%3E%3C/svg%3E");}
.nf-inner{position:relative;z-index:1;text-align:center;max-width:600px;}
.nf-num{font-family:'Cormorant Garamond',serif;font-size:clamp(100px,20vw,180px);font-weight:300;color:transparent;-webkit-text-stroke:1px rgba(212,175,106,.3);line-height:1;margin-bottom:-10px;}
.nf-ornament{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:28px;}
.nf-ornament-line{width:60px;height:1px;background:linear-gradient(90deg,transparent,#B8862A);}
.nf-ornament-line.r{background:linear-gradient(90deg,#B8862A,transparent);}
.nf-ornament-diamond{width:8px;height:8px;background:#B8862A;transform:rotate(45deg);}
.nf-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,44px);font-weight:300;color:#FFFDF9;margin-bottom:12px;}
.nf-title em{font-style:italic;color:#D4AF6A;}
.nf-sub{font-size:14px;color:#7A6352;font-weight:300;line-height:1.7;margin-bottom:40px;}
.nf-links{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.nf-btn-a{display:inline-flex;align-items:center;gap:9px;background:#B8862A;color:#fff;border:none;padding:14px 32px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;transition:background .2s;}
.nf-btn-a:hover{background:#D4AF6A;color:#2C1A0E;}
.nf-btn-b{display:inline-flex;align-items:center;gap:9px;background:transparent;color:#D4AF6A;border:1px solid rgba(212,175,106,.4);padding:14px 32px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;text-decoration:none;transition:all .2s;}
.nf-btn-b:hover{background:rgba(212,175,106,.08);border-color:#D4AF6A;}
`;

export default function NotFound() {
  return (
    <>
      <style>{S}</style>
      <div className="nf-root">
        <div className="nf-inner">
          <p className="nf-num">404</p>
          <div className="nf-ornament">
            <div className="nf-ornament-line" />
            <div className="nf-ornament-diamond" />
            <div className="nf-ornament-line r" />
          </div>
          <h1 className="nf-title">Page Not <em>Found</em></h1>
          <p className="nf-sub">
            The page you're looking for seems to have wandered off.<br />
            Perhaps it's being re-crafted by our artisans.
          </p>
          <div className="nf-links">
            <Link href="/" className="nf-btn-a">Back to Home</Link>
            <Link href="/listing" className="nf-btn-b">Explore Jewellery</Link>
          </div>
        </div>
      </div>
    </>
  );
}
