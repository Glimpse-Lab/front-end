/**
 * Componente para exibir o input de email
 */
function EmailInput({ id, value, onChange, placeholder = "exemplo@email.com" }) {
  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "5px", color: "#555", fontWeight: "bold" }}>
        Email:
      </label>
      <input
        type="email"
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

export default EmailInput;
