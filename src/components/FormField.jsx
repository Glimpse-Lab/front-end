import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function FormField({ label, children, last = false, compact = false }) {
  const mb = compact ? (last ? 'mb-4' : 'mb-3') : (last ? 'mb-8' : 'mb-6');
  const labelCls = compact ? 'block text-[var(--blue-dark)] mb-1 text-sm' : 'block text-[var(--blue-dark)] mb-2';
  return (
    <div className={mb}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)]';
const inputClsCompact = 'w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-main)] text-sm';

export function Input({ className = '', compact = false, ...props }) {
  return <input className={`${compact ? inputClsCompact : inputCls} ${className}`} {...props} />;
}

export function Select({ children, className = '', ...props }) {
  return (
    <select className={`${inputCls} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className = '', compact = false, ...props }) {
  return <textarea className={`${compact ? inputClsCompact : inputCls} resize-none ${className}`} {...props} />;
}

export function PasswordInput({ className = '', compact = false, ...props }) {
  const [show, setShow] = useState(false);
  const base = compact ? inputClsCompact : inputCls;
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        className={`${base} pr-11 ${className}`}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--blue-main)] transition-colors"
        aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
