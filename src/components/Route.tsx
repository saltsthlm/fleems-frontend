import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Waypoint } from "../types/ApiResponses";

const Route = ({
  source,
  destination,
}: {
  source: string;
  destination: string;
}) => {
  const map = useMap();

  useEffect(() => {
    map.eachLayer((layer) => {
      const hasEmptyContrib = !(layer.getAttribution && layer.getAttribution());
      const hasNoContrib = !layer.getAttribution;
      if (hasEmptyContrib || hasNoContrib) {
        map.removeLayer(layer);
      }
    });

    const fetchRoute = async () => {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${source.split(",")[1]},${source.split(",")[0]};${destination.split(",")[1]},${destination.split(",")[0]}?overview=full`
      );
      const data = await response.json();
      const coordinates = data.waypoints.map((waypoint: Waypoint) => [
        waypoint.location[1],
        waypoint.location[0],
      ]);
      console.log("coordinates", coordinates);
      L.polyline(coordinates, { color: "black" }).addTo(map);
    };

    fetchRoute();
  }, [source, destination, map]);

  return null;
};

export default Route;
