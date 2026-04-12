const Thumbnail = ({ img, active, onClick }) => (
  <>
    <style>{`
      .thumb { width: 78px; height: 78px; cursor: pointer; border-radius: 3px; object-fit: cover; border: 2px solid transparent; transition: all 0.2s; background: #F5EDE3; }
      .thumb.active { border-color: #B8862A; box-shadow: 0 0 0 2px rgba(184,134,42,0.2); }
      .thumb:hover:not(.active) { border-color: #D4C4B0; }
    `}</style>
    <img src={img} alt="" onClick={onClick} className={`thumb${active ? " active" : ""}`} />
  </>
);

export default Thumbnail;
