import { MapContainer, TileLayer } from "react-leaflet";
import { LegInfoDto } from "../types/ApiResponses";
import { PropsWithClassName } from "../types/ComponentTypes.ts";
import Routes from "./Routes.tsx";

//const [polylines, setPolylines] = useState<Polyline[]>([]);

type RouteMapProps = {
  legs: LegInfoDto[];
} & PropsWithClassName;
export default function RouteMap({ legs, className }: RouteMapProps) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
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
      </MapContainer>
    </>
  );
}
