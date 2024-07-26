import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MakrerUrl from "../assets/mapMarker.svg";
import { Marker } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode;
}

export default function CustomMarker({
  position,
  children,
}: CustomMarkerProps) {
  const customIcon = L.icon({
    iconUrl: MakrerUrl,
    iconSize: [30, 30],
    iconAnchor: [10, 10],
  });

  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
}
