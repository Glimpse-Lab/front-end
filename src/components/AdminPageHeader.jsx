export function AdminPageHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--blue-dark)] mb-2">{title}</h1>
      {subtitle && <p className="text-[var(--blue-dark)]/70">{subtitle}</p>}
    </div>
  );
}
