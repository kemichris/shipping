import { FaCircleCheck, FaCircleDot } from "react-icons/fa6";

const formatDate = (value) => new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Lagos" }).format(new Date(value));
const formatTime = (value) => new Intl.DateTimeFormat("en-GB", { timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(value));

export function ShippingHistory({ events }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-bold text-slate-900">Shipment updates</h2>
      <p className="mt-1 text-sm text-slate-500">Latest activity appears first. Times shown in West Africa Time.</p>
      <ol className="mt-6">
        {events.map((item, index) => (
          <li key={`${item.date}-${item.status}`} className="relative flex gap-4 pb-7 last:pb-0">
            {index < events.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-6 w-px bg-slate-200" />}
            <span className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${index === 0 ? "bg-blue-100 text-primary-dark" : "bg-emerald-100 text-emerald-700"}`}>
              {index === 0 ? <FaCircleDot size={12} /> : <FaCircleCheck size={13} />}
            </span>
            <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div><p className="font-semibold text-slate-900">{item.message}</p><p className="mt-1 text-sm text-slate-600">{item.status} · {item.location}</p></div>
              <time dateTime={item.date} className="mt-2 block shrink-0 text-sm text-slate-500 sm:mt-0">{formatDate(item.date)} · {formatTime(item.date)}</time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
