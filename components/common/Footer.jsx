const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600&family=Jost:wght@300;400;500&display=swap');
  .ft-root { background: #2C1A0E; color: #C8B89A; font-family: 'Jost', sans-serif; }
  .ft-gold-line { height: 2px; background: linear-gradient(90deg, transparent, #B8862A 20%, #E8C96A 50%, #B8862A 80%, transparent); }
  .ft-top { max-width: 1400px; margin: 0 auto; padding: 60px 40px 48px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr; gap: 48px; }
  .ft-brand { }
  .ft-logo { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; color: #FFFDF9; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 16px; display: block; text-decoration: none; }
  .ft-logo span { color: #D4AF6A; }
  .ft-tagline { font-size: 13px; font-weight: 300; line-height: 1.7; color: #9E8875; margin-bottom: 24px; max-width: 240px; }
  .ft-social { display: flex; gap: 12px; margin-bottom: 28px; }
  .ft-social-btn { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #9E8875; font-size: 13px; cursor: pointer; transition: all 0.2s; text-decoration: none; }
  .ft-social-btn:hover { border-color: #D4AF6A; color: #D4AF6A; }
  .ft-col-title { font-size: 10px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #D4AF6A; margin-bottom: 18px; }
  .ft-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .ft-col ul li a { font-size: 13px; font-weight: 300; color: #9E8875; text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .ft-col ul li a:hover { color: #E8C96A; }
  .ft-qr { }
  .ft-qr-title { font-size: 12px; font-weight: 300; color: #9E8875; margin-bottom: 12px; letter-spacing: 0.5px; }
  .ft-qr img { width: 90px; height: 90px; background: #fff; padding: 6px; border-radius: 4px; }
  .ft-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 0; }
  .ft-bottom { max-width: 1400px; margin: 0 auto; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .ft-copyright { font-size: 12px; color: #6B5744; font-weight: 300; }
  .ft-legal { display: flex; gap: 20px; }
  .ft-legal a { font-size: 11px; color: #6B5744; text-decoration: none; transition: color 0.2s; letter-spacing: 0.5px; }
  .ft-legal a:hover { color: #D4AF6A; }
  .ft-payment { display: flex; gap: 8px; align-items: center; }
  .ft-payment-item { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 3px; padding: 4px 10px; font-size: 10px; color: #9E8875; font-weight: 500; letter-spacing: 0.5px; }
  .ft-trust { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #6B5744; }
  .ft-trust-dot { width: 6px; height: 6px; background: #4CAF50; border-radius: 50%; }
  @media (max-width: 1000px) { .ft-top { grid-template-columns: 1fr 1fr; gap: 32px; } }
  @media (max-width: 600px) { .ft-top { grid-template-columns: 1fr; padding: 40px 20px 32px; } .ft-bottom { padding: 16px 20px; flex-direction: column; align-items: flex-start; } }
`;

const shopLinks = [
  { label: "Gold Jewellery",      href: "listing?metal=Gold" },
  { label: "Diamond Jewellery",   href: "listing?metal=Diamond" },
  { label: "Wedding Collection",  href: "listing?category=Wedding" },
  { label: "New Arrivals",        href: "listing?sort=new" },
  { label: "Trending Now",        href: "listing?sort=trending" },
];

const helpLinks = [
  { label: "Track My Order",      href: "/track-order" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Delivery Information",href: "/delivery" },
  { label: "Payment Options",     href: "/payment-options" },
  { label: "FAQ",                 href: "/faq" },
];

const companyLinks = [
  { label: "About Us",      href: "/about" },
  { label: "Store Locator", href: "/stores" },
  { label: "Blog",          href: "/blog" },
  { label: "Careers",       href: "/careers" },
  { label: "Press",         href: "/press" },
];

const socialLinks = [
  { label: "f",  href: "https://facebook.com/manasjewellers",  title: "Facebook" },
  { label: "in", href: "https://instagram.com/manasjewellers", title: "Instagram" },
  { label: "yt", href: "https://youtube.com/@manasjewellers",  title: "YouTube" },
  { label: "tw", href: "https://twitter.com/manasjewellers",   title: "Twitter / X" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Disclaimer",         href: "/disclaimer" },
];

const Footer = () => (
  <>
    <style>{footerStyles}</style>
    <footer className="ft-root">
      <div className="ft-gold-line" />
      <div className="ft-top">

        {/* Brand */}
        <div className="ft-brand">
          <a href="/" className="ft-logo">MAN<span>A</span>S</a>
          <p className="ft-tagline">
            Crafting timeless jewellery since 1985. BIS hallmarked gold, diamonds,
            and precious stones for every life moment.
          </p>
          <div className="ft-social">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                className="ft-social-btn"
                href={s.href}
                title={s.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="ft-trust">
            <div className="ft-trust-dot" />
            BIS Certified &nbsp;·&nbsp; Secure Payments
          </div>
        </div>

        {/* Shop */}
        <div className="ft-col">
          <p className="ft-col-title">Shop</p>
          <ul>
            {shopLinks.map((item, i) => (
              <li key={i}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="ft-col">
          <p className="ft-col-title">Help</p>
          <ul>
            {helpLinks.map((item, i) => (
              <li key={i}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="ft-col">
          <p className="ft-col-title">Company</p>
          <ul>
            {companyLinks.map((item, i) => (
              <li key={i}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </div>

        {/* App Download */}
        <div className="ft-qr">
          <p className="ft-col-title">Download App</p>
          <p className="ft-qr-title">Scan to download the MANAS app</p>
          <a href="/app" title="Download MANAS App">
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw0fa1b94a/images/footer/tanishq-app-QR-code.svg"
              alt="QR Code – Download MANAS App"
            />
          </a>
        </div>
      </div>

      <hr className="ft-divider" />

      <div className="ft-bottom">
        <p className="ft-copyright">© 2025 MANAS Jewellers. All Rights Reserved.</p>
        <div className="ft-payment">
          {["VISA", "MC", "UPI", "PayPal", "Amex"].map((p, i) => (
            <span key={i} className="ft-payment-item">{p}</span>
          ))}
        </div>
        <nav className="ft-legal">
          {legalLinks.map((item, i) => (
            <a key={i} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  </>
);

export default Footer;