import { Link, useParams } from "react-router-dom";
import { getShipmentByTrackingNumber } from "../../services/tracking.service";
import { RouteVisualization } from "../../components/tracking/RouteVisualization";
import { SenderRecipient } from "../../components/tracking/SenderRecipient";
import { ShipmentProgress } from "../../components/tracking/ShipmentProgress";
import { ShippingHistory } from "../../components/tracking/ShippingHistory";
import { TrackingNotFound } from "../../components/tracking/TrackingNotFound";

export function Track() {
  const { id = "" } = useParams();
  const trackingNumber = id;
  const shipment = getShipmentByTrackingNumber(trackingNumber);

  if (!shipment) return <><title>Shipment not found | Track</title><TrackingNotFound trackingNumber={trackingNumber} /></>;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
      <title>Track {shipment.trackingNumber} | Shipping</title>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-medium text-primary-light">Shipment tracking</p><h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Your shipment</h1></div>
        <Link to="/tracking" className="text-sm font-semibold text-primary-light hover:text-primary-dark">Track another shipment</Link>
      </div>
      <ShipmentProgress shipment={shipment} />
      <RouteVisualization shipment={shipment} />
      <ShippingHistory events={shipment.events} />
      <SenderRecipient shipment={shipment} />
    </main>
  );
}
