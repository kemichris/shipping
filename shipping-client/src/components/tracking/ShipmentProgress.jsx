import { FaBox, FaCalendarCheck, FaLocationDot } from "react-icons/fa6";
import { ProgressBar } from "./ProgressBar";

const dateTime = (value) => new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" }).format(new Date(value));

export function ShipmentProgress({ shipment }) {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-label="Shipment status">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Current status</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">{shipment.status}</span>
            <span className="text-sm text-slate-500">Last updated {dateTime(shipment.events[0].date)}</span>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 sm:min-w-64">
          <p className="flex items-center gap-2 text-sm text-slate-500"><FaCalendarCheck className="text-primary-light" /> Estimated delivery</p>
          <p className="mt-1 font-semibold text-slate-900">{dateTime(shipment.estimatedDelivery)}</p>
        </div>
      </div>
      <div className="my-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-3">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tracking number</p><p className="mt-1 break-all font-semibold text-slate-900">{shipment.trackingNumber}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">From</p><p className="mt-1 font-semibold text-slate-900">{shipment.origin.city}, {shipment.origin.country}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest location</p><p className="mt-1 flex items-center gap-1 font-semibold text-slate-900"><FaLocationDot className="text-primary-light" />{shipment.currentLocation}</p></div>
      </div>
      <ProgressBar progress={shipment.progress} />
      <div className="mt-5 flex items-center justify-between gap-3 text-sm font-medium text-slate-600"><span className="flex items-center gap-2"><FaBox className="text-primary-light" />{shipment.origin.city}</span><span className="text-right">{shipment.destination.city}</span></div>
    </section>
  );
}
