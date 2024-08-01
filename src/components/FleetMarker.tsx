import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import MakerUrl from "../assets/mapMarker.svg";

const FleetMarker = ({ location }: { location: string }) => {
  const map = useMap();
  useEffect(() => {
    const customIcon = L.icon({
      iconUrl: MakerUrl,
      iconSize: [30, 30],
      iconAnchor: [10, 10],
    });
    L.marker([Number(location.split(",")[0]), Number(location.split(",")[1])], {
      icon: customIcon,
    }).addTo(map);
  }, [location, map]);

  return null;
};

export default FleetMarker;
