import { MapContainer, Popup, TileLayer } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import useApi from "../hooks/useApi";
import Throbber from "./Throbber";
import { AssignmentInfoDto } from "../types/ApiResponses";
import { PropsWithClassName } from "../types/ComponentTypes";

export default function Map({ className }: PropsWithClassName) {
  const { data, isLoading } = useApi("assignments");
  return (
    <>
      {isLoading ? (
        <Throbber />
      ) : (
        <MapContainer
          className={`h-full min-h-96 mt-4 ${className && className}`}
          center={[61.26, 18.193]}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data
            ?.map((assignment: AssignmentInfoDto) => assignment.task.legs.pop())
            .filter((e) => e != undefined)
            .map((e) => (
              <CustomMarker
                position={[
                  Number(e.startLocation.split(",")[0]),
                  Number(e.startLocation.split(",")[1]),
                ]}
              >
                <Popup>Vehicle ABC123</Popup>
              </CustomMarker>
            ))}
        </MapContainer>
      )}
    </>
  );
}
/*

{isLoading ? (
          <Throbber />
        ) : (
          data?.map((driver) => (
            <CardButton
              key={driver.id}
              className="flex flex-row text-left"
              isCentered={false}
              onClick={() => viewDriver(driver)}
            >
              <img src={driver.photo} className="w-24 rounded-lg" />
              <div>
                <h1 className="text-xl">{driver.name}</h1>
                <p>License: {driver.licenseNumber}</p>
                <p>Mobile: {driver.phoneNumber}</p>
              </div>
            </CardButton>
          ))
        )}
*/
