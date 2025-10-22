'use client';

import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

type SpaLocation = { id: string; name: string; position: { lat: number; lng: number } };

type Props = { locations: SpaLocation[]; focus?: LatLngExpression };

const MapContainer = dynamic(async () => (await import('react-leaflet')).MapContainer, { ssr: false });
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false });
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false });
const Popup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false });

export function MapView({ locations, focus }: Props) {
  const center: LatLngExpression = focus ?? [10.776889, 106.700806];
  return (
    <div className="h-64 w-full overflow-hidden rounded-lg border border-slate-200">
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location) => (
          <Marker key={location.id} position={[location.position.lat, location.position.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
