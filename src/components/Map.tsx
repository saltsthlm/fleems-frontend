import { MapContainer, Popup, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import Route from "./Route";

export default function Map() {
  const source = [59.337, 18.012];
  const destination = [60.589, 16.537];
  return (
    <MapContainer center={[61.26, 18.193]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker position={[59.337, 18.012]}>
        <Popup>Vehicle ABC123</Popup>
      </CustomMarker>
      <Route source={source} destination={destination} />
    </MapContainer>
  );
}
