import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function ShipmentMap({ shipment }) {
  const { origin, destination } = shipment;
  const route = [origin.coordinates, destination.coordinates];
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-xl sm:h-[400px]">
      <MapContainer bounds={route} boundsOptions={{ padding: [36, 36] }} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={origin.coordinates} title={`Origin: ${origin.city}`} />
        <Marker position={destination.coordinates} title={`Destination: ${destination.city}`} />
        <Polyline positions={route} pathOptions={{ color: '#2563eb', weight: 3, dashArray: '8 8' }} />
      </MapContainer>
    </div>
  );
}
