export const CustomInput = ({ name, value, onChange}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          color: "#181818",
          letterSpacing: "0.42px",
          lineHeight: "20px",
        }}
      >
        {name}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{
          width: "313px",
          height: "28px",
          padding: "10px",
          borderRadius: "12px",
          border: "1px solid #C4C4C4",
          fontFamily: "Poppins, sans-serif",
        }}
      />
    </div>
  );
};
