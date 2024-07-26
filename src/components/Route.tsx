import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const Route = ({
  source,
  destination,
}: {
  source: string;
  destination: string;
}) => {
  const map = useMap();

  useEffect(() => {
    const fetchRoute = async () => {
      const response = await fetch(
<<<<<<< HEAD
        `https://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?overview=full`
=======
        `https://router.project-osrm.org/route/v1/driving/${source.split(",")[1]},${source.split(",")[0]};${destination.split(",")[1]},${destination.split(",")[0]}?overview=full`
>>>>>>> cc84344 (made map route component)
      );
      const data = await response.json();
      const coordinates = data.waypoints.map((waypoint) => [
        waypoint.location[1],
        waypoint.location[0],
      ]);
      console.log("coordinates", coordinates);
      L.polyline(coordinates, { color: "blue" }).addTo(map);
    };

    fetchRoute();
  }, [source, destination, map]);

  return null;
};

export default Route;
