import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RouteVisualization } from "../../components/tracking/RouteVisualization";
import { SenderRecipient } from "../../components/tracking/SenderRecipient";
import { ShipmentProgress } from "../../components/tracking/ShipmentProgress";
import { ShippingHistory } from "../../components/tracking/ShippingHistory";
import { TrackingNotFound } from "../../components/tracking/TrackingNotFound";
import { TrackingLookupError } from "../../components/tracking/TrackingLookupError";
import { getShipmentByTrackingNumber } from "../../services/tracking.service";

export function Track() {
  const { id = "" } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const load = useCallback(async (signal) => {
    setLoading(true); setNotFound(false); setError(false);
    try { setShipment(await getShipmentByTrackingNumber(id, signal)); }
    catch (requestError) {
      if (signal?.aborted) return;
      setShipment(null);
      if (requestError.response?.status === 404) setNotFound(true); else setError(true);
    } finally { if (!signal?.aborted) setLoading(false); }
  }, [id]);
  useEffect(() => { const controller = new AbortController(); const timer = setTimeout(() => load(controller.signal), 0); return () => { clearTimeout(timer); controller.abort(); }; }, [load]);

  if (loading) return <main className="mx-auto max-w-6xl animate-pulse space-y-5 px-4 pb-10 pt-24"><div className="h-12 rounded bg-slate-100"/><div className="h-52 rounded-xl bg-slate-100"/><div className="h-80 rounded-xl bg-slate-100"/></main>;
  if (notFound) return <><title>Shipment not found | SwiftShip</title><TrackingNotFound trackingNumber={id}/></>;
  if (error || !shipment) return <><title>Tracking unavailable | SwiftShip</title><TrackingLookupError onRetry={() => load()}/></>;

  return <main className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
    <title>Track {shipment.trackingNumber} | SwiftShip</title>
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-medium text-primary-light">Shipment tracking</p><h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Your shipment</h1></div><Link to="/tracking" className="text-sm font-semibold text-primary-light hover:text-primary-dark">Track another shipment</Link></div>
    <ShipmentProgress shipment={shipment}/><RouteVisualization shipment={shipment}/><ShippingHistory events={shipment.events}/><SenderRecipient shipment={shipment}/>
  </main>;
}
