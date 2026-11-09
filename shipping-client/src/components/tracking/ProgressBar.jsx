export function ProgressBar({ progress = 0 }) {
  const value = Math.min(100, Math.max(0, progress));
  return (
    <div className="w-full" aria-label={`Shipment journey ${value}% complete`}>
      <div className="mb-2 flex items-center justify-between text-sm"><p className="font-semibold text-slate-800">Journey progress</p><p className="font-semibold text-primary-dark">{value}%</p></div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div className="h-full rounded-full bg-primary-light transition-[width] duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
