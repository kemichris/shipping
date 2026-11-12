import { Link } from "react-router-dom";
import { ShipmentStatusBadge } from "./ShipmentStatusBadge";

const date = (value) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
    new Date(value),
  );

export function RecentShipment({ recentShipments = [] }) {
  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent shipments
        </h2>
        <Link
          to="/admin/shipments"
          className="text-sm font-semibold text-primary-light"
        >
          View all
        </Link>
      </div>
      {recentShipments.length === 0 ? (
        <p className="p-8 text-center text-sm text-slate-500">
          No shipments have been created yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-162.5 w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Tracking number</th>
                <th className="px-4 py-3">Sender</th>
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentShipments.map((shipment) => (
                <tr key={shipment._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold">
                    <Link
                      to={`/admin/shipments/${shipment._id}`}
                      className="text-primary-light"
                    >
                      {shipment.trackingNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{shipment.sender?.name || "—"}</td>
                  <td className="px-4 py-3">
                    {shipment.recipient?.name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ShipmentStatusBadge status={shipment.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {date(shipment.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
