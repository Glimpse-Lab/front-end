/**
 * Componente para exibir o input de CPF
 */
function CPFInput({ id, value, onChange, placeholder = "000.000.000-00" }) {
  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "5px", color: "#555", fontWeight: "bold" }}>
        CPF:
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px",
          border: "2px solid #ddd",
          borderRadius: "5px",
          fontSize: "14px",
          backgroundColor: "#fff",
          transition: "border-color 0.3s"
        }}
        onFocus={(e) => e.target.style.borderColor = "#667eea"}
        onBlur={(e) => e.target.style.borderColor = "#ddd"}
      />
    </div>
  );
}

export default CPFInput;
