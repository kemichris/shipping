import { ShipmentMap } from "./ShipmentMap";
import { TrackSubHeader } from "./TrackSubHeader";

export function RouteVisualization() {
    return (
        <section className="rounded-lg border border-gray-200/50 py-6 px-4 mt-8">
            <TrackSubHeader text='Route Visualization' />
            <ShipmentMap />
        </section>
    )
}