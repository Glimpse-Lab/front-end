/**
 * Componente para exibir o input de CPF
 * Formata automaticamente: XXX.XXX.XXX-XX
 * Aceita apenas números
 */
function CPFInput({ id, value, onChange, placeholder = "000.000.000-00" }) {
  /**
   * Formata o CPF enquanto digita
   * Remove caracteres inválidos e aplica máscara
   */
  const handleCPFChange = (event) => {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Limita a 11 dígitos
    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }
    
    // Aplica formatação XXX.XXX.XXX-XX
    let cpfFormatado = cpf;
    if (cpf.length > 0) {
      cpfFormatado = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    }
    if (cpf.length > 6) {
      cpfFormatado = cpfFormatado.replace(/(\d{3}\.\d{3})(\d)/, '$1.$2');
    }
    if (cpf.length > 9) {
      cpfFormatado = cpfFormatado.replace(/(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2');
    }
    
    onChange({ target: { value: cpfFormatado } });
  };

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
        maxLength="14"
        value={value}
        onChange={handleCPFChange}
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
