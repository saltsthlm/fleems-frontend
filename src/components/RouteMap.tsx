import { MapContainer, TileLayer } from "react-leaflet";
import Route from "./Route";
import { LegInfoDto } from "../types/ApiResponses";
import CustomMarkerRoute from "./CustomMarkerRoute.tsx";
import { PropsWithClassName } from "../types/ComponentTypes.ts";
import React from "react";

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

      {legs.map((leg, index) => (
        <React.Fragment key={index}>
          <Route
            source={leg.startLocation}
            destination={leg.endLocation ?? leg.startLocation}
          />
          <CustomMarkerRoute position={leg.startLocation.split(",")} />
          {leg.endLocation && (
            <CustomMarkerRoute position={leg.endLocation.split(",")} />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}
