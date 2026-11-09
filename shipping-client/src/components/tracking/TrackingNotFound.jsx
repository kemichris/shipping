import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaTruckFast } from "react-icons/fa6";

export function TrackingNotFound({ trackingNumber }) {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-5 py-20 sm:px-8">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-12" role="status">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary-light">
          <FaMagnifyingGlass size={22} />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-light">Shipment lookup</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">We couldn’t find that shipment</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">Check the tracking number for mistakes, or try again. If you received the number recently, its tracking details may not be available yet.</p>
        <p className="mx-auto mt-6 inline-flex max-w-full items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <FaTruckFast className="shrink-0 text-primary-light" />
          <span>Tracking number: <strong className="break-all text-slate-900">{trackingNumber}</strong></span>
        </p>
        <div className="mt-7">
          <Link to="/tracking" className="inline-flex items-center justify-center rounded-lg bg-primary-light px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2">Try another number</Link>
        </div>
      </section>
    </main>
  );
}
