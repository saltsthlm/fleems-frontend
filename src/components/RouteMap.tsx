import { MapContainer, TileLayer } from "react-leaflet";
import { LegInfoDto } from "../types/ApiResponses";
import CustomMarkerRoute from "./CustomMarkerRoute.tsx";
import { PropsWithClassName } from "../types/ComponentTypes.ts";
import React from "react";
import Routes from "./Routes.tsx";

//const [polylines, setPolylines] = useState<Polyline[]>([]);

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
      <Routes legs={legs}></Routes>
      {legs.map((leg, index) => (
        <React.Fragment key={index}>
          <CustomMarkerRoute
            position={[
              Number(leg.startLocation.split(",")[0]),
              Number(leg.startLocation.split(",")[1]),
            ]}
          />
          {leg.endLocation && (
            <CustomMarkerRoute
              position={[
                Number(leg.endLocation.split(",")[0]),
                Number(leg.endLocation.split(",")[1]),
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}
