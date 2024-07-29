import { useState } from "react";
import useApi from "../hooks/useApi";
import Card from "./Card";
import CardTr from "./CardTr";
import Throbber from "./Throbber";
import { Task } from "../types/ApiResponses";

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
    <div className="grid grid-cols-2">
      <table>
        <thead>
          <tr className="grid w-full grid-cols-4">
            <th>Task</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Trip details</th>
          </tr>
        </thead>
        <tbody className="grid gap-2">
          {trips.data.map((trip, index) => (
            <CardTr
              key={index}
              className="grid-cols-4 items-center"
              onClick={() => setCurrentlyViewedTask(trip)}
            >
              <td>{trip.id}</td>
              <td>
                {trip.startDate?.toString()}
                <br />
                {trip.dateFinished?.toString()}
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
      <div>
        {currentlyViewedTask ? (
          <>
            <Card>
              <h1>Map here</h1>
            </Card>
            <Card>
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
            </Card>
          </>
        ) : (
          <h1>Select a trip to display details</h1>
        )}
      </div>
    </div>
  );
}