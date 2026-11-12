import { ShipmentMap } from "./ShipmentMap";

export function RouteVisualization({ shipment }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">Route overview</h2><p className="text-sm text-slate-500">Origin-to-destination overview · street-level pins are approximate</p></div>
        <p className="text-sm font-medium text-slate-700">{shipment.origin.city} <span className="px-1 text-slate-400">→</span> {shipment.destination.city}</p>
      </div>
      <ShipmentMap shipment={shipment} />
    </section>
  );
}
