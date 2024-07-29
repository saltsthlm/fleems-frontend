import { useState } from "react";
import useApi from "../hooks/useApi";
import CardTr from "./CardTr";
import Throbber from "./Throbber";
import { Task } from "../types/ApiResponses";
import CardHarsh from "./CardHarsh";

export default function TripLogs() {
  const [currentlyViewedTask, setCurrentlyViewedTask] = useState<Task>();
  const trips = useApi("tasks");

  if (trips.isLoading) {
    return <Throbber />;
  }

  if (trips.error) {
    return <h1>An error ocurred: {trips.error.message}</h1>;
  }

  if (!trips.data || trips.data.length == 0) {
    return <h1>There's no data to display here.</h1>;
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <table>
        <thead>
          <tr className="grid w-full grid-cols-4">
            <th>Task</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Trip details</th>
          </tr>
        </thead>
        <tbody className="grid gap-2 h-[75svh] overflow-y-scroll">
          {trips.data.map((trip, index) => (
            <CardTr
              key={index}
              className={`grid-cols-4 items-center ${currentlyViewedTask?.id == trip.id && "bg-button"}`}
              onClick={() => setCurrentlyViewedTask(trip)}
            >
              <td>
                Transportation of {trip.payload} {trip.product}
              </td>
              <td>
                {new Date(trip.startDate).toLocaleDateString()}{" "}
                {new Date(trip.startDate).toLocaleTimeString()} to
                <br />
                {trip.dateFinished
                  ? new Date(trip.startDate).toLocaleDateString() +
                    " " +
                    new Date(trip.startDate).toLocaleTimeString()
                  : "Present"}
              </td>
              <td>
                {trip.startDestination}
                <br />
                {trip.endDestination}
              </td>
              <td>{trip.expectedDistance} km</td>
            </CardTr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-5">
        {currentlyViewedTask ? (
          <>
            <CardHarsh className="h-full">
              <h1>Map here</h1>
            </CardHarsh>
            <CardHarsh className="text-2xl h-min self-end">
              <p>Driver: dawdawdawdw</p>
              <p>Vehicle: dawdadaw</p>
              <p>
                Task: Transportation of {currentlyViewedTask.payload}{" "}
                {currentlyViewedTask.product}
              </p>
              <p>Duration: {currentlyViewedTask.expectedTime / 24} Days</p>
              <p>
                Route: {currentlyViewedTask.startDestination} -{" "}
                {currentlyViewedTask.endDestination}
              </p>
              <p>Total distance: {currentlyViewedTask.expectedDistance} km</p>
            </CardHarsh>
          </>
        ) : (
          <h1>Select a trip to display details</h1>
        )}
      </div>
    </div>
  );
}
