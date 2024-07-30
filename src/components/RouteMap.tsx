import { MapContainer, TileLayer } from "react-leaflet";
import Route from "./Route";
import { LegInfoDto } from "../types/ApiResponses";
import CustomMarkerRoute from "./CustomMarkerRoute.tsx";
import { PropsWithClassName } from "../types/ComponentTypes.ts";

type RouteMapProps = {
  legs: LegInfoDto[];
} & PropsWithClassName;
export default function RouteMap({ legs, className }: RouteMapProps) {
  return (
    <MapContainer
      className={`z-1 w-full h-full min-h-42 ${className && className}`}
      center={[61.26, 18.193]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {legs.map((leg: LegInfoDto) => (
        <>
          <Route source={leg.startLocation} destination={leg.endLocation} />
          <CustomMarkerRoute
            position={leg.startLocation.split(",")}
            children={undefined}
          ></CustomMarkerRoute>
          <CustomMarkerRoute
            position={leg.endLocation.split(",")}
            children={undefined}
          ></CustomMarkerRoute>
        </>
      ))}
    </MapContainer>
  );
}
