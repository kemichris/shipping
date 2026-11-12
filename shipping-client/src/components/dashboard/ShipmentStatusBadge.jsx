import { shipmentStatusLabels } from "../../services/shipment.service";

const styles = {
  pending: "bg-amber-50 text-amber-800",
  pending_payment: "bg-amber-50 text-amber-800",
  confirmed: "bg-sky-50 text-sky-800",
  picked_up: "bg-indigo-50 text-indigo-800",
  processing: "bg-indigo-50 text-indigo-800",
  in_transit: "bg-blue-50 text-blue-800",
  out_for_delivery: "bg-cyan-50 text-cyan-800",
  delivered: "bg-emerald-50 text-emerald-800",
  failed_delivery: "bg-rose-50 text-rose-800",
  returned: "bg-orange-50 text-orange-800",
  cancelled: "bg-slate-100 text-slate-700",
};

export function ShipmentStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}
    >
      {shipmentStatusLabels[status] ||
        String(status || "Unknown").replaceAll("_", " ")}
    </span>
  );
}
