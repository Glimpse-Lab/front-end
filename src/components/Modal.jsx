import { X } from 'lucide-react';

export function Modal({ onClose, children, maxWidth = 'max-w-2xl' }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl ${maxWidth} w-full max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ title, onClose }) {
  return (
    <div className="sticky top-0 bg-white border-b border-[var(--border)] p-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-[var(--blue-dark)]">{title}</h2>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <X className="w-6 h-6 text-[var(--blue-dark)]" />
      </button>
    </div>
  );
}
