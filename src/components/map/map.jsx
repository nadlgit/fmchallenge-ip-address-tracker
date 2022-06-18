import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconLocation from './icon-location.svg';

const markerIcon = new L.Icon({
  iconUrl: iconLocation.src,
});

const MapPositionHandler = ({ position, zoom }) => {
  useMap().setView(position, zoom);
  return null;
};

export const Map = ({ latitude = 0, longitude = 0 }) => {
  const position = [latitude, longitude];
  const defaultZoom = 13;
  return (
    <MapContainer
      center={position}
      zoom={defaultZoom}
      zoomControl={false}
      scrollWheelZoom={'center'}
      touchZoom={'center'}
      dragging={false}
      style={{ height: '100%', width: '100%' }}
    >
      <MapPositionHandler position={position} zoom={defaultZoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} interactive={false} icon={markerIcon}></Marker>
    </MapContainer>
  );
};
