import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export function ShipmentMap() {
  const start = [6.5244, 3.3792];     // Lagos
  const current = [51.5074, -0.1278]; // London

  return (
    <div className="h-[60vh] w-full overflow-hidden rounded-2xl mt-8">
      <MapContainer
        center={start}
        zoom={3}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={start} />
        <Marker position={current} />

        <Polyline
          positions={[start, current]}
          pathOptions={{
            color: '#0184C7',
            weight: 2,
            dashArray: '10 10',
          }}
        />
      </MapContainer>
    </div>
  );
}