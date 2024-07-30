import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MakrerUrl from "../assets/routemarker.svg";
import { Marker } from "react-leaflet";

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children?: React.ReactNode;
}

export default function CustomMarkerRoute({ position }: CustomMarkerProps) {
  const customIcon = L.icon({
    iconUrl: MakrerUrl,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return <Marker position={position} icon={customIcon}></Marker>;
}
