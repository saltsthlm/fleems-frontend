import { MapContainer, TileLayer } from "react-leaflet";
import useApi from "../hooks/useApi";
import Throbber from "./Throbber";
import { Task } from "../types/ApiResponses";
import { PropsWithClassName } from "../types/ComponentTypes";
import React from "react";
import FleetMarker from "./FleetMarker";
import Card from "./Card";

export default function FleetMap({ className }: PropsWithClassName) {
  const { data, isLoading } = useApi("tasks");
  return (
    <>
      {isLoading ? (
        <Throbber />
      ) : (
        <>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
          />
          <Card className="w-full">
            <h1 className="text-xl">Assigned vehicles</h1>
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
                ?.filter((task: Task) => task.state == "ONGOING")

                ?.map((task: Task) => task.legs.slice(-1)[0])
                .map((leg, index) => (
                  <React.Fragment key={index}>
                    <FleetMarker
                      location={leg?.startLocation ?? "59.334591,18.063240"}
                    />
                  </React.Fragment>
                ))}
            </MapContainer>
          </Card>
        </>
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
