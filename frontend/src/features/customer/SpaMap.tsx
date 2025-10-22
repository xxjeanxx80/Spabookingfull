import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Spa } from '../../types';

const DefaultIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface SpaMapProps {
  spas: Spa[];
  center: [number, number];
}

function SpaMap({ spas, center }: SpaMapProps) {
  return (
    <MapContainer center={center} zoom={13} className="h-80 w-full rounded-3xl border border-slate-800">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {spas.map((spa) => (
        <Marker key={spa.id} position={[spa.latitude, spa.longitude]}>
          <Popup>
            <div className="flex max-w-[200px] flex-col gap-2">
              <strong>{spa.name}</strong>
              <span className="text-xs">{spa.address}</span>
              <span className="text-xs text-secondary">{spa.rating.toFixed(1)} ★</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default SpaMap;
