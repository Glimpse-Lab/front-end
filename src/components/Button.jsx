export function Button({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) {
  const variants = {
    primary: 'bg-[var(--blue-main)] text-white hover:bg-[var(--blue-dark)]',
    outline: 'border border-[var(--border)] text-[var(--blue-dark)] hover:bg-gray-50',
    ghost: 'bg-gray-100 text-[var(--blue-dark)] hover:bg-gray-200',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-colors ${variants[variant] ?? variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
