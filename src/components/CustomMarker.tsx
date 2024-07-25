import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MakrerUrl from "../assets/mapMarker.svg";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode; // Content to display inside the marker
}

export default function CustomMarker({
  position,
  children,
}: CustomMarkerProps) {
  const map = useMap();

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
