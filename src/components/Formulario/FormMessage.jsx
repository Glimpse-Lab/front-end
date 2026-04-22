/**
 * Componente para exibir mensagens de feedback
 */
function FormMessage({ message }) {
  if (!message.text) return null;

  const messageStyle = {
    padding: "14px 16px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: "500",
    fontSize: "14px",
    animation: "slideDown 0.3s ease-out",
    border: "1px solid",
    ...(message.type === "success" 
      ? {
          color: "#155724",
          background: "#d4edda",
          borderColor: "#c3e6cb"
        }
      : {
          color: "#721c24",
          background: "#f8d7da",
          borderColor: "#f5c6cb"
        }
    )
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={messageStyle}>{message.text}</div>
    </>
  );
}

export default FormMessage;
