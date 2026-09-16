import { Link } from "react-router-dom";

import { FaCircle } from "react-icons/fa";


export function RecentShipment({recentShipments}) {
  return (
    <section className="mt-12 rounded-2xl shadow-lg border border-gray-200 py-6">
      <div className="px-4 flex justify-between items-center pb-3 border-b border-gray-200">
        <h3 className="text-xl font-semibold">Recent Shipments</h3>
        <Link to="/shipments" className="text-primary-light">
          View all
        </Link>
      </div>
      {recentShipments.map((shipment) => (
        <div
          key={shipment.trackingNumber}
          className="px-4 flex justify-between items-center py-3 border-b border-gray-200"
        >
          <div>
            <p>{shipment.sender.name}</p>
            <p className="text-gray-400">{shipment.trackingNumber}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="px-2 py-1 rounded bg-gray-200 text-xs flex items-center gap-2 text-primary-light border border-primary-light">
              <FaCircle size={5} /> {shipment.status}
            </p>
            <p className="text-gray-400">{new Date(shipment.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
