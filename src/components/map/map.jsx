import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export const Map = ({ latitude = 0, longitude = 0 }) => {
  const position = [latitude, longitude];
  return (
    <MapContainer
      center={position}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={'center'}
      touchZoom={'center'}
      dragging={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} interactive={false} />
    </MapContainer>
  );
};
