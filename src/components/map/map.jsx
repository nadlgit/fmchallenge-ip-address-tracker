import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconLocation from './icon-location.svg';

const markerIcon = new L.Icon({
  iconUrl: iconLocation.src,
});

const MapPositionHandler = ({ position }) => {
  useMap().setView(position);
  return null;
};

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
      <MapPositionHandler position={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} interactive={false} icon={markerIcon}></Marker>
    </MapContainer>
  );
};
