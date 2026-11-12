import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function ShipmentMap({ shipment }) {
  const { origin, destination } = shipment;
  const route = [origin.coordinates, destination.coordinates];
  const hasCoordinates = route.every((point) => Array.isArray(point) && point.length === 2 && point.every(Number.isFinite));
  if (!hasCoordinates) return <div className="flex min-h-48 items-center justify-center rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-600">Map locations are unavailable for manually entered addresses. The shipment route and address details remain available above.</div>;
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
