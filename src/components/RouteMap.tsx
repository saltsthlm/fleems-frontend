import { MapContainer, Popup, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import Route from "./Route";
import { LegInfoDto } from "../types/ApiResponses";

export default function RouteMap(legs: LegInfoDto[]) {
  return (
    <MapContainer center={[61.26, 18.193]} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker position={[59.337, 18.012]}>
        <Popup>Vehicle ABC123</Popup>
      </CustomMarker>
      {legs.map((leg: LegInfoDto) => (
        <Route source={leg.startLocation} destination={leg.endLocation} />
      ))}
    </MapContainer>
  );
}
