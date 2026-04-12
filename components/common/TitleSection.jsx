const TitleSection = ({ title, subtitle, children, width = "1320px" }) => {
  return (
    <div style={{ maxWidth: width, margin: "0 auto", padding: "0 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
        .ts-section { text-align: center; margin: 64px 0 40px; }
        .ts-subtitle { font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 3px; text-transform: uppercase; color: #B8862A; margin-bottom: 10px; display: block; }
        .ts-title { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 400; color: #2C1A0E; line-height: 1.15; margin-bottom: 6px; }
        .ts-title em { font-style: italic; color: #B8862A; }
        .ts-ornament { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 16px; }
        .ts-ornament-line { height: 1px; width: 60px; background: linear-gradient(90deg, transparent, #D4AF6A); }
        .ts-ornament-line.r { background: linear-gradient(90deg, #D4AF6A, transparent); }
        .ts-ornament-diamond { width: 6px; height: 6px; background: #B8862A; transform: rotate(45deg); }
      `}</style>
      <div className="ts-section">
        {subtitle && <span className="ts-subtitle">{subtitle}</span>}
        <h2 className="ts-title" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="ts-ornament">
          <div className="ts-ornament-line" />
          <div className="ts-ornament-diamond" />
          <div className="ts-ornament-line r" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default TitleSection;
