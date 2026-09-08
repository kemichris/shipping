import { RouteVisualization } from "../../components/tracking/RouteVisualization";
import { SenderRecipient } from "../../components/tracking/SenderRecipient";
import { ShipmentProgress } from "../../components/tracking/ShipmentProgress";
import { ShippingHistory } from "../../components/tracking/ShippingHistory";
import { TrackHeader } from "../../components/tracking/TrackHeader";


export function Track() {
    return (
        <div className="px-8 md:px-16">
        <title>shipping-client | Tracking</title>
        <TrackHeader />
        <ShipmentProgress />
        <RouteVisualization />
        <SenderRecipient />
        <ShippingHistory />
        
        </div>
    )
}