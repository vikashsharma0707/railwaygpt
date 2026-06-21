export default function EmptyState({ title = 'Nothing here', subtitle, action }) {
  return (
    <div className="card text-center">
      <div className="text-4xl">🚆</div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
