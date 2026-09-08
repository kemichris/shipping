import { ShipmentProgress } from "../../components/tracking/ShipmentProgress";
import { TrackHeader } from "../../components/tracking/TrackHeader";


export function Track() {
    return (
        <div className="px-8 md:px-16">
        <title>shipping-client | Tracking</title>
        <TrackHeader />
        <ShipmentProgress />
        
        </div>
    )
}